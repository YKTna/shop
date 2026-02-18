import { ChangeDetectorRef, Component } from '@angular/core';
import { Header } from '../../header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product, ProductService } from '../../services/product';
import { OrderService } from '../../services/order';
import { finalize } from 'rxjs/operators';
 
@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
})
export class Cart {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = false;
  totalPrice = 0;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filterProducts();
    });
  }

  private filterProducts() {
    this.filteredProducts = this.products.filter(p => p.quantity > 0);
    this.calculateTotalPrice();
    this.cdr.detectChanges();
  }

  private calculateTotalPrice() {
    this.totalPrice = this.filteredProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  decrementQuantity(product: Product) {
    if (product.quantity > 0) {
      product.quantity--;
      this.productService.updateProduct(product).subscribe(() => {
        this.filterProducts();
      });
    }
  }

  incrementQuantity(product: Product) {
    product.quantity++;
    this.productService.updateProduct(product).subscribe(() => {
      this.filterProducts();
    });
  }

  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite;
    this.productService.updateProduct(product).subscribe();
  }

  checkout() {
    if (this.filteredProducts.length === 0) return;

    this.isLoading = true;

    const orderData = {
      items: this.filteredProducts.map(p => ({
        productId: p.id,
        quantity: p.quantity,
        price: p.price,
      })),
      totalPrice: this.totalPrice,
      createdAt: new Date().toISOString(),
    };

    this.orderService.createOrder(orderData as any)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: () => {
          alert('Заказ успешно оформлен!');
          this.products.forEach(p => p.quantity = 0);
          this.filterProducts();
        },
        error: (err: any) => {
          alert('Ошибка при оформлении заказа.');
          console.error(err);
        }
      });
  }
}
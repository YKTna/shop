import { ChangeDetectorRef, Component } from '@angular/core';
import { finalize } from 'rxjs';
import { OrderService } from '../../services/order';
import { Product, ProductService } from '../../services/product';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(
    private productService: ProductService,
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
    this.filteredProducts = this.products.filter(p => p.isFavorite);
    this.cdr.detectChanges();
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
    this.loadProducts();
  }

}

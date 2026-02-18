import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../../header/header';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, Header],
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  // eslint-disable-next-line @angular-eslint/prefer-inject
constructor(private productService: ProductService, private cdr: ChangeDetectorRef) { }

ngOnInit(): void {
  this.productService.getProducts().subscribe(data => {
    this.products = data;
    this.cdr.detectChanges();
  });
}

  decrementQuantity(product: Product) {
    product.quantity = product.quantity - 1;
    this.productService.updateProduct(product).subscribe();
  }

  incrementQuantity(product: Product) {
    product.quantity = product.quantity + 1;
    this.productService.updateProduct(product).subscribe();
  }

  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite;
    this.productService.updateProduct(product).subscribe();
  }
}
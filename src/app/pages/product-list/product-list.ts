import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite;
    this.productService.updateProduct(product).subscribe();
  }
}
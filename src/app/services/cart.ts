import { Injectable } from '@angular/core';
import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];

  addToCart(product: Product) {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  clearCart() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }
}
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, Header, FormsModule],
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  products: Product[] = [];

  // Для модального окна
  showModal = false;
  editMode = false; // false — добавление, true — редактирование
  currentProduct: Product = this.createEmptyProduct();

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.cdr.detectChanges();
    });
  }

  createEmptyProduct(): Product {
    return {
      id: 0,
      quantity: 0,
      name: '',
      description: '',
      price: 0,
      isFavorite: false,
    };
  }

  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite;
    this.productService.updateProduct(product).subscribe();
  }

  deleteProduct(product: Product) {
    if (!confirm(`Удалить товар "${product.name}"?`)) return;
    this.productService.deleteProduct(product.id!).subscribe(() => {
      alert('Товар удалён');
      this.loadProducts();
    });
  }

  openAddModal() {
    this.editMode = false;
    this.currentProduct = this.createEmptyProduct();
    this.showModal = true;
  }

  openEditModal(product: Product) {
    this.editMode = true;
    this.currentProduct = { ...product }; // создаём копию, чтобы не менять до сохранения
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveProduct() {
    if (this.editMode) {
      this.productService.updateProduct(this.currentProduct).subscribe(() => {
        alert('Товар обновлён');
        this.loadProducts();
        this.closeModal();
      });
    } else {
      this.productService.addProduct(this.currentProduct as any).subscribe(() => {
        alert('Товар добавлен');
        this.loadProducts();
        this.closeModal();
      });
    }
  }
}
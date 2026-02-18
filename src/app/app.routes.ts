import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'cart', component: Cart },
  { path: '**', redirectTo: '' }
];
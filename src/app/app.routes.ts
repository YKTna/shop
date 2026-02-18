import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list';
import { Cart } from './pages/cart/cart';
import { Favorites } from './pages/favorites/favorites';
import { Orders } from './pages/orders/orders';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'cart', component: Cart },
  { path: 'favorites', component: Favorites },
  { path: 'orders', component: Orders },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' }
];
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

interface Order {
  items: Product[];
  totalPrice: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  createOrder(product: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, product);
  }
  
}

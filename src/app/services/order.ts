import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

export interface IOrder {
  id?: number;
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

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.apiUrl, order);
  }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }
}
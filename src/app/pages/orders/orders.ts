import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IOrder, OrderService } from '../../services/order';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss']
})
export class Orders implements OnInit {

  orders: IOrder[] = [];
  isLoading = false;
  error = '';

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.error = '';
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Ошибка загрузки заказов';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  deleteOrder(order: IOrder) {
    if (!confirm('Удалить этот заказ?')) return;

    this.orderService.deleteOrder(order.id as number).subscribe({
      next: () => {
        alert('Заказ удалён');
        this.loadOrders();
      },
      error: (err) => {
        alert('Ошибка при удалении заказа');
        console.error(err);
      }
    });
  }
}
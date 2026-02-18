import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  activeMenu: 'catalog' | 'admin' | 'cart' | 'favorites' | 'orders' = 'catalog';

  constructor(private router: Router) {
    this.setActiveMenuByUrl();
    router.events.subscribe(() => {
      this.setActiveMenuByUrl();
    });
  }

    goTo(menu: 'catalog' | 'admin' | 'cart' | 'favorites' | 'orders') {
    this.activeMenu = menu;
    this.router.navigate([menu]);
    }

  private setActiveMenuByUrl() {
    const url = this.router.url.split('/')[1];
    if (['catalog', 'cart', 'admin', 'favorites', 'orders'].includes(url)) {
      this.activeMenu = url as any;
    } else {
      this.activeMenu = 'catalog';
    }
  }

  selectMenu(menu: 'catalog' | 'admin' | 'cart' | 'favorites' | 'orders') {
    this.activeMenu = menu;
  }
}
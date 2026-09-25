import { Injectable } from '@angular/core';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() { }

  getCart(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product, quantity: number = 1) {
    const existing = this.cartItems.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.product.sellPrice * item.quantity), 0);
  }

  clearCart() {
    this.cartItems = [];
  }
}

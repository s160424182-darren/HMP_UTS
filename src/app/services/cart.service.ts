import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() { }

  getCart() {
    return this.cartItems;
  }

  addToCart(product: any, quantity: number = 1) {
    let found = false;
    for (let i in this.cartItems) {
      if (this.cartItems[i].product.id === product.id) {
        this.cartItems[i].quantity += quantity;
        found = true;
      }
    }
    
    if (!found) {
      this.cartItems.push({ product: product, quantity: quantity });
    }
  }

  getTotal(): number {
    let total = 0;
    for (let i in this.cartItems) {
      total += (this.cartItems[i].product.sellPrice * this.cartItems[i].quantity);
    }
    return total;
  }

  removeItem(index: number) {
    let newArray = [];
    for (let i = 0; i < this.cartItems.length; i++) {
      if (i !== index) {
        newArray.push(this.cartItems[i]);
      }
    }
    this.cartItems = newArray;
  }

  clearCart() {
    this.cartItems = [];
  }
}

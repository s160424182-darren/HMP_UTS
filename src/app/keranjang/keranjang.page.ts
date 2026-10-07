import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { TransactionService } from '../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {
  isAlertOpen = false;
  alertMessage = '';

  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  get cartItems(): any[] {
    return this.cartService.getCart();
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  checkout() {
    if (this.cartItems.length > 0) {
      let canCheckout = true;
      for (let i in this.cartItems) {
        if (this.cartItems[i].product.stock < this.cartItems[i].quantity) {
          canCheckout = false;
        }
      }

      if (canCheckout === false) {
        this.alertMessage = 'Stok tidak mencukupi';
        this.isAlertOpen = true;
      } else {
        for (let i in this.cartItems) {
          this.cartItems[i].product.stock -= this.cartItems[i].quantity;
        }

        this.transactionService.addTransaction(this.cartItems, this.total);
        this.cartService.clearCart();
        
        this.alertMessage = 'Transaksi Berhasil';
        this.isAlertOpen = true;
        
      }
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
    if(isOpen === false && this.alertMessage === 'Transaksi Berhasil'){
      this.router.navigate(['/transaksi']);
    }
  }
}

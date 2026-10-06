import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { TransactionService } from '../services/transaction.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {
  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
    private productService: ProductService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  async checkout() {
    if (this.cartItems.length > 0) {
      // Check stock
      let canCheckout = true;
      for (const item of this.cartItems) {
        if (item.product.stock < item.quantity) {
          canCheckout = false;
          break;
        }
      }

      if (!canCheckout) {
        const toast = await this.toastController.create({
          message: 'Stok tidak mencukupi',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        return;
      }

      // Reduce stock
      this.cartItems.forEach(item => {
        item.product.stock -= item.quantity;
      });
      this.productService.saveProducts();

      this.transactionService.addTransaction(this.cartItems, this.total);
      this.cartService.clearCart();
      
      const toast = await this.toastController.create({
        message: 'Transaksi Berhasil',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      
      this.router.navigate(['/transaksi']);
    }
  }
}

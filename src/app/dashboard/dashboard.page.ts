import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { TransactionService } from '../services/transaction.service';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  totalProducts: number = 0;
  totalTransactionsToday: number = 0;
  bestSellerName: string = 'Belum ada data';

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService,
     private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.loadData();
  }

    ionViewWillEnter() {
    this.loadData();
  }
  ionViewDidEnter() {
    this.animateCards();
  }

  animateCards() {
    const cards = document.querySelectorAll('ion-card');
    if (cards.length === 0) return;

    const animation = this.animationCtrl
      .create()
      .addElement(Array.from(cards))
      .duration(500)
      .iterations(1)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0)');

    animation.play();
  }

  loadData() {
    this.totalProducts = this.productService.getProducts().length;

    const today = new Date();
    let countToday = 0;
    let transactions = this.transactionService.getTransactions();
    
    for (let i = 0; i < transactions.length; i++) {
      let tx = transactions[i];
      if (tx.date.getDate() === today.getDate() && 
          tx.date.getMonth() === today.getMonth() && 
          tx.date.getFullYear() === today.getFullYear()) {
        countToday++;
      }
    }
    this.totalTransactionsToday = countToday;

    let maxQty = 0;
    let bestId = null;
    let productIds: string[] = [];
    let productQtys: number[] = [];

    for (let i = 0; i < transactions.length; i++) {
      let tx = transactions[i];
      for (let j = 0; j < tx.items.length; j++) {
        let item = tx.items[j];
        
        let foundIndex = -1;
        for (let k = 0; k < productIds.length; k++) {
          if (productIds[k] === item.product.id) {
            foundIndex = k;
          }
        }

        if (foundIndex > -1) {
          productQtys[foundIndex] += item.quantity;
        } else {
          productIds.push(item.product.id);
          productQtys.push(item.quantity);
        }
      }
    }

    for (let i = 0; i < productIds.length; i++) {
      if (productQtys[i] > maxQty) {
        maxQty = productQtys[i];
        bestId = productIds[i];
      }
    }

    if (bestId !== null) {
      const bestProduct = this.productService.getProductById(bestId);
      this.bestSellerName = bestProduct ? bestProduct.name : '-';
    } else {
      this.bestSellerName = 'Belum ada data';
    }
  }
}
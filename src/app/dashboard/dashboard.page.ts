import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
  }

  get totalProducts(): number {
    return this.productService.getProducts().length;
  }

  get totalTransactionsToday(): number {
    const today = new Date();
    return this.transactionService.getTransactions().filter(tx => 
      tx.date.getDate() === today.getDate() && 
      tx.date.getMonth() === today.getMonth() && 
      tx.date.getFullYear() === today.getFullYear()
    ).length;
  }

  get bestSellerName(): string {
    const productCount: { [key: string]: number } = {};
    this.transactionService.getTransactions().forEach(tx => {
      tx.items.forEach(item => {
        if (!productCount[item.product.id]) {
          productCount[item.product.id] = 0;
        }
        productCount[item.product.id] += item.quantity;
      });
    });

    let maxQty = 0;
    let bestId = null;
    for (const [id, qty] of Object.entries(productCount)) {
      if (qty > maxQty) {
        maxQty = qty;
        bestId = id;
      }
    }

    if (bestId) {
      const bestProduct = this.productService.getProductById(bestId);
      return bestProduct ? bestProduct.name : '-';
    }
    return 'Belum ada data';
  }
}

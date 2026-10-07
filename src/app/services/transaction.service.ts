import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: any[] = [];

  constructor() {}

  getTransactions() {
    return this.transactions;
  }

  addTransaction(items: any[], total: number) {
    let copiedItems = [];
    for (let i in items) {
      copiedItems.push({
        product: {
          id: items[i].product.id,
          name: items[i].product.name,
          stock: items[i].product.stock,
          buyPrice: items[i].product.buyPrice,
          sellPrice: items[i].product.sellPrice,
          category: items[i].product.category,
          image: items[i].product.image
        },
        quantity: items[i].quantity
      });
    }

    const newTransaction = {
      id: new Date().getTime().toString(),
      date: new Date(),
      items: copiedItems,
      total: total
    };
    
    this.transactions.push(newTransaction);
  }
}

import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';

export interface Transaction {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() {}

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  addTransaction(items: CartItem[], total: number) {
    const newTransaction: Transaction = {
      id: new Date().getTime().toString(),
      date: new Date(),
      items: items.map(item => ({ ...item })), // deep copy
      total: total
    };
    this.transactions = [newTransaction, ...this.transactions];
  }
}

import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction } from '../services/transaction.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit {
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

  get transactions(): Transaction[] {
    return this.transactionService.getTransactions();
  }
}

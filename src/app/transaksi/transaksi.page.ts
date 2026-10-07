import { Component, OnInit, DoCheck } from '@angular/core';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit, DoCheck {
  transactions: any[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.loadData();
  }

  loadData() {
    this.transactions = this.transactionService.getTransactions();
  }
}
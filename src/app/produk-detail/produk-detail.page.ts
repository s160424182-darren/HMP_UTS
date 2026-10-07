import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService } from '../services/product.service';

@Component({
  selector: 'app-produk-detail',
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.scss'],
  standalone: false,
})
export class ProdukDetailPage implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product = this.productService.getProductById(id);
    }
  }
  ionViewWillEnter() {
    this.loadData();
  }
  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.product = this.productService.getProductById(id);
    }
  }
   goToEdit() {
    this.router.navigate(['/produk-form', this.product.id]);
  }
}

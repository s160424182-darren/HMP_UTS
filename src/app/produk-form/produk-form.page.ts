import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-produk-form',
  templateUrl: './produk-form.page.html',
  styleUrls: ['./produk-form.page.scss'],
  standalone: false,
})
export class ProdukFormPage implements OnInit {
  
  new_name: string = '';
  new_category: string = '';
  new_stock: number = 0;
  new_buyPrice: number = 0;
  new_sellPrice: number = 0;
  new_image: string = '';

  errors: { [key: string]: string } = {};
  showAlert: boolean = false;
  alertMessage: string = '';
  alertButtons = ['OK'];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() { }

  validate(): boolean {
    this.errors = {};

    if (!this.new_name || this.new_name.trim() === '') {
      this.errors['name'] = 'Nama produk wajib diisi';
    }
    if (!this.new_category || this.new_category.trim() === '') {
      this.errors['category'] = 'Kategori wajib diisi';
    }
    if (this.new_stock === null || this.new_stock === undefined || this.new_stock < 0) {
      this.errors['stock'] = 'Stok tidak boleh negatif';
    }
    if (!this.new_buyPrice || this.new_buyPrice <= 0) {
      this.errors['buyPrice'] = 'Harga beli harus lebih dari 0';
    }
    if (!this.new_sellPrice || this.new_sellPrice <= 0) {
      this.errors['sellPrice'] = 'Harga jual harus lebih dari 0';
    }

    return Object.keys(this.errors).length === 0;
  }

  saveProduct() {
    if (!this.validate()) {
      return;
    }

    const newProduct = {
      id: new Date().getTime().toString(),
      name: this.new_name,
      category: this.new_category,
      stock: this.new_stock,
      buyPrice: this.new_buyPrice,
      sellPrice: this.new_sellPrice,
      image: this.new_image
    };

    this.productService.addProduct(newProduct);
    this.alertMessage = 'Produk berhasil ditambahkan';
    this.showAlert = true;
  }

  onAlertDismiss() {
    this.showAlert = false;
    this.router.navigate(['/tabs/produk']);
  }
}
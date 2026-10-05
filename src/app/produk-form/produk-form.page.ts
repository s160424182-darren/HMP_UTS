import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-produk-form',
  templateUrl: './produk-form.page.html',
  styleUrls: ['./produk-form.page.scss'],
  standalone: false,
})
export class ProdukFormPage implements OnInit {
  productForm!: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertButtons = ['OK'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      buyPrice: [0, [Validators.required, Validators.min(1)]],
      sellPrice: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required]
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      const newProduct = {
        id: new Date().getTime().toString(),
        ...this.productForm.value,
        image: ''
      };
      this.productService.addProduct(newProduct);

      this.alertMessage = 'Produk berhasil ditambahkan';
    }
  }
  onAlertDismiss() {
    this.showAlert = false;
    this.router.navigate(['/produk']);
  }

  get f() {
    return this.productForm.controls;
  }
}

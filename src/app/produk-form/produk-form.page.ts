import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-produk-form',
  templateUrl: './produk-form.page.html',
  styleUrls: ['./produk-form.page.scss'],
  standalone: false,
})
export class ProdukFormPage implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastController: ToastController
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

  async saveProduct() {
    if (this.productForm.valid) {
      const newProduct = {
        id: new Date().getTime().toString(),
        ...this.productForm.value,
        image: ''
      };
      this.productService.addProduct(newProduct);
      
      const toast = await this.toastController.create({
        message: 'Produk berhasil ditambahkan',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      
      this.router.navigate(['/produk']);
    }
  }

  get f() {
    return this.productForm.controls;
  }
}

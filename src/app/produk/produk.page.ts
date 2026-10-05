import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  get products(): Product[] {
    return this.productService.getProducts();
  }

  get filteredProducts() {
    if (!this.searchQuery) return this.products;
    return this.products.filter(p => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  trackById(index: number, product: Product) {
    return product.id;
  }

  async addToCart(product: Product, event: Event) {
    event.stopPropagation();
    if (product.stock > 0) {
      this.cartService.addToCart(product, 1);
      const toast = await this.toastController.create({
        message: `${product.name} ditambahkan ke keranjang`,
        duration: 2000,
        color: 'success'
      });
      toast.present();
    }
  }

  goToDetail(id: string) {
    this.router.navigate(['/produk-detail', id]);
  }

  goToAdd() {
    this.router.navigate(['/produk-form']);
  }
}

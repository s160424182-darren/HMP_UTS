import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  searchQuery: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  alertButtons = ['OK'];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
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

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    if (product.stock > 0) {
      this.cartService.addToCart(product, 1);
      this.alertMessage = `${product.name} ditambahkan ke keranjang`;
      this.showAlert = true;
    }
  }

  goToDetail(id: string) {
    this.router.navigate(['/produk-detail', id]);
  }

  goToAdd() {
    this.router.navigate(['/produk-form']);
  }
}

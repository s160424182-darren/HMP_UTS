import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  searchQuery: string = '';
  isAlertOpen = false;
  alertMessage = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewDidEnter() {
    this.animateCards();
  }

  animateCards() {
    const cards = document.querySelectorAll('ion-card');
    if (cards.length === 0) return;

    const animation = this.animationCtrl
      .create()
      .addElement(Array.from(cards))
      .duration(500)
      .iterations(1)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0)');

    animation.play();
  }

  localProducts: any[] = [];
  
  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.localProducts = this.productService.getProducts();
  }

  get filteredProducts() {
    if (this.searchQuery === '') {
      return this.localProducts;
    }
    let result = [];
    for (let i = 0; i < this.localProducts.length; i++) {
      let p = this.localProducts[i];
      if (p.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1) {
        result.push(p);
      }
    }
    return result;
  }

  trackById(index: number, product: any) {
    return product.id;
  }

  addToCart(product: any, event: Event) {
    event.stopPropagation();
    if (product.stock > 0) {
      this.cartService.addToCart(product, 1);

      this.alertMessage = product.name + ' ditambahkan ke keranjang';
      this.isAlertOpen = true;
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  goToDetail(id: string) {
    this.router.navigate(['/produk-detail', id]);
  }

  goToCart() {
    this.router.navigate(['/keranjang']);
  }

  goToAdd() {
    this.router.navigate(['/produk-form']);
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result: any[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk: any[] = [];
      for (let j = i; j < i + chunkSize && j < arr.length; j++) {
        chunk.push(arr[j]);
      }
      result.push(chunk);
    }
    return result;
  }

  get chunkedProducts(): any[][] {
    return this.chunkArray(this.filteredProducts, 2);
  }
}

import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  stock: number;
  buyPrice: number;
  sellPrice: number;
  category: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: '1', name: 'Sabun Mandi Lifebuoy', stock: 50, buyPrice: 2500, sellPrice: 3500, category: 'Mandi', image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
    { id: '2', name: 'Shampo Clear', stock: 30, buyPrice: 15000, sellPrice: 18000, category: 'Mandi', image: '' }, // empty image for testing property binding
    { id: '3', name: 'Indomie Goreng', stock: 100, buyPrice: 2500, sellPrice: 3000, category: 'Makanan', image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
    { id: '4', name: 'Beras Rojolele 5kg', stock: 20, buyPrice: 60000, sellPrice: 65000, category: 'Bahan Pokok', image: '' },
    { id: '5', name: 'Minyak Goreng Bimoli 2L', stock: 15, buyPrice: 35000, sellPrice: 38000, category: 'Bahan Pokok', image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
    { id: '6', name: 'Gula Pasir 1kg', stock: 40, buyPrice: 13000, sellPrice: 15000, category: 'Bahan Pokok', image: '' },
    { id: '7', name: 'Teh Celup Sariwangi', stock: 0, buyPrice: 5000, sellPrice: 6500, category: 'Minuman', image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
    { id: '8', name: 'Kopi Kapal Api', stock: 60, buyPrice: 10000, sellPrice: 12000, category: 'Minuman', image: '' },
    { id: '9', name: 'Sikat Gigi Pepsodent', stock: 25, buyPrice: 4000, sellPrice: 5000, category: 'Mandi', image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
    { id: '10', name: 'Pasta Gigi Pepsodent', stock: 35, buyPrice: 8000, sellPrice: 10000, category: 'Mandi', image: '' }
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  saveProducts() {
    // Left empty since we rely purely on memory arrays now
  }
}

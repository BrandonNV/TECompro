import { Component, OnInit } from '@angular/core';
import {Product} from '../products/product';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-listaproductos',
  templateUrl: './listaproductos.component.html',
  styleUrls: ['../style.css']
})
export class ListaproductosComponent implements OnInit {
  products: Product[];
  id: number;
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.id = 12;
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
  add(name: string, description: string, category: string, price: number): void {
    this.id = this.id + 1;
    name = name.trim();
    category = category.trim();
    description = description.trim();

    if (!name) { return; }
    this.productService.addProduct({ name, description , category , price } as Product)
      .subscribe(product => {
        this.products.push(product);
      });
  }

  delete(product: Product): void {
    console.log(product.name);
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteProduct(product).subscribe();
  }


}

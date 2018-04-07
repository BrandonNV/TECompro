import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import {UserBuyer} from '../user-buyer/UserBuyer';
import {UserBuyersService} from '../user-buyer.service';

@Component({
  selector: 'app-listaclientes',
  templateUrl: './listaclientes.component.html',
  styleUrls: ['../style.css']
})
export class ListaclientesComponent implements OnInit {
  UserBuyer: UserBuyer[];
  id: number;
  constructor(private userBuyerService: UserBuyersService) { }

  ngOnInit() {
    this.id = 12;
    this.getProducts();
  }

  getProducts(): void {
    this.userBuyerService.getUserBuyers()
      .subscribe(userbuyer => this.UserBuyer = userbuyer);
  }
  add(name: string, description: string, category: string, price: number): void {
    this.id = this.id + 1;
    name = name.trim();
    category = category.trim();
    description = description.trim();

    if (!name) { return; }
    this.userBuyerService.addUserBuyer({ name} as UserBuyer)
      .subscribe(userbuyer => {
        this.UserBuyer.push(userbuyer);
      });
  }

  delete(userbuyer: UserBuyer): void {
    console.log(userbuyer.name);
    this.UserBuyer = this.UserBuyer.filter(h => h !== userbuyer);
    this.userBuyerService.deleteUserBuyer(userbuyer).subscribe();
  }
}

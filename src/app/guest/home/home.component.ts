import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";
import {faBook} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../services/authentication.service";
import {ProductService} from "../../services/product.service";
import {PurchaseService} from "../../services/purchase.service";
import {Purchase} from "../../models/purchase.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: Array<Product> = [];
  faBook = faBook;
  errorMessage: string = "";
  infoMessage: string = "";

  constructor(private authenticationService: AuthenticationService,
              private productService: ProductService,
              private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data;
    })
  }

  purchase(item: Product) {
    if (!this.authenticationService.currentUserValue?.id) {
      this.errorMessage = 'You should log in to buy a Product';
      return;
    }

    const purchase = new Purchase(this.authenticationService.currentUserValue.id, item.id, item.price);

    this.purchaseService.savePurchase(purchase).subscribe(data => {
      this.infoMessage = 'Mission is completed';
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    });
  }

}

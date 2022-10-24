import {Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {Product} from "../../models/product.model";
import {ProductComponent} from "../product/product.component";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  productList: Array<Product> = [];
 selectedProduct: Product = new Product();
  errorMessage: string = "";

  @ViewChild(ProductComponent) child: ProductComponent | undefined;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data;
    });
  }

  createProductRequest() {
    this.selectedProduct = new Product();
    this.child?.showProductModal();
  }

  editProductRequest(item: Product) {
    this.selectedProduct = Object.assign({}, item);
    this.child?.showProductModal();
  }

  saveProductWatcher(product: Product) {
    let itemIndex = this.productList.findIndex(item => item.id === product.id);
    if (itemIndex !== -1) {
      this.productList[itemIndex] = product;
    } else {
      this.productList.push(product);
    }
  }

  deleteProduct(item: Product, ind: number) {
    this.productService.deleteProduct(item).subscribe(data => {
      this.productList.splice(ind, 1);
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

}

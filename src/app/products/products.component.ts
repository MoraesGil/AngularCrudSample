import { Component, OnInit } from '@angular/core';
import { Product } from './product'
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[]
  newProduct : Product  = {
    id: null,
    name:"",
    price: null
  }
  selectedProduct: {}

  onSelectProduct(product) {
    this.selectedProduct = Object.assign({}, product)
  }

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.cleanProduct()
    this.getProducts()
  }
  cleanProduct():void{
    this.selectedProduct =  Object.assign({}, this.newProduct)
  }

  delete(productId:number):void{
    console.log(`id:${productId}`)
    this.productService.deleteProduct(productId)
    .subscribe(()=> {
      this.products = this.products.filter( product => product.id !== productId)
      console.log(`Product ${productId} deleted`)
      this.cleanProduct()
    })
  }

  save(product):void{
    if (product.id != null) {
      this.productService.updateProduct(product)
      .subscribe(()=> {

        var foundIndex = this.products.findIndex(x => x.id == product.id);
        this.products[foundIndex] = product;

        console.log('Product updated')
      })
    }else
    {
      //simple id auto-increment wihtout check database
      var maxid = 0
      this.products.map(function(obj){
        if (obj.id > maxid) maxid = obj.id
      });
      product.id = maxid+1
      console.log(product)
      this.productService.addProduct(product)
      .subscribe(()=> {
        this.products.push(product)
        console.log('Product created')
      })
    }
    this.cleanProduct() 
  }
  getProducts():void{
    const products = this.productService.getProducts()
    .subscribe(products => this.products = products)
  }
}

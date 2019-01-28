import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './products/product';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators'

const httpOption = {
  headers: new HttpHeaders({'Content-type':'application/json'})
}

@Injectable()
export class ProductService {
  private productsUrl = 'api/products';

  private handleError<T> (operation = 'operation', result?: T){
    return (error:any):Observable<T> => {
      console.error(error,`Operation: ${operation}`);

      return of (result as T);
    }
  }

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(products => console.log('Feteched Products')),
      catchError(this.handleError('getProducts',[]))
    );
  }

  deleteProduct (productId:number):Observable<any>{
    return this.http.delete(`${this.productsUrl}/${productId}`, httpOption).pipe(
      tap(_=>console.log(`deleted product of id ${productId}`)),
      catchError(this.handleError('addProduct',[]))
    )
  }

  addProduct(product: Product):Observable<any>{
    return this.http.post(this.productsUrl, product, httpOption).pipe(
      tap(_=>console.log(`created product of id ${product.id}`)),
      catchError(this.handleError('addProduct',[]))
    )
  }

  updateProduct(product: Product):Observable<any>{
    return this.http.put(this.productsUrl, product, httpOption).pipe(
      tap(_=>console.log(`Updated product of id ${product.id}`)),
      catchError(this.handleError('updateProduct',[]))
    )
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb(){
    const products = [
      {
        id:1,
        name:"iphone x",
        price:900
      },
      {
        id:2,
        name:"ipad",
        price:500
      },
      {
        id:3,
        name:"ipod",
        price:300
      }
    ]

    return { products }
  }
  constructor() { }
}

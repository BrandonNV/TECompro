import { Injectable } from '@angular/core';
import { Product } from './products/product';
import { PRODUCTS } from '../assets/products-storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import {catchError, tap} from 'rxjs/operators';
import {map} from 'rxjs/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable()
export class ProductsService {
  private productsURL = 'api/products';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getProducts(): Observable<Product[]> {
    this.messageService.add('ProductService: fetched Products');
    return of(PRODUCTS);
  }


  getProduct(id: number): Observable<Product> {
    const url = `${this.productsURL}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched Product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty Product array.
      return of([]);
    }
    return this.http.get<Product[]>(`api/Productes/?name=${term}`).pipe(
      tap(_ => this.log(`found Productes matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProductes', []))
    );
  }


  addProduct (product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsURL, product, httpOptions).pipe(
      tap((product: Product) => this.log(`added Product w/ id=${product.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  deleteProduct (product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsURL}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  /** PUT: update the Product on the server */
  updateProduct (product: Product): Observable<any> {
    return this.http.put(this.productsURL, product, httpOptions).pipe(
      tap(_ => this.log(`updated Product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }
}


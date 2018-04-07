import { Injectable } from '@angular/core';
import { Order } from './order';
import { ORDERS } from '../assets/order-storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable()
export class OrderService {
  private ordersURL = 'api/os';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getorders(): Observable<Order[]> {
    this.messageService.add('orderService: fetched orders');
    return of(ORDERS);
  }


  getorder(id: number): Observable<Order> {
    const url = `${this.ordersURL}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => this.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getorder id=${id}`))
    );
  }

  searchorders(term: string): Observable<Order[]> {
    if (!term.trim()) {
      // if not search term, return empty order array.
      return of([]);
    }
    return this.http.get<Order[]>(`api/orderes/?name=${term}`).pipe(
      tap(_ => this.log(`found orderes matching "${term}"`)),
      catchError(this.handleError<Order[]>('searchorderes', []))
    );
  }


  addorder (order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersURL, order, httpOptions).pipe(
      tap((order: Order) => this.log(`added order w/ id=${order.id}`)),
      catchError(this.handleError<Order>('addorder'))
    );
  }

  deleteorder (order: Order | number): Observable<Order> {
    const id = typeof order === 'number' ? order : order.id;
    const url = `${this.ordersURL}/${id}`;

    return this.http.delete<Order>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted order id=${id}`)),
      catchError(this.handleError<Order>('deleteorder'))
    );
  }

  updateorder (order: Order): Observable<any> {
    return this.http.put(this.ordersURL, order, httpOptions).pipe(
      tap(_ => this.log(`updated order id=${order.id}`)),
      catchError(this.handleError<any>('updateorder'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('orderService: ' + message);
  }
}

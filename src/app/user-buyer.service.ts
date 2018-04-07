import { Injectable } from '@angular/core';
import { UserBuyer } from './user-buyer/UserBuyer';
import { USERSBUYER } from '../assets/user-buyer-storage';
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
export class UserBuyersService {
  private UserBuyersURL = 'api/ubs';  // URL to web api

  constructor(

    private http: HttpClient,
    private messageService: MessageService) { }

  getUserBuyers(): Observable<UserBuyer[]> {
    this.messageService.add('UserBuyerService: fetched UserBuyers');
    return of(USERSBUYER);
  }


  getUserBuyer(id: number): Observable<UserBuyer> {
    const url = `${this.UserBuyersURL}/${id}`;
    return this.http.get<UserBuyer>(url).pipe(
      tap(_ => this.log(`fetched UserBuyer id=${id}`)),
      catchError(this.handleError<UserBuyer>(`getUserBuyer id=${id}`))
    );
  }

  searchUserBuyers(term: string): Observable<UserBuyer[]> {
    if (!term.trim()) {
      // if not search term, return empty UserBuyer array.
      return of([]);
    }
    return this.http.get<UserBuyer[]>(`api/UserBuyeres/?name=${term}`).pipe(
      tap(_ => this.log(`found UserBuyeres matching "${term}"`)),
      catchError(this.handleError<UserBuyer[]>('searchUserBuyeres', []))
    );
  }


  addUserBuyer (userbuyer: UserBuyer): Observable<UserBuyer> {
    return this.http.post<UserBuyer>(this.UserBuyersURL, userbuyer, httpOptions).pipe(
      tap((userbuyer: UserBuyer) => this.log(`added UserBuyer w/ id=${userbuyer.id}`)),
      catchError(this.handleError<UserBuyer>('addUserBuyer'))
    );
  }

  deleteUserBuyer (userBuyer: UserBuyer | number): Observable<UserBuyer> {
    const id = typeof userBuyer === 'number' ? userBuyer : userBuyer.id;
    const url = `${this.UserBuyersURL}/${id}`;

    return this.http.delete<UserBuyer>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted UserBuyer id=${id}`)),
      catchError(this.handleError<UserBuyer>('deleteUserBuyer'))
    );
  }

  /** PUT: update the UserBuyer on the server */
  updateUserBuyer (userbuyer: UserBuyer): Observable<any> {
    return this.http.put(this.UserBuyersURL, UserBuyer, httpOptions).pipe(
      tap(_ => this.log(`updated UserBuyer id=${userbuyer.id}`)),
      catchError(this.handleError<any>('updateUserBuyer'))
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

  /** Log a UserBuyerService message with the MessageService */
  private log(message: string) {
    this.messageService.add('UserBuyerService: ' + message);
  }
}


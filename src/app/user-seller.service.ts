import { Injectable } from '@angular/core';
import { UserSeller } from './user-seller/UserSeller';
import { USERSELLER } from '../assets/user-seller-storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable()
export class UserSellersService {
  private UserSellersURL = 'api/uss';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getUserSellers(): Observable<UserSeller[]> {
    this.messageService.add('UserSellerService: fetched UserSellers');
    return of(USERSELLER);
  }


  getUserSeller(id: number): Observable<UserSeller> {
    const url = `${this.UserSellersURL}/${id}`;
    return this.http.get<UserSeller>(url).pipe(
      tap(_ => this.log(`fetched UserSeller id=${id}`)),
      catchError(this.handleError<UserSeller>(`getUserSeller id=${id}`))
    );
  }

  searchUserSellers(term: string): Observable<UserSeller[]> {
    if (!term.trim()) {
      // if not search term, return empty UserSeller array.
      return of([]);
    }
    return this.http.get<UserSeller[]>(`api/UserSelleres/?name=${term}`).pipe(
      tap(_ => this.log(`found UserSelleres matching "${term}"`)),
      catchError(this.handleError<UserSeller[]>('searchUserSelleres', []))
    );
  }


  addUserSeller (userSeller: UserSeller): Observable<UserSeller> {
    return this.http.post<UserSeller>(this.UserSellersURL, userSeller, httpOptions).pipe(
      tap((userSeller: UserSeller) => this.log(`added UserSeller w/ id=${userSeller.id}`)),
      catchError(this.handleError<UserSeller>('addUserSeller'))
    );
  }

  deleteUserSeller (userSeller: UserSeller | number): Observable<UserSeller> {
    const id = typeof userSeller === 'number' ? userSeller : userSeller.id;
    const url = `${this.UserSellersURL}/${id}`;

    return this.http.delete<UserSeller>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted UserSeller id=${id}`)),
      catchError(this.handleError<UserSeller>('deleteUserSeller'))
    );
  }

  updateUserSeller (userSeller: UserSeller): Observable<any> {
    return this.http.put(this.UserSellersURL, userSeller, httpOptions).pipe(
      tap(_ => this.log(`updated UserSeller id=${userSeller.id}`)),
      catchError(this.handleError<any>('updateUserSeller'))
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
    this.messageService.add('UserSellerService: ' + message);
  }
}


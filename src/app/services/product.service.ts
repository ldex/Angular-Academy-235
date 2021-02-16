import { Injectable } from '@angular/core';
import { Product } from '../products/product.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, shareReplay, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;
  products$: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.initProducts();
  }

  initProducts() {
    this.products$ = this
                      .http
                      .get<Product[]>(this.baseUrl)
                      .pipe(
                        delay(1500),
                        tap(console.table),
                        shareReplay(),
                        catchError(err => {
                           console.error(err);
                           return throwError(err);
                        })
                      );
  }

}

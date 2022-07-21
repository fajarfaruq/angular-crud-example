import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CarBrand } from 'src/app/shared/models/car-brand';

@Injectable({
  providedIn: 'root',
})
export class CarBrandService {
  // Define API
  apiURL = 'http://127.0.0.1:8005/car-brand/';
  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Control-Allow-Origin': '*',
    }),
  };
  // HttpClient API get() method => Fetch employees list
  listAllCarBrand(): Observable<CarBrand> {
    return this.http
      .get<CarBrand>(this.apiURL + 'all')
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

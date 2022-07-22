import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
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
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Control-Allow-Origin': '*',
    }),
  };


  listAllCarBrand(): Observable<CarBrand> {
    return this.http
      .get<CarBrand>(this.apiURL + 'all')
      .pipe(retry(1), catchError(this.handleError));
  }

  getCarBrand(id: any): Observable<CarBrand> {
    return this.http
      .get<CarBrand>(this.apiURL + 'filter-by-id/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  createCarBrand(carBrand: any): Observable<CarBrand> {
    return this.http
      .post<CarBrand>(
        this.apiURL + 'create',
        JSON.stringify(carBrand),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateCarBrand(id: any, carBrand: any): Observable<CarBrand> {
    return this.http
      .put<CarBrand>(
        this.apiURL + 'update/' + id,
        JSON.stringify(carBrand),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteCarBrand(id: any) {
    return this.http
      .delete<CarBrand>(this.apiURL + id + '/delete', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadLogo(id: any,file: File) {
    let formData = new FormData();
    formData.append("file", file);

    const req = new HttpRequest(
      "PATCH",
      this.apiURL + "upload-logo/" + id ,
      formData,
      {
        reportProgress: true
      }
    );

    return this.http.request(req).pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      if(error.error){
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nDetail:${JSON.stringify(error.error)}`;
      }else{
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}}`;
      }
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

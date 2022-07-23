import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CarBrand } from 'src/app/shared/models/car-brand';
import { AppConfig } from 'src/app/configs/app-config';

@Injectable({
  providedIn: 'root',
})
export class CarBrandService {
  // Define API
  apiURL = '';
  
  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.apiURL = appConfig.apiBaseUrl + 'car-brand/';
  }
  
  // This is using for define httpoptions parameter
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Control-Allow-Origin': '*',
    }),
  };

  
  /**
   * Lists all car brand
   * @returns all car brand 
   */
  listAllCarBrand(): Observable<CarBrand> {
    return this.http
      .get<CarBrand>(this.apiURL + 'all')
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * Gets car brand
   * @param id 
   * @returns car brand 
   */
  getCarBrand(id: any): Observable<CarBrand> {
    return this.http
      .get<CarBrand>(this.apiURL + 'filter-by-id/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * Creates car brand
   * @param carBrand 
   * @returns car brand 
   */
  createCarBrand(carBrand: any): Observable<CarBrand> {
    return this.http
      .post<CarBrand>(
        this.apiURL + 'create',
        JSON.stringify(carBrand),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * Updates car brand
   * @param id 
   * @param carBrand 
   * @returns car brand 
   */
  updateCarBrand(id: any, carBrand: any): Observable<CarBrand> {
    return this.http
      .put<CarBrand>(
        this.apiURL + 'update/' + id,
        JSON.stringify(carBrand),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * Deletes car brand
   * @param id 
   * @returns  
   */
  deleteCarBrand(id: any) {
    return this.http
      .delete<CarBrand>(this.apiURL + id + '/delete', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * Uploads logo
   * @param id 
   * @param file 
   * @returns  
   */
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

  
  /**
   * Handles error
   * @param error 
   * @returns  
   */
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/configs/app-config';

@Injectable({
  providedIn: 'root'
})
export class JsonAppConfigService extends AppConfig {

  constructor(private http: HttpClient) {
    super();
  }

  // This function needs to return a promise
  load() {
    return this.http.get<AppConfig>('app.config.json')
      .toPromise()
      .then(data => {
        this.apiBaseUrl = data?.apiBaseUrl;
      })
      .catch(() => {
        console.error('Could not load configuration');
      });
  }
}

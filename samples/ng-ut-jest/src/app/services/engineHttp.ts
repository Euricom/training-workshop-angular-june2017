import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EngineHttp {
  constructor(private http: Http) {
  }
  getHorsePower() {
    return 150;
  }
  getName() {
    return 'Basic engine';
  }

  getModels() {
    return this.http.get('api/models')
      .map(res => res.json());
  }

}

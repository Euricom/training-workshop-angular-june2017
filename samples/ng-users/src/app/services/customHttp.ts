import {
  Http,
  RequestOptions,
  ConnectionBackend,
  RequestOptionsArgs,
  Request,
  Response
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventAggregator } from './eventAggregator';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/let';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/delay';

@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              private eventAggregator: EventAggregator) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log('request...');
    return super.request(url, options)
      .let(handleErrorAndRetry)
      .catch(error => {
        this.eventAggregator.publish('ERROR', error);
        return Observable.throw(error);
      });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log('get...');
    return super.get(url, options);
  }
}

function handleErrorAndRetry(obs) {
  return obs
    .timeout(2000)
    .retryWhen(errors => {
      return errors
        .scan((retryCount, err) => {
          if (!err.status && retryCount < 3) {
            return retryCount + 1;
          }
          throw err;
        }, 0)
        .delay(500);
    })
    .catch(castError);
}

function castError(error: Response | any): Observable<string> {
  if (error instanceof Response && error.status > 0) {
    const errMessage = 'Response Error: ' + error.statusText;
    return Observable.throw(errMessage);
  }
  if (error.name === 'TimeoutError') {
    return Observable.throw('Server is not responding');
  }
  return Observable.throw('No Internet');
}


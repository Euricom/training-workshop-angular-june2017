import { Injectable } from '@angular/core'

@Injectable()
export class Engine {
  getHorsePower() {
    return 150
  }
  getName() {
    return 'Basic engine'
  }
}

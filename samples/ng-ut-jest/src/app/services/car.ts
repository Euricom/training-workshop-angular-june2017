import { Injectable } from '@angular/core';
import { Engine } from './engine';

@Injectable()
export class Car {
  constructor(private engine: Engine) { }
  getName() {
    return `Car with ${this.engine.getName()}(${this.engine.getHorsePower()} HP)`;
  }
}

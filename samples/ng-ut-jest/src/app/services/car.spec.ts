import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { Engine } from './engine';
import { Car } from './car';

describe('Car', () => {
  let subject: Car;
  let engine: Engine;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Engine, Car]
    });
    jest.spyOn(Engine.prototype, 'getHorsePower').mockReturnValue(400);
    jest.spyOn(Engine.prototype, 'getName').mockReturnValue('V8 engine');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(inject([Car, Engine], (car: Car, _engine: Engine) => {
    subject = car;
    engine = _engine;
  }));

  it('should display name with engine', () => {
    expect(subject.getName()).toBe('Car with V8 engine(400 HP)');
    expect(engine.getHorsePower).toHaveBeenCalledTimes(1);
  });
});

describe('Car - Simplified', () => {
  let subject: Car;
  let engine: Engine;

  beforeEach(() => {
    engine = new Engine();
    subject = new Car(engine);

    jest.spyOn(Engine.prototype, 'getHorsePower').mockReturnValue(400);
    jest.spyOn(Engine.prototype, 'getName').mockReturnValue('V8 engine');
  });

  it('should display name with engine', () => {
    expect(subject.getName()).toBe('Car with V8 engine(400 HP)');
    expect(engine.getHorsePower).toHaveBeenCalledTimes(1);
  });
});


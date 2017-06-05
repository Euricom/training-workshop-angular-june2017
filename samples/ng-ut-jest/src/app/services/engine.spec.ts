import { Engine } from './engine';

describe('Engine', () => {

  it('should return it\'s horsepower', () => {
    const subject = new Engine();
    expect(subject.getHorsePower()).toBe(150);
  });

});

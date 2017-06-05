import { CapitalisePipe } from './capitalisePipe';

describe('Pipe: CapitalisePipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new CapitalisePipe();
  });

  it('should throw if not used with a string', () => {
    expect(pipe.transform('hello')).toEqual('HELLO');
    // must use arrow function for expect to capture exception
    expect(() => pipe.transform(undefined)).toThrow();
  });
});

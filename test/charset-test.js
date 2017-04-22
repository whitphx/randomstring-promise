import { expect } from 'chai';

import { getCharset } from '../src/charset';

describe('getCharset', () => {
  it('accepts `alphanumeric` option', () => {
    expect(getCharset('alphanumeric'))
      .to.equal('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  });

  it('accepts `numeric` option', () => {
    expect(getCharset('numeric'))
      .to.equal('0123456789');
  });

  it('accepts `alphabetic` option', () => {
    expect(getCharset('alphabetic'))
      .to.equal('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  });

  it('accepts `hex` option', () => {
    expect(getCharset('hex'))
      .to.equal('0123456789abcdef');
  });

  it('accepts customized charset', () => {
    expect(getCharset('loremipsum'))
      .to.equal('eilmoprsu');
  });
});

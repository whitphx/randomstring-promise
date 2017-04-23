import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;

import random from '../src/randomstring-promise';

describe('randomstringPromise', () => {
  it('provides Promise interface', (done) => {
    random()
    .then(res => {
      expect(res).to.be.a('string');
    })
    .catch(err => done.fail(err))
    .then(done);
  });

  it('generates string', () =>
    expect(random()).to.eventually.be.a('string')
  );

  it('accepts length paramter', () =>
    expect(random(16)).to.eventually.have.lengthOf(16)
  );

  it('accepts `numeric` as charset paremter', () =>
    expect(random(10000, 'numeric')).to.eventually.match(/^\d+$/)
  );

  it('accepts `alphabetic` as charset paremter', () =>
    expect(random(10000, 'alphabetic')).to.eventually.match(/^[a-zA-Z]+$/)
  );

  it('accepts `alphanumeric` as charset paremter', () =>
    expect(random(10000, 'alphanumeric')).to.eventually.match(/^\w+$/)
  );

  it('accepts `hex` as charset paremter', () =>
    expect(random(10000, 'hex')).to.eventually.match(/^[0-9abcdef]+$/)
  );

  it('accepts customized charset paremter', () =>
    expect(random(10000, 'loremipsum')).to.eventually.match(/^[loremipsum]+$/)
  );

  it('generates unique strings', () => {
    const num = 1000;
    const promises = Array(num);
    for (let i = 0; i < num; ++i) { promises[i] = random(); }

    return Promise.all(promises)
    .then(strings => {
      const results = {};
      strings.forEach(s => {
        expect(results[s]).not.to.be.true;
        results[s] = true;
      });
    });
  });

  it('generates unbiased strings', () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const slen = 1000000;
    const avg = slen / chars.length;

    return random(slen, chars)
    .then(s => {
      const counts = {};
      for (let i = 0; i < s.length; ++i) {
        const c = s.charAt(i);
        counts[c] = (counts[c] || 0) + 1;
      }

      Object.keys(counts).sort().forEach(key => {
        const diff = counts[key] / avg;
        expect(diff).to.closeTo(1, 0.05, `Bias on ${key}: expected average is ${avg}, got ${counts[key]}`);
      });
    });
  });
});

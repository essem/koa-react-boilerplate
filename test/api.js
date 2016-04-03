import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'isomorphic-fetch';
import createServer from '../server/server';

chai.should();
chai.use(chaiAsPromised);

describe('Api', function () {
  const API_HOST = 'http://localhost:6000';
  let server;

  before(() => {
    server = createServer(6000);
  });

  after(() => {
    server.close();
  });

  it('/api/todos', function () {
    return fetch(`${API_HOST}/api/todos`)
      .then(res => res.json())
      .should.eventually.deep.equal([
        { id: 0, text: 'hello', completed: true },
        { id: 1, text: 'world', completed: false },
      ]);
  });
});

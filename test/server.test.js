const chai = require('chai');
const chaiHttp = require('chai-http');
const { setupServer } = require('../src/server');
const app = setupServer();
const expect = chai.expect;
chai.use(chaiHttp);

describe('test', () => {
  let request;

  before(() => {
    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  it('get information about seat availability', async () => {
    const res = await request.get('/seats/');
    expect(res.body).to.have.lengthOf(16);
  });
});

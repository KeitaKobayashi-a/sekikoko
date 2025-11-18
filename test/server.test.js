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
    const res = await request.get('/seats');
    expect(res.body).to.have.lengthOf(4);
  });

  it('save a seat', async () => {
    const res = await request.post('/seats');
    expect(res.body.data.data[3].is_seated).to.be.true;
  });

  it('leave a seat', async () => {
    const postRes = await request.post('/seats');
    const ticketNumber = postRes.body.data.data[3].ticket_number;

    const res = await request
      .delete('/seats')
      .set('Cookie', `ticketNumber=${ticketNumber}`);
    expect(res.body.data[3].is_seated).to.be.false;
  });

  it('on the waiting list', async () => {
    for (let i = 1; i <= 16; i++) {
      await request.post('/seats');
    }
    const res = await request.post('/seats');
    expect(res.body.ticketNumber).to.be.a('number');
  });
});

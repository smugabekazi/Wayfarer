import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
  expect
} = chai;


chai.use(chaiHttp);
let token = '';

describe('Bookings', () => {
  /* Get all bookings */
   describe('GET /api/v1/booking', () => {
    it('it should return all bookings', (done) => {
      chai.request(app).get('/api/v1/booking').end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    }); // end of test
  });

  /* Create a booking */
  describe('POST /api/v1/booking', () => {
    it('it should create a booking', (done) => {
      chai.request(app)
      .post('/api/v1/booking')
      .send({
          busLicenceNumber: 'RAE800V',
          tripDate: 'January 12, 2020',
          firstName: 'Boss',
          lastName: 'Boss',
          userEmail: 'boss@andela.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    }); // end of test
  });

});
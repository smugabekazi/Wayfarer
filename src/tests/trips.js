import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
  expect
} = chai;


chai.use(chaiHttp);
let token = '';

describe('trips', () => {
  /* Get all trips */
   describe('GET /api/v1/trip', () => {
    it('it should return all trips', (done) => {
      chai.request(app).get('/api/v1/trip').end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    }); // end of test
  });

  /* Get a specific trip */
  describe('GET /api/v1/trips/:tripId', () => {
    it('it should get a specific trip', (done) => {
      chai.request(app).get('/api/v1/trip/2').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(Object.keys(res.body.data).length).to.be.above(0);
        done();
      }); // end of test
    });
  });

  /* Create a trip */
  describe('POST /api/v1/trip', () => {
    it('it should not allow a user without a token to create a trip', (done) => {
      chai.request(app)
      .post('/api/v1/trip')
      .send({
            seatingCapacity: 34,
            busLicenseNumber: 'RAD208V',
            origin: 'Nyabugogo',
            destination: 'Huye',
            tripDate: 'July 20,2019',
            fare: 3000,
            status: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    }); // end of test
  });

  /* Shouldn't delete a specific trip without a token */
  describe('DELETE /api/v1/trip/:tripId', () => {
    it('it should delete an existing trip', (done) => {
      chai.request(app)
      .delete('/api/v1/trip/2')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
  }); //end of test

});
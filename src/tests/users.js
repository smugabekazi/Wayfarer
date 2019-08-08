import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
  expect,
} = chai;

chai.use(chaiHttp);
/* Sign-up */
describe('Sign-up', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should return the information of the created user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'mugabekazi2@mail.com',
          firstName: 'Mugabekazi',
          lastName: 'Schella',
          password: 'Pass@2010',
          isAdmin: true,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          // expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    });
  });
});
/* Sign-in */
describe('Sign-in', () => {
  describe('POST /api/v1/auth/login', () => {
    it('should return the user information if the account exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'mugabekazi2@mail.com',
          password: 'Pass@2010',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});

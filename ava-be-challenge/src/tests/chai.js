import chai from 'chai';
import chaiHttp from 'chai-http';

const initializeChai = () => {
  chai.should();
  chai.use(chaiHttp);
};

export default initializeChai;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


describe('Review', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Review.remove({}, (err) => {
    //         done();
    //     });
    // });


    describe('/GET All Review', () => {
        it('it should GET all reviews if no filters are applied.', (done) => {
            let filter = {}
            chai.request(server)
                .post('/api/getData')
                .send(filter)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET Review By Date', () => {
        it('it should GET all reviews when date filters has applied.', (done) => {
            let filter = {
                "reviewed_date": "2018-01-12"
            }
            chai.request(server)
                .post('/api/getData')
                .send(filter)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.should.have.property('errors');
                    // res.body.errors.should.have.property('pages');
                    // res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });
    });

    describe('/GET All Review based on Store Type', () => {
        it('it should GET all reviews when Store Type filters has applied.', (done) => {
            let filter = {
                "review_source": "iTunes"
            }
            chai.request(server)
                .post('/api/getData')
                .send(filter)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET All Review based on Ratings', () => {
        it('it should GET all reviews when Ratings filters has applied.', (done) => {
            let filter = {
                "rating": 5
            }
            chai.request(server)
                .post('/api/getData')
                .send(filter)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET Average Review Data', () => {
        it('it should average monthly ratings per store.', (done) => {
            chai.request(server)
                .get('/api/getAverage')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET Count based on Review', () => {
        it('it should GET Allows to get total ratings for each category.', (done) => {
            chai.request(server)
                .get('/api/getCount')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});
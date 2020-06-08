// seed data
let starters = [
    {
        title: 'Test title 1',
        brand: 'Test brand 1',
        price: '100',
        age: 33,
        services: {testKey: 'testValue 1'}
    },
    {
        title: 'Test title 2',
        brand: 'Test brand 2',
        price: '200',
        age: 66,
        services: {testKey: 'testValue 2'}
    }
];

// local variables
let promiseSeedArray = [];
let starterId = null;
let badId = null;

// create array of Promises to insert data in database
function createSeedPromises() {
    promiseSeedArray = starters.map(el => {
        return new Cypress.Promise((resolve, reject) => {
            cy.request({url: 'api/starter', body: el, method: 'POST'}).then((response) => {
                expect(response).to.have.property('headers');
                expect(response.status).to.eq(200);
                // !expect(response.body.content.length).to.not.equal(0);
                resolve(response.body);
            });
        });
    });
}

describe('TEST /api/starter endpoints with auth user', function () {
    // drop database after tests
    after(function () {
        cy.dropDB();
    });

    // login as a admin user
    before(function () {
        cy.login();
    });

    // set cookie headers fot auth
    beforeEach(function () {
        Cypress.Cookies.defaults({
            whitelist: ['payload', 'signature']
        });
    });

    it('should Insert new starters - [POST /api/starter]', function () {
        // create array with Promises (seed two records in database)
        createSeedPromises();

        // execute Promises
        Cypress.Promise.all(promiseSeedArray).spread((s1, s2) => {
            // simple check (should be extend)
            expect(s1.price).to.equal('100');
            expect(s2.age).to.equal(66);

            // set record id to update
            starterId = s1._id;
        });
    });

    // Get records from seeded database
    it('should Read starters - [GET /api/starter] - (status, header, array of objects)', function () {
        cy.request('api/starter').then((response) => {
            expect(response).to.have.property('headers');
            expect(response.status).to.eq(200);
            !expect(response.body.content.length).to.not.equal(0);
        });
    });

    it('should Read one starter - [GET /api/starter/:id] - (status, header, data object)', function () {
        cy.request({url: `api/starter/${starterId}`, method: 'GET'}).then((response) => {
            expect(response).to.have.property('headers');
            expect(response.status).to.eq(200);
            expect(response.body._id).to.be.equal(starterId);
        });
    });

    it('should Check for failure with bad id - [GET /api/starter/:id] - (Bad request)', function () {
        cy.request({url: `api/starter/${badId}`, method: 'GET', failOnStatusCode: false}).then((response) => {
            expect(response).to.have.property('headers');
            expect(response.body.name).to.equal('Bad request');
            expect(response.status).to.eq(400);
        });
    });

    it('should Update one record - [PUT /api/starter/:id] - (status, header, data object)', function () {
        // change first object (record) from seeded data
        let updatedRecord = Object.assign(starters[0]);
        updatedRecord.__v = 0; // version MUST be added explicitly
        updatedRecord.title = 'Updated record 1';
        updatedRecord.age = 99;
        updatedRecord.price = '300';
        updatedRecord.services = {testKey: 'testValue 2'};

        cy.request({url: `api/starter/${starterId}`, method: 'PUT', body: updatedRecord}).then((response) => {
            expect(response).to.have.property('headers');
            expect(response.status).to.eq(200);
            expect(response.body.title).to.eq('Updated record 1');
            expect(response.body.price).to.eq('300');
            expect(response.body.age).to.eq(99);
        });
    });

    it('should Delete one record - [DELETE /api/starter/:id]', function () {
        cy.request({url: `api/starter/${starterId}`, method: 'DELETE'}).then(response => {
            expect(response).to.have.property('headers');
            expect(response.status).to.eq(200);
            expect(response.body._id).to.be.equal(starterId);
            expect(response.body.title).to.eq('Updated record 1');
        });
    });

});

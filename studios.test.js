const mongoose = require('mongoose');
const chai = require('chai');
const assert = chai.assert;
const server =require('../server');
const request = chai.request(server);


describe('Studios API', () => {

    
    const studio = {
        name: 'Paramount Pictures',
        address: {
            city: 'Hollywood',
            state: 'California',
            country: 'USA'
        }
    };

    beforeEach(() => {
        
        mongoose.connection.dropDatabase();

    });

    
    it.only('saves a studio', () => {
        return request.post('/studios')
            .send(studio)
            .then(({ body }) => {
                assert.equal(body.name, studio.name);
            });
    });

    it('gets all studios by name', () => {
        
        const studio2 = {
            name: 'MGM',
            address: {
                city: 'Burbank',
                state: 'California',
                country: 'USA'
            }
        };

        const studioArray = [studio, studio2].map(studio => {
            return request.post('/studios')
                .send(studio)
                .then(res => res.body);
        });
        let saved = null;
        return Promise.all(studioArray)
            .then(_saved => {
                saved = _saved;
                return request.get('/studios');
            })
            .then(res => {
                assert.equal(res.body.name, saved.name);  
            });
    });


    it('removes by id', () => {
        let studio = null;
        return request.post('/studios')
            .send(studio)
            .then(res => {
                studio = res.body;
                return request.delete(`/studios/${studio._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
                return request.get(`/studio/${studio._id}`);
            })
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);
                });
    });

    it('updates studio with an id', () => {
        return request.post('/studios')
            .send(studio)
            .then(res => {
                let savedStudio = res.body;    
                savedStudio.name = 'Disney';
                return request.put(`/studios/${savedStudio._id}`)
                    .send(savedStudio);
            })
            .then(res => {
                assert.equal(res.body.name, 'Disney');
            });
    });
});

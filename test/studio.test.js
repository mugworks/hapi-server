'use strict';
const assert = require('chai').assert;
var Studio = require('../studio');

describe('Studio model', () => {
    it('check if studio model is good', () => {
        const studio = new Studio({
            name: 'Paramount Pictures',
            address: {
                city: 'Hollywood',
                state: 'California',
                country: 'USA'
            }
        });
        assert.equal(studio.validateSync(), undefined);
    });

    it('checks required fields', () => {
        const studio = new Studio({ });
        const { errors } = studio.validateSync();
        assert.equal(errors.name.kind, 'required');
    });
});
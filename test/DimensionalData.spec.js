import DimensionalData from '../src/models/DimensionalData'

describe('DimensionalData', function () {
    it('should be able to return its crossfilter instance', function () {
        let dim = new DimensionalData();
        expect(dim.getCrossfilter().add).not.toBeUndefined();
    });

    it('should return the sum value for a set of records', function () {
        const values = [
            {'name': 'manolo', val: 20},
            {'name': 'alberto', val: 12},
            {'name': 'jonas', val: 423},
            {'name': 'severo', val: 10},
            {'name': 'jose antonio', val: 1},
        ]
        let dim = new DimensionalData(values);
        expect(dim.getSumForColumn('val')).toEqual(466);
    });
})

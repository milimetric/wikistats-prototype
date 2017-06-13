import DimensionalData from '../src/models/DimensionalData'

const pageviews1 = [
    { date: '2017-01', agent: 'user', access: 'desktop', views: 10 },
    { date: '2017-02', agent: 'user', access: 'desktop', views: 20 },
    { date: '2017-03', agent: 'user', access: 'desktop', views: 30 },
    { date: '2017-04', agent: 'user', access: 'desktop', views: 40 },
]

const pageviews2 = [
    { date: '2017-01', agent: 'spider', access: 'desktop', views: 1 },
    { date: '2017-02', agent: 'spider', access: 'desktop', views: 2 },
    { date: '2017-03', agent: 'spider', access: 'desktop', views: 3 },
    { date: '2017-04', agent: 'spider', access: 'desktop', views: 4 },
]

const pageviews3 = [
    { date: '2017-01', agent: 'user', access: 'mobile', views: 15 },
    { date: '2017-02', agent: 'user', access: 'mobile', views: 25 },
    { date: '2017-03', agent: 'user', access: 'mobile', views: 35 },
    { date: '2017-04', agent: 'user', access: 'mobile', views: 45 },
]

const values = [
    { 'name': 'manolo', val: 20 },
    { 'name': 'alberto', val: 12 },
    { 'name': 'jonas', val: 423 },
    { 'name': 'severo', val: 10 },
    { 'name': 'jose antonio', val: 1 },
]

describe('DimensionalData', function () {
    it('should be able to return its crossfilter instance', function () {
        let dim = new DimensionalData();
        expect(dim.getCrossfilter().add).not.toBeUndefined();
    });

    it('should return the sum value for a set of records', function () {
        let dim = new DimensionalData(values);
        expect(dim.getSumForColumn('val')).toEqual(466);
    });

    it('should merge results', function () {
        let dim = new DimensionalData(pageviews1)
        let merged = dim.merge(pageviews2)

        // wanna use "total" as a verb instead of getSumForColumn?
        expect(merged.total('views')).toEqual(110)
    });
})

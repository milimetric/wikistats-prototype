import Crossfilter from 'crossfilter';

class DimensionalData {
    constructor(values) {
        this.crossfilter = values ? new Crossfilter(values) : new Crossfilter();
    }
    getCrossfilter () {
        return this.crossfilter;
    }
    getSumForColumn (column) {
        return this.crossfilter.groupAll().reduceSum((row) => {
            return row[column];
        }).value();
    }
}

export default DimensionalData

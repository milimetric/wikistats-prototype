import Crossfilter from 'crossfilter';

class DimensionalData {
    constructor(values) {
        this.crossfilter = values ? new Crossfilter(values) : new Crossfilter();
    }
    getCrossfilter () {
        return this.crossfilter;
    }
    total (column) {
        return this.crossfilter.groupAll().reduceSum((row) => {
            return row[column];
        }).value();
    }
    breakdown (column) {
        //todo
        let group = this.crossfilter.group((row) => {
            return row[column];
        });
    }
    merge (recordSet) {
        this.crossfilter.add(recordSet);
    }

}

export default DimensionalData

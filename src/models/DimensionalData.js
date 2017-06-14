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
    measure (column) {
        this.currentMeasure = column;
    }

    breakdown (column, secondColumn) {
        if (!secondColumn) {
            return this.crossfilter.dimension((row) => {
                return row[column];
            }).group().reduceSum((row) => {
                return row[this.currentMeasure];
            }).top(Infinity).reduce((p, c) => {
                p[c.key] = c.value;
                return p;
            }, {});
        } else {
            return this.crossfilter.dimension((row) => {
                return row[column];
            }).group().reduce(
                (p,c) => {
                    p[c[secondColumn]] = p[c[secondColumn]]?
                        p[c[secondColumn]] + c[this.currentMeasure]:
                        c[this.currentMeasure];
                    return p;
                },
                () => {},
                () => {
                    return {};
                }
            ).top(Infinity).reduce((p, c) => {
                p[c.key] = c.value;
                return p;
            }, {});
        }
    }
    unique (column) {
        return this.crossfilter.dimension((row) => {
            return row[column];
        }).group().top(Infinity).map((group) => {
            return group.key;
        }, {});
    }
    merge (recordSet) {
        this.crossfilter.add(recordSet);
    }
    filter (column, value) {
        this.crossfilter.dimension((row) => {
            return row[column];
        }).filter(value);
    }

}

export default DimensionalData

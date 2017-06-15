import Crossfilter from 'crossfilter';

class DimensionalData {
    constructor(values, measureColumn) {
        this.crossfilter = new Crossfilter(values || []);
        this.dimensionCache = {};

        if (measureColumn) {
            this.measure(measureColumn);
        }
    }

    getCrossfilter () {
        return this.crossfilter;
    }

    total (column) {
        let aggregate = column || this.currentMeasure;

        // TODO: is using this.dimension faster or better?
        return this.crossfilter.groupAll().reduceSum((row) => {
            return row[aggregate];
        }).value();
    }

    addDimension (column) {
        if (!(column in this.dimensionCache)) {
            this.dimensionCache[column] = this.crossfilter.dimension((r) => r[column]);
        }
    }

    measure (column) {
        this.addDimension(column);
        this.currentMeasure = column;
        this.dimension = this.dimensionCache[column];
    }

    unique (column) {
        this.addDimension(column);

        return this.dimensionCache[column].group().all().map((g) => g.key).sort();
    }

    merge (recordSet) {
        this.crossfilter.add(recordSet);
    }

    filter (column, value) {
        this.addDimension(column);

        return this.dimensionCache[column].filter(value);
    }

    clearFilters (column) {
        if (!(column in this.dimensionCache)) { return; }

        this.dimensionCache[column].filterAll();
    }

    breakdown (column, secondColumn) {
        this.addDimension(column);
        let m = this.currentMeasure;

        var ret = this.dimensionCache[column].group().reduce(
            (b, x) => {
                if (secondColumn) {
                    b[x[secondColumn]] = b[x[secondColumn]] ?
                        b[x[secondColumn]] + x[m] :
                        x[m];
                } else {
                    b += x[m];
                }
                return b;
            },
            (b, x) => {
                if (secondColumn) {
                    b[x[secondColumn]] = b[x[secondColumn]] - x[m];
                } else {
                    b -= x[m];
                }
                return b;
            },
            () => secondColumn ? {} : 0

        ).all().reduce((results, g) => {
            if (secondColumn) {
                return results.concat(Object.keys(g.value).map((k) => {
                    let r = {};
                    r[column] = g.key;
                    r[secondColumn] = k;
                    r[m] = g.value[k];
                    return r;
                }));
            } else {
                let exploded = {};
                exploded[column] = g.key;
                exploded[m] = g.value;
                results.push(exploded);
                return results;
            }
        }, []);
        return ret;
    }

}

export default DimensionalData

class GraphModel {
    constructor (metricData, dimensionalData) {
        this.metricData = metricData;
        this.dimensionalData = dimensionalData;
    }
    getGraphData () {
        const xAxisValue = 'timestamp';
        const yAxisValue = 'views';
        this.dimensionalData.measure('timestamp');
        const rawValues = this.dimensionalData.breakdown('views');
        return rawValues.map((row) => {
            var ts = row.timestamp.slice(1);
            const month = ts.slice(0,4) + '-'
                    + ts.slice(4,6) + '-'
                    + ts.slice(6,8)
            return {month: month, total: row.views}
        })
    }
    getBreakdowns () {
        return this.metricData.breakdowns;
    }
    getArea () {
        return this.metricData.area;
    }
    getDarkColor () {
        return this.metricData.darkColor;
    }
}

export default GraphModel;
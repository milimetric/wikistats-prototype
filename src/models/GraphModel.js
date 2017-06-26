class GraphModel {
    constructor (metricData, dimensionalData) {
        this.metricData = metricData;
        this.dimensionalData = dimensionalData;
    }
    getGraphData () {
        const xAxisValue = 'timestamp';
        const yAxisValue = 'views';
        this.dimensionalData.measure('timestamp');
        const activeBreakdown = this.metricData.breakdowns.filter((breakdown) => {
            return breakdown.values.some((v) => {
                return v.on
            });
        })[0];
        if (activeBreakdown) {
            let brokenDownValues = [];
            const rawValues = this.dimensionalData.breakdown(yAxisValue, activeBreakdown.breakdownName);
            return rawValues.map((row) => {
                var ts = row.timestamp;
                const month = ts.slice(0,4) + '-'
                        + ts.slice(4,6) + '-'
                        + ts.slice(6,8)
                return {month: month, total: row.views}
            });
        } else {
            const rawValues = this.dimensionalData.breakdown(yAxisValue);
            return rawValues.map((row) => {
                var ts = row.timestamp;
                const month = ts.slice(0,4) + '-'
                        + ts.slice(4,6) + '-'
                        + ts.slice(6,8)
                return {month: month, total: row.views}
            });
        }
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
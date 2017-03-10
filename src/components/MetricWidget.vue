<template>
<div class="widget column">
    <metric-bar-widget
        v-if="metricData.type === 'bars'"
        :data="metricData">
    </metric-bar-widget>

    <metric-list-widget
        v-if="metricData.type === 'list'"
        :data="metricData">
    </metric-list-widget>
</div>
</template>

<script>
import MetricBarWidget from './MetricBarWidget'
import MetricListWidget from './MetricListWidget'
import _ from 'lodash'

export default {
    name: 'metric-widget',
    props: ['metric', 'area'],
    data () {
        return {
            loading: false,
            metricData: {},
        }
    },

    components: {
        MetricBarWidget,
        MetricListWidget,
    },

    watch: {
        '$route.params': 'load',
    },

    created () {
        this.load()
    },

    //afterUpdate () {
        //this.drawChart()
    //},

    methods: {
        load () {
            const self = this
            self.loading = true
            const fakeSeries = [
                { month: 'December', metric: 80000 },
                { month: 'January', metric: 90000 },
                { month: 'February', metric: 100000 },
                { month: 'March', metric: 120340 },
                { month: 'April', metric: 100000 },
                { month: 'May', metric: 120340 },
                { month: 'June', metric: 100000 },
                { month: 'July', metric: 120340 },
                { month: 'August', metric: 100000 },
                { month: 'September', metric: 120340 },
                { month: 'October', metric: 100000 },
                { month: 'November', metric: 120340 },
            ]

            setTimeout(() => {
                self.loading = false

                self.metricData = _.assign({
                    'total-edits': {
                        fullName: 'Total Edits',
                        type: 'bars',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: 0.5,
                        lastMonth: 'November',
                        lastMonthValue: 120340,
                        lastYear: 2016,
                        lastYearValue: 1210000,
                    },
                    'active-editors': {
                        fullName: 'Active Editors',
                        type: 'bars',
                        series: fakeSeries,
                        changeMoM: 1,
                        changeYoY: -0.5,
                        lastMonth: 'November',
                        lastMonthValue: 43203,
                        lastYear: 2016,
                        lastYearValue: 60102,
                    },
                    'top-contributors': {
                        fullName: 'Top Contributors',
                        type: 'list',
                        valueName: 'Total Edits for November', // make month dynamic?
                        showNumbers: true,
                        sortedList: [
                            { name: 'Username 1', value: 124503 },
                            { name: 'Username 2', value: 123954 },
                            { name: 'Username 3', value: 122031 },
                            { name: 'Username 4', value: 110891 },
                        ],
                    },
                    'total-pageviews': {
                        fullName: 'Total Page Views',
                        type: 'bars',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: -0.5,
                        lastMonth: 'November',
                        lastMonthValue: 7741345234,
                        lastYear: 2016,
                        lastYearValue: 25341345234,
                    },
                    'unique-devices': {
                        fullName: 'Unique Devices',
                        type: 'bars',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: -0.5,
                        lastMonth: 'November',
                        lastMonthValue: 4921109000,
                        lastYear: 2016,
                        lastYearValue: 20101345234,
                    },
                    'most-viewed-articles': {
                        fullName: 'Most Viewed Articles',
                        type: 'list',
                        valueName: 'Total Views November', // make month dynamic?
                        showNumbers: false,
                        sortedList: [
                            { name: 'Long article name here one', value: 2103000 },
                            { name: 'Long article name here two', value: 2000900 },
                            { name: 'Long article name here three', value: 1910000 },
                            { name: 'Long article name here four', value: 1800001 },
                        ],
                    },
                    'total-articles': {
                        fullName: 'Total Articles',
                        type: 'bars',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: -0.5,
                        lastMonth: 'November',
                        lastMonthValue: 10741345234,
                        lastYear: 2016,
                        lastYearValue: 25341345234,
                    },
                    'new-articles': {
                        fullName: 'New Articles',
                        type: 'bars',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: -0.5,
                        lastMonth: 'November',
                        lastMonthValue: 1435321,
                        lastYear: 2016,
                        lastYearValue: 12445234,
                    },
                    'media-uploads': {
                        fullName: 'Media Uploads',
                        type: 'bars',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: -0.5,
                        lastMonth: 'November',
                        lastMonthValue: 1940713,
                        lastYear: 2016,
                        lastYearValue: 2145234,
                    },

                }[self.metric.name], {
                    lightColor: {
                        contributing:   '#C4CDDF',
                        reading:        '#B8E9DE',
                        content:        '#FFF1C6',
                    }[self.area]
                }, {
                    darkColor: {
                        contributing:   '#2A4B8D',
                        reading:        '#00AF89',
                        content:        '#FFCC33',
                    }[self.area]
                })
                console.log(self.metricData)

            }, Math.random()*1000)
        },
    },
}
</script>

<style>
.widget.column {
    width: 32.6666666666%!important;
    margin-left: 0.3333333333%;
    margin-right: 0.3333333333%;
    background-color: #ffffff;
    border-radius: 0 0 8px 8px;
    border: 1px solid #E8E8E8;
    box-shadow: 1px 1px 2px 1px #ccc;
}
.widget.column:hover {
    box-shadow: 1px 1px 4px 1px #898989;
    cursor: pointer;
}

.widget.column:first-child { margin-left: 0.1%; margin-right: 0.5666666666%; }
.widget.column:last-child { margin-left: 0.4666666666%; margin-right: 0.2%; }

.ui.statistic > .label {
    text-transform: capitalize;
    text-align: left;
    font-size: 1.4em;
    margin-bottom: 4px;
}
.ui.statistic .value {
    font-style: bold;
}

.ui.horizontal.statistic {
    margin-bottom: 2px;
}
.subdued {
    color: #999;
}

.bar-chart {
    width: 100%;
    height: 50px;
}
</style>

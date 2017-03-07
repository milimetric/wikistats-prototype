<template>
<div class="widget column">
    <h4 class="ui header">{{metricData.fullName}}</h4>
    <h2 class="ui header">{{metricData.lastMonthValue}}</h2>
</div>
</template>

<script>
export default {
    name: 'metric-widget',
    props: ['metric'],
    data () {
        return {
            loading: false,
            metricData: {},
        }
    },

    watch: {
        '$route.params': 'load',
    },

    created () {
        this.load()
    },

    methods: {
        load () {
            const self = this;
            self.loading = true;
            const fakeSeries = [
                { month: 'D', metric: 80000 },
                { month: 'J', metric: 90000 },
                { month: 'F', metric: 100000 },
                { month: 'M', metric: 120340 },
                { month: 'A', metric: 100000 },
                { month: 'M', metric: 120340 },
                { month: 'J', metric: 100000 },
                { month: 'J', metric: 120340 },
                { month: 'A', metric: 100000 },
                { month: 'S', metric: 120340 },
                { month: 'O', metric: 100000 },
                { month: 'N', metric: 120340 },
            ];

            setTimeout(() => {
                self.loading = false;
                self.metricData = {
                    'total-edits': {
                        fullName: 'Total Edits',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: 5,
                        lastMonth: 'November',
                        lastMonthValue: 120340,
                        lastYear: 2016,
                        lastYearValue: 1210000,
                    },
                    'active-editors': {
                        fullName: 'Active Editors',
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
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: 5,
                        lastMonth: 'November',
                        lastMonthValue: 120340,
                        lastYear: 2016,
                        lastYearValue: 1210000,
                    },
                    'unique-devices': {
                        fullName: 'Unique Devices',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: 5,
                        lastMonth: 'November',
                        lastMonthValue: 120340,
                        lastYear: 2016,
                        lastYearValue: 1210000,
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
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: 5,
                        lastMonth: 'November',
                        lastMonthValue: 120340,
                        lastYear: 2016,
                        lastYearValue: 1210000,
                    },
                    'new-articles': {
                        fullName: 'New Articles',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: 5,
                        lastMonth: 'November',
                        lastMonthValue: 120340,
                        lastYear: 2016,
                        lastYearValue: 1210000,
                    },
                    'media-uploads': {
                        fullName: 'Media Uploads',
                        series: fakeSeries,
                        changeMoM: 3,
                        changeYoY: 5,
                        lastMonth: 'November',
                        lastMonthValue: 120340,
                        lastYear: 2016,
                        lastYearValue: 1210000,
                    },

                }[self.metric.name];

            }, Math.random()*1000);
        },
    },
}
</script>

<style scoped>
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
</style>

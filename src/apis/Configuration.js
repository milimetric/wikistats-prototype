import _ from 'lodash'

const lightColor = {
    contributing: '#C4CDDF',
    reading: '#B8E9DE',
    content: '#FFF1C6'
}
const darkColor = {
    contributing: '#2A4B8D',
    reading: '#00AF89',
    content: '#FFCC33'
}
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
    { month: 'November', metric: 120340 }
]
const detailSeries = [
    { month: '2015-12-01', total: 80000,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2000, 'Active': 70000, 'Very Active': 8000 }
        }
    },
    { month: '2016-01-01', total: 90000,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2000, 'Active': 80000, 'Very Active': 8000 }
        }
    },
    { month: '2016-02-01', total: 100000,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2000, 'Active': 90000, 'Very Active': 8000 }
        }
    },
    { month: '2016-03-01', total: 120340,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2340, 'Active': 100000, 'Very Active': 18000 }
        }
    },
    { month: '2016-04-01', total: 100000,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2000, 'Active': 90000, 'Very Active': 8000 }
        }
    },
    { month: '2016-05-01', total: 120340,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2340, 'Active': 100000, 'Very Active': 18000 }
        }
    },
    { month: '2016-06-01', total: 100000,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2000, 'Active': 90000, 'Very Active': 8000 }
        }
    },
    { month: '2016-07-01', total: 120340,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2340, 'Active': 100000, 'Very Active': 18000 }
        }
    },
    { month: '2016-08-01', total: 100000,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2000, 'Active': 90000, 'Very Active': 8000 }
        }
    },
    { month: '2016-09-01', total: 120340,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2340, 'Active': 100000, 'Very Active': 18000 }
        }
    },
    { month: '2016-10-01', total: 100000,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2000, 'Active': 90000, 'Very Active': 8000 }
        }
    },
    { month: '2016-11-01', total: 120340,
        breakdowns: {
            'Activity Level': { 'Lightly Active': 2340, 'Active': 100000, 'Very Active': 18000 }
        }
    }
]
const metrics = {
    'total-edits': {
        fullName: 'Total Edits',
        type: 'bars',
        area: 'contributing',
        series: fakeSeries,
        changeMoM: 3,
        changeYoY: 0.5,
        lastMonth: 'November',
        lastMonthValue: 120340,
        lastYear: 2016,
        lastYearValue: 1210000,
        detail: detailSeries
    },
    'active-editors': {
        fullName: 'Active Editors',
        type: 'bars',
        area: 'contributing',
        series: fakeSeries,
        changeMoM: 1,
        changeYoY: -0.5,
        lastMonth: 'November',
        lastMonthValue: 43203,
        lastYear: 2016,
        lastYearValue: 60102,
        breakdowns: [
            { on: false, name: 'Activity Level', values: [
                { name: 'Lightly Active', on: true },
                { name: 'Active', on: true },
                { name: 'Very Active', on: true }
            ] }
        ],
        detail: detailSeries
    },
    'top-contributors': {
        fullName: 'Top Contributors',
        type: 'list',
        area: 'contributing',
        valueName: 'Total Edits for November', // make month dynamic?
        valueFilter: 'thousands',
        showNumbers: true,
        sortedList: [
            { name: 'Username 1', value: 124503 },
            { name: 'Username 2', value: 123954 },
            { name: 'Username 3', value: 122031 },
            { name: 'Username 4', value: 110891 }
        ]
    },
    'total-pageviews': {
        fullName: 'Total Page Views',
        type: 'bars',
        area: 'reading',
        series: fakeSeries,
        changeMoM: 3,
        changeYoY: -0.5,
        lastMonth: 'November',
        lastMonthValue: 7741345234,
        lastYear: 2016,
        lastYearValue: 25341345234,
        detail: detailSeries
    },
    'unique-devices': {
        fullName: 'Unique Devices',
        type: 'bars',
        area: 'reading',
        series: fakeSeries,
        changeMoM: 3,
        changeYoY: -0.5,
        lastMonth: 'November',
        lastMonthValue: 4921109000,
        lastYear: 2016,
        lastYearValue: 20101345234,
        detail: detailSeries
    },
    'most-viewed-articles': {
        fullName: 'Most Viewed Articles',
        type: 'list',
        area: 'reading',
        valueName: 'Total Views November', // make month dynamic?
        valueFilter: 'kmb',
        showNumbers: false,
        sortedList: [
            { name: 'Long article name here one', value: 2103000 },
            { name: 'Long article name here two', value: 2000900 },
            { name: 'Long article name here three', value: 1910000 },
            { name: 'Long article name here four', value: 1800001 }
        ]
    },
    'total-articles': {
        fullName: 'Total Articles',
        type: 'bars',
        area: 'content',
        series: fakeSeries,
        changeMoM: 3,
        changeYoY: -0.5,
        lastMonth: 'November',
        lastMonthValue: 10741345234,
        lastYear: 2016,
        lastYearValue: 25341345234,
        detail: detailSeries
    },
    'new-articles': {
        fullName: 'New Articles',
        type: 'bars',
        area: 'content',
        series: fakeSeries,
        changeMoM: 3,
        changeYoY: -0.5,
        lastMonth: 'November',
        lastMonthValue: 1435321,
        lastYear: 2016,
        lastYearValue: 12445234,
        detail: detailSeries
    },
    'media-uploads': {
        fullName: 'Media Uploads',
        type: 'bars',
        area: 'content',
        series: fakeSeries,
        changeMoM: 3,
        changeYoY: -0.5,
        lastMonth: 'November',
        lastMonthValue: 1940713,
        lastYear: 2016,
        lastYearValue: 2145234,
        detail: detailSeries
    }
}

export default {
    metricData (metricName, area) {
        const promise = new Promise(function (resolve, reject) {
            const result = _.assign(
                metrics[metricName],
                { lightColor: lightColor[area] },
                { darkColor: darkColor[area] }
            )
            setTimeout(() => resolve(result), Math.random() * 1000)
        })

        return promise
    },

    metrics () {
        const promise = new Promise(function (resolve, reject) {
            resolve(metrics)
        })

        return promise
    },

    areas () {
        const promise = new Promise(function (resolve, reject) {
            resolve([
                { path: '/', name: 'Dashboard' },
                { path: '/contributing', name: 'Contributing' },
                { path: '/reading', name: 'Reading' },
                { path: '/content', name: 'Content' }
            ])
        })

        return promise
    },

    areaData () {
        const promise = new Promise(function (resolve, reject) {
            resolve([
                { state: { id: 'contributing', name: 'Contributing', metrics: [
                    'total-edits',
                    'active-editors',
                    'top-contributors'
                ] }},
                { state: { id: 'reading', name: 'Reading', metrics: [
                    'total-pageviews',
                    'unique-devices',
                    'most-viewed-articles'
                ] }},
                { state: { id: 'content', name: 'Content', metrics: [
                    'total-articles',
                    'new-articles',
                    'media-uploads'
                ] }}
            ])
        })

        return promise
    }
}

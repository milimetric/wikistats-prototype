<template>
<router-link class="widget column" :to="area + '/' + metric.name">
    <metric-bar-widget
        v-if="metricData.type === 'bars'"
        :data="metricData">
    </metric-bar-widget>

    <metric-list-widget
        v-if="metricData.type === 'list'"
        :data="metricData">
    </metric-list-widget>
</router-link>
</template>

<script>
import MetricBarWidget from './MetricBarWidget'
import MetricListWidget from './MetricListWidget'
import config from '../apis/Configuration'

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

            config.metricData(self.metric.name, self.area).then(function (result) {
                self.metricData = result
                self.loading = false
            })
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

    color: #234!important;
}
.widget.column:hover {
    box-shadow: 1px 1px 0 1px #aaa;
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
    height: 60px;
}
</style>

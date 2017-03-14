<template>
<section class="detail container" :class="area">
    <table><tr><th>hi</th></tr></table>
    <section class="left panel">
        <h3 class="header">Wiki</h3>
        <wiki-selector :wiki="wiki" fluid="true"></wiki-selector>

        <div class="ui clearing divider"></div>

        <h3 class="header">Metrics</h3>

        <router-link v-for="o in otherMetrics" :key="o.name"
                     :to="'/' + area + '/' + o.name"
                     class="ui line label"
                     :class="{grey: metric === o.name}">
            {{o.fullName}}
        </router-link>


        <div v-if="breakdowns">
        <div class="ui clearing divider"></div>

            <h3 class="header">Filters and Breakdowns</h3>

            <div v-for="b in breakdowns">
                Show:
                <label class="xui checkbox" v-for="bv in b.values">
                    <input type="checkbox" v-model="bv.on"/>
                    {{bv.name}}
                </label>

                <div class="ui toggle checkbox">
                    <input type="checkbox" id="breakdown" v-model="b.on">
                    <label for="breakdown">
                        Breakdown
                        <span v-if="!b.on">Off</span>
                        <span v-if="b.on">On</span>
                    </label>
                </div>
            </div>
        </div>
    </section>
    <section class="graph panel">
        <div class="ui clearing basic segment">
            <h3 class="ui left floated header">{{metricData.fullName}}</h3>

            <simple-legend :data="metricData"></simple-legend>

            <div class="ui right floated icon buttons">
                <button class="ui icon button" title="Download">
                    <i class="download icon"></i>
                </button>
                <div class="ui simple dropdown right labeled icon button"
                     title="Change Chart">
                    <i class="ui dropdown icon"/>
                    <span>
                        <i :class="chartIcon" class="icon"></i>
                    </span>
                    <div class="menu">
                        <div class="item"
                             v-for="t in chartTypes" :key="t.chart"
                             @click="changeChart(t)">
                             <i :class="t.icon" class="icon"></i>
                             {{t.chart}}
                         </div>
                    </div>
                </div>
            </div>
        </div>

        <component :is="chartType + '-chart'" :data="metricData" :breakdown="breakdown"></component>

        <div class="ui center aligned basic segment">
            <time-range-selector></time-range-selector>
            <h5>
                Total: {{total | kmb}} {{metricData.fullName}} <arrow-icon :value="metricData.changeYoY"></arrow-icon> {{metricData.changeYoY}} <i>this year</i>
            </h5>
        </div>
    </section>
</section>
</template>

<script>
import WikiSelector from './WikiSelector'
import SimpleLegend from './SimpleLegend'
import ArrowIcon from './ArrowIcon'
import TimeRangeSelector from './TimeRangeSelector'

import BarChart from './BarChart'
import MapChart from './MapChart'
import TableChart from './TableChart'

import config from '../apis/Configuration'

export default {
    name: 'detail',
    components: {
        WikiSelector,
        SimpleLegend,
        ArrowIcon,
        TimeRangeSelector,

        BarChart,
        MapChart,
        TableChart,
    },
    data () {
        return {
            wiki: 'Wikipedia (All Languages)',

            chartType: 'table',
            chartIcon: 'table',
            chartTypes: [
                { chart: 'bar', icon: 'bar chart' },
                { chart: 'map', icon: 'globe' },
                { chart: 'table', icon: 'table' },
            ],

            defaultMetrics: {
                contributing: 'active-editors',
                reading: 'total-pageviews',
                content: 'total-articles',
            },

            otherMetrics: [],

            metricData: {},

            breakdowns: [],
        }
    },

    computed: {
        area: function () {
            return this.$route.params ? this.$route.params.area : 'loading ...'
        },
        metric: function () {
            return this.$route.params.metric ?
                this.$route.params.metric : this.defaultMetrics[this.area]
        },

        breakdown: function () {
            return (this.breakdowns || []).find((m) => m.on)
        },

        total: function () {
            if (!this.metricData.detail) { return 0 }

            return this.metricData.detail.reduce((r, m) => r + m.total, 0)
        }
    },

    watch: {
        'metric': 'loadData',
    },

    mounted () {
        this.loadData()
    },

    methods: {
        loadData () {
            const self = this
            config.metricData(this.metric, this.area).then(function (result) {
                self.metricData = result
                self.breakdowns = result.breakdowns
            })

            config.metrics(this.area).then(function (result) {
                const relevantMetrics = Object.keys(result)
                    .filter((m) => result[m].area === self.area)

                self.otherMetrics =
                    relevantMetrics.map((m) => Object.assign(result[m], { name: m }))
            })
        },

        changeChart (t) {
            this.chartType = t.chart
            this.chartIcon = t.icon
        },
    },
}
</script>

<style scoped>
.detail.container {
    padding: 60px 20px 20px 20px;
    display: flex;
    align-items: stretch;
}
.panel {
    padding: 18px;
}
.left.panel {
    background-color: #D8D8D8;
    width: 280px;
}
.graph.panel {
    background-color: #FFFFFF;
    flex: 1;
    border-radius: 0 10px 10px 0;
}

.clearing.basic.segment { padding: 0; }
.xui.checkbox {
    display: block;
    margin: 10px;
    cursor: pointer;
}
.xui.checkbox input[type=checkbox] {
    vertical-align: middle;
    width: 18px;
    height: 18px;
    margin-right: 3px;
}
.ui.toggle label { cursor: pointer!important; }
.ui.line.label { display: table; margin: 4px; }
</style>

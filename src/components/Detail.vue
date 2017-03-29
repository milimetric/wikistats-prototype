<template>
<section class="detail container" :class="{ area, fullscreen }">
    <section class="left panel" v-if="!fullscreen">
        <div class="wikis">
            <h3 class="header">Wiki</h3>
            <wiki-selector :wiki="wiki" single="false" @wiki="wikiSelected"></wiki-selector>
            <p>
                <a @click.prevent="addAnotherWiki" href="#">Add another Wiki</a>
            </p>
        </div>

        <div class="ui clearing divider"></div>

        <h3 class="header">Metrics</h3>

        <router-link v-for="o in otherMetrics" :key="o.name"
                     :to="'/' + area + '/' + o.name"
                     class="ui line label"
                     :class="{active: o.name === metric}">
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
            <h2 class="ui left floated header">
                {{metricData.fullName}}
                <span class="subdued">{{wiki.replace(' (All languages)', '')}}</span>
            </h2>

            <div class="ui right floated basic fudge segment">
                <simple-legend v-if="chartType === 'bar'" class="simple legend" :data="metricData"></simple-legend>
                <div class="ui right floated icon buttons">

                    <button class="ui icon button" title="Download">
                        <i class="download icon"></i>
                    </button>
                    <div class="ui simple dropdown right labeled icon button"
                         title="Change Chart">
                        <i class="ui dropdown icon"/>
                        <span>
                            <i :class="chartIcon" class="chart icon"></i>
                        </span>
                        <div class="menu">
                            <div class="item"
                                :class="{disabled: ['bar', 'table'].indexOf(t.chart) < 0}"
                                 v-for="t in chartTypes" :key="t.chart"
                                 @click="changeChart(t)">
                                 <i :class="t.icon" class="chart icon"></i>
                                 {{t.chart}}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <component :is="chartComponent" :data="metricData" :breakdown="breakdown"></component>

        <div class="ui center aligned basic segment" v-if="metricData.type === 'bars'">
            <time-range-selector></time-range-selector>
            <h5>
                Total: {{total | kmb}} {{metricData.fullName}} <arrow-icon :value="metricData.changeYoY"></arrow-icon> {{metricData.changeYoY}} <i>this year</i>
            </h5>
        </div>

        <div class="ui center aligned subdued basic segment">
            <p>* Definition of {{metric}} goes here, pulled from config or maybe dynamically from the wiki page.</p>
            <p>More descriptor text will go here assuming that it takes a few sentences to explain a term for a metric.</p>

        </div>

        <div class="ui right floated icon button" @click="toggleFullscreen">
            <i class="ui icon" :class="{expand: !fullscreen, compress: fullscreen}"/>
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
import LineChart from './LineChart'
import MapChart from './MapChart'
import TableChart from './TableChart'
import EmptyChart from './EmptyChart'

import config from '../apis/Configuration'

export default {
    name: 'detail',
    props: ['wiki'],
    components: {
        WikiSelector,
        SimpleLegend,
        ArrowIcon,
        TimeRangeSelector,

        BarChart,
        LineChart,
        MapChart,
        TableChart,
        EmptyChart,
    },
    data () {
        return {
            fullscreen: false,

            // doing some exaggerated computables to test deeper chaining
            chartTypes: [],
            chartType: null,
            chartIcon: 'empty',
            availableChartTypes: [
                { chart: 'bar', icon: 'bar' },
                { chart: 'line', icon: 'line' },
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
        chartComponent: function () {
            return (this.chartType || 'empty') + '-chart'
        },
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
        'metricData.type': function () {
            this.chartTypes = this.availableChartTypes.filter((c) =>
                this.metricData.type === 'bars' || c.chart === 'table'
            )
            this.chartType = this.chartTypes[0].chart
            this.chartIcon = this.chartTypes[0].icon
        }
    },

    mounted () {
        this.loadData()
    },

    methods: {
        wikiSelected (wiki) {
            this.$emit('wiki', wiki)
        },
        loadData () {
            const self = this

            config.metricData(this.metric, this.area).then(function (result) {
                self.metricData = result
                self.breakdowns = result.breakdowns
                self.chartTypes = self.availableChartTypes
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

        toggleFullscreen () {
            this.fullscreen = !this.fullscreen

            // TODO: hack, figure out a way to re-render bar without this
            const t = this.metricData,
                  self = this
            this.metricData = {}
            setTimeout(function () {
                self.metricData = t
            }, 0)
        },

        addAnotherWiki () {
            alert('Not in the prototype yet')
        },
    },
}
</script>

<style>
.detail.container {
    margin: 23px 0 5px 0;
    display: flex;
    align-items: stretch;
}
.panel {
    padding: 25px 18px 18px 18px;
}
.left.panel {
    background-color: #D8D8D8;
    min-width: 242px;
}
.left.panel h3.header {
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 6px 0;
}
.left.panel p {
    margin-top: 8px;
}
.left.panel .ui.clearing.divider {
    margin-bottom: 2px;
}
.left.panel .wikis {
    min-height: 120px;
}
.left.panel .ui.icon.input {
    width: 204px;
}
.left.panel .ui.icon.input > input {
    height: 36px;
    font-size: 13px!important;
    border: 1px solid #aaa9a9!important;
    border-radius: 4px;
    padding-right: 32px!important;
}

.graph.panel {
    background-color: #FFFFFF;
    flex: 1;
    border-radius: 0 10px 10px 0;
    padding-bottom: 8px;
}

.graph.panel h2.header {
    margin-left: 10px;
    font-size: 20px;
    font-weight: 500;
}
.graph.panel h2.header .subdued {
    margin-left: 4px;
    font-size: 18px;
    color: #777;
    font-weight: 300;
}
.graph.panel .ui.right.floated.buttons {
    border: solid 1px #d4d4d5;
    border-radius: 4px;
}
.graph.panel .ui.right.floated.buttons .button {
    border-right: solid 1px #d4d4d5;
}
.graph.panel .ui.right.floated.buttons .button:last-child {
    border-right: none;
}

.graph.panel p {
    margin: 0;
}

.clearing.basic.segment { padding: 0; }
.xui.checkbox {
    display: block;
    margin: 10px 0;
    cursor: pointer;
}
.xui.checkbox input[type=checkbox] {
    vertical-align: middle;
    width: 18px;
    height: 18px;
    margin-right: 3px;
}
.left.panel .ui.toggle { margin-top: 10px; }
.left.panel .ui.toggle label { cursor: pointer!important; }
.left.panel .ui.line.label {
    display: table;
    margin: 3px;
    background-color: #fefefe!important;
    border: solid 2px #cdcdcd!important;
    font-size: 13px;
    font-weight: 500;
    color: #9b9b9b!important;
    padding: 5px 9px;
}
.left.panel .ui.line.active.label {
    background-color: #a7a7a7!important;
    border: solid 2px #979797!important;
    font-weight: bold;
    color: #222!important;
}

.app .ui.toggle.checkbox input:checked ~ label:before {
    background-color: #227634!important;
}

.fullscreen .graph.panel {
    border-radius: 0;
}
.fullscreen.detail.container {
    margin: 0 -32px -27px -32px;
}
.right.floated.basic.fudge.segment {
    margin: 0;
    padding: 0;
}
.simple.legend {
    margin-right: 10px;
    margin-top: 5px;
    display: inline-block;
}
</style>

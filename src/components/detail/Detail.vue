<template>
<section class="detail container" :class="{ area, fullscreen }">
    <section class="left panel" v-if="!fullscreen">
        <div class="wikis">
            <h3 class="header">Wiki</h3>
            <wiki-selector :wiki="wiki" single="false" @wiki="wikiSelected"></wiki-selector>
        </div>

        <div class="ui clearing divider"></div>

        <h3 class="header">Metrics</h3>

        <router-link v-for="o in otherMetrics" :key="o.name"
                     :to="'/' + area + '/' + o.name"
                     class="ui line label"
                     :class="{active: o.name === metric}">
            {{o.fullName}}
        </router-link>

        <p>
            <a @click.prevent="viewMoreMetrics" href="#">View more metrics</a>
        </p>

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
                        <i class="help circle icon" title="Breakdowns help you see more detail by breaking down the total values into parts."/>
                    </label>
                </div>
            </div>
        </div>
    </section>
    <section class="graph panel">
        <graph-panel
            :metricData='metricData'
            :chartType='chartType'
            :wiki='wiki'
            :chartTypes='chartTypes'
            :chartIcon='chartIcon'
            :breakdowns='breakdowns'
        />

        <div class="ui center aligned basic segment" v-if="metricData.type !== 'list'">
            <time-range-selector v-on:changeTimeRange='setTimeRange'></time-range-selector>
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

    <metrics-modal
        :areasWithMetrics="areasWithMetrics"
        :highlightMetric="highlightMetric"
        @changeMetric="goHighlight">

    </metrics-modal>
</section>
</template>

<script>
import WikiSelector from '../WikiSelector'
import SimpleLegend from './SimpleLegend'
import ArrowIcon from '../ArrowIcon'
import TimeRangeSelector from '../TimeRangeSelector'
import MetricsModal from './MetricsModal'

import GraphPanel from './GraphPanel'

import config from '../../apis/Configuration'
import router from '../../router/index'

import '../../../semantic/src/definitions/modules/modal'
import '../../../semantic/src/definitions/modules/dimmer'

export default {
    name: 'detail',
    props: ['wiki'],
    components: {
        WikiSelector,
        SimpleLegend,
        ArrowIcon,
        TimeRangeSelector,
        MetricsModal,
        GraphPanel,
    },
    data () {
        return {
            fullscreen: false,
            areasWithMetrics: config.areasWithMetrics,
            highlightMetric: {},

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
        'metric': function () {
            this.loadData()
            this.filterChartTypes()
        },
        'metricData.type': function () {
            this.filterChartTypes()
        },
        'metricData.range': function () {
            this.loadData();
        }
    },

    mounted () {
        $('body').scrollTop(0)
        this.loadData()
        $('.ui.metrics.modal').modal()
    },

    methods: {
        filterChartTypes () {
            const self = this

            self.chartTypes = self.availableChartTypes.filter(function (c) {
                if (!self.metricData) { return false; }
                if (self.metricData.type === 'bars') { return c.chart !== 'line' }
                if (self.metricData.type === 'lines') { return c.chart === 'line' }
                return c.chart === 'table'
            })

            self.chartType = self.chartTypes[0].chart
            self.chartIcon = self.chartTypes[0].icon
        },

        wikiSelected (wiki) {
            this.$emit('wiki', wiki);
            this.loadData();
        },
        loadData () {
            const self = this

            this.highlightMetric = { name: this.metric, area: this.area }

            config.metricData(this.metric, this.area).then(function (result) {
                self.metricData = result
                self.breakdowns = result.breakdowns
                let url = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/' +
                            'aggregate/{{wiki}}/all-access/all-agents/' +
                            'monthly/{{start}}/{{end}}';
                url = url.replace('{{start}}', self.metricData.range[0])
                         .replace('{{end}}', self.metricData.range[1])
                         .replace('{{wiki}}', self.wiki.urlName)
                $.get(url, function (data) {
                    const formattedData = data.items.map((item) => {
                        return {
                            month: item.timestamp.slice(0,4) + '-'
                                + item.timestamp.slice(4,6) + '-'
                                + item.timestamp.slice(6,8),
                            total: item.views
                        }
                    })
                    self.metricData.detail = formattedData;
                })
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
            $('.add.wiki.design').toggle('highlight')
        },

        viewMoreMetrics () {
            $('.ui.metrics.modal').modal('show')
        },

        changeHighlight (name, area) {
            this.highlightMetric = { name, area }
        },

        goHighlight (area) {
            const h = this.highlightMetric
            router.push('/' + h.area + '/' + h.name)
            $('.ui.metrics.modal').modal('hide')
        },

        setTimeRange (newRange) {
            this.metricData.range = newRange;
        }
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
.ui.line.label {
    display: table;
    margin: 3px;
    background-color: #fefefe!important;
    border: solid 2px #cdcdcd!important;
    font-size: 13px;
    font-weight: 500;
    color: #9b9b9b!important;
    padding: 5px 9px;
    cursor: pointer;
}
.ui.line.active.label {
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

.add.wiki.design {
    display: none;
}
</style>

<template>
<div class="ui clearing basic segment">
    <h2 class="ui left floated header">
        {{metricData.fullName || 'No data yet... '}}
        <span class="subdued">{{wiki.title}}</span>
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
                         v-for="t in chartTypes" :key="t.chart"
                         @click="changeChart(t)">
                         <i :class="t.icon" class="chart icon"></i>
                         {{t.chart}}
                     </div>
                </div>
            </div>
        </div>
    </div>
    <component :is="chartComponent" :data="metricData" :breakdown="breakdown"></component>
</div>
</template>

<script>

import SimpleLegend from './SimpleLegend'
import BarChart from './chart/BarChart'
import LineChart from './chart/LineChart'
import MapChart from './chart/MapChart'
import TableChart from './chart/TableChart'
import EmptyChart from './chart/EmptyChart'

export default {
    name: 'graph-panel',
    components: {
        SimpleLegend,
        BarChart,
        LineChart,
        MapChart,
        TableChart,
        EmptyChart
    },
    props: ['metricData', 'chartType', 'wiki', 'chartTypes', 'chartIcon', 'breakdowns'],
    methods: {
        changeChart (t) {
            this.chartType = t.chart
            this.chartIcon = t.icon
        }
    },
    computed: {
        chartComponent: function () {
            return (this.chartType || 'empty') + '-chart'
        },
        breakdown: function () {
            return (this.breakdowns || []).find((m) => m.on)
        },
    }
}
</script>

<style>
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
</style>
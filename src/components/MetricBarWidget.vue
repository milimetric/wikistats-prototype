<template>
<div>
    <div class="ui small statistic">
        <div class="label">{{data.fullName}}</div>
        <div class="value">{{data.lastMonthValue | thousands}}</div>
    </div>
    <div>
        <span class="subdued">{{data.lastMonth}}</span>
        <arrow-icon :value="data.changeMoM"/>
        {{data.changeMoM}} % month over month
    </div>
    <div class="bar-chart">
    </div>
    <div class="ui horizontal small statistic">
        <div class="value">
            {{data.lastYearValue | kmb}}
        </div>
        <arrow-icon :value="data.changeYoY"/>
        {{data.changeYoY}} % year over year
    </div>
    <div class="subdued">
        Year Total ({{data.lastYear}})
    </div>
</div>
</template>

<script>
import ArrowIcon from './ArrowIcon'
import * as d3 from 'd3-selection'
import * as scales from 'd3-scale'
import * as arr from 'd3-array'

export default {
    name: 'metric-bar-widget',
    props: ['data'],

    components: {
        ArrowIcon,
    },

    mounted () {
        this.drawChart()
        console.log('drew chart')
    },

    methods: {

        drawChart () {
            const self = this

            const root = d3.select(this.$el).select('.bar-chart'),
                  margin = {top: 6, right: 0, bottom: 0, left: 0}

            const g = root.append('svg')
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`)

            const data = self.data.series ?
                self.data : { series: [] }

            function resize () {
                const n = root.node(),
                      width = n.offsetWidth - margin.left - margin.right,
                      height = n.offsetHeight - margin.top - margin.bottom,
                      x = scales.scaleBand().rangeRound([0, width]).padding(0.3),
                      y = scales.scaleLinear().rangeRound([height, 0])

                x.domain(data.series.map((d) => d.month))
                y.domain([0, arr.max(data.series.map((d) => d.metric))])

                g.attr('width', width).attr('height', height)
                g.selectAll('.bar')
                    .data(data.series)
                    .enter().append('rect')
                        .attr('x', (d) => x(d.month))
                        .attr('y', (d) => y(d.metric))
                        .attr('width', x.bandwidth())
                        .attr('height', (d) => height - y(d.metric))
                        .attr('fill', (d) =>
                            d.month === self.data.lastMonth ?
                                self.data.darkColor : self.data.lightColor
                        )
            }
            resize()
            //d3.select(window).on('resize', resize)
        },
    }
}
</script>

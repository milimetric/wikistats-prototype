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
    },

    methods: {

        drawChart () {
            const self = this

            const root = d3.select(this.$el).select('.bar-chart'),
                  margin = {top: 6, right: 0, bottom: 10, left: 0},
                  padding = 4

            const svg = root.append('svg'),
                  g = svg.append('g').attr(
                    'transform', `translate(${margin.left},${margin.top})`
                  )

            const data = self.data.series ?
                self.data : { series: [] }

            function resize () {
                const n = root.node(),
                      width = n.offsetWidth - margin.left - margin.right,
                      height = n.offsetHeight - margin.top - margin.bottom - padding,
                      x = scales.scaleBand().rangeRound([0, width]).padding(0.3),
                      y = scales.scaleLinear().rangeRound([height, 0])

                x.domain(data.series.map((d) => d.month))
                y.domain([0, arr.max(data.series.map((d) => d.metric))])

                svg.attr('width', n.offsetWidth).attr('height', n.offsetHeight)
                g.attr('width', width).attr('height', height)
                // console.log('resized ' + width, height)
                g.append('g').selectAll('.bar').data(data.series)
                    .enter().append('rect')
                        .attr('x', (d) => x(d.month))
                        .attr('y', (d) => y(d.metric))
                        .attr('width', x.bandwidth())
                        .attr('height', (d) => height - y(d.metric))
                        .attr('fill', (d) =>
                            d.month === self.data.lastMonth ?
                                self.data.darkColor : self.data.lightColor
                        )

                g.append('g').classed('month-ticks', true)
                    .attr('transform', `translate(${
                                            x.bandwidth() / 2 - 5
                                        },${margin.bottom + padding})`)
                    .selectAll('.month').data(data.series)
                    .enter().append('text')
                        .attr('x', (d) => x(d.month))
                        .attr('y', height)
                        .text((d) => d.month.substring(0, 1))
                            .style('fill', '#898989')
            }
            resize()
            // TODO: get this to resize cleanly d3.select(window).on('resize', resize)
        },
    }
}
</script>

<style>
.widget.column g.month-ticks { display: none; }
.widget.column:hover g.month-ticks { display: block; }
</style>

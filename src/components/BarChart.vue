<template>
<div class="big bar chart">
    <span>{{data}}</span>
</div>
</template>

<script>
import * as d3 from 'd3-selection'
import * as scales from 'd3-scale'
import * as arr from 'd3-array'
import * as axes from 'd3-axis'
import * as format from 'd3-format'
import * as time from 'd3-time'

export default {
    name: 'bar-chart',
    props: ['data', 'breakdown'],

    mounted () {
        this.drawChart()
        console.log('mounted bar')
    },

    updated () {
        this.drawChart()
        console.log('updated bar')
    },

    methods: {

        drawChart () {
            const self = this

            const root = d3.select(this.$el),
                  margin = {top: 6, right: 0, bottom: 20, left: 40},
                  padding = 4

            const svg = root.append('svg'),
                  g = svg.append('g').attr(
                    'transform', `translate(${margin.left},${margin.top})`
                  )

            const data = self.data.detail ?
                self.data : { detail: [] }

            function resize () {
                const n = root.node(),
                      width = n.offsetWidth - margin.left - margin.right,
                      height = n.offsetHeight - margin.top - margin.bottom - padding,
                      x = scales.scaleTime().rangeRound([0, width]),
                      y = scales.scaleLinear().rangeRound([height, 0]),
                      dates = data.detail.map((d) => new Date(Date.parse(d.month)))

                x.domain([arr.min(dates), arr.max(dates)])
                y.domain([0, arr.max(data.detail.map((d) => d.total))])

                svg.attr('width', n.offsetWidth).attr('height', n.offsetHeight)
                g.attr('width', width).attr('height', height)

                g.append('g').selectAll('.bar').data(data.detail)
                    .enter().append('rect')
                        .attr('x', (d) => x(Date.parse(d.month)))
                        .attr('y', (d) => y(d.total))
                        .attr('width', width / dates.length - (padding*3))
                        .attr('height', (d) => height - y(d.total))
                        .attr('fill', (d) => self.data.darkColor)

                const xAxis = axes.axisBottom(x).ticks(time.timeMonth.every(3)),
                      yAxis = axes.axisLeft(y).ticks(7)
                                .tickFormat(format.format('0.0s'))

                g.append('g')
                    .call(yAxis)
                    .style('font-size', '13px')
                    .style('font-family', 'Lato, "Open Sans"')
                g.append('g').attr('transform', `translate(0,${height})`)
                    .call(xAxis)
                    .style('font-size', '13px')
                    .style('font-family', 'Lato, "Open Sans"')
            }
            resize()
            // TODO: get this to resize cleanly d3.select(window).on('resize', resize)
        },
    }
}
</script>

<style>
.big.bar.chart { min-height: 360px; min-width: 660px; }
</style>

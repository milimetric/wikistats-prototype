<template>
<div class="big bar chart">
</div>
</template>

<script>
import * as d3 from 'd3-selection'
import * as scales from 'd3-scale'
import * as arr from 'd3-array'
import * as axes from 'd3-axis'
import * as format from 'd3-format'
import * as time from 'd3-time'

import config from '../../../apis/Configuration'

export default {
    name: 'bar-chart',
    props: ['metricData', 'breakdown'],

    mounted () {
        this.drawChart()
    },

    watch: {
        metricData: {
            handler: function () {
                this.drawChart()
            },
            deep: true
        },

        breakdown: function () {
            this.drawChart()
        }
    },

    methods: {

        drawChart () {
            const self = this

            const root = d3.select(this.$el),
                  margin = {top: 6, right: 0, bottom: 20, left: 40},
                  padding = 4

            // clean out any previous chart
            root.selectAll('*').remove()

            const svg = root.append('svg'),
                  g = svg.append('g').attr(
                    'transform', `translate(${margin.left},${margin.top})`
                  )

            const data = self.metricData.detail ?
                self.metricData : { detail: [] }

            function resize () {
                const n = root.node(),
                      width = n.offsetWidth - margin.left - margin.right,
                      height = n.offsetHeight - margin.top - margin.bottom - padding,
                      x = scales.scaleTime().rangeRound([0, width]),
                      y = scales.scaleLinear().rangeRound([height, 0]),
                      xW = scales.scaleBand().align(0).padding(0.92),
                      dates = data.detail.map((d) => new Date(Date.parse(d.month)))

                x.domain(arr.extent(dates))
                y.domain([0, arr.max(data.detail.map((d) => d.total))])

                xW.range(x.range()).domain(x.domain())

                svg.attr('width', n.offsetWidth).attr('height', n.offsetHeight)
                g.attr('width', width).attr('height', height)

                if (self.breakdown) {
                    // this should be dynamic but we only have four colors
                    // the data structure is bad, redo that in real code
                    g.append('g').selectAll('.bar').data(data.detail)
                        .enter().selectAll('.minibar').data(function (d) {
                            // this should be passed in
                            const breakdown = self.metricData.breakdowns[0]
                            const breakdowns = breakdown.values.filter((x) => x.on)

                            // in the real version make sure colors stick with particular breakdown values
                            const newData = breakdowns.map((b, i) => ({
                                month: d.month,
                                key: b.name,
                                value: d.breakdowns[breakdown.name][b.name],
                                color: config.colors[self.metricData.area][[config.stableColorIndexes[b.name]]],
                                width: xW.bandwidth() / breakdowns.length,
                                index: i
                            }))

                            return newData
                        }).enter().append('rect')
                            .attr('x', (d) => x(Date.parse(d.month)) + d.index * d.width / xW.padding())
                            .attr('y', (d) => y(d.value))
                            .attr('width', (d) => d.width)
                            .attr('height', (d) => height - y(d.value))
                            .attr('fill', (d) => d.color)

                } else {
                    g.append('g').selectAll('.bar').data(data.detail)
                        .enter().append('rect')
                            .attr('x', (d) => x(Date.parse(d.month)))
                            .attr('y', (d) => y(d.total))
                            .attr('width', xW.bandwidth())
                            .attr('height', (d) => height - y(d.total))
                            .attr('fill', (d) => self.metricData.darkColor)
                }

                const xAxis = axes.axisBottom(x).ticks(time.timeMonth.every(3)),
                      yAxis = axes.axisLeft(y).ticks(7)
                                .tickFormat(format.format('0.00s'))

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
.big.bar.chart { min-height: 386px; min-width: 700px; }
.fullscreen .big.bar.chart { min-height: 492px; }
</style>

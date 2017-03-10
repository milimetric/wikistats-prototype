<template>
<div>
    <div class="ui small statistic">
        <div class="label">{{data.fullName}}</div>
    </div>
    <div class="subdued">
        {{data.valueName}}
    </div>
    <ul class="widget list">
        <li v-for="(line, index) in formattedList">
            <span class="number">{{line.value}}</span>
            &nbsp;
            <span v-if="data.showNumbers">{{index + 1}}.</span>
            {{line.name | elipsis(17)}}
        </li>
    </ul>
</div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'metric-list-widget',
    props: ['data'],

    computed: {
        formattedList: function () {
            if (!this.data.valueFilter) { return this.data.sortedList }

            return this.data.sortedList.map((l) => ({
                value: Vue.options.filters[this.data.valueFilter](l.value),
                name: l.name
            }))
        }
    },

    methods: {
        format: function (value) {
        }
    },
}
</script>

<style>
.widget.list { list-style: none; font-size: 1.4em; padding: 0; margin: 0; }
.widget.list li { margin: 10px 10px 0 0; padding-bottom: 10px; vertical-align: middle; border-bottom: 2px solid #bbb; }
.widget.list li:last-child { border: none; }
.widget.list .number { font-size: 1.6em; font-weight: bold; }
</style>

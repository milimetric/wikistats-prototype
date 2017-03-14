<template>
<div class="area" :class="area.id">
    <div class="ui top attached header">
        {{area.name}}
    </div>
    <div class="ui attached basic segment">
        <div class="ui three column grid">
            <metric-widget
                v-for="m in area.metrics"
                :key="m"
                :metric="{ name: m }"
                :area="area.id">
            </metric-widget>
        </div>
    </div>
</div>
</template>

<script>
import MetricWidget from './MetricWidget'

export default {
    name: 'dashboard-area',
    props: ['area'],

    components: {
        MetricWidget,
    },
}
</script>

<style scoped>
.area .header { background-color: #E8E8E8; color: #5C5C5C; }

.area.contributing .header { border-bottom: 3px solid #C4CDDF; }
.area.reading .header { border-bottom: 3px solid #B8E9DE; }
.area.content .header { border-bottom: 3px solid #FFF1C6; }

.ui.attached.basic.segment { border: none; }

.contributing { }
.reading {}
.content {}
</style>

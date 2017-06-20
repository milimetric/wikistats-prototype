<template>
<section class="left panel" >
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
</template>

<script>
import WikiSelector from '../WikiSelector'

export default {
    name: 'detail-sidebar',
    props: ['wiki','otherMetrics','metric','breakdowns','area'],
    components: {
        WikiSelector
    },
    methods: {
        wikiSelected (wiki) {
            this.$emit('wikiSelected', wiki);
        }
    }
}
</script>

<style>
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
</style>
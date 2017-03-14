<template>
<section class="widgets">
    <div class="ui clearing basic top segment">
        <h2 class="ui left floated header">Monthly Overview</h2>
        <h5 class="ui right floated header">
            <wiki-selector :wiki="wiki"></wiki-selector>
        </h5>
    </div>
    <div class="ui basic area segment"
        v-for="a in areas"
        :key="a.state.id">
        <dashboard-area :area="a.state"></dashboard-area>
    </div>
</section>
</template>

<script>
import DashboardArea from './DashboardArea'
import WikiSelector from './WikiSelector'
import config from '../apis/Configuration'

export default {
    name: 'dashboard',
    components: {
        DashboardArea,
        WikiSelector,
    },

    data () {
        return {
            wiki: 'Wikipedia (All Languages)',
            areas: []
        };
    },

    mounted () {
        this.load()
    },

    methods: {
        load () {
            const self = this
            config.areaData().then(function (result) {
                self.areas = result
            })
        },
    },
}
</script>

<style scoped>
.widgets { padding: 3em 1em 0 1em; }
.icon.input input {
    color: #787878;
    border: 1px solid #787878;
    border-radius: 4px;
}

.widgets > .top.segment { margin-top: 10px; margin-bottom: 0; padding-bottom: 0 }
.widgets > .ui.area.segment:first-child { margin-top: 0; }
.left.floated.header { padding: 20px 0 0 0; margin: 0 }
.right.floated.header { margin-right: 0; }
.right.floated.header .ui.icon.input { margin-right: 0; }
</style>

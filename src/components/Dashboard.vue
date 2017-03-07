<template>
<section class="widgets">
    <div class="ui clearing basic segment">
        <h2 class="ui left floated header">Monthly Overview</h2>
        <h5 class="ui right floated header">
            <div class="ui icon input">
                <input type="text" placeholder="Choose a Wiki" :value="wiki">
                <i class="search icon"></i>
            </div>
        </h5>
    </div>
    <div class="ui basic segment"
        v-for="a in areas"
        :key="a.state.id">
        <dashboard-area :area="a.state"></dashboard-area>
    </div>
</section>
</template>

<script>
import DashboardArea from './DashboardArea'

export default {
    name: 'dashboard',
    data () {
        return {
            wiki: 'Wikipedia (All Languages)',
            areas: [
                { state: { id: 'contributing', name: 'Contributing', metrics: [
                    'total-edits',
                    'active-editors',
                    'top-contributors',
                ] }},
                { state: { id: 'reading', name: 'Reading', metrics: [
                    'total-pageviews',
                    'unique-devices',
                    'most-viewed-articles',
                ] }},
                { state: { id: 'content', name: 'Content', metrics: [
                    'total-articles',
                    'new-articles',
                    'media-uploads',
                ] }},
            ]
        };
    },
    components: {
        DashboardArea,
    }
}
</script>

<style scoped>
.widgets { padding: 3em 1em 0 1em; }
.icon.input input {
    color: #787878;
    border: 1px solid #787878;
    border-radius: 4px;
}
</style>

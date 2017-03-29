<template>
<div>
    <table :class="data.area" class="ui table" v-if="!breakdown">
        <thead>
            <tr v-if="data.type === 'bars'">
                <th>Month</th>
                <th>Total</th>
            </tr>
            <tr v-if="data.type === 'list'">
                <th>Name</th>
                <th>{{data.valueName}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="m in data.detail" v-if="data.type === 'bars'">
                <td>{{m.month}}</td>
                <td>{{m.total}}</td>
            </tr>
            <tr v-for="m in data.sortedList" v-if="data.type === 'list'">
                <td>{{m.name}}</td>
                <td>{{m.value}}</td>
            </tr>
        </tbody>
    </table>
    <table :class="data.area" class="ui table" v-if="breakdown">
        <thead>
            <tr>
                <th>Month</th>
                <th v-for="v in breakdown.values" v-if="v.on">{{v.name}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="m in data.detail">
                <td>{{m.month}}</td>
                <td v-for="v in breakdown.values" v-if="v.on">{{m.breakdowns[breakdown.name][v.name]}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    name: 'map-chart',
    props: ['data', 'breakdown'],

    mounted () {
        this.setColors()
    },

    updated () {
        this.setColors()
    },

    methods: {
        setColors () {
            const headerCells = this.$el.querySelectorAll('th')
            let i = null

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].style = `background-color: ${this.data.darkColor};`
            }
        }
    }
}
</script>

<style scoped>
th { color: #FFFFFF!important; }
</style>

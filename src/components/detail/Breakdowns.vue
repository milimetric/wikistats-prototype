<template>
<div v-if="breakdowns">
    <div class="ui clearing divider"></div>

    <h3 class="header">Filters and Breakdowns</h3>

    <div v-for="b, i in breakdowns">
        {{b.name}}
        <label class="xui checkbox" v-for="bv in b.values">
            <input type="checkbox" v-model="bv.on" :disabled="!b.on"/>
            {{bv.name}}
        </label>

        <div class="ui toggle checkbox">
            <input type="checkbox" id="breakdown" v-model="b.on" key="b.key" @click="breakdownToggled(i)">
            <label for="breakdown">
                Breakdown
                <span v-if="!b.on">Off</span>
                <span v-if="b.on">On</span>
                <i class="help circle icon" title="Breakdowns help you see more detail by breaking down the total values into parts."/>
            </label>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'breakdowns',
        props: ['breakdowns'],
        methods: {
            breakdownToggled (index) {
                if (this.breakdowns[index].on) {
                    this.breakdowns.forEach((b, i) => {
                        if(i != index) {
                            this.breakdowns[i].on = false;
                        }
                    })
                }
            }
        }
    }
</script>
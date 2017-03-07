<template>
<div class="area" :class="area.id">
    <div class="ui top attached header">
        {{area.name}}
    </div>
    <div class="ui attached basic segment">
        <ul>
            <li v-for="m in area.metrics">{{m}}</li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    name: 'dashboard-area',
    props: ['area'],
    data () {
        return {
        };
    },
}
</script>

<style src="../assets/semantic/segment.css"></style>
<style src="../assets/semantic/header.css"></style>
<style src="../assets/semantic/card.css"></style>
<style scoped>
.area .header { background-color: #E8E8E8; color: #5C5C5C; }

.area.contributing .header { border-bottom: 3px solid #C4CDDF; }
.area.reading .header { border-bottom: 3px solid #B8E9DE; }
.area.content .header { border-bottom: 3px solid #FFF1C6; }

/*
LIGHT BLUE: #C4CDDF
DARK BLUE: #2A4B8D

LIGHT GREEN: #B8E9DE
DARK GREEN: #00AF89

LIGHT YELLOW: #FFF1C6
DARK YELLOW: #FFCC33
*/

.contributing { }
.reading {}
.content {}
</style>

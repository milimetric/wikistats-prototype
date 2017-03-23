<template>
<div class="ui icon input" :class="{ fluid: fluid }">
    <input type="text" placeholder="Choose a Wiki" :value="wiki">
    <i class="search icon"></i>
</div>
</template>

<script>
export default {
    name: 'wiki-selector',
    props: ['wiki', 'fluid'],
}
</script>

<style>
.ui.icon.input > input {
    border: 1px solid #aaa9a9;
    border-radius: 4px;
    width: 260px;
    height: 48px;
    color: #4A4A4A;
    font-size: 17px;
}
</style>

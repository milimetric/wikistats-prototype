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

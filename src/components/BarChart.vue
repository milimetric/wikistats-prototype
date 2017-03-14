<template>
<div>
    Bar {{data}}
    <svg class="chart"></svg>
</div>
</template>

<script>
export default {
    name: 'bar-chart',
    props: ['data'],
}
</script>

<template>
<span></span>
</template>

<script>
import MoveTo from 'moveto'

export default {
    name: 'scroll-to',
    params: ['id'],

    mounted () {
        const moveTo = new MoveTo()
        const target = document.getElementsByClassName('html')

        moveTo.move(target)
        console.log('mounted')
        console.log(moveTo)
    },
}
</script>

<template>
<div class="top left">
    <div class="ui grey icon button">
        <i class="ui info circle icon"/>
        Explore Topics
        <i class="ui chevron right icon"/>
    </div>
</div>
</template>

<script>
export default {
  name: 'topic-explorer'
}
</script>

<style src="../assets/semantic/icon.css"></style>
<style src="../assets/semantic/button.css"></style>
<style scoped>
.top.left {
    position: absolute;
    top: 0;
    left: 0;
}
.top.left .button {
    border-radius: 0 0 0.28571429rem 0;
}
</style>

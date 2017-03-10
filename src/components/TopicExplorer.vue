<template>
<div class="top left">
    <transition name="slide">
        <div class="ui grey icon corner button"
             v-if="minimized"
             @click="minimized = false">
            <i class="ui info circle icon"/>
            Explore Topics
            <i class="ui chevron right icon"/>
        </div>
    </transition>
    <transition name="slide">
        <div class="ui grey inverted segment"
             v-if="!minimized">
            <i class="ui info circle icon"/>
            Explore Topics
            &nbsp;
            <div class="ui simple dropdown labeled search icon button">
                <span>How are people contributing?</span>
                <div class="menu">
                    <div class="item">Who is editing the most?</div>
                    <div class="item">How much are people reading?</div>
                    <div class="item">What devices are people reading on?</div>
                    <div class="item">What platforms are people reading on?</div>
                    <div class="item">How many articles are thre?</div>
                    <div class="item">What are the top edited articles?</div>
                    <div class="item">How much media is there (video, sound, images)?</div>
                </div>
                <i class="ui right floated dropdown icon"/>
            </div>
            <div class="ui blue button">Go</div>
            <span class="link" @click="minimized = true">
                <i class="ui remove icon"/>
            </span>
        </div>
    </transition>
</div>
</template>

<script>
export default {
  name: 'topic-explorer',

  data () {
      return {
          minimized: true,
      }
  }
}
</script>

<style scoped>
.top.left {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
}
.top.left .corner.button {
    border-radius: 0 0 0.28571429rem 0;
}

.top.left .ui.grey.inverted.segment {
    width: 100%;
    border-radius: 0;
}

.link { color: #ddd; cursor: pointer; }

.dropdown.button { width: 75%; }
</style>

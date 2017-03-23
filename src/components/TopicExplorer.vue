<template>
<div>
    <div v-if="!minimized" class="spacer"></div>
    <div class="top left">
        <div>
            <span class="ui grey icon corner button"
                 v-if="minimized"
                 @click="minimized = false">
                <i class="ui info circle icon"/>
                Explore Topics
                <i class="ui chevron right icon"/>
            </span>
        </div>
        <div class="ui grey inverted segment"
             v-if="!minimized">
            <i class="ui info circle icon"/>
            Explore Topics
            <div class="ui simple dropdown right labeled search icon button">
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
                <i class="dropdown icon"/>
            </div>
            <div class="ui blue button">Go</div>
            <span class="right floated">
                <span class="link" @click="minimized = true">
                    <i class="ui left chevron icon"/>
                </span>
            </span>
        </div>
    </div>
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
.right.floated {
    float: right;
    padding-top: 16px;
}
.top.left {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
}
.spacer {
    height: 38px;
}
.top.left .corner.button {
    padding: 10px;
    text-align: left;
    border-radius: 0 0 0.28571429rem 0;
    width: 170px;
    height: 40px;
    color: #fff;
    font-size: 16px;
}
.top.left .corner.button i.chevron.right {
    font-size: 18px;
    padding-top: 3px;
}

.top.left .ui.grey.inverted.segment {
    width: 100%;
    height: 84px;
    padding: 20px 30px;
    margin: 0;
    border-radius: 0;
    font-size: 16px;
    font-weight: bold;
}
.top.left .grey {
    background-color: #72777d!important;
}

.ui.grey.inverted.segment .left.chevron.icon {
    margin-left: 18px;
    /*color: #0a0b09;*/
    font-size: 18px;
}

.link { color: #ddd; cursor: pointer; }

.dropdown.button { width: 70%; margin-left: 10px; }
.ui.blue.button {
    background-color: #3366cc!important;
    width: 78px;

}
</style>

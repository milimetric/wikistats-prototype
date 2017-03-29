<template>
<div class="app">
    <h1 v-show="warning" class="ui red header">PROTOTYPE: Only tested in Chrome, No real data, "Loading Delay" is fake, This is a WORK IN PROGRESS</h1>
    <section class="ui top attached clearing segment">
        <top-nav></top-nav>
    </section>
    <section class="ui attached content segment">
        <topic-explorer></topic-explorer>

        <router-view :wiki="wiki" @wiki="wikiSelected"></router-view>
    </section>
    <section class="ui attached language segment">
        <site-language></site-language>
    </section>
    <section class="ui attached footer segment">
        <bottom-footer></bottom-footer>
    </section>
</div>
</template>

<script>
import TopNav from './components/TopNav'
import TopicExplorer from './components/TopicExplorer'
import SiteLanguage from './components/SiteLanguage'
import BottomFooter from './components/BottomFooter'
import ScrollTo from './components/ScrollTo'

export default {
    name: 'app',
    data () {
        return {
            warning: true,
            wiki: 'Wikipedia (All languages)'
        }
    },
    mounted () {
        const self = this
        setTimeout(function () {
            self.warning = false
        }, 7000)
    },
    components: {
        TopNav,
        TopicExplorer,
        SiteLanguage,
        BottomFooter,
        ScrollTo,
    },
    methods: {
        wikiSelected (wiki) {
            this.wiki = wiki
        }
    }
}
</script>

<style>
a { color: #6289D8; }
a:visited { color: #6289D8; }
a.router-link-active { color: #5C5C5C; }
a { font-weight: normal; color: #3366cc; }
a.router-link-active { font-weight: bold; color: #72777d }
.ui.dropdown { background-color: #fff; }
.ui.dropdown:hover { background-color: #fff; }

.ui.top.attached.clearing.segment {
    border-bottom: 4px solid #4A4A4A;
    padding: 35px 44px;
}
.ui.attached.content.segment {
    background-color: #F6F6F6;
    padding: 53px 32px 27px 32px;
}
.ui.attached.language.segment {
    height: 70px;
    background-color: #8D8D8D;
    border: solid 1px #d4d4d5;
    border-left: solid 1px #d4d4d5;
    border-right: solid 1px #d4d4d5;
    border-bottom: none;
}
.ui.attached.footer.segment {
    background-color: #3B3B3B;
    color: #AAAAAA;
    border: none;
}

/* remove this, just making the prototype line up with the design files */
.app { max-width: 1024px; min-width: 1024px; width: 1024px; margin: 0 auto; }
</style>

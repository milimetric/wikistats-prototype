<template>
<div>
    <h1 class="ui red header">PROTOTYPE: Only tested in Chrome, No real data, "Loading Delay" is fake, This is a WORK IN PROGRESS</h1>
    <section class="ui top attached clearing segment">
        <top-nav></top-nav>
    </section>
    <section class="ui attached content segment">
        <topic-explorer></topic-explorer>
        <router-view></router-view>
        <scroll-to :id="app"></scroll-to>
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
    components: {
        TopNav,
        TopicExplorer,
        SiteLanguage,
        BottomFooter,
        ScrollTo,
    }
}
</script>

<style>
a { color: #6289D8; }
a:visited { color: #6289D8; }
a.router-link-active { color: #5C5C5C; }

.ui.top.attached.clearing.segment {
    border-bottom: 3px solid #4A4A4A;
    padding: 30px 40px;
}
.ui.attached.content.segment {
    background-color: #F5F5F5;
}
.ui.attached.language.segment {
    background-color: #8C8C8C;
    color: #eaeaea;
}
.ui.attached.footer.segment {
    background-color: #3B3B3B;
    color: #AAAAAA;
}

</style>

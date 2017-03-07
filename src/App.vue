<template>
<div>
    <section class="ui top attached clearing segment">
        <top-nav></top-nav>
    </section>
    <section class="ui attached content segment">
        <topic-explorer></topic-explorer>
        <router-view></router-view>
    </section>
    <section class="ui attached language segment">
        <site-language></site-language>
    </section>
    <section class="ui attached footer segment">
        <bottom-footer></bottom-footer>
    </section>
</div>
</template>

<style src="./assets/semantic/segment.css"></style>
<script>
import TopNav from './components/TopNav'
import TopicExplorer from './components/TopicExplorer'
import SiteLanguage from './components/SiteLanguage'
import BottomFooter from './components/BottomFooter'

export default {
    name: 'app',
    components: {
        TopNav,
        TopicExplorer,
        SiteLanguage,
        BottomFooter,
    }
}
</script>

<style>
a { color: #6289D8; }
a:visited { color: #6289D8; }
a.router-link-active { color: #5C5C5C; }

.top.clearing.segment {
    border-bottom: 3px solid #4A4A4A;
    padding: 30px 40px!important;
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
/*
TOP: #FFFFFF
TOP LINKS: #6289D8
TOP UNDERLINE: #4A4A4A
BODY BACKGROUND: #F5F5F5
WIDGET HEADER: #E8E8E8
WIDGET TEXT: #5C5C5C
EXPLORE BACKGROUND: #72777D
LANGUAGE BACKGROUND: #8C8C8C
FOOTER BACKGROUND: #3B3B3B

LIGHT BLUE: #C4CDDF
DARK BLUE: #2A4B8D

LIGHT GREEN: #B8E9DE
DARK GREEN: #00AF89

LIGHT YELLOW: #FFF1C6
DARK YELLOW: #FFCC33
*/
</style>

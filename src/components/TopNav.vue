<template>
<div class="ui items">
    <div class="item">
        <div class="ui mini image">
            <img src="../assets/Wikimedia-logo.svg">
        </div>
        <div class="middle aligned content">
            <h1 class="left floated title header">
                Wikimedia Statistics
            </h1>
            <div class="right floated link header">
                <router-link exact
                    v-for="a in areas" :to="a.path"
                    :key="a.name">
                    {{a.name}}
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'top-nav',
    data () {
        return {
            areas: [
                { path: '/', name: 'Dashboard' },
                { path: '/contributing', name: 'Contributing' },
                { path: '/reading', name: 'Reading' },
                { path: '/content', name: 'Content' },
            ]
        };
    },
    methods: {
    },
}
</script>

<style scoped>
.title.header { font-size: 18pt!important; }
.link.header { padding-top: 6px; }
.link.header a {
    margin-left: 10px;
    font-size: 12pt;
}
</style>

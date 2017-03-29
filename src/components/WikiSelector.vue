<template>
<div>
    <div class="ui search">
        <div class="ui icon input">
            <input class="prompt" type="text" :placeholder="single ? 'Choose a Wiki' : 'Add another Wiki'" :value="wiki"/>
            <i class="search icon"></i>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'wiki-selector',
    props: ['wiki', 'single'],

    mounted () {
        const self = this

        $('.ui.search').search({
            onSelect (wiki) {
                self.$emit('wiki', wiki.title)
                $('.ui.search', self.$el).removeClass('focus')
            },
            source: [
                { title: 'Commons' },
                { title: 'Wikibooks (All languages)' },
                { title: 'Wikidata' },
                { title: 'Wikinews (All languages)' },
                { title: 'Wikipedia (All languages)' },
                { title: 'Wikiquote (All languages)' },
                { title: 'Wikisource (All languages)' },
                { title: 'Wikispecies (All languages)' },
                { title: 'Wikiversity (All languages)' },
                { title: 'Wikivoyage (All languages)' },
                { title: 'Wiktionary (All languages)' },
            ],
            searchFields   : [
                'title'
            ],
            searchFullText: true,
        })
    }
}
</script>

<style>
.ui.search .results { margin-top: 0; }

.ui.search.focus .ui.input input {
    background-color: #c0c1c2;
    border-color: #979797;
}
</style>

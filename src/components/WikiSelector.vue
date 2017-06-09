<template>
<div>
    <div class="ui search">
        <div class="ui icon input">
            <input class="prompt" type="text" :placeholder="single ? 'Choose a Wiki' : 'Add another Wiki'" :value="wiki.title"/>
            <i class="search icon"></i>
        </div>
    </div>
</div>
</template>

<script>
import '../../semantic/src/definitions/modules/search.js';
import Sitematrix from '../apis/Sitematrix'

export default {
    name: 'wiki-selector',
    props: ['wiki', 'single'],

    mounted () {
        const self = this
        var sitematrix = new Sitematrix();
        sitematrix.getWikiList().done(function (data) {
            $('.ui.search').search({
                onSelect (wiki) {
                    self.$emit('wiki', wiki)
                    $('.ui.search', self.$el).removeClass('focus')
                },
                source: data,
                searchFields   : [
                    'title'
                ],
                searchFullText: true
            })
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

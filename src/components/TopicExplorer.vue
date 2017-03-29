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
                <span v-if="!selectedQuestion" class="subdued">Find questions you are interested in and click Go for the answers</span>
                <span v-if="selectedQuestion">
                    {{selectedQuestion.q}}
                    <span class="subdued">metric: {{selectedQuestion.m}}</span>
                </span>
                <div class="menu">
                    <h4>Contributing</h4>
                    <div class="item" v-for="q in contributingQuestions"
                        @click="selectQuestion(q)">
                        {{q.q}} <span class="subdued">metric: {{q.m}}</span>
                    </div>

                    <h4>Reading</h4>
                    <div class="item" v-for="q in readingQuestions"
                        @click="selectQuestion(q)">
                        {{q.q}} <span class="subdued">metric: {{q.m}}</span>
                    </div>

                    <h4>Content</h4>
                    <div class="item" v-for="q in contentQuestions"
                        @click="selectQuestion(q)">
                        {{q.q}} <span class="subdued">metric: {{q.m}}</span>
                    </div>

                    <h4>More</h4>
                    <div class="item" v-for="q in moreQuestions"
                        @click="selectQuestion(q)">
                        {{q.q}} <span class="subdued">metric: {{q.m}}</span>
                    </div>
                </div>
                <i class="dropdown icon"/>
            </div>
            <div class="ui blue button" @click="go">Go</div>
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
import r from '../router/index'
import _ from 'lodash'

const questions = [
    {f: true, a: 'contributing', m: 'Top Contributors', q: 'Who are the top contributors?'},
    {a: 'contributing', m: 'New Editors', q: 'How many new editors are there?'},
    {a: 'contributing', m: 'Newly registered users', q: 'How many new users are there?'},
    {f: true, a: 'contributing', m: 'Active Editors', q: 'How many active editors are there?'},
    {a: 'contributing', m: 'Total editors', q: 'How many editors are there?'},
    {a: 'contributing', m: 'Editors by language', q: 'How many editors are there in the most populated countries?'},
    {f: true, a: 'contributing', m: 'Total Edits', q: 'How many edits have been made?'},
    {a: 'contributing', m: 'Non-bot edits', q: 'How many edits have been made by registered human users?'},
    {a: 'contributing', m: 'Anonymous edits', q: 'How many edits have been made by anonymous users?'},
    {a: 'contributing', m: 'Edits per article', q: 'How many edits does an article receive on average?'},
    {a: 'contributing', m: 'Top edited articles', q: 'What are the most edited articles?'},
    {a: 'contributing', m: 'Total Reverts', q: 'How many edits undo previous edits?'},
    {f: true, a: 'reading', m: 'Total Pageviews', q: 'How many times are articles viewed?'},
    {f: true, a: 'reading', m: 'Unique Devices', q: 'How many unique devices access content?'},
    {f: true, a: 'reading', m: 'Most Viewed Articles', q: 'What are the most viewed articles?'},
    {a: 'reading', m: 'Article Pageviews', q: 'How many times is an article viewed, on average?'},
    {a: 'reading', m: 'Page Views per Edit?', q: 'How many times is a particular article version viewed?'},
    {f: true, a: 'content', m: 'Total Articles', q: 'How many articles are there?'},
    {f: true, a: 'content', m: 'Media Uploads', q: 'How much media is there (video, sound, images)?'},
    {f: true, a: 'content', m: 'New articles', q: 'How many new articles are added?'},
    {a: 'content', m: 'Article size (bytes)', q: 'What is the size of all articles in bytes?'},
    {a: 'content', m: 'Articles with most edits', q: 'What articles have the most edits?'},
    {a: 'content', m: 'Articles with most contributors', q: 'What are the articles with the most contributors?'},
    {a: 'content', m: 'Reference Links', q: 'Where do articles link to?'},
]

export default {
  name: 'topic-explorer',

  data () {
      return {
          minimized: true,

          selectedQuestion: null
      }
  },

  computed: {
      contributingQuestions: function () {
          return questions.filter((m) => m.f && m.a === 'contributing')
      },
      readingQuestions: function () {
          return questions.filter((m) => m.f && m.a === 'reading')
      },
      contentQuestions: function () {
          return questions.filter((m) => m.f && m.a === 'content')
      },
      moreQuestions: function () {
          return questions.filter((m) => !m.f)
      }
  },

  methods: {
      selectQuestion (q) {
          this.selectedQuestion = q
      },

      go () {
          const s = this.selectedQuestion
          r.push('/' + s.a + '/' + _.kebabCase(s.m))
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

.ui.simple.dropdown.right.labeled.search.icon.button h4 {
    margin: 6px 8px;
}
.ui.simple.dropdown.right.labeled.search.icon.button .item {
    padding: 6px 8px!important;
}
.ui.simple.dropdown.right.labeled.search.icon.button .subdued {
    margin-left: 10px;
}
.ui.simple.dropdown.right.labeled.search.icon.button .menu {
    border-radius: 0;
    min-height: 340px;
    overflow-y: scroll;
}
</style>

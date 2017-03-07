<template>
<section>
    <i class="ui globe icon"/>
    Choose your preferred language
    <div class="ui dropdown labeled search icon button">
        <span>English</span>
        <div class="menu">
            <div class="item">English</div>
            <div class="item">French</div>
            <div class="item">Cantonese Chinese</div>
            <div class="item">Arabic</div>
        </div>
        <i class="ui right floated dropdown icon"/>
    </div>
</section>
</template>

<script>
export default {
  name: 'site-language'
}
</script>

<style src="../assets/semantic/icon.css"></style>
<style src="../assets/semantic/dropdown.css"></style>
<style scoped>
.ui.dropdown { margin-left: 10px; }
</style>

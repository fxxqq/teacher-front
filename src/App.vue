<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font: 16px"Arial", sans-serif;
    background: #f5f5f5;
}
@import "@/public/sass/reset";
@import "@/public/sass/mixin";
</style>

<script setup>

import Header from './layouts/Header.vue';
import Main from './layouts/Main.vue';
import Footer from './layouts/Footer.vue';
import Blog from './layouts/Blog.vue';
import BlogSection from "./sections/BlogSection.vue";
import { ref } from 'vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <Header/>

    <RouterView/>

    <Footer />
</template>

<style scoped></style>

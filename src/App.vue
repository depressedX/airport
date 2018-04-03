<template>
    <el-container id="app">
        <el-aside width="200px">
            <the-aside/>
        </el-aside>
        <el-main class="main">
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
    import TheAside from './components/TheAside'


    export default {
        name: 'app',
        components: {
            TheAside
        },
        mounted() {
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 0px;

        height: 100%;
    }

    .main {
        background-color: rgb(238, 238, 238);
    }
</style>

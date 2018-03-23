<template>
    <el-container id="app">
            <el-aside width="200px"><the-aside/></el-aside>
            <el-main class="main">
                <div class="top-line">
                    <control-button-panel/>
                    <direction-pie/>
                </div>
            </el-main>
    </el-container>
</template>

<script>
    import TheAside from './components/TheAside'
    import ControlButtonPanel from './components/ControlButtonPanel'
    import DirectionPie from './components/DirectionPie'

    export default {
        name: 'app',
        components: {
            TheAside,
            ControlButtonPanel,
            DirectionPie
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;

        height: 100%;
    }
    .top-line{
        display: flex;
        justify-content: space-between;
    }
    .main{
        background-color: rgb(238,238,238);
    }
</style>

<template>
    <el-container id="app">
        <el-aside width="200px">
            <the-aside/>
        </el-aside>
        <el-main class="main">
            <div class="row row-1">
                <control-button-panel/>
                <direction-pie/>
            </div>
            <h1 class="row row-2">{{dataType===ENTER?'进港表':(dataType===LEAVE?'出港表':'进港出港表')}}(总数:{{dataNum}}个)</h1>
            <div class="row row-3">
                <line-port-counting-chart type="line"/>
            </div>
            <div class="row row-4">
                <line-port-counting-chart type="bar"/>
            </div>
            <div class="row row-5">
                <direction-img/>
            </div>
            <div class="row row-6" style="width: 1260px">
                <enter-port-table/>
            </div>
            <div class="row row-7" style="width: 1260px;">
                <leave-port-table/>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import TheAside from './components/TheAside'
    import ControlButtonPanel from './components/ControlButtonPanel'
    import DirectionPie from './components/DirectionPie'
    import LinePortCountingChart from './components/PortCountingChart'
    import DirectionImg from './components/DirectionImg'
    import EnterPortTable from './components/EnterPortTable'
    import LeavePortTable from './components/LeavePortTable'

    import store from './store/store'

    let state = store.state,
        getters = store.getters

    export default {
        name: 'app',
        components: {
            TheAside,
            ControlButtonPanel,
            DirectionPie,
            LinePortCountingChart,
            DirectionImg,
            EnterPortTable,
            LeavePortTable
        },
        mounted() {
        },
        computed: {
            dataType: () => state.dataState.dataType,

            ENTER: () => state.dataState.ENTER,
            LEAVE: () => state.dataState.LEAVE,
            BOTH: () => state.dataState.BOTH,

            dataNum() {
                if (this.dataType === this.ENTER) {
                    return getters.enterPortData.length
                } else if (this.dataType === this.LEAVE) {
                    return getters.leavePortData.length
                } else {
                    return getters.enterPortData.length + getters.leavePortData.length
                }
            }
        }
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

    .main > .row-1 {
        display: flex;
        justify-content: space-between;
    }

    .main {
        background-color: rgb(238, 238, 238);
    }
</style>

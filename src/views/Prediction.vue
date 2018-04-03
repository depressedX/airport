<template>
    <div class="prediction">
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
            <enter-port-table v-if="dataType===ENTER||dataType===BOTH"/>
        </div>
        <div class="row row-7" style="width: 1260px;">
            <leave-port-table v-if="dataType===LEAVE||dataType===BOTH"/>
        </div>
    </div>
</template>

<script>
    import ControlButtonPanel from '../components/ControlButtonPanel'
    import DirectionPie from '../components/DirectionPie'
    import LinePortCountingChart from '../components/PortCountingChart'
    import DirectionImg from '../components/DirectionImg'
    import EnterPortTable from '../components/EnterPortTable'
    import LeavePortTable from '../components/LeavePortTable'

    import store from '../store/store'

    let state = store.state,
        getters = store.getters

    export default {
        name: "predictions",
        created(){
            store.dispatch('refreshAllData')
        },
        components:{
            ControlButtonPanel,
            DirectionPie,
            LinePortCountingChart,
            DirectionImg,
            EnterPortTable,
            LeavePortTable
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

<style scoped>

    .prediction > .row-1 {
        display: flex;
        justify-content: space-between;
    }

</style>
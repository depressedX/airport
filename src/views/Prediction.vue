<template>
    <div class="prediction">
        <div class="row row-1">
            <control-button-panel/>
            <direction-pie class="direction-pie"/>
        </div>
        <h3 style="color: #d95459;font-size: 1.5em;margin:30px 0 0.7em 0;text-align: left;font-weight: 500;" 
            class="row row-2">{{dataType===ENTER?'进港表':(dataType===LEAVE?'出港表':'进港出港表')}}(总数:{{dataNum}}个)</h3>
        <div class="row row-3">
            <line-port-counting-chart type="line"/>
        </div>
        <div class="row row-4">
            <line-port-counting-chart type="bar"/>
        </div>
        <div class="row row-5">
            <direction-img/>
        </div>
        <div class="row row-6 table-container">
            <enter-port-table class="table-1" v-if="dataType===ENTER||dataType===BOTH"/>
            <leave-port-table class="table-2" v-if="dataType===LEAVE||dataType===BOTH"/>
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
    import {PermissionDenied} from "../errors";

    import store from '../store/store'

    let state = store.state,
        getters = store.getters

    export default {
        name: "predictions",
        created(){
            store.dispatch('refreshAllData').catch(error=>{
                console.log(error)
                if (error instanceof PermissionDenied){
                    this.$router.push('/permissionDenied')
                }else {
                    this.$alert(error.message)
                }
            })
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

    .prediction{
        position: relative;
    }
    .prediction .direction-pie{
        width: 45%;
        height: 250px;
        position: absolute;
        top: 5px;
        right: 10px;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        background-color: transparent;
    }
    .prediction .table-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 20px;
    }
    .prediction .table-container .table-1,.prediction .table-container .table-2{
        /*flex: 1 1 48%;*/
        flex: none;
        margin: 0 10px;
    }
    

</style>
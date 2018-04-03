<template>
    <div>
        <div class="row row-1">
            <el-slider
                    v-model="timeRange"
                    range
                    show-stops
                    :max="100">
            </el-slider>
        </div>
        <div class="row row-2">
            <el-button>开始时间 {{userTimeStart | dateTime}}</el-button>
            <el-button>结束时间 {{userTimeEnd | dateTime}}</el-button>
            <el-button type="success" :disabled="submiting" @click="refreshHistoryData">搜索</el-button>
        </div>
        <div class="row row-3">
            <p class="description">
                在<em>{{historyStart |dateTime}}</em>至<em>{{historyEnd |dateTime}}</em>时间内进港航班总计<em>{{enterCount}}</em>架，
                出港航班总计<em>{{leaveCount}}</em>架，进出港港航班总计<em>{{enterCount+leaveCount}}</em>架
            </p>
        </div>
        <div class="row row-4">
            <data-type-control-button-panel/>
        </div>
        <div class="row row-5">
            <port-counting-chart type="line"/>
        </div>
        <div class="row row-6">
            <port-counting-chart type="bar"/>
        </div>
        <div class="row row-7">
            <enter-port-table v-if="historyDataType===ENTER||historyDataType===BOTH"/>
        </div>
        <div class="row row-8">
            <leave-port-table v-if="historyDataType===LEAVE||historyDataType===BOTH"/>
        </div>
    </div>
</template>

<script>
    import store from '../store/store'
    import {Formatter} from '../util'
    import PortCountingChart from '../components/history/PortCountingChart'
    import DataTypeControlButtonPanel from '../components/history/DataTypeControlButtonPanel'
    import EnterPortTable from '../components/history/EnterPortTable'
    import LeavePortTable from '../components/history/LeavePortTable'

    let state = store.state,
        getters = store.getters

    export default {
        name: "statistics",
        components: {
            DataTypeControlButtonPanel,
            PortCountingChart,
            EnterPortTable,
            LeavePortTable
        },
        data() {
            window.Formatter = Formatter
            return {
                timeRange: [0, 100],

                // 是否正在提交搜索
                submiting:false
            }
        },
        methods: {
            refreshHistoryData() {
                this.submiting = true
                store.dispatch('refreshHistoryData', {start: this.userTimeStart, end: this.userTimeEnd}).then(
                    ()=>{
                        this.submiting = false
                    },
                    error=>{
                        this.submiting = false
                    }
                )
            }
        },
        computed: {
            now:()=>getters.now,

            timeStart() {
                return this.now - 7 * 24 * 60 * 60 * 1000
            },
            timeEnd() {
                return this.now
            },

            userTimeStart() {
                return this.timeStart + this.timeRange[0] / 100 * (this.timeEnd - this.timeStart)
            },
            userTimeEnd() {
                return this.timeStart + this.timeRange[1] / 100 * (this.timeEnd - this.timeStart)
            },



            enterCount: () => state.enterHistory.length,
            leaveCount: () => state.leaveHistory.length,

            historyDataType: () => state.historyDataType,
            ENTER: () => state.dataState.ENTER,
            LEAVE: () => state.dataState.LEAVE,
            BOTH: () => state.dataState.BOTH,

            historyStart:()=>state.historyStart,
            historyEnd:()=>state.historyEnd,
        },
        filters: {
            dateTime: value => (typeof value === 'number' || value instanceof Number) ? `${Formatter.formatDate(value)} ${Formatter.formatTime(value)}` : value
        }
    }
</script>

<style scoped>
    .description em {
        color: #f56c6c;
    }
</style>
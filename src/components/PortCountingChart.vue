<template>
    <div ref="chart" :style="chartSize"></div>
</template>

<script>
    import echarts from 'echarts'
    import {Formatter} from "../util"
    import store from '../store/store'

    let state = store.state,
        getters = store.getters

    export default {
        name: "port-counting-chart",
        props: {
            chartSize: {
                type: Object,
                default: () => ({
                    width: '1260px',
                    height: '625px'
                })
            },
            // 图表类型  line  bar
            type: {
                type: String,
                validator(v) {
                    return v === 'line' || v === 'bar'
                },
                default:'line'
            }
        },
        data() {
            return {
                chart: null,
                option: {
                    tooltip: {
                        trigger: 'axis',
                        formatter(params, ticket) {
                            return `${params[0].axisValue}后<br/>预计航班 ${params[0].data}`
                        }
                    },
                    legend: {
                        data: ['预计航班'],
                        left: 'left'
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: false
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: [],
                            interval: 1,
                            axisLabel: {
                                show: true,
                                rotate: 30,
                                margin: 5,
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitNumber: 2,
                            min: 0,
                            max: 20,
                            interval: 1,
                            axisLabel: {
                                show: true,
                                interval: 0,
                                rotate: 0,
                                margin: 10,
                            }
                        }
                    ],
                    series: [
                        {
                            name: '出港',
                            type: this.type,
                            stack: this.type+(this.type==='bar'?'':'1'),
                            data: []
                        },
                        {
                            name: '进港',
                            type: this.type,
                            stack: this.type+(this.type==='bar'?'':'2'),
                            data: [],
                        }
                    ],

                }
            }
        },
        mounted() {
            // 初始化图表
            this.$nextTick(() => {
                // 基于准备好的dom，初始化echarts实例
                this.chart = echarts.init(this.$refs.chart)
                this.chart.setOption(this.option)
                this.updateAxisX()
            })
        },
        methods: {
            generalAxisXList() {
                let axisXList = []
                let startTime = this.timeStart
                let allSteps = Math.floor(this.duration * 60 / this.step) + 1
                for (let curTime = startTime, i = 0; i < allSteps; i++, curTime += this.step * 60 * 1000) {
                    axisXList.push(Formatter.formatTime(curTime))
                }
                return axisXList
            },


            // 更新this.option的series
            updateSeries() {
                this.option.series.forEach(v => {
                    if (v.name === '出港') {
                        if (this.dataType === this.ENTER) {
                            v.data = []
                        } else {
                            v.data = this.mapPortData(this.leavePortData)
                        }
                    } else if (v.name === '进港') {
                        if (this.dataType === this.LEAVE) {
                            v.data = []
                        } else {
                            v.data = this.mapPortData(this.enterPortData)
                        }
                    }
                })

                // 更改当前时间显示轴
                this.option.series[2] = {
                    name: '当前时间',
                    type: 'line',
                    markLine: {
                        data: [
                            [{
                                name: Formatter.formatTime(this.now),
                                x: 5 + (this.now - this.timeStart) / (this.duration * 60 * 60 * 1000) * 100 * .9 + '%',
                                y: '95%'
                            }, {
                                x: 5 + (this.now - this.timeStart) / (this.duration * 60 * 60 * 1000) * 100 * .9 + '%',
                                y: '25%'
                            }]
                        ]
                    }
                }
                this.chart.setOption(this.option)
            },
            // 更新this.option的X轴
            updateAxisX() {
                let axisX = this.generalAxisXList()
                this.option.xAxis[0].data = axisX

                this.updateSeries()
            },

            // 将飞行数据按duration和step映射到X轴上   返回数组
            mapPortData(arr) {
                let res = []
                for (let i = 0; i < Math.floor(this.duration * 60 / this.step) + 1; i++) {
                    res[i] = 0
                }
                arr.forEach(v => {
                    let startIndex = Math.ceil((this.now + v.minutes * 60 * 1000 - this.timeStart) / this.step / 60 / 1000),
                        endIndex = Math.ceil((this.now + v.minutes * 60 * 1000 + v.interval * 60 * 1000 - this.timeStart) / this.step / 60 / 1000)
                    startIndex = Math.max(startIndex, 0)
                    endIndex = Math.min(endIndex, Math.floor(this.duration * 60 / this.step) + 1)
                    for (let i = startIndex; i < endIndex; i++) {
                        res[i]++
                    }
                })
                return res
            }
        },
        computed: {
            timeStart() {
                return this.now - (new Date(this.now).getMinutes() % this.step) * 60 * 1000 - 60 * 60 * 1000
            },

            now: () => getters.now,
            step: () => state.dataState.step,
            duration: () => state.dataState.duration,

            dataType: () => state.dataState.dataType,
            ENTER: () => state.dataState.ENTER,
            LEAVE: () => state.dataState.LEAVE,
            BOTH: () => state.dataState.BOTH,

            leavePortData: () => getters.leavePortData,
            enterPortData: () => getters.enterPortData,
        },
        watch: {
            dataType(v) {
                this.updateSeries()
            },
            leavePortData() {
                this.updateSeries()
            },
            enterPortData() {
                this.updateSeries()
            },

            // 改变X轴必然要重新计算数据
            duration() {
                this.updateAxisX()
            },
            step() {
                this.updateAxisX()
            },
        }
    }
</script>

<style scoped>

</style>
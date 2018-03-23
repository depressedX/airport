<template>
    <div id="direction-pie"></div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "direction-pie",
        data() {
            return {
                directionChart: null
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.directionChart = echarts.init(document.getElementById('direction-pie'));
                let option = {
                        title: {
                            text: '方向分步图',
                            x: 'center',
                            left: 'left'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: function (params, ticket, callback) {
                                var reslut = "";
                                reslut = params.seriesName + "--" + params.name;
                                reslut += " : " + params.data.value;
                                reslut += "<br>" + params.data.context;
                                return reslut;
                            }
                        },
                        legend: {
                            x: 'center',
                            y: 'bottom',
                            data: ['东', '南', '西', '北']
                        }
                        ,
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {
                                    show: true
                                }
                                ,
                                dataView: {
                                    show: true, readOnly: false
                                }
                                ,
                                magicType: {
                                    show: true,
                                    type: ['pie', 'funnel']
                                }
                                ,
                                restore: {
                                    show: true
                                }
                                ,
                                saveAsImage: {
                                    show: true
                                }
                            }
                        }
                        ,
                        calculable: true,
                        series: [
                            {
                                name: '方向分步图',
                                type: 'pie',
                                radius: [15, 75],
                                center: ['50%', 125],
                                roseType: 'area',
                                startAngle: 45,
                                data: [
                                    {value: 2, name: '东', context: 'test'},
                                    {value: 5, name: '南', context: 'test'},
                                    {value: 3, name: '西', context: 'test'},
                                    {value: 7, name: '北', context: 'test'}
                                ]
                            }
                        ]
                    }
                ;
                this.directionChart.setOption(option);
            })
        }
    }
</script>

<style scoped>
    #direction-pie {
        width: 300px;
        height: 300px;
    }
</style>
<template>
    <div class="control-button-panel">
        <div class="row row-1" style="margin-left: .5em">
            <el-button :type="dataType===ENTER?'success':''" @click="changeDataType(ENTER)">进港表</el-button>
            <el-button :type="dataType===LEAVE?'success':''" @click="changeDataType(LEAVE)">出港表</el-button>
            <el-button :type="dataType===BOTH?'success':''" @click="changeDataType(BOTH)">出港进港表</el-button>
        </div>
        <div class="row row-2">
            <el-select @change="changeTrackId" :value="trackId" placeholder="选择跑道" style="width: 8em;margin: 0 .5em">
                <el-option
                        v-for="id in trackIds"
                        :key="id"
                        :label="id+'跑道'"
                        :value="id">
                </el-option>
            </el-select>
            <el-select :value="isFly" @change="changeIsFly" placeholder="开飞选择" style="width: 8em;margin: 0 .5em">
                <el-option
                        :key="true"
                        label="开飞"
                        :value="true">
                </el-option>
                <el-option
                        :key="false"
                        label="不开飞"
                        :value="false">
                </el-option>
            </el-select>
            <el-select :value="duration" @change="changeDuration" placeholder="时间区间" style="width: 8em;margin: 0 .5em">
                <el-option
                        v-for="i in 3"
                        :key="i"
                        :label="i+'小时'"
                        :value="i">
                </el-option>
            </el-select>
            <el-select :value="step" @change="changeStep" placeholder="分钟" style="width: 8em;margin: 0 .5em">
                <el-option
                        :key="1"
                        :label="1+'分钟'"
                        :value="1">
                </el-option>
                <el-option
                        :key="5"
                        :label="5+'分钟'"
                        :value="5">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    import store from '../store/store'

    let state = store.state,
        getters = store.getters

    export default {
        name: "control-button-panel",
        data() {
            return {
            }
        },
        computed: {
            trackIds: () => state.dataState.trackIds,
            trackId: () => state.dataState.trackId,
            isFly:()=>state.dataState.isFly,
            duration:()=>state.dataState.duration,
            step:()=>state.dataState.step,
            dataType:()=>state.dataState.dataType,

            ENTER:()=>state.dataState.ENTER,
            LEAVE:()=>state.dataState.LEAVE,
            BOTH:()=>state.dataState.BOTH,
        },
        methods:{
            changeDataType(type){
                store.commit('changeDataType',type)
            },
            changeTrackId(id){
                store.commit('changeTrackId',id)
            },
            changeIsFly(v){
                store.commit('changeIsFly',v)
            },
            changeDuration(duration){
                store.commit('changeDuration',duration)
            },
            changeStep(step){
                store.commit('changeStep',step)
            }
        }
    }


</script>

<style scoped>
    .control-button-panel > .row {
        line-height: 3em;
    }
</style>
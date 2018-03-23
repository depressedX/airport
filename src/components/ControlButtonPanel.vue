<template>
    <div>
        <div class="row row-1">
            <el-button>出港表</el-button>
            <el-button type="success">进港表</el-button>
            <el-button>出港进港表</el-button>
        </div>
        <div class="row row-2">
            <el-select v-model="trackId" placeholder="选择跑道" style="width: 8em;margin: 0 .5em">
                <el-option
                        :key="1"
                        label="01跑道"
                        :value="1">
                </el-option>
                <el-option
                        :key="19"
                        label="19跑道"
                        :value="19">
                </el-option>
            </el-select>
            <el-select v-model="isFly" placeholder="开飞选择" style="width: 8em;margin: 0 .5em">
                <el-option
                        :key="1"
                        label="开飞"
                        :value="true">
                </el-option>
                <el-option
                        :key="19"
                        label="不开飞"
                        :value="false">
                </el-option>
            </el-select>
            <el-select v-model="duration" placeholder="时间区间" style="width: 8em;margin: 0 .5em">
                <el-option
                        v-for="i in 3"
                        :key="i"
                        :label="i+'小时'"
                        :value="i">
                </el-option>
            </el-select>
            <el-select v-model="duration" placeholder="分钟" style="width: 8em;margin: 0 .5em">
                <el-option
                        v-for="i in 3"
                        :key="i"
                        :label="i+'小时'"
                        :value="i">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "control-button-panel",
        data(){
            return{
                trackId:1,
                isFly:false,
                duration:3
            }
        }
    }


</script>

<style scoped>
    .row{
        margin: .75em .2em;
    }
</style>
<template>
    <div class="the-aside">
        <h1>山东空管流量预测系统</h1>
        <p class="time">{{time}}</p>
        <p class="username">{{username}}</p>
        <div class="button-group">
            <a href="/" style="display: inline-block">
                <el-button type="primary" style="width: 100%;margin-bottom: 1em">进近流量预测</el-button>
            </a>
            <a href="/" style="display: inline-block">
                <el-button type="success"  style="width: 100%">退出登录</el-button>
            </a>
        </div>
    </div>
</template>

<script>
    import store from '../store/store'
    import {Formatter} from "../util";

    const state = store.state

    export default {
        name: "the-aside",
        computed: {
            time() {
                return Formatter.formatDate(state.JNowTime) + ' ' + Formatter.formatTime(state.JNowTime)
            },
            username: () => state.username
        },
        methods: {}
    }
</script>
<style scoped>
    .the-aside{
        background-color: rgb(238,226,226);
        height: 100%;
    }
    .button-group{
        display: flex;
        justify-content: stretch;
        flex-direction: column;
    }
    h1{
        margin: 0;
        padding: 1em .5em;
    }
</style>
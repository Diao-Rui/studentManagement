<template>
    <div class="navHead">
        <div class="navHead-btn">
            <el-button type="text" icon="el-icon-menu"
                style="background-color: #e3362d;width: 50px;height: 100%;color: #fff; border-radius: 0%;"></el-button>
        </div>
        <div class="select-box">
            <el-select size="small" style="width: 20%; margin-left: 10%;" v-model="value" placeholder="请选择">
                <el-option v-for="item in cities" :key="item" :label="item" :value="item">
                    <el-button type="text" icon="el-icon-location-outline"></el-button>
                    <span style="margin-left: 5%; color: #8492a6; font-size: 13px">{{ item }}</span>
                </el-option>
            </el-select>
            <el-select size="small" style="width: 30%;margin-left: 2%;" v-model="value" placeholder="请选择">
                <el-option v-for="item in cities" :key="item" :label="item" :value="item">
                    <el-button type="text" icon="el-icon-location-outline"></el-button>
                    <span style="margin-left: 5%; color: #8492a6; font-size: 13px">{{ item }}</span>
                </el-option>
            </el-select>
        </div>
        <div class="navHead-span">
            <span class="span-box">工单</span>
            <span class="span-box">运维管理</span>
            <span class="span-box">企业</span>
            <span class="span-box">查看日志</span>
            <span class="span-box">帮助文档</span>
        </div>
        <div class="userBox">
            <el-avatar style="margin-top: 8%;" size="small"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span>admin</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavHead',
    data() {
        return {
            cities: ['成都一区', '成都二区'],
            value: '成都一区'
        }
    },
}
</script>

<style lang="scss">
.navHead {
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    margin-bottom: 3px;
    box-shadow: 0 0 5px 0 #e8e9ea;
}

.userBox {
    width: 10%;
    display: flex;
    text-align: center;
    height: 50px;
    line-height: 50px;
}

.navHead-btn {
    width: 10%;
}

.select-box {
    width: 40%;
    height: 50px;
    display: flex;
    align-content: space-between;
    line-height: 50px;
}

.navHead-span {
    width: 40%;
    display: flex;
    align-items: center;
    margin-left: 10%;

    .span-box {
        margin-right: 10px;
        height: 45px;
        width: 15%;
        text-align: center;
        line-height: 45px;
        background: none;
        display: inline-block;
        font-size: 13px;
    }
}

.span-box:hover {
    background: none;
    border-bottom: 3px solid #e3362d;
}
</style>
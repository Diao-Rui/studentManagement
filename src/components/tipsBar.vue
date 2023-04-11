<template>
    <div v-show="isInfoTips" class="table-info-tips">
        <span><i class="el-icon-warning-outline"></i> {{ title }}</span>
        <span style="float: right" @click="isInfoTips = false">
            <el-tooltip class="item" effect="light" content="隐藏提示栏" placement="left">
                <i style="width:10px;border:0;font-size: 14px;" class="el-tooltip el-icon-circle-close"></i>
            </el-tooltip>
        </span>
    </div>
</template>

<script>
export default {
    props: ['title'],
    data() {
        return {
            isInfoTips: true
        }
    },
}
</script>

<style>
.table-info-tips {
    margin-bottom: 16px;
    border-left: 3px solid #e3362d;
    background: #fafafa;
    padding: 16px;
}
</style>
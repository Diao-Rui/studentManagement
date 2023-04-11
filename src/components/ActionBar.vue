<template>
    <div class="actionBar">
        <div class="actionBar-content">
            <span class="actionBar-span">{{ option[0] }}</span>
            <el-select v-model="namesValue" @change="siftName" clearable placeholder="按名称查询" size="mini">
                <el-option v-for="item in names" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="actionBar-content">
            <span class="actionBar-span">{{ option[1] }}</span>
            <el-select v-model="typesValue" @change="siftType" clearable placeholder="按类型查询" size="mini">
                <el-option v-for="item in types" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ActionBar',
    props: {
        names: {
            Array,
            require: true
        },
        types: {
            Array,
            require: true
        }
    },
    data() {
        return {
            option: ['名称', '类型'],
            namesValue: '',
            typesValue: ''
        }
    },
    methods: {
        siftName(val) {
            this.$emit('nameChange', val)
        },
        siftType(val) {
            this.$emit('typeChange', val)
        }
    }
}
</script>

<style>
.actionBar {
    width: 100%;
    height: 35px;
    /* background-color: antiquewhite; */
    line-height: 30px;
    margin-bottom: 1%;
    display: flex;
}

.actionBar-content {
    width: 50%;
    margin-left: 5%;
}

.actionBar-span {
    margin-right: 2%;
    color: white;
    font-weight: 600;
}
</style>
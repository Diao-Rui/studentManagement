<template>
    <div class="foodInfo">
        <ActionBar @nameChange="siftName" @typeChange="siftType" :names="names" :types="types"></ActionBar>
        <div class="main-content">
            <el-table height="570" :data="foodList" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="id" label="编号" width="180">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="180">
                </el-table-column>
                <el-table-column prop="price" label="价格">
                </el-table-column>
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="store" label="库存">
                </el-table-column>
                <el-table-column prop="date" label="生产日期">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot="header">
                        <el-button type="primary" size="mini" icon="el-icon-zoom-in">新增</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import ActionBar from '@/components/ActionBar.vue';
export default {
    name: 'sxView',
    components: {
        ActionBar
    },
    computed: {
        foodList: function () {
            let list = this.foods
            if (this.nameFilter != '') {
                list = list.filter((val) => {
                    return val.name.indexOf(this.nameFilter) != -1
                })
            }
            if (this.typeFilter != '') {
                list = list.filter((val) => {
                    return val.type.indexOf(this.typeFilter) != -1
                })
            }
            return list
        },
    },
    data() {
        return {
            names: [],
            types: ['蔬菜', '水果', '蛋类', '肉类'],
            foods: [],
            nameFilter: '',
            typeFilter: ''
        }
    },
    created() {
        // 将字符串转为js类型
        //JSON.parse将json字符串转为js对象
        this.foods = JSON.parse(localStorage.getItem('foods'))
        this.getNames()
        this.getTypes()
    },
    methods: {
        tableRowClassName({ rowIndex }) {
            if (rowIndex % 2 == 0) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        del(index) {
            this.foods.splice(index, 1)
            // 判断浏览器是否支持
            if (typeof Storage !== undefined) {
                // 只能存放字符串
                //JSON.stringify将js对象转为json字符串
                localStorage.setItem('foods', JSON.stringify(this.foods))
            }
        },
        siftName(val) {
            this.nameFilter = val
        },
        siftType(val) {
            this.typeFilter = val
        },
        getNames() {
            this.foods.forEach((item) => {
                this.names.push(item.name)
            })
        },
        getTypes() {
            let set = new Set()
            this.foods.forEach((item) => {
                set.add(item.type)
            })
            this.types = set
        },
    },
}
</script>

<style>
.foodInfo {
    width: 100%;
    height: 100%;
}

.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>
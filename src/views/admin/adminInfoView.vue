<template>
    <div class="adminView">
        <tipsBar title="管理员可以在这里添加和删除用户类型和职业"></tipsBar>
        <div class="adminView-navBtn">
            <el-button type="danger" icon="el-icon-refresh" size="mini" @click="getTypes"></el-button>
            <el-button type="danger" icon="el-icon-plus" size="mini" @click="add('类型', 0)">新建类型</el-button>
        </div>
        <div class="adminType" v-loading="typeLoading">
            <template v-if="types.length > 0">
                <div>
                    <el-tag style="margin-left: 1%;font-size: 14px;" v-for="(item, index) in types" :key="item.id"
                        :type="tagType[index]" closable @close="handleClose('类型', item.id, 0)">
                        {{ item.type }}
                    </el-tag>
                </div>
            </template>
            <template v-else>
                <div>
                    暂无数据
                </div>
            </template>
        </div>
        <div class="adminView-navBtn">
            <el-button type="danger" icon="el-icon-refresh" size="mini" @click="getOccupations"></el-button>
            <el-button type="danger" icon="el-icon-plus" size="mini" @click="add('职业', 1)">新建职业</el-button>
        </div>
        <div class="adminOccupation" v-loading="OccupationLoading">
            <template v-if="types.length > 0">
                <div>
                    <el-tag style="margin-left: 1%;font-size: 14px;" v-for="(item, index) in occupations" :key="item.id"
                        :type="tagType[index]" closable @close="handleClose('职业', item.id, 1)">
                        {{ item.occupation }}
                    </el-tag>
                </div>
            </template>
            <template v-else>
                <div>
                    暂无数据
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import tipsBar from '@/components/tipsBar.vue'
import { findAllType, addType, delType } from '@/http/api/type'
import { addOccupation, findAllOccupation, delOccupation } from '@/http/api/Occupation'
export default {
    components: {
        tipsBar
    },
    data() {
        return {
            types: [],
            typeLoading: false,
            OccupationLoading: false,
            occupations: [],
            tagType: ['success', 'info', 'warning', 'danger']
        }
    },
    created() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            this.getTypes();
            this.getOccupations()
        },
        getTypes() {
            this.typeLoading = true
            setInterval(() => {
                findAllType().then((res) => {
                    this.types = res
                })
                this.typeLoading = false
            }, 1000)
        },
        getOccupations() {
            this.OccupationLoading = true
            setInterval(() => {
                findAllOccupation().then((res) => {
                    this.occupations = res
                })
                this.OccupationLoading = false
            }, 1000)
        },
        showResult(res) {
            if (res.code === 200) {
                this.$message({
                    type: 'success',
                    message: res.message
                });
            } else {
                this.$message({
                    type: 'danger',
                    message: res.message
                });
            }
        },
        handleClose(title, id, index) {
            this.$confirm('此操作将永久删除该' + title + ', 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                if (index === 0) {
                    delType({
                        id: id
                    }).then((res) => {
                        this.showResult(res)
                    })
                } else {
                    delOccupation({
                        id: id
                    }).then((res) => {
                        this.showResult(res)
                    })
                }
            })
        },
        add(msg, index) {
            this.$prompt('请输入' + msg, '提示', {
                confirmButtonText: '添加',
                cancelButtonText: '取消',
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)?/,
                inputErrorMessage: '输入的类型不能为空'
            }).then(({ value }) => {
                if (index === 0) {
                    addType({
                        type: value
                    }).then((res) => {
                        this.showResult(res)
                    })
                } else {
                    addOccupation({
                        occupation: value
                    }).then((res) => {
                        this.showResult(res)
                    })
                }

            })
        }
    }
}
</script>

<style>
.adminView {
    width: 100%;
    height: 100%;
}

.adminView-navBtn {
    width: 50%;
    height: 30px;
    display: flex;
    margin-left: 1%;
}

.adminType,
.adminOccupation {
    width: 98%;
    height: 80px;
    background-color: #fff;
    line-height: 75px;
    margin: 1%;
}
</style>
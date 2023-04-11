<template>
    <div class="layout">
        <NavHead></NavHead>
        <div class="content">
            <div class="leftMenu">
                <el-menu default-active="1-1" :unique-opened="true" class="el-menu-vertical-demo">
                    <template v-for="item in options">
                        <div v-if="item.content.length > 0" :key="item.index + 1">
                            <el-submenu :index="item.index">
                                <template slot="title">
                                    <i :class="item.icon"></i>
                                    <span>{{ item.item }}</span>
                                </template>
                                <el-menu-item @click="select(content)" v-for="(content, index1) in item.content"
                                    :key="index1" :index="content.index">{{
                                        content.item }}</el-menu-item>
                            </el-submenu>
                        </div>
                        <div v-else :key="item.index + 2">
                            <el-menu-item @click="select(item)" :index="item.index">
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.item }}</span>
                            </el-menu-item>
                        </div>
                    </template>
                </el-menu>
            </div>
            <div class="rightContent">
                <BreadContainer :msg="msg"></BreadContainer>
                <div class="rightContent-center">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import xxx from “./xxx.vue” 写成了import { xxx} from “./xxx.vue”
import NavHead from '@/components/NavHead.vue'
import BreadContainer from '@/components/BreadContainer.vue'
export default {
    name: 'LayoutView',
    components: {
        NavHead,
        BreadContainer
    },
    data() {
        return {
            msg: '',
            options: [
                {
                    item: '商品管理',
                    index: '1',
                    icon: 'el-icon-document',
                    content: [
                        {
                            item: '商品详情',
                            index: '1-1',
                            path: '/food/info'
                        },
                        {
                            item: '新增商品',
                            index: '1-2',
                            path: '/food/add'
                        }
                    ]
                },
                {
                    item: '管理员信息',
                    index: '2',
                    icon: 'el-icon-setting',
                    path: '/admin',
                    content: []
                },
                {
                    item: '订单管理',
                    index: '3',
                    icon: 'el-icon-location',
                    path: '/order',
                    content: []
                },
                {
                    item: '用户管理',
                    index: '4',
                    icon: 'el-icon-menu',
                    content: [
                        {
                            item: '用户详情',
                            index: '4-1',
                            path: '/user/userInfo'
                        },
                        {
                            item: '用户流量',
                            index: '4-2',
                            path: '/user/userAdd'
                        }
                    ]
                }
            ]
        }
    },
    created() {
        this.msg = this.options[0].content[0].item
        this.$router.push('/food/info')
    },
    methods: {
        select(val) {
            this.msg = val.item
            this.$router.push(val.path)
        }
    }
}
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    font-family: Microsoft YaHei, Arial, sans-serif;
}

.content {
    width: 100%;
    display: flex;
    height: 660px;
    align-content: space-between;
    background-color: rgb(244, 244, 244);

}

.leftMenu {
    width: 10%;
    height: 660px;
    background-color: #fff;
}

.rightContent {
    margin-left: 0.5%;
    width: 89%;
    height: 660px;
}

.el-menu-item {
    height: 40px !important;
    font-size: 14px !important;
    line-height: 40px !important;
    min-width: 0px !important;
}

.el-menu-item.is-active {
    background-color: #E3362D !important;
    color: #fff !important;
}

.rightContent-center {
    width: 100%;
    height: 620px;
}
</style>
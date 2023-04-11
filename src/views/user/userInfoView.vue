<template>
  <div class="userInfo">
    <tipsBar title="用户详情运行您去操作当前拥有的用户"></tipsBar>
    <div class="userInfo-nav">
      <div class="userInfo-nav-left">
        <el-button type="danger" icon="el-icon-refresh" size="mini" @click="getUserInfo"></el-button>
        <el-button type="danger" icon="el-icon-plus" size="mini" @click="openDialog(0)">新建</el-button>
        <el-button icon="el-icon-delete" size="mini" :disabled="isNotDelete" @click="delUsers">删除</el-button>
      </div>
      <div class="userInfo-nav-right">
        <el-input placeholder="请输入名称" v-model="searchValue" size="mini" style="margin-right: 3%;"></el-input>
        <el-button type="danger" icon="el-icon-search" size="mini" @click="searchName">搜索</el-button>
        <el-button icon="el-icon-refresh-right" size="mini" @click="resetTable">重置</el-button>
      </div>
    </div>
    <div class="userInfo-content-center">
      <el-table v-loading="listLoading" ref="multipleTable" @selection-change="handleSelectionChange" :data="userList"
        :height="height" style="width: 100%" header-cell-class-name="tableheadStyle">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <el-tag style="width: 30%;text-align: center;" size="medium" :hit="true"
              :type="scope.row.sex === 'girl' ? 'danger' : ''" disable-transitions>{{
                scope.row.sex
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="occupationId" label="职业">
          <template slot-scope="scope">
            <el-tag :hit="true" style="width: 30%;text-align: center;" size="medium"
              :type="tagType[getOccupation(scope.row.occupationId)]" disable-transitions>{{
                getOccupation(scope.row.occupationId)
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户类型">
          <template slot-scope="scope">
            {{ getType(scope.row.typeId) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button class="table-ca-btn" size="small" type="text" icon="el-icon-setting"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="openDialog(scope.row)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="delUser(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <div class="block-left">
          <el-pagination background @size-change="handleSizeChange" :page-sizes="pageSizes" layout="sizes, total"
            :total="userList.length">
          </el-pagination>
        </div>
        <div class="block-right">
          <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="pageSizes" :page-size="pageSize" layout="prev, pager, next, jumper" :total="userList.length">
          </el-pagination>
        </div>
      </div>
      <UserDialog ref="userDialog" @closeDialog="getUserInfo"></UserDialog>
    </div>

  </div>
</template>

<script>
import * as userApi from '@/http/api/user'
import UserDialog from './handler/userDialog.vue'
import tipsBar from '@/components/tipsBar.vue'
import { findAllType } from '@/http/api/type'
import { findAllOccupation } from '@/http/api/Occupation'
export default {
  components: { UserDialog, tipsBar },
  data() {
    return {
      listLoading: false,
      isNotDelete: true,
      addFormVisible: false,
      searchValue: '',
      pageSize: 5,
      height: 400,
      pageSizes: [3, 4, 5],
      currentPage: 1,
      // 修改用户时使用
      showDialog: false,
      dialogTitle: '添加用户',
      userForm: {
        id: '',
        username: '',
        password: '',
        name: '',
        sex: '',
        age: 1,
        occupationId: ''
      },
      tagType: {
        student: 'warning',
        worker: 'success',
        teacher: 'info',
        player: 'danger'
      },
      types: [],
      occupations: [],
      userInfo: [],
      userList: [],
      checkedIndex: [],
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    handleSelectionChange(val) {
      if (val.length > 0) {
        let indexs = []
        val.forEach((item) => {
          indexs.push(item.id)
        });
        this.checkedIndex = indexs
        this.isNotDelete = false
      } else {
        this.isNotDelete = true
      }
    },
    getUserInfo() {
      this.listLoading = true
      setTimeout(() => {
        findAllType().then((res) => {
          this.types = res
        })
        findAllOccupation().then((res) => {
          this.occupations = res
        })
        userApi.findAllUser().then((res) => {
          this.userInfo = res
          this.userList = this.userInfo
        })
        this.listLoading = false
      }, 1000);
    },
    searchName() {
      this.userList = this.userInfo.filter((item) => {
        return item.name.indexOf(this.searchValue) != -1
      })
    },
    resetTable() {
      this.searchValue = ""
      this.getUserInfo()
    },
    getType(typeId) {
      return this.types.filter(item => item.id === typeId)[0].type
    },
    getOccupation(occupationId) {
      return this.occupations.filter(item => item.id === occupationId)[0].occupation
    },
    openDialog(item) {
      let data = {
        occupations: this.occupations,
        dialogTitle: this.dialogTitle
      }
      if (item === 0) {
        data['userForm'] = this.userForm
        data['index'] = item
      } else {
        data['userForm'] = item
        data['index'] = 1
      }
      this.$refs['userDialog'].openDialog(data)
    },
    delUsers() {
      this.userInfo = this.userInfo.filter(item => !this.checkedIndex.includes(item.id))
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      this.getUserInfo()
    },
    delUser(user) {
      let index = this.userInfo.findIndex(item => item.id == user.id)
      this.userInfo.splice(index, 1)
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      this.getUserInfo()
    },
    // 编辑操作
    updateUser(row) {
      this.userForm = row;
      this.dialogTitle = "编辑用户";
      this.showDialog = true;
      this.$nextTick(() => {
        this.$refs["userDialog"].showDialog = true;
      });
    },
    handleSizeChange(val = 10) {
      // this.height = (val + 1) * 40
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // this.userList = this.userInfo.slice(this.pageSize * this.currentPage)
    },
    resetForm() {
      this.$refs.userForm.resetFields();
    },
  }
}
</script>

<style lang="scss">
.userInfo {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.userInfo-nav {
  width: 96%;
  height: 40px;
  padding: 1% 2%;
  display: flex;

  .userInfo-nav-left {
    width: 50%;
    height: 30px;
    display: flex;
  }

  .userInfo-nav-right {
    margin-left: 25%;
    width: 35%;
    height: 30px;
    display: flex;
  }
}

.userInfo-content-center {
  width: 97%;
  margin: 0 1% 0 2%;
}

.tableheadStyle {
  background-color: #e8e9ea !important;
  color: #fff;
  font-weight: 700;
}

.tableheadStyle:hover {
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
}

.block {
  width: 90%;
  display: flex;
  margin-top: 1%;
  align-content: space-between;

  .block-left,
  .block-right {
    width: 50%;
  }

  .block-right {
    margin-left: 70%;
  }
}

.table-ca-btn {
  color: black !important;
  width: 30px;
  height: 30px;
  border: 1px solid rgb(223, 223, 223) !important;
  border-radius: 0px !important;
}

.table-ca-btn:hover {
  background-color: #e3362d;
  color: #fff;
}


// .el-table .el-table__cell {
//   padding: 8px 0 !important;
// }
</style>
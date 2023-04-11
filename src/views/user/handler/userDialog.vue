<template>
    <div class="userDialog">
        <el-dialog :title="dialogTitle" :visible.sync="showDialog" @close="closeDialog">
            <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input show-password :disabled="index !== 0" v-model="userForm.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input v-model="userForm.name" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" prop="sex">
                    <el-radio-group v-model="userForm.sex">
                        <el-radio label="boy"></el-radio>
                        <el-radio label="girl"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="width: 50%;" label="用户年龄" prop="age">
                    <el-input-number v-model="userForm.age" :min="1" :max="150"></el-input-number>
                </el-form-item>
                <el-form-item style="width: 40%;" label="用户职业" prop="occupationId">
                    <el-select v-model="userForm.occupationId" placeholder="请选择用户职业">
                        <el-option v-for="item in occupations" :label="item.occupation" :value="item.id"
                            :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button @click="resetForm">重置</el-button>
                <el-button type="primary" @click="addUser()">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { register } from '@/http/api/user'

export default {
    name: 'userDialog',
    data() {
        return {
            userForm: '',
            showDialog: false,
            types: '',
            dialogTitle: '',
            occupations: '',
            index: '',
            rules: {
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'change' },
                    { type: 'number' }
                ],
                sex: [
                    { required: true, message: '请输入选则性别', trigger: 'change' },
                ],
                occuption: [
                    { required: true, message: '请选择职业类型', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        openDialog(data) {
            this.userForm = data.userForm
            this.showDialog = true
            this.dialogTitle = data.dialogTitle
            this.occupations = data.occupations
            this.index = data.index
        },
        closeDialog() {
            this.$refs.userForm.resetFields();
            this.showDialog = false;
            this.$emit("closeDialog");
        },
        resetForm() {
            this.$refs.userForm.resetFields();
        },
        addUser() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    delete this.userForm['id'];
                    register(this.userForm).then((res) => {
                        this.showResult(res)
                    })
                    this.closeDialog()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        showResult(res) {
            if (res.code === 200) {
                this.$message({
                    message: res.message,
                    type: "success",
                });
            } else {
                this.$message({
                    message: res.message,
                    type: "danger",
                });
            }
        }

    }
}
</script>

<style></style>
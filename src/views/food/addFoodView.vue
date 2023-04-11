<template>
    <div class="addForm">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item style="width: 50%;" label="商品名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item style="width: 50%;" label="商品价格" prop="price">
                <el-input-number v-model="ruleForm.price" :precision="2" :step="0.1" :min="1"
                    :max="10000"></el-input-number>
            </el-form-item>
            <el-form-item style="width: 50%;" label="商品库存" prop="store">
                <el-input-number v-model="ruleForm.store" :min="1" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item style="width: 50%;" label="商品类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择商品类型">
                    <el-option label="蔬菜" value="蔬菜"></el-option>
                    <el-option label="水果" value="水果"></el-option>
                    <el-option label="肉类" value="肉类"></el-option>
                    <el-option label="坚果" value="坚果"></el-option>
                    <el-option label="蛋类" value="蛋类"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width: 50%;" label="生产日期" required>
                <el-form-item prop="date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date"
                        style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            ruleForm: {
                id: '',
                name: '',
                type: '',
                price: 1.0,
                store: 1,
                date: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'change' },
                    { type: 'number' }
                ],
                store: [
                    { required: true, message: '请输入商品库存', trigger: 'change' },
                    { type: 'number' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择商品类型', trigger: 'change' }
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.id = new Date().getTime()
                    let date = this.ruleForm.date.toISOString()
                    date = date.split('T')[0]
                    this.ruleForm.date = date
                    let foods = []
                    if (localStorage.getItem('foods') != null || localStorage.getItem('foods') != undefined) {
                        foods = JSON.parse(localStorage.getItem('foods'))
                    }
                    foods.push(this.ruleForm)
                    localStorage.setItem('foods', JSON.stringify(foods))
                    alert('添加成功')
                    this.resetForm(formName)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>
.addForm {
    width: 50%;
    margin: auto;
    background-color: white;
    padding: 2%;
    margin-top: 1%;
}
</style>
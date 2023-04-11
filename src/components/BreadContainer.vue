<template>
    <div class="bread-container">
        <i class="vertical-line"></i>
        <span class="bread-container-content">{{ msg }}</span>
    </div>
</template>

<script>
export default {
    name: 'BreadContainer',
    props: {
        msg: String
    }

}
</script>

<style>
.bread-container {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    margin: 5px 0 5px 0;
}

.vertical-line {
    display: inline-block;
    height: 16px;
    background-color: red;
    width: 3px;
    margin-right: 8px;
    margin-left: 20px;
}

.bread-container-content {
    font-weight: 700;
    font-size: 15px;
}
</style>
<template>
  <div class="login-phone">
    <el-form
      ref="ruleFormRef"
      :model="phone"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import type { PhoneRuleForm } from '../config/login-config'

export default defineComponent({
  setup() {
    const phone: PhoneRuleForm = reactive({
      num: '',
      code: ''
    })
    return { phone }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
  width: 100%;
}
.get-btn {
  margin-left: 8px;
}
</style>

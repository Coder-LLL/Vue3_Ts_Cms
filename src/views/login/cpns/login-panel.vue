<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <LoginPhone></LoginPhone>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: { LoginAccount, LoginPhone },
  setup() {
    // 设置初始的tab
    const currentTab = ref('account')
    const isKeepPassword = ref(true)

    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const handleLoginClick = () => {
      if (currentTab.value == 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else if (currentTab.value == 'phone') {
        ElMessage('手机号登录功能待开发')
      }
    }
    return { currentTab, isKeepPassword, handleLoginClick, accountRef }
  }
})
</script>

<style scoped>
.login-panel {
  width: 320px;
  margin-bottom: 150px;
}
.title {
  text-align: center;
}

.account-control {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>

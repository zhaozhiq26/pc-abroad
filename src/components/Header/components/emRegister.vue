<template>
  <div class="em-content">
    <el-form
      ref="rulesRef"
      :model="phoneForm"
      :rules="phoneRules"
      class="phone-name"
    >
      <el-form-item prop="email">
        <el-input v-model="phoneForm.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="phoneForm.code"
          placeholder="请输入验证码"
          style="width: 60%"
        />
        <span v-if="!sms.disabled" class="phone-code" @click="send"
          >获取验证玛</span
        >
        <span v-else class="phone-code">{{ sms.count }}s后可再次获取</span>
      </el-form-item>
      <el-form-item prop="password" class="login-password">
        <el-input
          v-model="phoneForm.password"
          type="password"
          placeholder="请设置登录密码（6-18数字+字母）"
        />
      </el-form-item>
      <el-form-item prop="confirmPassword" class="login-password">
        <el-input
          v-model="phoneForm.confirmPassword"
          type="password"
          placeholder="请确认密码"
        />
      </el-form-item>
    </el-form>
    <div class="register-footer">
      <span
        :loading="loading"
        class="footer-span"
        @click="handleRegister(rulesRef)"
        >注册</span
      >
    </div>
    <div class="register-login" @click="handelGoLogin">
      已有账号? 立即去 <span>登录</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 验证码计时器
import { emCode, emailRegisterAPI } from '@/api/user'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import type { registerRes } from '@/types/user'
const rulesRef = ref<FormInstance>()
const loading = ref<boolean>(false)
const sms = reactive({
  disabled: false,
  total: 60,
  count: 0
})
const phoneForm = reactive<registerRes>({
  email: '',
  password: '',
  confirmPassword: '',
  code: '',
  type: 0
})
const phoneRules = {
  email: [
    { required: true, trigger: 'blur', message: '请输入您的账号' },
    { required: true, validator: phoneValidator, trigger: 'blur' }
  ],
  code: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
  password: [
    { required: true, trigger: 'blur', message: '请输入您的密码' },
    { required: true, validator: passwordValidator, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, trigger: 'blur', message: '请再次输入您的密码' },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ]
}
// 校验邮箱号
function phoneValidator(rule: any, value: any, callback: any) {
  if (phoneForm.email === undefined) {
    callback()
  } else if (phoneForm.email === '') {
    callback(new Error('请输入邮箱号'))
  } else if (
    !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(
      phoneForm.email
    )
  ) {
    callback(new Error('请输入正确格式的邮箱地址'))
  } else {
    callback()
  }
}
// 校验密码
function passwordValidator(rule: any, value: any, callback: any) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/
  if (!passwordRegex.test(value)) {
    callback(new Error('请设置密码（6-18位  数字+字母'))
  } else {
    callback()
  }
}
// 确认密码
function equalToPassword(rule: any, value: any, callback: any) {
  if (phoneForm.password !== value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
// 计时器处理器
const timerHandler = () => {
  sms.count = sms.total
  sms.disabled = true
  let timer = setInterval(() => {
    if (sms.count > 1 && sms.count <= sms.total) {
      sms.count--
    } else {
      sms.disabled = false
      clearInterval(timer)
    }
  }, 1000)
}
const send = async () => {
  if (
    phoneForm.email === undefined ||
    !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(
      phoneForm.email
    )
  ) {
    // ElMessage.error("邮箱地址不能为空!")
    return
  }
  timerHandler()
  const res = await emCode(phoneForm.email)
  if (res.code === 200) {
    ElMessage({
      message: '发送验证码成功, 请注意查收',
      type: 'success'
    })
  }
}
// 邮箱注册
function handleRegister(formEl: FormInstance | undefined) {
  if (formEl) {
    formEl.validate((valid: any) => {
      if (valid) {
        loading.value = true
        emailRegisterAPI(phoneForm)
          .then((res: any) => {
            const username = phoneForm.email
            ElMessageBox.alert(
              "<font color='red'>恭喜你，您的账号 " +
                username +
                ' 注册成功！</font>',
              '系统提示',
              {
                dangerouslyUseHTMLString: true,
                type: 'success'
              }
            )
              .then(() => {
                formEl.resetFields()
                handelGoLogin()
              })
              .catch(() => {})
          })
          .catch(() => {
            loading.value = false
            // if (captchaEnabled) {
            //   getCode();
            // }
          })
      }
    })
  }
}
const emit = defineEmits()
// 去登陆
const handelGoLogin = () => {
  emit('handelGoLogin', '')
}
</script>
<style lang="scss" scoped>
.em-content {
  margin-top: 40px;

  .phone-name {
    font-size: 14px;
    color: #4a4a4a;
  }

  .phone-code {
    margin-left: 1%;
    display: block;
    width: 39%;
    text-align: center;
    font-size: 12px;
    background-color: #098d72;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
  }

  .register-footer {
    margin-top: 40px;
    display: flex;
    justify-content: center;

    span {
      border-radius: 4px;
      width: 300px;
      height: 36px;
      line-height: 36px;
      color: #fff;
      background-color: #098d72;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
      letter-spacing: 5px;
    }
  }

  .register-login {
    margin-top: 19px;
    text-align: center;
    color: #4a4a4a;
    font-size: 14px;
    cursor: pointer;

    span {
      color: #098d72;
    }
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #098d72;
  }
}
</style>

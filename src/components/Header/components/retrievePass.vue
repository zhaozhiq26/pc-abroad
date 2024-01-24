<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { forgetPasswordAPI, sendCodeAPI } from '@/api/user'

const passwordType = ref('password')
const passwordType1 = ref('password')
const codeInfo = ref()
const ruleRef = ref<FormInstance>()
const sms = reactive({
  disabled: false,
  total: 60,
  count: 0
})
const forgetForm = reactive({
  number: '',
  code: '',
  password: '',
  confirmPassword: ''
})

const forgetRules = {
  number: [
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
const phoneRegular =
  /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
const emRegular = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

// 校验手机号/邮箱
function phoneValidator(rule: any, value: any, callback: any) {
  if (forgetForm.number === null) {
    callback()
  } else if (forgetForm.number === '') {
    callback(new Error('请输入手机号/邮箱地址'))
  } else if (!emRegular || !phoneRegular) {
    callback(new Error('请输入正确格式的手机号/邮箱地址'))
  } else {
    callback()
  }
}

// 校验密码
function passwordValidator(rule: any, value: any, callback: any) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/
  if (!passwordRegex.test(value)) {
    callback(new Error('请设置新密码（6-18位  数字+字母'))
  } else {
    callback()
  }
}

// 确认密码
function equalToPassword(rule: any, value: any, callback: any) {
  if (forgetForm.password !== value) {
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
// 获取验证码
const send = async () => {
  if (forgetForm.number === '') {
    ElMessage.error('手机号/邮箱地址不能为空!')
    return
  } else {
    timerHandler()
    if (emRegular.test(forgetForm.number)) {
      const res = await sendCodeAPI(1, forgetForm.number)
      codeInfo.value = res.msg
    } else {
      const res = await sendCodeAPI(0, forgetForm.number)
      codeInfo.value = res.msg
    }
  }
}

const emit = defineEmits(['goLogin1'])

// 提交修改
const forgetBtn = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (emRegular.test(forgetForm.number)) {
        const res = await forgetPasswordAPI({
          number: forgetForm.number,
          code: forgetForm.code,
          password: forgetForm.password,
          type: 1
        })
        if (res.code === 200) {
          ElMessage.success('密码找回成功')
          emit('goLogin1')
          formEl.resetFields()
        }
      } else {
        const res = await forgetPasswordAPI({
          number: forgetForm.number,
          code: forgetForm.code,
          password: forgetForm.password,
          type: 0
        })
        if (res.code === 200) {
          ElMessage.success('密码找回成功')
          emit('goLogin1')
          formEl.resetFields()
        }
      }
    }
  })
}
// 密码显示隐藏
const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
}
const showPwd1 = () => {
  if (passwordType1.value === 'password') {
    passwordType1.value = ''
  } else {
    passwordType1.value = 'password'
  }
}
// 返回登录页
const goLoginTo = () => {
  emit('goLogin1')
}
</script>

<template>
  <div class="login_content">
    <div class="login_content_title">
      <div class="account_login">
        <el-icon @click="goLoginTo">
          <ArrowLeft />
        </el-icon>
        忘记密码
      </div>
    </div>
    <div class="login_content_body">
      <div class="account_login">
        <el-form ref="ruleRef" :model="forgetForm" :rules="forgetRules">
          <el-form-item prop="number">
            <el-input
              v-model="forgetForm.number"
              autofocus
              placeholder="请输入手机号/邮箱登录"
            />
          </el-form-item>
          <el-form-item class="auth_code_btn" prop="code">
            <el-input
              v-model="forgetForm.code"
              autofocus
              placeholder="请输入验证码"
            >
              <template #append>
                <el-button v-if="!sms.disabled" class="btn" @click="send"
                  >获取验证码</el-button
                >
                <el-button v-else class="btn" disabled
                  >{{ sms.count }} 秒后重新发送</el-button
                >
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="forgetForm.password"
              :type="passwordType"
              autofocus
              placeholder="请设置密码（6-18位数字+字母）"
            >
              <template #suffix>
                <div class="suffix" @click="showPwd">
                  <i
                    :class="
                      passwordType === 'password'
                        ? 'iconfont  icon-yincangmima'
                        : 'iconfont  icon-mimakejian'
                    "
                    style="font-size: 18px"
                  />
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="forgetForm.confirmPassword"
              :type="passwordType1"
              autofocus
              placeholder="请确认密码"
              @keyup.enter.native="forgetBtn(ruleRef)"
            >
              <template #suffix>
                <div class="suffix" @click="showPwd1">
                  <i
                    :class="
                      passwordType1 === 'password'
                        ? 'iconfont  icon-yincangmima'
                        : 'iconfont  icon-mimakejian'
                    "
                    style="font-size: 18px"
                  />
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="account_login_btn">
            <el-button @click="forgetBtn(ruleRef)">确定</el-button>
          </el-form-item>
        </el-form>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login_content {
  text-align: center;

  .login_content_title {
    font-size: 18px;
    color: #111;
    display: flex;

    .account_login {
      display: flex;
      align-items: center;

      .el-icon {
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }

  .login_content_body {
    margin-top: 35px;
    display: flex;
    justify-content: center;

    .account_login {
      .suffix {
        cursor: pointer;
      }

      :deep(.el-input__wrapper) {
        background-color: #fff;
        box-shadow: none;
        border-bottom: 1px solid #f8f8fa;
      }

      .auth_code_btn {
        :deep(.el-input-group__append) {
          box-shadow: none;
          background: #fff;
        }

        .btn {
          background-color: #fff;
          color: #098d72;
          border-bottom: 1px solid #f8f8fa;
        }
      }

      .el-input {
        width: 236px;
        height: 40px;
      }

      .account_login_btn {
        .el-button {
          background-color: #098d72;
          border: none;
          color: #fff;
          width: 236px;
          height: 40px;
          margin-top: 48px;
        }
      }
    }
  }
}
</style>

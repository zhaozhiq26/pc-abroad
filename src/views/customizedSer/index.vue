<template>
  <div class="customized_server">
    <Header :num="2"></Header>
    <div class="customized_main">
      <NationDate></NationDate>
      <div class="customized_form">
        <div class="customized_header">
          <div class="customized_header_title">
            <h1>定制服务</h1>
            <p>
              请填写下方表单、我们会尽快与你联系！或通过下方联系方式直接联系我们
            </p>
            <div class="contact_info">
              <div class="contact_info_left">
                <div class="contact_info_title">邮件</div>
                <div>sales@vqcm.com</div>
              </div>
              <div class="contact_info_right">
                <div class="contact_info_title">电话</div>
                <div>18925783945</div>
              </div>
            </div>
          </div>
          <div class="customized_header_img"></div>
        </div>
        <el-form
          ref="customRef"
          :model="customForm"
          :rules="customRules"
          label-position="top"
          :inline="true"
          class="order_form"
        >
          <el-form-item
            label="营销类型"
            class="form_inline nation"
            prop="marketingType"
          >
            <el-select
              v-model="customForm.marketingType"
              placeholder="请选择营销类型"
              class="form_select"
            >
              <el-option label="请选择营销类型" value="" />
              <el-option label="新品首发" value="新品首发" />
              <el-option label="独立站推广" value="独立站推广" />
              <el-option label="展会营销" value="展会营销" />
              <el-option label="线下引流" value="线下引流" />
              <el-option label="众筹推广" value="众筹推广" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="营销目的"
            class="form_inline platform"
            prop="marketingPurposes"
          >
            <el-select
              v-model="customForm.marketingPurposes"
              placeholder="请选择营销目的"
              class="form_select"
            >
              <el-option label="请选择营销目的" value="" />
              <el-option label="品牌声量" value="品牌声量" />
              <el-option label="产品销量" value="产品销量" />
              <el-option label="声量+销量" value="声量+销量" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="品牌类型"
            class="form_inline platform"
            prop="brandType"
          >
            <el-select
              v-model="customForm.brandType"
              placeholder="请选择品牌类型"
              class="form_select"
            >
              <el-option label="请选择品牌类型" value="" />
              <el-option label="自有品牌" value="自有品牌" />
              <el-option label="代理品牌" value="代理品牌" />
              <el-option label="其它" value="其它" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="公司名称"
            class="form_inline nation"
            prop="companyName"
          >
            <div class="form_select">
              <el-input
                v-model="customForm.companyName"
                type="text"
                placeholder="请输入公司名称"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item
            label="品牌名称"
            class="form_inline nation"
            prop="brandName"
          >
            <div class="form_select">
              <el-input
                v-model="customForm.brandName"
                placeholder="请输入品牌名称"
              />
            </div>
          </el-form-item>
          <el-form-item
            label="流量承接平台"
            class="form_inline nation"
            prop="platfoem"
          >
            <div class="form_select">
              <el-input
                v-model="customForm.platfoem"
                placeholder="请输入流量承接平台"
              />
            </div>
          </el-form-item>
          <el-form-item
            label="联系人"
            class="form_inline nation"
            prop="contactPerson"
          >
            <div class="form_select">
              <el-input
                v-model="customForm.contactPerson"
                placeholder="请输入联系人"
              />
            </div>
          </el-form-item>
          <el-form-item label="手机号" class="form_inline nation" prop="phone">
            <div class="form_select">
              <el-input
                v-model="customForm.phone"
                placeholder="请输入品牌名称"
              />
            </div>
          </el-form-item>
          <el-form-item
            label="营销预算"
            class="form_inline nation"
            prop="marketingBudget"
          >
            <div class="form_inline nation">
              <el-input
                v-model="customForm.marketingBudget"
                placeholder="请输入营销预算"
              />
            </div>
          </el-form-item>
          <el-form-item label="需求说明" prop="need">
            <el-input
              v-model="customForm.need"
              :rows="8"
              type="textarea"
              placeholder="请输入公司名称"
              style="width: 1352px"
            />
          </el-form-item>
        </el-form>
        <div class="customized_botton" @click="submitCustom(customRef)">
          提交
        </div>
      </div>
    </div>
    <YwFloat v-if="route.path !== '/'" />
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header/index.vue'
import type { FormInstance } from 'element-plus'
import { customMade } from '@/api/customize'
import { useUserStore } from '@/stores'
const route = useRoute()
const userStore = useUserStore()
const customRef = ref<FormInstance>()
const customForm = reactive<any>({
  /**
   * 品牌名称
   */
  brandName: '',
  /**
   * 品牌类型
   */
  brandType: '',
  /**
   * 公司名称
   */
  companyName: '',
  /**
   * 联系人
   */
  contactPerson: '',
  /**
   * 新增时可以为空
   */
  id: '',
  /**
   * 营销预算
   */
  marketingBudget: '',
  /**
   * 营销目的
   */
  marketingPurposes: '',
  /**
   * 营销类型
   */
  marketingType: '',
  /**
   * 需求说明
   */
  need: '',
  /**
   * 手机号
   */
  phone: '',
  /**
   * 流量承接平台
   */
  platfoem: '',
  /**
   * 用户id
   */
  userId: userStore.userInfo?.userId
})
const customRules = {
  marketingType: [
    { required: true, trigger: 'change', message: '请选择营销类型' }
  ],
  marketingPurposes: [
    { required: true, trigger: 'change', message: '请选择营销目的' }
  ],
  brandType: [{ required: true, trigger: 'change', message: '请选择品牌类型' }],
  companyName: [{ required: true, trigger: 'blur', message: '公司名称' }],
  brandName: [{ required: true, trigger: 'blur', message: '请输入品牌名称' }],
  platfoem: [
    { required: true, trigger: 'blur', message: '请输入流量承接平台' }
  ],
  contactPerson: [{ required: true, trigger: 'blur', message: '请输入联系人' }],
  phone: [
    { required: true, trigger: 'blur', message: '请输入手机号' },
    { required: true, validator: phoneValidator, trigger: 'blur' }
  ],
  marketingBudget: [
    { required: true, trigger: 'blur', message: '请输入营销预算' }
  ],
  need: [{ required: true, trigger: 'blur', message: '请输入需求说明' }]
}
// 校验手机号
function phoneValidator(rule: any, value: any, callback: any) {
  if (customForm.phone === null) {
    callback()
  } else if (customForm.phone === '') {
    callback(new Error('请输入手机号码'))
  } else if (
    !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
      customForm.phone
    )
  ) {
    callback(new Error('请输入正确格式的手机号码'))
  } else {
    callback()
  }
}
const submitCustom = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await customMade(customForm)
      if (res.code === 200) {
        formEl.resetFields()
        ElMessage({
          message: '提交成功！',
          type: 'success'
        })
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.customized_server {
  width: 100%;
  height: 100%;
  background: #f8f8f8;

  .customized_main {
    width: 1400px;
    // height: 931px;
    margin-left: auto;
    margin-right: auto;

    .main_herder {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        display: flex;
        align-items: center;
      }

      img {
        width: 18px;
        margin-right: 8px;
      }
    }

    .customized_form {
      margin-top: 12px;
      padding: 24px;
      background-color: #fff;
      height: 931px;
      .customized_header {
        width: 100%;
        height: 221px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 34px;
        .customized_header_title {
          h1 {
            font-size: 32px;
            font-weight: bold;
            color: #098d72;
            margin-bottom: 22px;
          }
          p {
            font-size: 16px;
            color: #000;
            line-height: 16px;
            margin-bottom: 48px;
          }
          .contact_info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 350px;
            color: #000;
            .contact_info_title {
              margin-bottom: 18px;
            }
          }
        }
        .customized_header_img {
          width: 300px;
          height: 200px;
          background: url('@/assets/img/customization.png') no-repeat 100%/100%;
        }
      }

      .form_inline {
        width: 30%;

        .form_select {
          width: 368px;
        }
      }
    }

    .customized_botton {
      width: 100%;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      background: #098d72;
      border-radius: 4px 4px 4px 4px;
      margin-top: 10px;
    }
  }
}
</style>

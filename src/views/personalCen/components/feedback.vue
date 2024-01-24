<!-- 反馈中心 -->
<script lang="ts" setup>
import {
  ElMessage,
  type FormInstance,
  type UploadProps,
  type UploadUserFile
} from 'element-plus'
import type { FeedbackRes } from '@/types/feedback'
import { fileUploadAPI } from '@/api/user'
import { postFeedback } from '@/api/personal'

const ruleRef = ref<FormInstance>()
const FeedbackData = reactive<FeedbackRes>({
  userTypeId: 0,
  typeId: 1,
  problemDes: '',
  picUrl: '',
  phone: ''
})

// 表单校验
const rules = reactive({
  typeId: [{ required: true, message: '请选择反馈的类型', trigger: 'change' }],
  problemDes: [{ required: true, message: '请输入问题描述', trigger: 'blur' }],
  phone: [
    {
      pattern:
        /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/,
      message: '请输入正确的联系方式',
      trigger: 'blur'
    }
  ]
})

// 定义超出9张照片的行为
const handleExceed: UploadProps['onExceed'] = () => {
  ElMessage.warning(`上传最大的照片为9张`)
}
// 图片上传
const FeedbackImg = ref<UploadUserFile[]>()
const uploadImg = ref<any>([])
const beforeAvatarUpload = async (rawFile: any) => {
  let flag = true
  if (rawFile.file.size / 1024 > 800) {
    ElMessage.error('上传的图片大小不能超过 800KB!')
    flag = false
  }
  if (!flag) await Promise.reject(flag)
  let formData = new FormData()
  formData.append('file', rawFile.file)
  const res = await fileUploadAPI(formData)
  const url = {
    url: res.data.url,
    uid: rawFile.file.uid
  }
  uploadImg.value.push(url)
  FeedbackData.picUrl = uploadImg.value
    .map((i: any) => {
      return i.url
    })
    .join(',')
}

// 删除上传的图片
const handleRemove = (file: any) => {
  uploadImg.value.forEach((v: any, index: any) => {
    if (v.uid == file.uid) {
      uploadImg.value.splice(index, 1)
    }
  })
  FeedbackData.picUrl = uploadImg.value
    .map((i: any) => {
      return i.url
    })
    .join(',')
}

// 提交表单
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async valid => {
    if (valid) {
      console.log(FeedbackData)
      const res = await postFeedback(FeedbackData)
      if (res.code === 200) {
        ElMessage.success('您的表单提交成功，我们会尽快与您联系!')
        formEl.resetFields()
        FeedbackImg.value = []
        FeedbackData.picUrl = ''
      }
    }
  })
}
</script>

<template>
  <div class="FeedbackCenter-page class_box">
    <el-form
      ref="ruleRef"
      :model="FeedbackData"
      :rules="rules"
      label-position="top"
    >
      <el-form-item class="feedback_type" label="反馈的类型" prop="typeId">
        <el-radio-group v-model="FeedbackData.typeId">
          <el-radio :label="1">产品建议</el-radio>
          <el-radio :label="2">功能障碍</el-radio>
          <el-radio :label="3">其他问题</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="问题描述" prop="problemDes">
        <el-input
          v-model="FeedbackData.problemDes"
          placeholder="请输入问题描述信息"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="上传图片（最多9张）" prop="FeedbackImg">
        <el-upload
          v-model:file-list="FeedbackImg"
          :http-request="beforeAvatarUpload"
          :limit="9"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          action=""
          class="avatar-uploader"
          list-type="picture-card"
          multiple
        > 
          <el-icon class="avatar-uploader-icon">
            <Picture />
          </el-icon>
          <div v-if="!FeedbackData.picUrl" class="el-upload__text upload_photo">
            上传照片
          </div>
          <template #tip>
            <div class="el-upload__tip">支持png、jpg格式</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input
          v-model="FeedbackData.phone"
          placeholder="请输入您的联系方式"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
:deep(.avatar-uploader .el-upload) {
  border: 2px solid #dcdee0;
  background: #f8f8f8;
  width: 110px;
  height: 110px;
}

:deep(.el-upload-list__item) {
  width: 110px;
  height: 110px;
}

.FeedbackCenter-page {
  width: 1226px;
  height: 924px;
  border-left: 1px solid #dcdee0;
  border-radius: 0 4px 4px 0;
  padding: 24px;
  background-color: #fff;
  .el-form {
    width: 1178px;

    .feedback_type {
      display: flex;
      align-items: center;

      :deep(.el-form-item__label) {
        margin-bottom: 0;
      }
    }

    .el-button {
      width: 100%;
    }

    .el-icon svg {
      width: 32px !important;
      height: 32px !important;
      margin-bottom: 8px;
    }

    .avatar-uploader {
      position: relative;

      .upload_photo {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
        color: #555;
      }
    }
  }

  :deep(.el-textarea__inner) {
    height: 168px;
  }
}
:deep(.el-upload-list--picture-card .el-upload-list__item-actions:hover .el-upload-list__item-preview) {
  display: none;
}
:deep(.el-upload-list__item .el-icon--close-tip) {
  display: none !important;
}
</style>

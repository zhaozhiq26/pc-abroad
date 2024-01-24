<template>
  <div class="place_order_mian">
    <div class="order_nav" @paste="beforeUpload">
      <div class="order_form_left">
        <el-form
            ref="ruleFormRef"
            :model="orderFrom"
            :rules="orderRules"
            class="order_form"
            label-position="top"
        >
          <el-form-item
              class="form_inline nation"
              label="营销分类"
              prop="sellId"
          >
            <el-select
                v-model="orderFrom.sellId"
                class="form_select"
                placeholder="请选择营销分类"
                @change="catereList"
            >
              <el-option
                  v-for="item in cateseArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
              class="form_inline platform"
              label="推广类别"
              prop="promId"
          >
            <el-select
                v-model="orderFrom.promId"
                class="form_select"
                placeholder="请选择推广类别"
                @change="handleType"
            >
              <el-option
                  v-for="item in catereArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
              class="form_inline nation"
              label="地区/国家"
              prop="countryId"
          >
            <el-select
                v-model="orderFrom.countryId"
                class="form_select"
                placeholder="请选择产品的地区或者国家"
                @change="handleChangeMoney"
            >
              <el-option
                  v-for="item in nationArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              >
                <span style="display: inline-block">
                  <img
                      :alt="item.name"
                      :src="item.pic"
                      style="width: 16px; height: 12px"
                  />
                </span>
                <span>
                  {{ item.name }}
                </span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              class="form_inline platform"
              label="购物平台"
              prop="platformId"
          >
            <el-select
                v-model="orderFrom.platformId"
                class="form_select"
                placeholder="请选择产品所在的购物平台"
            >
              <el-option
                  v-for="item in countryArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
              v-if="select === 3"
              class="articleType"
              label="文章类型"
              prop="articleType"
          >
            <el-radio-group v-model="orderFrom.articleType">
              <el-radio :label="0">自己提供</el-radio>
              <el-radio :label="1">媒体代写</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品标题" prop="resourceTitle">
            <el-input
                v-model="orderFrom.resourceTitle"
                maxlength="255"
                placeholder="产品标题"
                style="width: 832px"
                type="text"
            >
            </el-input>
          </el-form-item>
          <el-form-item
              v-if="select === 4"
              label="原价"
              prop="originalPriceMin"
          >
            <div class="form_pirce">
              <div class="form_pirce_iput">
                <el-input
                    v-model="orderFrom.originalPriceMin"
                    :formatter="
                      (value:any) =>
                        `${value}`.replace(/\B(?=(\d{13})+(?!\d))/g, ',')
                    "
                    :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    placeholder="最低价，必填"
                >
                  <template #prefix>
                    <span class="unit_color">{{ money }}</span>
                  </template>
                </el-input>
              </div>
              <span class="form_pirce_span">至</span>
              <div class="form_pirce_iput">
                <el-input
                    v-model="orderFrom.originalPriceMax"
                    :formatter="
                      (value:any) =>
                        `${value}`.replace(/\B(?=(\d{13})+(?!\d))/g, ',')
                    "
                    :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    placeholder="最高价，可不填"
                >
                  <template #prefix>
                    <span class="unit_color">{{ money }}</span>
                  </template>
                </el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item
              v-if="select === 4"
              label="折后价"
              prop="discountPriceMin"
          >
            <div class="form_pirce">
              <div class="form_pirce_iput form_iocn_iput">
                <el-input
                    v-model="orderFrom.discountPriceMin"
                    :formatter="
                      (value:any) =>
                        `${value}`.replace(/\B(?=(\d{13})+(?!\d))/g, ',')
                    "
                    :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    placeholder="最低价，必填"
                >
                  <template #prefix>
                    <span class="unit_color">{{ money }}</span>
                  </template>
                </el-input>
              </div>
              <span class="form_pirce_span">至</span>
              <div class="form_pirce_iput">
                <el-input
                    v-model="orderFrom.discountPriceMax"
                    :formatter="
                      (value:any) =>
                        `${value}`.replace(/\B(?=(\d{13})+(?!\d))/g, ',')
                    "
                    :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
                    onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
                    placeholder="最高价，可不填"
                >
                  <template #prefix>
                    <span class="unit_color">{{ money }}</span>
                  </template>
                </el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item
              v-if="select === 4"
              class="form_inline nation"
              label="折扣码（无折扣请填nocode）"
              prop="discountCode"
          >
            <div class="form_pirce">
              <div class="form_pirce_iput">
                <el-input
                    v-model="orderFrom.discountCode"
                    
                    placeholder="请输入产品折扣码，50cc612u"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item
              v-if="select === 4 && orderFrom.discountCode !== 'nocode'"
              class="form_inline platform"
              label="优惠比例（不包含coupon优惠）"
              prop="preferentialRatio"
          >
            <div class="form_pirce">
              <div class="form_pirce_iput">
                <el-input
                    v-model="orderFrom.preferentialRatio"
                    :onkeyup="orderFrom.preferentialRatio = orderFrom.preferentialRatio.replace(/\s+/g,'')"
                    placeholder="%"
                    style="width: 95%"
                />
                %
              </div>
            </div>
          </el-form-item>
          <el-form-item
              v-if="select !== 3 && select !== 5"
              label="可用变体（选填)"
          >
            <div class="form_pirce">
              <div class="form_pirce_variable">
                <el-input
                    v-model="editForm.variable"
                    placeholder="可用变体，不填代表所有变体可用"
                />
              </div>
              <span class="variable_botton" @click="handleVariable">
                添加可变实体
              </span>
            </div>
            <div class="variable_list">
              <ul>
                <li v-for="(item, index) in editForm.variableArr" :key="index">
                  <span @click="deleteVariable(index)">{{ item }} X</span>
                </li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item v-if="select === 6" label="样品数量">
            <el-input
                v-model="orderFrom.numberSamples"
                placeholder="请输入样品数量"
                style="width: 832px"
            />
          </el-form-item>
          <el-form-item v-if="select === 4" label="coupon（选填）">
            <el-input
                v-model="orderFrom.coupon"
                placeholder="叠加coupon，如：5%或$2prime"
                style="width: 832px"
            />
          </el-form-item>
          <div class="home_price_box">
            <el-form-item
                v-if="select === 4"
                label="折扣有效时间（PDT）"
                prop="date"
            >
              <a-range-picker
                  v-model:value="orderFrom.date"
                  :disabledDate="disabledDateFn"
                  format="YYYY-MM-DD HH:mm"
                  show-time
                  valueFormat="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
          </div>
          <div class="yw_resource_url">
            <span class="resource_url_title">
              请勿使用短链、媒体不接受短链、编辑不保证100%使用短链
              <a-tooltip placement="top">
                <template #title>
                  <span style="display: inline-block; width: 188px;">
                    请勿填写短链、短链可能会导致上贴失败，帖子被拒、被资源平台拉黑等
                  </span>
                </template>
                <img alt="" src="@/assets/img/360.png"/>
              </a-tooltip>
            </span>
            <el-form-item label="链接" prop="resourceUrl">
              <el-input
                  v-model="orderFrom.resourceUrl"
                  placeholder="示例 https://www.amazon.com/dp/{ASIN} 或 https://www.amazon.com/gp/mpc/{社媒标识}"
                  style="width: 832px"
              />
            </el-form-item>
          </div>
          <div class="home_price_box1">
            <el-form-item v-if="select === 5" label="投放时间(PDT)" prop="date">
              <a-range-picker
                  v-model:value="orderFrom.date"
                  :disabledDate="disabledDateFn"
                  format="YYYY-MM-DD HH:mm"
                  show-time
                  valueFormat="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
          </div>
          <div class="home_price_box2">
            <el-form-item
                v-if="select === 3"
                label="活动有效时间(PDT)"
                prop="date"
            >
              <a-range-picker
                  v-model:value="orderFrom.date"
                  :disabledDate="disabledDateFn"
                  format="YYYY-MM-DD HH:mm"
                  show-time
                  valueFormat="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
          </div>
          <el-form-item
              v-if="select === 3"
              label="文章内容/Birft"
              prop="articleContent"
          >
            <el-upload
                v-model:file-list="articleContentYW"
                :http-request="uploadBpmn"
                :limit="1"
                :on-remove="handleRemoveYW"
                class="upload-demo"
                drag
                multiple
            >
              <div class="el-upload_conetnt">
                自己提供的文章不保证100%原文录用，可能会修改，请知悉!
                仅支持在线文档或PDF格式
              </div>
              <div class="el-upload__text">
                <el-icon class="el-icon-demo">
                  <upload-filled/>
                </el-icon>
                <i class="el-icon-demo-text_click">点击上传</i>
                <i class="el-icon-demo-text">CTRL+v或拖动文档到这里 </i>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item
              v-if="select === 5"
              label="上传Banner图 (背景banner广告图*3)"
              prop="banner"
          >
            <el-upload
                :auto-upload="true"
                :before-upload="beforeAvatarUpload"
                :file-list="orderFrom.banner"
                :http-request="httpRequestAdvertise"
                :limit="3"
                :on-exceed="handleExceed"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                accept=".jpeg,.png,.jpg"
                action="/"
                class="picture-uploader"
                list-type="picture-card"
            >
              <!-- <img v-if="orderFrom.imageUrl" :src="orderFrom.imageUrl" class="avatar" /> -->
              <el-icon class="avatar-uploader-icon">
                <Picture/>
                <div class="el-upload__text upload_photo">上传照片</div>
              </el-icon>
              <template #tip>
                <div class="el-upload__tip">支持png、jpg格式</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item
              v-if="select !== 5"
              label="自定义广告封面（不保证100%使用）"
          >
            <div class="upload_footer">
              <el-upload
                  :http-request="uploadBanner"
                  :show-file-list="false"
                  accept=".jpeg,.png,.jpg"
                  action=""
                  class="avatar-uploader"
                  drag
              >
                <img v-if="orderFrom.pic" :src="orderFrom.pic" class="avatar"/>
                <el-icon v-else class="avatar-uploader-footer">
                  <Plus/>
                </el-icon>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item v-if="select === 7" label="备注">
            <el-input
                v-model="orderFrom.remark"
                :rows="4"
                placeholder="请输入你的备注"
                style="width: 832px"
                type="textarea"
            />
          </el-form-item>
        </el-form>
        <span class="footer_next pointer" @click="resetForm(ruleFormRef)">
          下一步，选择/确认资源
        </span>
      </div>
      <div class="order_form_right">
        <div v-if="select === 4">
          <el-input
              v-model="textCopy"
              class="ant-input"
              placeholder="Product name:  幼微
Original price: $12.99 - $15.99
Discount price: $6.99 - $8.99
Discount: 50% + $1 Coupon
Discount code: JKHSJS (Work for All)
Code Start Day: 2021-10-20 00:00:00
Code End Day: 2021-10-20 00:00:00
Link: https://www.amazon.com/dp/XXXXX


使用流程：
1、点击 获取模板 按钮
2、填好后复制到此框
3、点击 智能识别 按钮
            "
              rows="16"
              type="textarea"
          />
          <div class="intelligent_botton">
            <span class="handle_botton" @click="handleInte">智能识别</span>
            <span class="get_botton pointer" @click="copyT">获取模版</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
        v-model="warmthDialogVisible"
        :close-on-click-modal="false"
        title="温馨提示"
        width="480"
    >
      <div class="warmth_remind">
        <p class="">以下情况可能<em>无法保证</em>安排当天提交发布:</p>
        <p>工作日超过下午7点提交的订单</p>
        <p>周末提交的订单</p>
        <p>折扣码未生效的订单</p>
        <p>
          另外，由于个别资源过于火爆或管理员审核慢导致的投放延误，发布时间可能会延迟1
          -2天,
        </p>
        <p>请尽量延长Code/Coupon有效期。如发布失败，费用将会原路退回.</p>
        <p>如有其他疑问，请联系客服(工作日9:00-18:00)</p>
      </div>
      <template #footer>
        <span class="text-left">
          <el-checkbox
              v-model="warmthChecked"
              size="large"
              value="1"
              @change="handleWarmth"
          >
          </el-checkbox>
          不在提示
        </span>
        <span class="dialog-footer">
          <el-button @click="warmthDialogVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import dayjs, {Dayjs} from 'dayjs'
import {copy} from '@/utils/method'
import {catestAll} from '@/api/order'
import {fileUploadAPI} from '@/api/user'
import {useOrderStore, useUserStore} from '@/stores'
import type {FormInstance, UploadProps} from 'element-plus'
import {cateseAll, getCountry, platformAll} from '@/api/index'
// import type { orderObjApi } from '@/types/order'
const warmthDialogVisible = ref<boolean>(false)
const orderStore = useOrderStore()
const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()
const select = ref<number>(4)
const nationArray = ref<any>([])
const countryArray = ref<any>([])
const cateseArray = ref<any>([])
const catereArray = ref<any>([])
const warmthChecked = ref<boolean>(false)
const money = ref<any>('$')
const textCopy = ref<any>()
const articleContentYW = ref<any>()
const editForm = reactive<any>({
  variable: '',
  variableArr: []
})
// 下单表单
const orderFrom = ref<any>({
  banner: [],
  platformId: '',
  promId: '',
  resourceTitle: '',
  countryId: '',
  endTime: '',
  startTime: '',
  note: '',
  originalPriceMax: '',
  originalPriceMin: '',
  discountPriceMax: '',
  discountPriceMin: '',
  coupon: '',
  preferentialRatio: '',
  discountCode: '',
  numberSamples: '',
  variableBody: [],
  resourceUrl: '',
  pic: '',
  articleContent: '',
  orderItems: {},
  orderType: '',
  sellId: '',
  articleType: 0,
  totalAmount: '',
  remark: '',
  memberId: userStore.userInfo?.userId,
  date: []
})
const orderRules = {
  sellId: [{required: true, trigger: 'change', message: '请选择营销分类'}],
  promId: [{required: true, trigger: 'change', message: '请选择资源分类'}],
  countryId: [{required: true, trigger: 'change', message: '请选择国家'}],
  platformId: [
    {required: true, trigger: 'change', message: '请选择购物平台'}
  ],
  articleType: [
    {required: true, trigger: 'change', message: '请选择文章类型'}
  ],
  resourceTitle: [
    {required: true, trigger: 'blur', message: '请输入产品标题'},
    {required: true, validator: titleText, trigger: 'blur'}
  ],
  originalPriceMin: [
    {required: true, trigger: 'blur', message: '请输入原价'},
    {required: true, validator: greaterPirceTo, trigger: 'blur'}
  ],
  discountPriceMin: [
    {required: true, trigger: 'blur', message: '请输入折后价'},
    {required: true, validator: greaterPirce, trigger: 'blur'}
  ],
  discountCode: [{required: true, trigger: 'blur', message: '请输入折扣码'}],
  preferentialRatio: [
    {required: true, trigger: 'blur', message: '请输入优惠比例'}
  ],
  date: [{required: true, trigger: 'change', message: '请选择时间'}],
  resourceUrl: [{required: true, trigger: 'blur', message: '请输入链接'}],
  articleContent: [
    {required: true, trigger: 'change', message: '请上传文章内容/Birft'}
  ],
  banner: [{required: true, trigger: 'change', message: '请上传Banner图'}]
}
const handleVariable = () => {
  if (editForm.variable && editForm.variableArr.length < 4) {
    editForm.variableArr.push(editForm.variable)
  }
  editForm.variable = undefined
}
//控制时间
const disabledDateFn = (current: Dayjs) => {
  return current < dayjs().subtract(2, 'days')
}

// 控制弹窗
const handleWarmth = () => {
  let isWarmth = warmthChecked.value ? '1' : '0'
  localStorage.setItem('isWarmth', isWarmth)
}
// 获取国家符号
const handleChangeMoney = async (id: any) => {
  const data = {
    pid: 0,
    id: id
  }
  console.log(id)
  const res = await getCountry(data)
  if (res.code === 200) {
    money.value = res.data ? res.data[0].unit : ''
    console.log(money.value)
  }
}
// 获取国家资源列表
const getCountryList = async () => {
  const res = await getCountry({})
  nationArray.value = res?.data
  console.log(nationArray.value, money.value)
}

// 折后价不能大于原价
function greaterPirce(rule: any, value: any, callback: any) {
  if (
      Number(orderFrom.value.discountPriceMin) >
      Number(orderFrom.value.originalPriceMin)
  ) {
    callback(new Error('折后价格不能大于原价'))
  } else if (!/^[1-9][0-9]*([\.][0-9]{1,2})?$/.test(value.trim())) {
    callback(new Error('输入的值只能为数字'))
  } else {
    callback()
  }
}

function greaterPirceTo(rule: any, value: any, callback: any) {
  if (!/^[1-9][0-9]*([\.][0-9]{1,2})?$/.test(value.trim())) {
    callback(new Error('输入的值只能为数字'))
  } else {
    callback()
  }
}

// 校验标题名称
function titleText(rule: any, value: any, callback: any) {
  console.log(orderFrom.countryId)
  const passwordRegex = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g
  if (orderFrom.value.countryId !== 99999) {
    if (passwordRegex.test(value)) {
      callback(new Error('请输入正确的产品标题'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 购物平台管理
const platformList = async () => {
  const res = await platformAll()
  countryArray.value = res?.data
}
// 营销分类管理
const cateseList = async () => {
  const res = await cateseAll()
  cateseArray.value = res?.data
}
// 通过id获取推广类别
const catereList = async (value: any) => {
  let data = {
    pid: value
  }
  const res = await catestAll(data)
  catereArray.value = res?.data
  orderFrom.value.promId = ''
  orderFrom.value.banner = []
}
// 通过资源分类区分下单类型
const handleType = (value: any) => {
  select.value = value
  orderFrom.value.orderType = value
  orderFrom.value.articleType = 0
  orderFrom.value.pic = ''
  orderFrom.value.banner = []
}
// 删除可变体
const deleteVariable = (index: any) => {
  editForm.variableArr.splice(index, 1)
}
const uploadBpmn = async (params: any) => {
  let file = params.file
  let formData = new FormData()
  formData.append('file', file)
  const res = await fileUploadAPI(formData)
  orderFrom.value.articleContent = res.data?.url
}
const handleRemoveYW: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // console.log(uploadFile, uploadFiles)
  orderFrom.value.articleContent = ''
  articleContentYW.value = []
}
const uploadBanner = async (params: any) => {
  let file = params.file
  if (file.type === 'image/jpeg' || file.type === 'image/png') {
    if (file.size / 1024 / 1024 > 2) {
      ElMessage.error('上传的图片不能超过 2MB!')
      return false
    }
    let formData = new FormData()
    formData.append('file', file)
    const res = await fileUploadAPI(formData)
    orderFrom.value.pic = res.data?.url
  } else {
    ElMessage.error('上传格式只能为JPG/PNG!')
    return false
  }
}

const beforeUpload = async (e: any) => {
  let clipboardData = e.clipboardData // IE
  if (!clipboardData) {
    clipboardData = e.originalEvent.clipboardData
  }
  const items = (e.clipboardData || e.originalEvent.clipboardData).items
  let file = null
  if (!items || items.length === 0) {
    ElMessage.error('当前浏览器不支持粘贴本地图片，请打开图片复制后再粘贴！')
    return
  }
  // 搜索剪切板items
  for (let i = 0; i < items.length; i++) {
    // 限制上传文件类型
    if (items[i].type.indexOf('image') !== -1) {
      file = items[i].getAsFile()
      break
    }
  }
  if (file) {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      if (file.size / 1024 / 1024 > 2) {
        ElMessage.error('上传的图片不能超过 2MB!')
        return false
      }
      let formData = new FormData()
      formData.append('file', file)
      const res = await fileUploadAPI(formData)
      orderFrom.value.pic = res.data?.url
    } else {
      ElMessage.error('上传格式只能为JPG/PNG!')
      return false
    }
  }
}

// 定义超出3张照片的行为
const handleExceed = (files: any, uploadFiles: any) => {
  ElMessage.warning(`上传最大的照片为3张`)
}
// 图片上传
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error('上传的图片不能超过 1MB!')
    return false
  }
}
// 图片上传
const httpRequestAdvertise = async (params: any) => {
  let file = params.file
  if (file.size / 1024 / 1024 > 1) {
    ElMessage.error('上传的图片不能大于 1MB!')
    return false
  } else {
    let formData = new FormData()
    formData.append('file', file)
    const res = await fileUploadAPI(formData)
    if (res.code === 200) {
      let data = {
        url: res.data?.url,
        uid: file.uid
      }
      orderFrom.value.banner.push(data)
    }
  }
}
// 删除图片
const handleRemove = (file: any) => {
  console.log(orderFrom.value.banner)
  orderFrom.value.banner.forEach((v: any, index: any) => {
    if (file.uid === v.uid) {
      orderFrom.value.banner.splice(index, 1)
    }
    console.log(orderFrom.value.banner)
  })
}
// 智能获取模板
const handleInte = () => {
  console.log(textCopy.value)
  if (!textCopy.value) {
    return
  }
  let copyD: any = {}
  textCopy.value.split('\n').forEach((i: any, v: number) => {
    let keyVal = i.split('：')
    copyD[keyVal[0].replace(/\s/g, '')] = keyVal[1].replace(/'/g, '')
    console.log(copyD.CodeStartDay)
  })
  orderFrom.value.resourceTitle = copyD.ProductName
  orderFrom.value.originalPriceMin = copyD.OriginalPrice.split('-')[0]
  orderFrom.value.originalPriceMax = copyD.OriginalPrice.split('-')[1]
  orderFrom.value.discountPriceMin = copyD.DiscountPrice.split('-')[0]
  orderFrom.value.discountPriceMax = copyD.DiscountPrice.split('-')[1]
  orderFrom.value.discountCode = copyD.DiscountCode
  orderFrom.value.preferentialRatio = copyD.Discount.split('+')[0]
  orderFrom.value.coupon = copyD.Discount.split('+')[1]
  orderFrom.value.date = [copyD.CodeStartDay, copyD.CodeEndDay]
  orderFrom.value.resourceUrl = copyD.Link
}
// 复制
const copyT = () => {
  const copyF = `Product Name：\nOriginal Price：\nDiscount Price：\nDiscount：\nDiscount Code：\nCode Start Day：\nCode End Day：\nLink：`
  copy(copyF)
}
// 获取订单带过来的参数
const orderObject = async () => {
  if (orderStore.orderObject) {
    orderFrom.value = orderStore.orderObject
    if (orderFrom.value.promId === 3) {
      articleContentYW.value = [
        {
          name: orderStore.orderObject.articleContent,
          uid: 520,
          url: orderStore.orderObject.articleContent
        }
      ]
    }
    select.value = orderFrom.value.promId
    orderFrom.value.orderType = orderFrom.value.promId
    console.log(orderFrom.value)
    if (orderFrom.value.banner.length > 0) {
      orderFrom.value.banner = orderFrom.value.banner.map((i: any, j: any) => {
        return {url: i, uid: j}
      })
    }
    handleChangeMoney(orderFrom.value.countryId)
    let data = {
      pid: orderFrom.value.sellId
    }
    const res = await catestAll(data)
    catereArray.value = res?.data
  }
}
const handlePictureCardPreview = (file: any) => {
  // dialogImageUrl.value = file.url
  // dialogVisible.value = true
}
const emit = defineEmits(['dropOrderChange'])
const resetForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let arr = countryArray.value.find(
          (v: any) => v.id === orderFrom.value.platformId
      )
      console.log(arr.url)
      if (!orderFrom.value.resourceUrl.includes(arr.url)) {
        ElMessage.error('请输入正确购物平台地址')
        return
      }
      if (orderFrom.value.discountCode === 'nocode') {
        orderFrom.value.preferentialRatio = ''
      }
      orderFrom.value.endTime =
          orderFrom.value.date.length > 0 ? orderFrom.value.date[1] : ''
      orderFrom.value.startTime =
          orderFrom.value.date.length > 0 ? orderFrom.value.date[0] : ''
      orderFrom.value.variableBody = editForm.variableArr.toString()
      console.log(orderFrom.value.orderType)
      if (orderFrom.value.orderType !== 3) {
        orderFrom.value.articleType = null
      }
      let orderObject = Object.assign({}, orderFrom.value)
      if (typeof orderObject.banner !== 'string') {
        if (orderObject.banner.length > 0) {
          orderObject.banner = orderObject.banner
              .map((i: any) => {
                return i.url
              })
              .join(',')
        } else {
          orderObject.banner = ''
        }
      }
      console.log(orderFrom.value)
      emit('dropOrderChange', orderObject, 2)
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 提示弹窗
const openWarmth = () => {
  let warmth = localStorage.getItem('isWarmth')
  if (warmth === '1') {
    warmthDialogVisible.value = false
  } else {
    warmthDialogVisible.value = true
  }
}
onUnmounted(() => {
  localStorage.removeItem('order')
  location.reload()
})
openWarmth()
cateseList()
getCountryList()
platformList()
orderObject()
</script>
<style lang="scss" scoped>
.place_order_mian {
  width: 1400px;
  margin-left: auto;
  margin-right: auto;

  .order_nav {
    margin-top: 16px;
    background-color: #fff;
    padding: 24px;
    display: flex;
  }

  .order_form_left {
    width: 832px;

    .order_form {
      .form_inline {
        display: inline-block;
        width: 368px;
      }

      .unit_color {
        color: #111;
        font-weight: bold;
      }

      .form_select {
        width: 100%;
      }

      .home_price_box {
        :deep(.el-form-item__label) {
          color: #111;
          font-weight: bold;

          &::after {
            content: ' 建议超过5天';
            color: #ef6706;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }

      :deep(.ant-picker-range) {
        width: 100%;

        .ant-picker-input {
          input {
            text-align: center;
          }
        }

        .ant-picker-active-bar {
          display: none;
        }
      }

      .yw_resource_url {
        :deep(.el-form-item__label) {
          color: #111;
          font-weight: bold;
        }

        .resource_url_title {
          position: relative;
          top: 22px;
          left: 38px;
          color: #fff;
          font-size: 14px;
          font-weight: 400;
          padding: 0 9px;
          margin-left: 5px;
          display: inline-flex;
          background: #8a0019;

          img {
            margin-left: 5px;
            margin-top: 2px;
            width: 16px;
            height: 16px;
          }
        }
      }

      .home_price_box1 {
        :deep(.el-form-item__label) {
          color: #111;
          font-weight: bold;

          &::after {
            content: ' 建议超过5天';
            color: #ef6706;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }

      .home_price_box2 {
        :deep(.el-form-item__label) {
          color: #111;
          font-weight: bold;

          &::after {
            content: '建议提前3天预约、且活动时间超过5天';
            color: #fff;
            font-size: 14px;
            font-weight: 400;
            padding: 0 9px;
            margin-left: 5px;
            background: #8a0019;
          }
        }
      }

      :deep(.el-form-item__label) {
        color: #111;
        font-weight: bold;
      }

      .platform {
        margin-left: 96px;
      }

      .form_pirce {
        display: flex;

        .form_pirce_span {
          margin: 0 41px;
        }

        .form_pirce_iput {
          width: 368px;
          display: inline-block;
        }

        .form_pirce_variable {
          width: 588px;
        }

        .variable_botton {
          width: 220px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          color: #fff;
          background: #098d72;
          border-radius: 4px;
          margin-left: 24px;
          cursor: pointer;
        }
      }

      .variable_list {
        margin-top: 5px;

        ul {
          li {
            float: left;
            margin-right: 10px;

            span {
              padding: 0 5px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #098d72;
              border-radius: 4px;
              border: 1px solid #098d72;
            }
          }
        }
      }

      .picture-uploader {
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

      .upload_footer {
        width: 120px;
        height: 120px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        // border: 1px solid #dcdee0;

        .avatar-uploader-footer {
          height: 120px;
          width: 120px;
        }

        .avatar {
          height: 100%;
          width: 100%;
        }
      }

      // .el-icon.avatar-uploader-icon {
      //   width: 110px;
      //   height: 110px;
      // }

      .upload-demo {
        width: 100%;

        .el-upload_conetnt {
          margin-top: 22px;
        }

        .el-upload__text {
          display: flex;
          align-items: center;
          justify-content: center;

          .el-icon-demo-text_click {
            color: #098d72;
            margin: 0 5px;
          }

          .el-icon-demo-text {
            color: #333 !important;
          }

          .el-icon-demo {
            color: #098d72;
          }
        }
      }

      .articleType {
        display: flex;
        align-items: center;

        :deep(.el-form-item__label) {
          margin-bottom: 0 !important;
        }
      }
    }

    .footer_next {
      width: 832px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      background: #098d72;
      border-radius: 4px;
      font-size: 14px;
      display: block;
    }
  }

  .order_form_right {
    flex: 1;
    padding-left: 140px;

    .intelligent {
      width: 380px;
      height: 360px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #dcdee0;
      padding: 24px;
      color: #969799;

      span {
        margin-top: 5px;
        display: block;
      }

      .intelligent_process {
        margin-top: 30px;

        em {
          display: block;
          margin-top: 3px;
        }
      }
    }

    .intelligent_botton {
      margin-top: 24px;
      display: flex;

      .handle_botton {
        width: 92px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #098d72;
        cursor: pointer;
        color: #fff;
        border-radius: 4px;
        opacity: 1;
      }

      .get_botton {
        width: 92px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #ffffff;
        color: #098d72;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        border: 1px solid #098d72;
        margin-left: 8px;
      }
    }
  }

  .warmth_remind {
    em {
      color: #f3294d;
    }
  }
}

:deep(.el-upload-dragger) {
  height: 118px;
  padding: 0;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 118px;
  height: 118px;
}

:deep(.el-upload--picture-card) {
  width: 118px;
  height: 118px;
}

:deep(.el-dialog__footer) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

:deep(.el-upload-list--picture-card
    .el-upload-list__item-actions:hover
    .el-upload-list__item-preview) {
  display: none;
}
</style>

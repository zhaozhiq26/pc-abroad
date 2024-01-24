<template>
  <div class="img_order">
    <div class="img_order_nav">
      <div class="refresh" @click="handelRefresh">
        <span class="pointer">
          <el-icon :class="{ rotateIcon: classNameTo }">
            <Refresh/>
          </el-icon>
          刷新
        </span>
      </div>
      <div class="order_date">
        <el-date-picker
            v-model="date_picker"
            :clearable="false"
            end-placeholder="结束时间"
            format="YYYY/MM/DD"
            range-separator="-"
            start-placeholder="开始时间"
            type="daterange"
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="handleDatePicker"
        />
      </div>
      <div class="order_select">
        <el-select
            v-model="imgTextObj.orderStatusList"
            :clearable="true"
            collapse-tags
            multiple
            placeholder="全部"
        >
          <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </div>
      <div class="order_input">
        <el-input
            v-model="imgTextObj.resourceTitle"
            class="order_input_pl"
            clearable
            placeholder="产品标题"
            type="text"
            @keyup.enter.native="handleSearch"
        />
        <span class="search pointer" @click="handleSearch">搜索</span>
        <span class="reset pointer" @click="handleReset">重置</span>
        <!-- <img src="@/assets/img/inquire.png" alt="" class="inquire" /> -->
      </div>
      <div class="order_merge">
        <el-switch
            v-model="aggPayType"
            active-text="合并"
            class="ml-2"
            inactive-text="合并"
            inline-prompt
            size="large"
        />
        <button
            :class="[aggPayType ? 'pay_true' : '']"
            :disabled="!aggPayType"
            class="pay_flase pointer"
            @click="handleAggPay(2)"
        >
          合并支付
        </button>
      </div>
    </div>
    <div v-loading="loading" class="img_order_list">
      <div class="list_title">
        <span class="checkbox"></span>
        <span class="product">产品标题</span>
        <span class="pirce"></span>
        <span class="code"></span>
        <span class="total">总费用</span>
        <span class="date">创建时间</span>
        <span class="operate">操作</span>
      </div>

      <el-checkbox-group
          v-model="checkList"
          @change="handleCheckedCitiesChange"
      >
        <el-scrollbar height="670px">
          <div v-for="(item, index) in imgTextData" :key="index">
            <div class="list_content">
              <div class="checkbox">
                <span>
                  <el-checkbox v-if="item.payStatus === 0" :label="item"/>
                </span>
              </div>
              <div class="list_img">
                <div
                    class="img_name"
                    @click="handleProductPic(item.productPic)"
                >
                  <img :src="item.productPic" alt=""/>
                </div>
                <div class="img_title">
                  <div class="introduce">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        placement="top-start"
                    >
                      <span class="name_text">{{ item.resourceTitle }}</span>
                      <template #content>
                        <p class="content">
                          {{ item.resourceTitle }}
                        </p>
                      </template>
                    </el-tooltip>
                  </div>
                  <div class="score">
                    <span>
                      <img :src="item.countryPic" alt=""/>
                      {{ item.countryName }}
                    </span>
                    <span>
                      <img alt="" src="@/assets/img/collect.png"/>
                      {{ item.score }}
                    </span>
                    <span>
                      <img alt="" src="@/assets/img/information.png"/>
                      {{ item.commentSum }}
                    </span>
                    <span class="score_right">
                      <el-tooltip
                          :content="item.platformsName"
                          class="box-item"
                          effect="dark"
                          placement="top-start"
                      >
                        <img :src="item.platformsPic" alt=""/>
                      </el-tooltip>
                    </span>
                  </div>
                </div>
              </div>
              <div class="text_content">
                <span v-if="item.originalPriceMin">
                  <!-- ${{ item.originalPriceMin }}-{{ item.originalPriceMax }} -->
                </span>
                <el-text
                    v-if="item.discountPriceMin"
                    class="text_content_span"
                    tag="del"
                >
                  <!-- ${{ item.discountPriceMin }}-{{ item.discountPriceMax }} -->
                </el-text>
              </div>
              <div class="text_content text_browser">
                <span v-if="item.discountCode"> </span>
                <span v-if="item.coupon" class="text_content_span">
                  <!-- -->
                </span>
              </div>
              <div class="text_content">
                <span class="paid_pirce"> ￥{{ item.totalAmount }} </span>
                <span
                    :class="[
                    item.payStatus === 0
                      ? 'yellow_paid'
                      : item.payStatus === 1
                      ? 'paid'
                      : 'active_paid'
                  ]"
                    class="text_content_span"
                >
                  {{ filters[item.payStatus] }}
                </span>
              </div>
              <div class="text_content date">
                <span>{{ item.createTime }}</span>
                <div v-if="item.statistics" class="date_span">
                  <span>
                    <el-tooltip
                        :content="item.statistics.blueName"
                        class="box-item"
                        effect="dark"
                        placement="top-start"
                    >
                      <em class="blue"> </em>
                    </el-tooltip>
                    <i>{{ item.statistics.blue }}</i>
                  </span>
                  <span>
                    <el-tooltip
                        :content="item.statistics.yellowName"
                        class="box-item"
                        effect="dark"
                        placement="top-start"
                    >
                      <em class="yellow"></em>
                    </el-tooltip>
                    <i>{{ item.statistics.yellow }}</i>
                  </span>
                  <span>
                    <el-tooltip
                        :content="item.statistics.greenName"
                        class="box-item"
                        effect="dark"
                        placement="top-start"
                    >
                      <em class="green"></em>
                    </el-tooltip>
                    <i>{{ item.statistics.green }}</i>
                  </span>
                </div>
              </div>
              <div class="operate_botton">
                <!-- <span
                v-if="item.payStatus !== 0 && item.payStatus !== 1"
                class="coming"
                @click="handleLink()"
              >
                再来一单
              </span> -->
                <div class="child_none">
                  <div
                      v-if="item.payStatus !== 0 && (!(item.payStatus === 1 && item.orderItems.every( (t:any) => t.status === 2)) || item.payStatus === 2)"
                      class="child_footer1"
                  >
                    <div class="child_botton">
                      <span
                          class="close-order pointer"
                          @click="handleLink(item)"
                      >
                        再来一单
                      </span>
                    </div>
                  </div>
                  <div
                      v-if="item.payStatus === 1 && item.orderItems.every( (t:any) => t.status === 2)"
                      class="child_footer1 child_footer_order1"
                  >
                    <div class="child_botton">
                      <el-popover :width="234" placement="left" trigger="click">
                        <template #reference>
                          <span class="close-order pointer">
                            关闭订单
                            <img alt="" src="@/assets/img/dwon.png"/>
                          </span>
                        </template>
                        <div class="close_details">
                          <div class="close_title">
                            <img
                                alt=""
                                src="@/assets/img/close_set.jpg"
                            />确定关闭订单？
                          </div>
                          <div class="close_botton">
                            <span class="close_c pointer" @click="handleRefund">
                              取消
                            </span>
                            <span
                                class="close_q pointer"
                                @click="handleColseStayOrder(item)"
                            >确认</span
                            >
                          </div>
                        </div>
                      </el-popover>
                    </div>
                    <div class="select-box">
                      <span
                          class="close-order pointer"
                          @click="handleLink(item)"
                      >
                        再来一单
                      </span>
                    </div>
                  </div>
                  <div
                      v-if="item.payStatus === 0"
                      class="child_footer1 child_footer_order1"
                  >
                    <div class="child_botton">
                      <span
                          class="close-order pointer"
                          @click="handlePayDialog(item, 1)"
                      >
                        &nbsp;&nbsp;支付&nbsp;&nbsp;<img
                          alt=""
                          src="@/assets/img/dwon.png"
                      />
                      </span>
                    </div>
                    <div class="select-box">
                      <span
                          v-if="item.payStatus === 0"
                          class="close-order pointer"
                          @click="handlePopCloseOrder(item)"
                      >
                        关闭订单
                      </span>
                    </div>
                  </div>
                </div>
                <div @click="changContent(item)">
                  <el-icon v-if="item.showhide">
                    <ArrowDown/>
                  </el-icon>
                  <el-icon v-else>
                    <ArrowRight/>
                  </el-icon>
                </div>
              </div>
            </div>
            <div
                v-for="(itemChild, childIndex) in item.orderItems"
                v-if="item.showhide"
                :key="childIndex"
                class="child_list"
            >
              <div class="child_list_img">
                <div class="child_img_name">
                  <img :src="itemChild.picUrl" alt=""/>
                </div>
                <div class="child_img_title">
                  <div class="name">
                    <span>{{ itemChild.resourceName }}</span>
                  </div>
                  <div class="describe">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        placement="top-start"
                    >
                      <span class="name_text"> 媒体描述 </span>
                      <template #content>
                        <p class="content">
                          {{ itemChild.resourceDes }}
                        </p>
                      </template>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div class="child_text_content send_samples">
                <span
                    v-if="itemChild.status === 3 || itemChild.status === 6"
                    class="pointer"
                    @click="openAddressDialog(itemChild)"
                >
                  寄样地址
                </span>
              </div>
              <div
                  v-if="itemChild.status !== 2 && itemChild.status !== 6"
                  class="child_text_content chlid_link"
              >
                <div
                    v-if="
                    itemChild.status !== 1 &&
                    itemChild.status !== 3 &&
                    itemChild.status !== 18 &&
                    itemChild.status !== 5 &&
                    itemChild.status !== 4 &&
                    itemChild.status !== 20 &&
                    itemChild.status !== 21
                  "
                >
                  <span>服务反馈</span>
                  <span class="child_text_span">
                    <el-popover
                        v-if="itemChild.secondScreenshot || itemChild.screenshot"
                        :width="300"
                        placement="top"
                        trigger="click"
                    >
                      <template #reference>
                        <em class="pointer">查看</em>
                      </template>
                      <div style="margin-top: 10px">
                        <img
                            :src="
                            itemChild.secondScreenshot
                              ? itemChild.secondScreenshot
                              : itemChild.screenshot
                          "
                            alt=""
                            style="width: 270px; height: 200px"
                        />
                      </div>
                    </el-popover>
                    <a
                        v-if="
                        itemChild.secondCompleteLink || itemChild.completeLink
                      "
                        :href="
                        itemChild.secondCompleteLink
                          ? itemChild.secondCompleteLink
                          : itemChild.completeLink
                      "
                        class="analyze_link"
                        target="_blank"
                    >
                      链接
                    </a>
                  </span>
                </div>
              </div>
              <div class="child_text_content chlid_pirce">
                <span>费用</span>
                <span class="child_text_span">
                  ￥{{ itemChild.totalAmount }}
                </span>
              </div>
              <!-- v-if="itemChild.status !== 2 && itemChild.status !== 1" -->
              <div class="child_text_content chlid_media">
                <span>商家</span>
                <span class="chlid_media_ser">
                  <img :src="itemChild.avatar" alt=""/>
                  <em v-if="itemChild.sfName === '自营'">
                    <img
                        :alt="itemChild.sfName"
                        src="@/assets/img/operated.jpg"
                    />
                  </em>
                  <em v-if="itemChild.sfName === '媒体主'">
                    <img :alt="itemChild.sfName" src="@/assets/img/media.jpg"/>
                  </em>
                  <em v-if="itemChild.sfName === '服务商'">
                    <img
                        :alt="itemChild.sfName"
                        src="@/assets/img/service_provider.jpg"
                    />
                  </em>
                </span>
              </div>
              <div class="child_text_content schedule">
                <el-popover :width="210" placement="left" trigger="hover">
                  <template #reference>
                    <span class="progress">订单进展</span>
                  </template>
                  <div>
                    <el-timeline>
                      <el-timeline-item
                          v-for="(history, index) in itemChild.history"
                          :key="index"
                          :timestamp="history.createTime"
                      >
                        {{ history.statusName }}
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </el-popover>
                <span
                    v-if="
                    itemChild.status !== 20 &&
                    itemChild.status !== 21 &&
                    itemChild.status !== 5 &&
                    itemChild.status !== 11 &&
                    itemChild.status !== 19
                  "
                    class="schedule_sta"
                >
                  <em></em>
                  {{ orderStatus(itemChild.status) }}
                </span>
                <el-popover
                    v-if="
                    itemChild.status === 20 ||
                    itemChild.status === 21 ||
                    itemChild.status === 5 ||
                    itemChild.status === 11 ||
                    itemChild.status === 19
                  "
                    :width="350"
                    placement="left"
                    trigger="hover"
                >
                  <template #reference>
                    <span
                        :class="[
                        itemChild.status === 19 ? 'schedule_improve' : ''
                      ]"
                        class="schedule_question"
                    >
                      <em></em>
                      {{ orderStatus(itemChild.status) }}
                    </span>
                  </template>
                  <div class="describe">
                    <div class="describe_text">
                      {{ textStatus(itemChild.status, itemChild) }}
                    </div>
                    <img
                        v-if="itemChild.problemPic"
                        :src="itemChild.problemPic"
                        alt=""
                    />
                  </div>
                </el-popover>
              </div>
              <div
                  v-if="
                  itemChild.status === 2 ||
                  itemChild.status === 6 ||
                  itemChild.status === 7 ||
                  itemChild.status === 8 ||
                  itemChild.status === 9
                "
                  class="child_text_content child_list_date"
              >
                <span v-if="itemChild.remainingTimePost">待接单剩余时间</span>
                <span v-if="itemChild.remainingTimeOrderPending"
                >剩余上贴时间</span
                >
                <span v-if="itemChild.remainingTimePost" class="child_date">
                  <el-countdown
                      :value="Date.now() + itemChild.remainingTimePost"
                      format="DD [天] HH:mm:ss"
                  >
                  </el-countdown>
                </span>
                <span
                    v-if="itemChild.remainingTimeOrderPending"
                    class="child_date"
                >
                  <el-countdown
                      :value="Date.now() + itemChild.remainingTimeOrderPending"
                      format="DD [天] HH:mm:ss"
                  >
                  </el-countdown>
                </span>
              </div>
              <!-- 3 -->
              <div class="child_text_content child_status">
                <span
                    v-if="itemChild.status === 3"
                    class="evaluate pointer"
                    @click="handleSampleSent(itemChild)"
                >
                  寄样
                </span>
                <a
                    v-if="itemChild.status === 4"
                    :href="itemChild.address"
                    class="child_status_check"
                    target="_blank"
                >
                  查看物流
                </a>
                <el-popover
                    v-if="itemChild.status === 2"
                    :width="234"
                    placement="left"
                    trigger="click"
                >
                  <template #reference>
                    <span class="evaluate pointer"> 取消订单 </span>
                  </template>
                  <div class="close_details">
                    <div class="close_title">
                      <img
                          alt=""
                          src="@/assets/img/close_set.jpg"
                      />确定取消订单？
                    </div>
                    <div class="close_botton">
                      <span class="close_c pointer" @click="handleRefund">
                        取消
                      </span>
                      <span
                          class="close_q pointer"
                          @click="handleColseOrder(itemChild)"
                      >
                        确认
                      </span>
                    </div>
                  </div>
                </el-popover>
                <span
                    v-if="
                    itemChild.status === 10 && itemChild.commentStatus === 0
                  "
                    class="evaluate pointer"
                    @click="openComment(itemChild)"
                >
                  评价
                </span>
                <span
                    v-if="
                    itemChild.status === 10 && itemChild.commentStatus === 1
                  "
                    class="evaluate pointer"
                    @click="openCheckComment(itemChild)"
                >
                  查看评价
                </span>
                <span
                    v-if="itemChild.status === 5"
                    class="evaluate pointer"
                    @click="handleQuestionRefund(itemChild)"
                >
                  申请退款
                </span>
                <!-- itemChild.status === 6 && itemChild.codeFlag -->
                <div
                    v-if="itemChild.status === 6 && itemChild.codeFlag"
                    class="write_code_botton"
                    @click="setOrderCodeData(itemChild)"
                >
                  <span class="write_code_botton_text">
                    填写code
                    <el-icon class="write_code_icon">
                      <QuestionFilled/>
                    </el-icon>
                  </span>
                </div>
                <!-- 17待确认 -->
                <div
                    v-if="itemChild.status === 17"
                    class="child_footer child_footer_order"
                >
                  <div class="child_botton">
                    <span @click="handleVerifyOrder(itemChild)">确认订单</span>
                    <img alt="" src="@/assets/img/dwon.png"/>
                  </div>
                  <div class="select-box">
                    <p @click="handleRefundDialog(itemChild)">申请退款</p>
                  </div>
                </div>
                <!-- 19改进确认 -->
                <div
                    v-if="itemChild.status === 19"
                    class="child_footer child_footer_order"
                >
                  <div class="child_botton">
                    <span @click="handleTwoVerifyOrder(itemChild)">
                      确认订单
                    </span>
                    <img alt="" src="@/assets/img/dwon.png"/>
                  </div>
                  <div class="select-box">
                    <p @click="handlePlatform(itemChild)">平台介入</p>
                  </div>
                </div>
                <!-- 7 -->
                <div
                    v-if="itemChild.status === 7"
                    class="child_footer child_footer_order"
                >
                  <div class="child_botton" @click="handleAgree(itemChild)">
                    <span>同意延长</span>
                    <img alt="" src="@/assets/img/dwon.png"/>
                  </div>
                  <div class="select-box" @click="handleRefuse(itemChild)">
                    <p>拒绝延长</p>
                  </div>
                </div>
                <div
                    v-if="itemChild.status === '4'"
                    class="child_footer child_footer_order"
                >
                  <div class="child_botton">
                    <img alt="" src="@/assets/img/dwon.png"/>
                  </div>
                  <div class="select-box">
                    <p>取消</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-checkbox-group>
      <pagination
          v-show="total > 1"
          v-model:limit="imgTextObj.pageSize"
          v-model:page="imgTextObj.current"
          :total="total"
          @pagination="getListBySendSamplesPage"
      />
    </div>
    <!-- 支付订单 -->
    <el-dialog
        v-model="payDialogVisible"
        :close-on-click-modal="false"
        title="订单详情"
        width="600"
        @close="closePay"
    >
      <div class="dialog_pirce">
        <div class="order_content">
          <h5>订单信息</h5>
          <div class="order_code">
            <span> 订单编号： {{ orderDetails.id }} </span>
            <span class="order_title">
              产品标题：{{ orderDetails.resourceTitle }}
            </span>
          </div>
          <div class="pirce_discount">
            <!-- <span v-if="userStore.userInfo.userType === 1" class="pirce_true">
              <i>原价：</i><em>￥{{ orderDetails.memberPrice }}</em>
            </span> -->
            <span class="pirce_true">
              <i>原价：</i><em>￥{{ orderDetails.originalPrice }}</em>
            </span>
            <span class="pirce_false">
              <i>优惠金额：</i><em>￥{{ orderDetails.discountedPrice }}</em>
            </span>
          </div>
          <div class="actual">
            <span>实付款</span>
            <span class="actual_pirce">￥{{ orderDetails.totalAmount }}</span>
          </div>
        </div>
        <div class="pay_way">
          <h5>支付方式</h5>
          <div class="pay_way_code">
            <qrcode-vue :size="120" :value="qrCodeText" level="H"/>
            <div class="pay_way_options">
              <span>微信</span>
              <span class="pay_way_alipay">&</span>
              <span>支付宝</span>
            </div>
          </div>
          <div class="balance">
            <span class="balance_content">
              <el-radio-group v-model="isBalance" class="ml-4">
                <el-radio label="1" size="large"><span></span></el-radio>
              </el-radio-group>
              <el-icon class="balance_icon">
                <Wallet/>
              </el-icon>
              钱包余额
            </span>
            <span class="balance_actual">￥{{ balance }}</span>
          </div>
          <div
              v-loading.fullscreen.lock="fullscreenLoading"
              class="handle_immediately"
              @click="handleAtPay"
          >
            立即支付
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 寄样地址 -->
    <el-dialog
        v-model="sendDialogVisible"
        :close-on-click-modal="false"
        title="寄样"
        width="389"
        @close="refundResetClose"
    >
      <div class="comment">
        <el-form
            ref="sendRef"
            :model="sendForm"
            :rules="sendRules"
            label-position="top"
        >
          <el-form-item label="物流查询链接" prop="username">
            <el-input
                v-model="sendForm.username"
                placeholder="示例: https://t.17tracknet/zh-cn?nums=LX691323424CN"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="dialog-footer-close" @click="sendSampleClose">
            取消
          </el-button>
          <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              class="dialog-footer-confirm"
              type="primary"
              @click="handleSendSample(sendRef)"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 填写code码 -->
    <el-dialog
        v-model="writeDialogVisible"
        :close-on-click-modal="false"
        title="填写code"
        width="389"
    >
      <div class="write_code">
        <el-form :model="sendCodeForm" label-position="top">
          <el-form-item label="Code/Coupon(选填)">
            <el-input
                v-model="sendCodeForm.coupon"
                placeholder="叠加coupon，如：5%或$2prime"
            />
          </el-form-item>
          <el-form-item label="备注(选填)">
            <el-input
                v-model="sendCodeForm.note"
                :rows="4"
                placeholder="如code/coupon 已更新可留言 "
                type="textarea"
            />
          </el-form-item>
        </el-form>
        <span class="write_code_text"
        >注意:在开始制作的72小时内填写code信息，超过则不可填写
        </span>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="dialog-footer-close" @click="closeCode">
            取消
          </el-button>
          <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              class="dialog-footer-confirm"
              type="primary"
              @click="handleOrderCode"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 申请退款 -->
    <el-dialog
        v-model="refundDialogVisible"
        :close-on-click-modal="false"
        title="申请退款"
        width="389"
        @close="refundResetClose"
    >
      <div class="comment">
        <el-form
            ref="refundRef"
            :model="refundDForm"
            :rules="refundDRules"
            class="login-name"
        >
          <el-form-item prop="requestingRefundId">
            <el-select
                v-model="refundDForm.requestingRefundId"
                placeholder="退款原因"
            >
              <el-option
                  v-for="item in rejectList"
                  :key="item.id"
                  :label="item.content"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="dialog-footer-close" @click="refundResetClose">
            取消
          </el-button>
          <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              class="dialog-footer-confirm"
              type="primary"
              @click="handleRefundVerify(refundRef)"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 邮寄地址 -->
    <el-dialog
        v-model="addressDialogVisible"
        :close-on-click-modal="false"
        title="邮寄地址"
        width="389"
    >
      <div class="dialog_address">
        <div class="dialog_name">
          <span>{{ addressContent.name }} {{ addressContent.mobile }}</span>
        </div>
        <div class="address">
          <span class="address_text">{{ addressContent.detailAddress }}</span>
          <span class="address_copy pointer" @click="copy(addressContent)">
            复制邮寄地址
          </span>
        </div>
        <div class="disclaimer">
          免责声明:平台不负责物流的安全性以及货品的完整性
        </div>
      </div>
    </el-dialog>
    <!-- 留言 -->
    <el-drawer
        v-model="messageDialogVisible"
        :close-on-click-modal="false"
        title="留言"
    >
      <div class="message_content">
        <ul>
          <li>
            <div class="content">
              <div class="list_left">
                <span class="list_left_ser"></span>
                <span class="list_left_text">dasdadas ?</span>
              </div>
              <div class="content_date">202020</div>
            </div>
            <div class="content right_content">
              <div class="list_right">
                <span class="list_left_ser"></span>
                <span class="list_left_text">dasdadas</span>
              </div>
              <div class="right_content_date">202020</div>
            </div>
          </li>
        </ul>
      </div>
      <template #footer>
        <div class="message_footer">
          <el-input
              v-model="message"
              class="message_input"
              placeholder="输入你想说的话"
          />
          <span class="message_botton" @click="handleMessage">发送</span>
        </div>
      </template>
    </el-drawer>
    <!-- 评分 -->
    <el-dialog
        v-model="commentDialogVisible"
        :close-on-click-modal="false"
        title="评论"
        width="389"
        @close="resetClose"
    >
      <el-form
          ref="commentRef"
          :model="comment"
          :rules="commentRules"
          class="order_form"
      >
        <el-form-item label="评分" prop="score">
          <el-rate v-model="comment.score" :colors="colors"/>
        </el-form-item>
        <el-form-item>
          <el-input
              v-model="comment.content"
              :rows="2"
              placeholder="请写下你的评论~"
              type="textarea"
          />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
              :http-request="uploadScore"
              :show-file-list="false"
              action=""
              class="avatar-uploader"
          >
            <img v-if="comment.pic" :src="comment.pic" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetClose">取消</el-button>
          <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="primary"
              @click="handleComment(commentRef)"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 查看评论 -->
    <el-dialog v-model="checkCommentDialogVisible" title="查看评论" width="389">
      <div class="comment_content">
        <div class="comment_score">
          <span>评分:</span>
          <el-rate
              v-model="commentDs.score"
              :colors="['#026853', '#026853', '#026853']"
              disabled
              score-template="{value} 分"
              show-score
              text-color="#111111"
          />
        </div>
        <div class="comment_text">
          <p>{{ commentDs.content }}</p>
        </div>
        <div class="comment_img">
          <img :src="commentDs.pic" class="avatar"/>
        </div>
      </div>
    </el-dialog>
    <!-- 图片放大 -->
    <el-dialog v-model="productdialogVisible">
      <img
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; max-width: 100%"
          w-full
      />
    </el-dialog>
    <!-- 关闭订单 -->
    <el-dialog
        v-model="colsedialogVisible"
        :close-on-click-modal="false"
        width="234"
    >
      <div class="close_details">
        <div class="close_title">
          <img alt="" src="@/assets/img/close_set.jpg"/>确定关闭订单？
        </div>
        <div class="close_botton">
          <span class="close_c pointer" @click="handlePopRefund"> 取消 </span>
          <span
              class="close_q pointer"
              @click="handleColseAddOrder(closeOrder)"
          >
            确认
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import QrcodeVue from 'qrcode.vue'
import {fileUploadAPI} from '@/api/user'
import {useOrderStore, useUserStore} from '@/stores'
import type {evaluateObjApi, imgTextObjApi} from '@/types/personal'
import {filters} from '@/enums'
import type {FormInstance} from 'element-plus'
import {
  addComment,
  agreeExtendPosting,
  cancelCreateOrderList,
  cancelOrder,
  cancelOrderList,
  checkComment,
  confirmOrder,
  getMergeId,
  getPayStatus,
  improvementConfirmation,
  listBySendSamplesPage,
  orderReject,
  orderStatusList,
  platformIntervention,
  questionRequestRefund,
  refuseExtenPosting,
  requestRefun,
  sampleSent,
  setOrderCode,
  toDelayPay,
  walletRuery
} from '@/api/personal'

const userStore = useUserStore()
const orderStore = useOrderStore()

const router = useRouter()

const refundRef = ref<FormInstance>()
const commentRef = ref<FormInstance>()
const sendRef = ref<FormInstance>()
const aggPayType = ref<boolean>(false)
const payNum = ref<number>(1)
const orderSubmitParam = ref<any>([])
const classNameTo = ref(false)
const checkList = ref<any>([])
const refundDialogVisible = ref(false)
const writeDialogVisible = ref(false)
const sendDialogVisible = ref(false)
const payDialogVisible = ref(false)
const productdialogVisible = ref(false)
const commentDialogVisible = ref(false)
const checkCommentDialogVisible = ref(false)
const addressDialogVisible = ref(false)
const messageDialogVisible = ref(false)
const colsedialogVisible = ref(false)
const statusList = ref<any>()
const rejectList = ref<any>()
const sendDetails = ref<any>()
const closeOrder = ref<any>()
const message = ref('')
const dialogImageUrl = ref('')
const colors = ref(['#098D72', '#098D72', '#098D72'])
const loading = ref(false)
const orderDetails = ref<any>({
  id: '',
  resourceTitle: '',
  memberPrice: '',
  originalPrice: '',
  discountedPrice: '',
  totalAmount: ''
})
const balance = ref<any>()
const qrCodeText = ref<any>('')
const isBalance = ref<any>('1')
const imgTextData = ref<any>()
const date_picker = ref<any>('')
const total = ref<number>(0)
const codeObj = ref<any>()
const addressContent = ref<any>()
const timeInter = ref<any>(null)
const orderId = ref<any>()
const commentDs = ref<any>()
const fullscreenLoading = ref(false)
const orderObj = reactive({
  order: '',
  orderTow: '',
  edit: '',
  pirce: ''
})
// 寄样列表
const imgTextObj = reactive<imgTextObjApi>({
  current: 1,
  endOrderTime: '',
  pageSize: 10,
  promId: '',
  resourceTitle: '',
  sellId: '',
  startOrderTime: '',
  orderStatusList: undefined,
  userId: userStore.userInfo?.userId
})
const refundDForm = reactive<any>({
  requestingRefundId: '',
  id: '',
  status: '',
  orderSn: ''
})
const refundDRules = {
  requestingRefundId: [
    {required: true, trigger: 'change', message: '请选择退款原因'}
  ]
}
const comment = reactive<evaluateObjApi>({
  content: '',
  resourceId: undefined,
  orderItemId: undefined,
  pic: '',
  score: undefined,
  userId: userStore.userInfo?.userId
})
const commentRules = {
  score: [{required: true, trigger: 'blur', message: '请评分'}]
}
const sendForm = reactive({
  username: ''
})
const sendRules = reactive({
  username: [
    {required: true, trigger: 'blur', message: '请输入接收链接的地址'}
  ]
})
const sendCodeForm = reactive<any>({
  coupon: '',
  note: '',
  id: '',
  status: ''
})
const handleMessage = () => {
  let obj = {
    message: message.value,
    userType: 0,
    date: new Date().getTime()
  }
  // messageArray.value.push(obj)
  message.value = ''
}
const handleRefund = (val: any) => {
  document.body.click()
}
const handlePopRefund = () => {
  colsedialogVisible.value = false
}
const handleDatePicker = (time: any) => {
  if (time) {
    time[1] = time[1].substr(0, 10) + ' 23:59:59'
  }
}
const handleCheckedCitiesChange = (value: any) => {
  checkList.value = value
}
const textStatus = (status: any, itemChild: any) => {
  let text = ''
  text =
      status === 5 || status === 20 || status === 21
          ? itemChild.problemContent
          : status === 11
              ? itemChild.requestContent
              : itemChild.rejectionContent
  return text
}
// 过滤状态
const orderStatus = (status: any) =>
    statusList.value.find((item: any) => item.id === status).name

const changContent = (item: any) => {
  item.showhide = !item.showhide
}
// 图片放大
const handleProductPic = (item: any) => {
  productdialogVisible.value = true
  dialogImageUrl.value = item
}
// 用户寄样
const handleSampleSent = (item: any) => {
  sendDetails.value = item
  sendDialogVisible.value = true
}
// 发送寄样
const handleSendSample = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      fullscreenLoading.value = true
      const data = {
        address: sendForm.username,
        orderType: sendDetails.value.orderType,
        status: sendDetails.value.status,
        id: sendDetails.value.id,
        orderSn: sendDetails.value.orderSn
      }
      await sampleSent(data)
          .then(() => {
            sendDialogVisible.value = false
            formEl.resetFields()
            getListBySendSamplesPage()
            ElMessage({
              message: '发送寄样成功!',
              type: 'success'
            })
            setTimeout(() => {
              fullscreenLoading.value = false
            }, 500)
          })
          .catch(() => {
            setTimeout(() => {
              fullscreenLoading.value = false
            }, 500)
          })
    }
  })
}
// 关闭用户寄样
const sendSampleClose = () => {
  sendRef.value?.resetFields()
  sendDialogVisible.value = false
}
// 填写code
const setOrderCodeData = (item: any) => {
  codeObj.value = item
  writeDialogVisible.value = true
}
// 提交code
const handleOrderCode = async () => {
  sendCodeForm.id = codeObj.value.id
  sendCodeForm.status = codeObj.value.status
  await setOrderCode(sendCodeForm)
      .then(() => {
        writeDialogVisible.value = false
        getListBySendSamplesPage()
        ElMessage({
          message: '寄样code填写成功!',
          type: 'success'
        })
        closeCode()
        setTimeout(() => {
          fullscreenLoading.value = false
        }, 500)
      })
      .catch(() => {
        setTimeout(() => {
          fullscreenLoading.value = false
        }, 500)
      })
}
const closeCode = () => {
  writeDialogVisible.value = false
  sendCodeForm.coupon = ''
  sendCodeForm.note = ''
}
// 打开申请退款
const handleRefundDialog = (itemChild: any) => {
  refundDialogVisible.value = true
  refundDForm.id = itemChild.id
  refundDForm.status = itemChild.status
  refundDForm.orderSn = itemChild.orderSn
  getOrderReject()
}
// 获取拒绝理由
const getOrderReject = async () => {
  let type = {
    type: 0
  }
  const res = await orderReject(type)
  if (res.code === 200) {
    rejectList.value = res?.data
  }
}
// 确认申请退款
const handleRefundVerify = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      fullscreenLoading.value = true
      await requestRefun(refundDForm)
          .then(() => {
            refundDialogVisible.value = false
            getListBySendSamplesPage()
            formEl.resetFields()
            ElMessage({
              message: '申请退款成功!',
              type: 'success'
            })
            setTimeout(() => {
              fullscreenLoading.value = false
            }, 500)
          })
          .catch(() => {
            setTimeout(() => {
              fullscreenLoading.value = false
            }, 500)
          })
    }
  })
}
// 问题中申请退款
const handleQuestionRefund = async (itemChild: any) => {
  const data = {
    id: itemChild.id,
    status: itemChild.status,
    orderSn: itemChild.orderSn
  }
  loading.value = true
  await questionRequestRefund(data)
      .then(() => {
        getListBySendSamplesPage()
        ElMessage({
          message: '申请退款成功!',
          type: 'success'
        })
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
}
// 关闭申请退款
const refundResetClose = () => {
  refundRef.value?.resetFields()
  refundDialogVisible.value = false
}
// 拒绝延长
const handleRefuse = async (itemChild: any) => {
  const data = {
    id: itemChild.id,
    status: itemChild.status,
    orderSn: itemChild.orderSn
  }
  loading.value = true
  await refuseExtenPosting(data)
      .then(() => {
        getListBySendSamplesPage()
        ElMessage({
          message: '拒绝延长!',
          type: 'success'
        })
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
}
// 同意延长
const handleAgree = async (itemChild: any) => {
  const data = {
    id: itemChild.id,
    status: itemChild.status,
    orderSn: itemChild.orderSn
  }
  loading.value = true
  await agreeExtendPosting(data)
      .then(() => {
        getListBySendSamplesPage()
        ElMessage({
          message: '同意延长!',
          type: 'success'
        })
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
}
// 确认订单
const handleVerifyOrder = async (itemChild: any) => {
  const data = {
    id: itemChild.id,
    status: itemChild.status,
    orderSn: itemChild.orderSn,
    payMethod: itemChild.payMethod
  }
  loading.value = true
  await confirmOrder(data)
      .then(() => {
        getListBySendSamplesPage()
        ElMessage({
          message: '订单确认成功!',
          type: 'success'
        })
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
}
// 二次确认订单
const handleTwoVerifyOrder = async (itemChild: any) => {
  const data = {
    id: itemChild.id,
    status: itemChild.status,
    orderSn: itemChild.orderSn,
    payMethod: itemChild.payMethod
  }
  loading.value = true
  await improvementConfirmation(data)
      .then(() => {
        getListBySendSamplesPage()
        ElMessage({
          message: '二次确认订单成功!',
          type: 'success'
        })
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
}
// 平台介入
const handlePlatform = async (item: any) => {
  const data = {
    id: item.id,
    status: item.status,
    orderSn: item.orderSn
  }
  loading.value = true
  await platformIntervention(data)
      .then(() => {
        getListBySendSamplesPage()
        ElMessage({
          message: '平台介入成功!',
          type: 'success'
        })
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
}
// 单个关闭订单
const handleColseOrder = async (item: any) => {
  const data = {
    id: item.id,
    status: item.status,
    totalAmount: item.totalAmount,
    orderSn: item.orderSn,
    payMethod: item.payMethod
  }
  loading.value = true
  await cancelOrder(data)
      .then(() => {
        getListBySendSamplesPage()
        ElMessage({
          message: '取消订单成功!',
          type: 'success'
        })
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
}
// 关闭订单
const handlePopCloseOrder = (item: any) => {
  closeOrder.value = item
  colsedialogVisible.value = true
}
// 创建订单状态关闭订单
const handleColseAddOrder = async (item: any) => {
  const data = {
    id: item.id,
    payStatus: item.payStatus,
    status: item.status,
    totalAmount: item.totalAmount,
    orderItems: item.orderItems,
    orderSn: item.orderSn
  }
  loading.value = true
  await cancelCreateOrderList(data)
      .then(() => {
        getListBySendSamplesPage()
        ElMessage({
          message: '取消订单成功!',
          type: 'success'
        })
        colsedialogVisible.value = false
        loading.value = false
      })
      .catch(() => {
        getListBySendSamplesPage()
        loading.value = false
      })
}
// 待确认状态关闭订单
const handleColseStayOrder = async (item: any) => {
  const data = {
    id: item.id,
    payStatus: item.payStatus,
    status: item.status,
    totalAmount: item.totalAmount,
    orderItems: item.orderItems,
    orderSn: item.orderSn,
    payMethod: item.payMethod
  }
  loading.value = true
  await cancelOrderList(data)
      .then(() => {
        getListBySendSamplesPage()
        ElMessage({
          message: '取消订单成功!',
          type: 'success'
        })
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
}
// 合并支付
const handleAggPay = async (index: any) => {
  payNum.value = index
  console.log(checkList.value)
  if (checkList.value.length < 2) {
    ElMessage.error('请选择两个以上的订单!')
    return false
  }
  orderSubmitParam.value = []
  orderDetails.value.id = ''
  orderDetails.value.resourceTitle = ''
  orderDetails.value.memberPrice = ''
  orderDetails.value.originalPrice = ''
  orderDetails.value.discountedPrice = ''
  orderDetails.value.totalAmount = checkList.value
      .reduce((sum: any, item: any) => sum + Number(item.totalAmount), 0)
      .toFixed(2)
  getWalletRuery()
  for (let i = 0; i < checkList.value.length; i++) {
    let data: any = {}
    data.payMethod = 1
    data.id = checkList.value[i].id
    data.memberId = checkList.value[i].memberId
    data.totalAmount = checkList.value[i].totalAmount
    data.note = '无'
    data.resourceTitle = checkList.value[i].resourceTitle
    data.orderItems = checkList.value[i].orderItems
    orderSubmitParam.value.push(data)
    console.log(orderSubmitParam.value)
  }
  const recharge = {
    payChannel: 'alipay',
    payMethod: 1,
    orderSubmitTotalAmount: orderDetails.value.totalAmount,
    orderSubmitParam: orderSubmitParam.value
  }
  const res = await getMergeId(recharge)
  if (res.code === 200) {
    payDialogVisible.value = true
    clearInterval(timeInter.value)
    orderId.value = res?.data
    qrCodeText.value = `${import.meta.env.VITE_APP_BASE_URL}?id=${
        res.data
    }&type=1`
    loopOrderState()
  }
}
// 打开充值弹窗
const handlePayDialog = async (item: any, index: any) => {
  payNum.value = index
  orderDetails.value = Object.assign({}, item)
  getWalletRuery()
  payDialogVisible.value = true
  clearInterval(timeInter.value)
  qrCodeText.value = `${import.meta.env.VITE_APP_BASE_URL}?id=${item.id}&type=0`
  orderId.value = item.id
  loopOrderState()
}
// 立即支付
const handleAtPay = async () => {
  console.log(isBalance.value)
  if (isBalance.value !== '1') {
    ElMessage.error('请勾选钱包支付')
    return false
  }
  if (payNum.value === 2) {
    aggPayList()
  } else {
    abbrAtPay()
  }
}
// 多个支付
const aggPayList = async () => {
  const recharge = {
    payChannel: 'balance',
    payMethod: 0,
    orderSubmitTotalAmount: orderDetails.value.totalAmount,
    fakeId: `${orderId.value}_${orderDetails.value.totalAmount}_${userStore.userInfo?.userId}_1`,
    orderMergeSubmitParam: orderSubmitParam.value,
    orderSubmitParam: {
      payMethod: 0
    }
  }
  fullscreenLoading.value = true
  await toDelayPay(recharge)
      .then(() => {
        payDialogVisible.value = false
        getListBySendSamplesPage()
        ElMessage({
          message: '支付成功!',
          type: 'success'
        })
        clearInterval(timeInter.value)
        checkList.value = []
        setTimeout(() => {
          fullscreenLoading.value = false
        }, 1000)
      })
      .catch((err) => {
        if (err !== 202) {
          clearInterval(timeInter.value)
        }
        setTimeout(() => {
          fullscreenLoading.value = false
        }, 500)
      })
}
// 单个支付
const abbrAtPay = async () => {
  const data = {
    payChannel: 'balance',
    payMethod: 0,
    fakeId: `${orderDetails.value.id}_${orderDetails.value.totalAmount}_${userStore.userInfo?.userId}_0`,
    orderSubmitTotalAmount: orderDetails.value.totalAmount,
    orderSubmitParam: {
      id: orderDetails.value.id,
      memberId: userStore.userInfo?.userId,
      totalAmount: orderDetails.value.totalAmount,
      note: '无',
      resourceTitle: orderDetails.value.resourceTitle,
      orderItems: orderDetails.value.orderItems,
      payMethod: 0
    }
  }
  fullscreenLoading.value = true
  await toDelayPay(data)
      .then(() => {
        payDialogVisible.value = false
        getListBySendSamplesPage()
        ElMessage({
          message: '支付成功!',
          type: 'success'
        })
        clearInterval(timeInter.value)
        checkList.value = []
        setTimeout(() => {
          fullscreenLoading.value = false
        }, 1000)
      })
      .catch((err) => {
        if (err !== 202) {
          clearInterval(timeInter.value)
        }
        setTimeout(() => {
          fullscreenLoading.value = false
        }, 500)
      })
}
// 关闭充值弹窗
const closePay = () => {
  payDialogVisible.value = false
  clearInterval(timeInter.value)
}
//查询支付状态
const loopOrderState = () => {
  const data = {
    orderId: orderId.value
  }
  timeInter.value = setInterval(() => {
    getPayStatus(data)
        .then((res: any) => {
          if (res.data.status === 'succeeded') {
            clearInterval(timeInter.value)
            setTimeout(() => {
              ElMessage({
                message: '购买成功!',
                type: 'success'
              })
              checkList.value = []
              getListBySendSamplesPage()
              payDialogVisible.value = false
            }, 2000)
          }
        })
        .catch(() => {
          clearInterval(timeInter.value)
          ElMessage.error('支付失败')
        })
  }, 3000)
}
// 打开评分弹窗
const openComment = (value: any) => {
  commentDialogVisible.value = true
  comment.orderItemId = value.id
  comment.resourceId = value.resourceId
}
// 查看评价
const openCheckComment = async (value: any) => {
  const data = {
    orderItemId: value.id
  }
  const res = await checkComment(data)
  if (res.code === 200) {
    commentDs.value = res?.data
    checkCommentDialogVisible.value = true
  }
}
// 提交评分
const handleComment = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (comment.score) {
        fullscreenLoading.value = true
        await addComment(comment)
            .then(() => {
              commentDialogVisible.value = false
              formEl.resetFields()
              ElMessage({
                message: '提交评分成功!',
                type: 'success'
              })
              setTimeout(() => {
                getListBySendSamplesPage()
                fullscreenLoading.value = false
              }, 500)
            })
            .catch(() => {
              setTimeout(() => {
                fullscreenLoading.value = false
              }, 500)
            })
      } else {
        ElMessage.error('请选择评分')
      }
    }
  })
}
const resetClose = () => {
  commentRef.value?.resetFields()
  comment.content = ''
  comment.pic = ''
  commentDialogVisible.value = false
}
// 查询用户余额
const getWalletRuery = async () => {
  const id = {
    userId: userStore.userInfo?.userId
  }
  const res = await walletRuery(id)
  balance.value = res.data.balance
}
// 评论上传图片
const uploadScore = async (params: any) => {
  let file = params.file
  if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  let formData = new FormData()
  formData.append('file', file)
  const res = await fileUploadAPI(formData)
  comment.pic = res.data?.url
}
// 复制邮寄地址
const copy = (val: any) => {
  if (!val) return ElMessage.error('复制内容为空！')
  let data = `${val.name} \ ${val.mobile} \ ${val.detailAddress}`
  navigator.clipboard
      .writeText(data)
      .then(() => {
        ElMessage.success('复制成功')
      })
      .catch(() => {
        ElMessage.error('复制失败！')
      })
}
//再来一单
const handleLink = async (item: any) => {
  const obj = {
    banner: [],
    platformId: Number(item.platformId),
    promId: Number(item.promId),
    resourceTitle: item.resourceTitle,
    countryId: Number(item.countryId),
    endTime: '',
    startTime: '',
    note: item.note,
    originalPriceMax: item.originalPriceMax,
    originalPriceMin: item.originalPriceMin,
    discountPriceMax: item.discountPriceMax,
    discountPriceMin: item.discountPriceMin,
    coupon: item.coupon,
    preferentialRatio: item.preferentialRatio,
    discountCode: item.discountCode,
    numberSamples: item.numberSamples,
    variableBody: [],
    resourceUrl: item.resourceUrl,
    pic: item.pic,
    articleContent: item.articleContent,
    orderItems: {},
    orderType: item.orderType,
    sellId: item.sellId,
    articleType: item.articleType,
    totalAmount: item.totalAmount,
    memberId: userStore.userInfo?.userId,
    date: []
  }
  await orderStore.orderHandle(obj)
  // router.push({
  //   name: 'PlaceOrder',
  //   state: { orderObject: obj }
  // })
  router.push({path: '/placeOrder'})
}

function openAddressDialog(item: any) {
  addressDialogVisible.value = true
  addressContent.value = item.sampleSendingAddress
}

// 重置
const handleReset = () => {
  imgTextObj.resourceTitle = ''
  imgTextObj.orderStatusList = undefined
  date_picker.value = ''
  imgTextObj.current = 1
  getListBySendSamplesPage()
}
// 搜索
const handleSearch = () => {
  imgTextObj.current = 1
  getListBySendSamplesPage()
}
// 刷新
const handelRefresh = () => {
  classNameTo.value = true
  imgTextObj.current = 1
  setTimeout(() => {
    classNameTo.value = false
  }, 500)
  getListBySendSamplesPage()
}
// 获取订单状态列表
const getOrderStatusList = async () => {
  const res = await orderStatusList()
  if (res.code === 200) {
    statusList.value = res?.data
  }
}
// 获取图文订单列表
const getListBySendSamplesPage = async () => {
  imgTextObj.endOrderTime =
      date_picker.value.length > 0 ? date_picker.value[1] : ''
  imgTextObj.startOrderTime =
      date_picker.value.length > 0 ? date_picker.value[0] : ''
  const res = await listBySendSamplesPage(imgTextObj)
  imgTextData.value = res.data.records ? res.data.records : []
  checkList.value = []
  if (imgTextData.value) {
    for (const item of imgTextData.value) {
      item.showhide = false
    }
  }
  total.value = res.data.total ? res.data.total : 0
}
getOrderStatusList()
getListBySendSamplesPage()
</script>
<style lang="scss" scoped>
.rotateIcon {
  animation: rotate 1s linear infinite;
}

.img_order {
  width: 1226px;
  height: 924px;
  background: #ffffff;
  border-radius: 0px 4px 4px 0px;
  border-left: 1px solid #ededed;
  padding: 24px 24px 84px 24px;

  .img_order_nav {
    height: 56px;
    background: rgb(9, 141, 114, 0.05);
    display: flex;
    align-items: center;
    padding: 0 20px;

    .refresh {
      width: 76px;
      height: 30px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #098d72;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #098d72;
    }

    .order_date {
      width: 224px;
      margin-left: 24px;
      height: 32px;
    }

    .order_select {
      width: 224px;
      height: 32px;
      margin-left: 24px;
      border-radius: 4px;

      :deep(.el-select) {
        width: 224px;
      }
    }

    .order_input {
      margin-left: 24px;
      position: relative;

      .order_input_pl {
        height: 32px;
        width: 200px;
        font-size: 14px;
        border-radius: 4px;
        // border: 1px solid #dcdee0;
        padding: 0 5px;
      }

      .inquire {
        position: absolute;
        top: 8px;
        right: 90px;
        width: 16px;
      }

      .search {
        display: inline-block;
        width: 56px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #098d72;
        border-radius: 4px 4px 4px 4px;
        color: #fff;
        margin-left: 14px;
      }

      .reset {
        display: inline-block;
        width: 56px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #098d72;
        margin-left: 14px;
      }
    }

    .order_merge {
      margin-left: 10px;

      .pay_flase {
        display: inline-block;
        width: 84px;
        height: 32px;
        text-align: center;
        border: 0;
        background: #ededed;
        border-radius: 4px;
        color: #969799;
        font-size: 14px;
        margin-left: 12px;
      }

      .pay_true {
        color: #ffffff;
        background: #098d72;
      }
    }
  }

  .img_order_list {
    margin-top: 16px;
    font-size: 14px;

    .list_title {
      width: 100%;
      height: 56px;
      background: rgba(9, 141, 114, 0.05);
      color: #111;
      display: flex;
      align-items: center;

      .checkbox {
        width: 74px;
      }

      .product {
        width: 248px;
      }

      .pirce {
        width: 100px;
        margin-left: 38px;
      }

      .code {
        width: 172px;
        margin-left: 38px;
      }

      .total {
        width: 100px;
        text-align: center;
        margin-left: 38px;
      }

      .date {
        width: 120px;
        margin-left: 40px;
        font-weight: bold;
        color: #111;
      }

      .operate {
        width: 150px;
        margin-left: 58px;
        text-align: center;
      }
    }

    .list_content {
      height: 82px;
      background: #ffffff;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ebedf0;
      color: #555;

      .checkbox {
        margin: 0 31px;
        display: flex;
        align-items: center;
        text-align: center;

        span {
          display: block;
          width: 14px;
        }
      }

      .list_img {
        display: flex;
        width: 248px;
        align-items: center;

        .img_name {
          img {
            width: 60px;
            height: 60px;
            border-radius: 4px;
          }
        }

        .img_title {
          margin: 0px 0 0 8px;

          .introduce {
            color: #111;
            margin-bottom: -4px;

            .name_text {
              display: inline-block;
              max-width: 179px;
              height: 18px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              font-weight: bold;
            }
          }

          .score {
            margin-top: 12px;
            display: flex;

            .score_right {
              margin-right: 0px;

              img {
                margin-right: 0px;
              }
            }

            span {
              margin-right: 8px;
              display: flex;
              align-items: center;
            }

            img {
              width: 16px;
              margin-right: 4px;
            }
          }
        }
      }

      .text_content {
        width: 100px;
        margin-left: 36px;

        span {
          display: block;
        }

        .text_content_span {
          margin-top: 12px;
        }

        .active_paid {
          color: #333333;
          background: #cccccc;
          float: right;
          padding: 1.5px 10px;
          font-size: 12px;
          border-radius: 4px;
        }

        .paid {
          color: #098d72;
          background: #e6fffa;
          float: right;
          padding: 1.5px 10px;
          font-size: 12px;
          border-radius: 4px;
        }

        .yellow_paid {
          color: #ef6706;
          background: #fce5bd;
          float: right;
          padding: 1.5px 10px;
          font-size: 12px;
          border-radius: 4px;
        }

        .paid_pirce {
          text-align: right;
          color: #111;
          font-weight: bold;
        }
      }

      .date {
        width: 150px;
        margin-left: 38px;

        span {
          font-weight: bold;
          color: #111;
        }

        .date_span {
          margin-top: 12px;
          display: flex;

          span {
            width: 30%;
            display: flex;
            align-items: center;
          }

          em {
            border-radius: 50%;
            width: 8px;
            height: 8px;
            display: inline-block;
            margin-right: 5px;
          }

          .blue {
            background: #0e79f5;
          }

          .yellow {
            background: #ef6706;
          }

          .green {
            background: #098d72;
          }
        }
      }

      .operate_botton {
        margin-left: 40px;
        display: flex;
        align-items: center;

        .coming {
          width: 94px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          color: #098d72;
          margin: 0 20px;
        }

        .el-icon {
          width: 20px;
          margin-left: 10px;
        }

        .child_footer1 {
          .child_botton {
            margin: 0 20px;

            .close-order {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 94px;
              height: 32px;
              border-radius: 2px;
              background: #eff7f0;
              color: #098d72;

              img {
                margin: 0 -2px;
              }
            }
          }
        }

        .child_footer_order1 {
          position: relative;

          .select-box {
            background: none;
            text-align: center;
            line-height: 32px;
            position: absolute;
            bottom: -33px;
            z-index: 1000;

            .close-order {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 40px;
              width: 94px;
              height: 32px;
              background: #eff7f0;
              color: #098d72;
              border-radius: 0;
            }
          }
        }

        .child_footer_order1:hover .select-box {
          display: block;
        }

        // .child_footer {
        //   width: 94px;
        //   height: 32px;
        //   margin: 0 20px;
        //   cursor: pointer;
        //   position: relative;
        //   border: 1px solid #ccc;
        // }
        // .child_footer_order:hover .select-box {
        //   display: block;
        // }
        // .child_botton:hover {
        //   background-color: #098d72;
        //   color: #fff;
        // }
        // .select-box:hover .child_botton {
        //   background-color: #fff;
        //   color: #111;
        // }

        .child_botton {
          width: 100%;
          height: 100%;
          // background: #e6f4f1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #757fd9;

          img {
            width: 16px;
            margin-left: 5px;
          }
        }

        .select-box {
          display: none;
        }

        // .child_footer > span {
        //   cursor: pointer;
        // }

        // .select-box {
        //   width: 94px;
        //   height: 32px;
        //   text-align: center;
        //   line-height: 32px;
        //   background-color: #fffffff5;
        //   color: #111;
        //   position: absolute;
        //   bottom: -33px;
        //   z-index: 1000;
        //   // box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5)
        // }

        // .select-box > p {
        //   cursor: pointer;
        // }

        // .select-box > p:hover {
        //   background-color: #098d72;
        //   color: #fff;
        // }
      }

      .text_browser {
        width: 152px;

        span {
          display: flex;
          align-items: center;
        }

        .el-icon {
          color: #098d72;
          margin-right: 5px;
        }
      }
    }

    .child_list {
      width: 100%;
      height: 82px;
      background: #f8f8fa;
      color: #111;
      display: flex;
      align-items: center;

      .checkbox {
        margin: 0 31px;
        display: flex;
        align-items: center;
      }

      .child_list_img {
        display: flex;
        margin-left: 88px;

        .child_img_name {
          img {
            width: 60px;
            height: 60px;
            border-radius: 4px 4px 4px 4px;
          }
        }

        .child_img_title {
          margin-left: 8px;

          .name {
            margin-top: 7px;
            width: 179px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
          }

          .describe {
            margin-top: 10px;
            color: #555;

            .name_text {
              background: #d5dafe;
              color: #757fd9;
              padding: 2px;
              border-radius: 2px;
            }
          }
        }
      }

      .chlid_link {
        em {
          color: #098d72;
        }

        a {
          color: #098d72;
        }
      }

      .send_samples {
        margin: 0 20px;
        text-align: center;
        color: #098d72;
      }

      .chlid_media {
        // margin-left: 60px;

        .chlid_media_ser {
          position: relative;
          margin-top: 10px;
        }

        img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          margin-right: 3px;
          box-shadow: rgba(0, 0, 0, 0.12) 4px 0 6px 0;
        }

        em {
          position: absolute;
          top: 13px;
          left: 18px;

          img {
            width: 12px;
            height: 12px;
          }
        }

        .store_botton1 {
          color: #098d72;
          border: 1px solid #026853;
        }

        .store_botton2 {
          color: #ef6706;
          border: 1px solid #ef6706;
        }

        .store_botton3 {
          color: #0e79f5;
          border: 1px solid #0e79f5;
        }
      }

      .schedule {
        // // margin-left: 40px;
        width: 130px !important;
        margin: 0 20px;

        .progress {
          color: #4356ee;
        }

        .schedule_question {
          margin-top: 10px;
          display: flex;
          align-items: center;
          color: #f3294d;

          em {
            display: inline-block;
            background: #f3294d;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            margin-right: 3px;
          }
        }

        .schedule_improve {
          color: #555;

          em {
            background: #098d72;
          }
        }

        .schedule_sta {
          margin-top: 10px;
          display: flex;
          align-items: center;

          em {
            display: inline-block;
            background: #098d72;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            margin-right: 3px;
          }
        }
      }

      .child_status {
        // width: 160px !important;
        display: flex;
        flex-direction: row-reverse;

        .evaluate {
          color: #098d72;
        }

        .child_status_check {
          color: #098d72;
        }
      }

      .child_list_date {
        .child_date {
          margin-top: 10px;
        }

        :deep(.el-statistic__number) {
          font-size: 12px;
          color: #f3294d;
        }
      }

      .child_text_content {
        width: 120px;
        font-size: 14px;

        .write_code_botton {
          color: #098d72;

          .write_code_botton_text {
            display: flex;
            align-items: center;

            .write_code_icon {
              margin-left: 5px;
            }
          }
        }

        .child_footer_order:hover .select-box {
          display: block;
        }

        .child_footer {
          width: 94px;
          height: 32px;
          cursor: pointer;
          position: relative;

          // .child_botton:hover {
          //   background-color: #098d72;
          //   color: #fff;
          // }

          // .select-box:hover .child_botton {
          //   background-color: #fff;
          //   color: #111;
          // }

          .child_botton {
            width: 100%;
            height: 100%;
            background: #f0f4ff;
            display: flex;
            align-items: center;
            justify-content: center;

            span {
              color: #757fd9;
            }

            img {
              width: 16px;
              margin-left: 5px;
            }
          }

          .select-box {
            display: none;
          }

          .child_footer > span {
            cursor: pointer;
          }

          .select-box {
            width: 94px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            background: #f0f4ff;
            color: #757fd9;
            position: absolute;
            bottom: -32px;
            // box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5)
          }

          .select-box > p {
            cursor: pointer;
          }

          // .select-box > p:hover {
          //   background-color: #098d72;
          //   color: #fff;
          // }
        }

        .child_date {
          color: #f3294d;
          margin-top: 10px;
        }

        .child_text_span {
          margin-top: 10px;
        }

        span {
          display: block;
        }
      }
    }
  }

  .dialog_address {
    font-size: 14px;
    color: #333;

    .dialog_name {
      display: flex;
      align-items: center;
    }

    .address {
      margin-top: 10px;

      .address_text {
        display: block;
      }

      .address_copy {
        display: block;
        color: #098d72;
        margin-top: 8px;
      }
    }

    .disclaimer {
      margin-top: 20px;
      color: #f3294d;
    }
  }

  .message_content {
    ul {
      li {
        margin-top: 10px;

        .content {
          .list_left {
            display: flex;
            align-items: center;
          }

          .list_left_text {
            margin-left: 5px;
          }

          .list_right_text {
            margin-right: 5px;
          }

          .list_left_ser {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #098d72;
          }

          .list_right_ser {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #ef6706;
          }

          .content_date {
            margin-top: 5px;
          }
        }

        .right_content {
          float: right;

          .list_right {
            display: flex;
            align-items: center;
          }

          .right_content_date {
            margin-top: 5px;
            text-align: right;
          }
        }
      }
    }
  }

  .write_code {
    .write_code_text {
      font-size: 12px;
    }
  }
}

.message_footer {
  display: flex;

  .message_input {
    width: 70%;
  }

  .message_input {
    width: 70%;
  }

  .message_botton {
    width: 80px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #098d72;
    color: #fff;
    margin-left: 20px;
    border-radius: 4px;
  }
}

.dialog_pirce {
  display: flex;

  .order_content {
    font-size: 14px;
    border-right: 1px solid #ebedf0;
    padding-right: 21px;
    width: 290px;

    h5 {
      color: #111;
      font-weight: bold;
    }

    .order_code {
      padding: 16px 0 24px 0;
      border-bottom: 1px solid #ebedf0;

      em {
        color: #111;
        font-weight: bold;
      }

      span {
        display: block;
        color: #555;
      }

      .order_title {
        margin-top: 6px;
        width: 268px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
    }

    .pirce_discount {
      padding: 24px 0;
      border-bottom: 1px solid #ebedf0;

      .pirce_false {
        margin-top: 6px;
      }

      em {
        color: #111;
        font-weight: bold;
      }

      span {
        display: flex;
        justify-content: space-between;
      }
    }

    .actual {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;

      .actual_pirce {
        color: #f3294d;
        font-weight: bold;
      }
    }
  }

  .pay_way {
    padding-left: 24px;
    width: 270px;

    h5 {
      font-size: 14px;
      font-weight: bold;
      color: #111;
    }

    .pay_way_code {
      margin-top: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      img {
        width: 120px;
      }

      .pay_way_options {
        margin-top: 5px;
        display: flex;
        font-size: 16px;

        .pay_way_alipay {
          margin: 0 10px;
        }
      }
    }

    .balance {
      margin-top: 34px;
      width: 100%;
      height: 32px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #098d72;
      display: flex;
      padding: 0 13px;

      .balance_icon {
        margin-right: 5px;
      }

      .balance_actual {
        margin-left: 16px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        width: 105px;
      }

      .balance_content {
        height: 32px;
        display: flex;
        align-items: center;
      }
    }

    .handle_immediately {
      margin-top: 12px;
      width: 246px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      color: #ffffff;
      background: #098d72;
      border-radius: 4px;
      border: 1px solid #098d72;
    }
  }
}

.order_form {
  .avatar {
    height: 100%;
    height: 100%;
  }
}

.code_details {
  .code_title {
    border-bottom: 1px solid #ebedf0;
    padding-bottom: 6px;
  }

  .code_contnet {
    .code_list {
      margin-top: 6px;
      font-size: 14px;

      .code_pass {
        color: #2aac38;
      }

      .code_list_left {
        width: 60px;
        margin-right: 10px;
        display: inline-block;
        color: #969799;
      }
    }
  }
}

.close_details {
  .close_title {
    display: flex;
    align-items: center;
    font-size: 16px;

    img {
      width: 14px;
      margin-right: 5px;
    }
  }

  .close_botton {
    margin-top: 17px;
    display: flex;

    .close_c {
      margin-left: 100px;
      color: #098d72;
    }

    .close_q {
      width: 40px;
      text-align: center;
      height: 22px;
      line-height: 22px;
      background: #098d72;
      border-radius: 2px 2px 2px 2px;
      color: #fff;
      font-size: 12px;
      margin-left: 17px;
    }
  }
}

.dialog-footer {
  .dialog-footer-confirm {
    width: 64px;
    height: 32px;
    background: #098d72;
    border-radius: 4px 4px 4px 4px;
    color: #fff;
  }

  .dialog-footer-close {
    width: 64px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #098d72;
    color: #098d72;
  }
}

.comment_content {
  .comment_score {
    display: flex;

    span {
      margin-right: 5px;
      margin-top: 5px;
    }
  }

  .comment_text {
    margin-top: 10px;
    width: 100%;
  }

  .comment_img {
    margin-top: 10px;

    img {
      width: 100%;
    }
  }
}

.describe {
  .describe_text {
    color: #333;
    font-size: 14px;
  }

  img {
    margin-top: 12px;
    width: 244px;
    height: 98px;
  }
}

.content {
  max-width: 300px;
  white-space: pre-wrap;
}

:deep(.el-range-editor.is-active) {
  box-shadow: 0 0 0 1px #098d72;
}

:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 1px #098d72 !important;
}

:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #098d72 !important;
}

:deep(.el-range-editor.el-input__wrapper) {
  width: 224px;
}

:deep(.el-select .el-input__wrapper) {
  height: 32px;
}

:deep(.el-switch__core) {
  height: 32px;
  width: 68px;
  font-size: 14px;
}

:deep(.el-checkbox__label) {
  display: none;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #098d72;
}

:deep(.el-checkbox__inner:hover) {
  border: 1px solid #098d72;
}

:deep(.el-checkbox-group) {
  font-size: 14px;
  line-height: normal;
}

:deep(.el-input__inner) {
  color: #111;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border: 1px solid #098d72;
  background-color: #098d72;
}

:deep(.el-timeline-item__node) {
  border-color: #098d72;
  background-color: #098d72;
  width: 9px;
  height: 9px;
}

:deep(.el-timeline-item__tail) {
  border-left: 1px solid #098d72;
  left: 3px;
}

:deep(.el-icon.avatar-uploader-icon) {
  width: 118px;
  height: 118px;
}

:deep(.avatar-uploader .el-upload) {
  width: 118px;
  height: 118px;
}

:deep(.el-scrollbar__thumb) {
  background-color: #098d72;
}
</style>

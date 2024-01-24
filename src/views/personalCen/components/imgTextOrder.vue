<template>
  <div class="img_order">
    <div class="img_order_nav">
      <div class="refresh" @click="handelRefresh">
        <span class="pointer">
          <el-icon :class="{ rotateIcon: classNameTo }">
            <Refresh />
          </el-icon>
          刷新
        </span>
      </div>
      <div class="order_date">
        <el-date-picker
          v-model="date_picker"
          @change="handleDatePicker"
          type="daterange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD HH:mm:ss"
          :clearable="false"
        />
      </div>
      <div class="order_select">
        <el-select
          v-model="imgTextObj.orderStatusList"
          multiple
          collapse-tags
          :clearable="true"
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
          type="text"
          v-model="imgTextObj.resourceTitle"
          placeholder="产品标题"
          clearable
          class="order_input_pl"
          @keyup.enter.native="handleSearch"
        />
        <span class="search pointer" @click="handleSearch">搜索</span>
        <span class="reset pointer" @click="handleReset">重置</span>
        <!-- <img src="@/assets/img/inquire.png" alt="" class="inquire" /> -->
      </div>
      <div class="order_merge">
        <el-switch
          v-model="aggPayType"
          size="large"
          class="ml-2"
          inline-prompt
          active-text="合并"
          inactive-text="合并"
        />
        <button
          class="pay_flase pointer"
          :disabled="!aggPayType"
          :class="[aggPayType ? 'pay_true' : '']"
          @click="handleAggPay(2)"
        >
          合并支付
        </button>
      </div>
    </div>
    <div class="img_order_list" v-loading="loading">
      <div class="list_title">
        <span class="checkbox"></span>
        <span class="product">产品标题</span>
        <span class="pirce">价格</span>
        <span class="code">折扣码</span>
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
                  <el-checkbox v-if="item.payStatus === 0" :label="item" />
                </span>
              </div>
              <div class="list_img">
                <div
                  v-if="item.promId !== 5"
                  class="img_name"
                  @click="handleProductPic(item.productPic)"
                >
                  <img :src="item.productPic" alt="" />
                </div>
                <div
                  v-else
                  class="img_name"
                  @click="handleProductPic(filtersImg(item.banner))"
                >
                  <img :src="filtersImg(item.banner)" alt="" />
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
                      <img :src="item.countryPic" alt="" />
                      {{ item.countryName }}
                    </span>
                    <span>
                      <img src="@/assets/img/collect.png" alt="" />
                      {{ item.score }}
                    </span>
                    <span>
                      <img src="@/assets/img/information.png" alt="" />
                      {{ item.commentSum }}
                    </span>
                    <span class="score_right">
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="item.platformsName"
                        placement="top-start"
                      >
                        <img :src="item.platformsPic" alt="" />
                      </el-tooltip>
                    </span>
                  </div>
                </div>
              </div>
              <div class="text_content">
                <span v-if="item.originalPriceMin">
                  {{ item.unit }}{{ item.discountPriceMin }}-{{
                    item.discountPriceMax
                  }}
                </span>
                <el-text
                  v-if="item.discountPriceMin"
                  style="margin-top: 12px; display: inline-block"
                  tag="del"
                >
                  {{ item.unit }}{{ item.originalPriceMin }}-{{
                    item.originalPriceMax
                  }}
                </el-text>
              </div>
              <div class="text_content text_browser">
                <span v-if="item.discountCode">
                  <el-popover placement="bottom" :width="250" trigger="hover">
                    <template #reference class="text_discount_code">
                      <span class="text_discount_code">
                        {{ item.discountCode }}
                      </span>
                    </template>
                    <div class="code_details">
                      <div class="code_title">折扣码详情</div>
                      <div class="code_contnet">
                        <div class="code_list">
                          <span class="code_list_left">生效时间:</span>
                          <span>{{ item.startTime }}</span>
                        </div>
                        <div class="code_list">
                          <span class="code_list_left">过期时间:</span>
                          <span>{{ item.endTime }}</span>
                        </div>
                        <div class="code_list">
                          <span class="code_list_left">适用范围:</span>
                          <span>全部</span>
                        </div>
                        <!-- <div class="code_list">
                        <span class="code_list_left">优惠价格:</span>
                        <span>￥14.95 </span>
                      </div> -->
                        <div class="code_list">
                          <span class="code_list_left">状态:</span>
                          <span class="code_pass">检测通过</span>
                        </div>
                      </div>
                    </div>
                  </el-popover>
                  <a
                    :href="item.resourceUrl"
                    target="_blank"
                    class="browser_link"
                  >
                    <el-icon>
                      <ChromeFilled />
                    </el-icon>
                  </a>
                  <el-icon class="pointer" @click="handleUplicate(item)">
                    <CopyDocument />
                  </el-icon>
                </span>
                <span
                  v-if="item.promId === 4"
                  class="text_content_span browser_coupon"
                >
                  <i v-if="item.preferentialRatio"
                    >{{ item.preferentialRatio }}%OFF</i
                  >
                  <em v-if="item.coupon"> + {{ item.coupon }} coupon</em>
                </span>
              </div>
              <div class="text_content">
                <span class="paid_pirce"> ￥{{ item.totalAmount }} </span>
                <span
                  class="text_content_span"
                  :class="[
                    item.payStatus === 0
                      ? 'yellow_paid'
                      : item.payStatus === 1
                      ? 'paid'
                      : 'active_paid'
                  ]"
                >
                  {{ filters[item.payStatus] }}
                </span>
              </div>
              <div class="text_content date">
                <span>{{ item.createTime }}</span>
                <div v-if="item.statistics" class="date_span">
                  <span>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="item.statistics.blueName"
                      placement="top-start"
                    >
                      <em class="blue"></em>
                    </el-tooltip>
                    <i>{{ item.statistics.blue }}</i>
                  </span>
                  <span>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="item.statistics.yellowName"
                      placement="top-start"
                    >
                      <em class="yellow"></em>
                    </el-tooltip>
                    <i>{{ item.statistics.yellow }}</i>
                  </span>
                  <span>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="item.statistics.greenName"
                      placement="top-start"
                    >
                      <em class="green"></em>
                    </el-tooltip>
                    <i>{{ item.statistics.green }}</i>
                  </span>
                </div>
              </div>
              <div class="operate_botton">
                <div class="child_none">
                  <div
                    class="child_footer1"
                    v-if="item.payStatus !== 0 && (!(item.payStatus === 1 && item.orderItems.every( (t:any) => t.status === 2)) || item.payStatus === 2)"
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
                    class="child_footer1 child_footer_order1"
                    v-if="item.payStatus === 1 && item.orderItems.every( (t:any) => t.status === 2)"
                  >
                    <div class="child_botton">
                      <el-popover placement="left" :width="234" trigger="click">
                        <template #reference>
                          <span class="close-order pointer">
                            关闭订单
                            <img src="@/assets/img/dwon.png" alt="" />
                          </span>
                        </template>
                        <div class="close_details">
                          <div class="close_title">
                            <img
                              src="@/assets/img/close_set.jpg"
                              alt=""
                            />确定关闭订单？
                          </div>
                          <div class="close_botton">
                            <span @click="handleRefund" class="close_c pointer"
                              >取消</span
                            >
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
                    class="child_footer1 child_footer_order1"
                    v-if="item.payStatus === 0"
                  >
                    <div class="child_botton">
                      <span
                        @click="handlePayDialog(item, 1)"
                        class="close-order pointer"
                      >
                        &nbsp;&nbsp;支付&nbsp;&nbsp;<img
                          src="@/assets/img/dwon.png"
                          alt=""
                        />
                      </span>
                    </div>
                    <div class="select-box">
                      <span
                        v-if="item.payStatus === 0 && item.promId === 4"
                        @click="handleEdit(item)"
                        class="close-order pointer"
                      >
                        编辑
                      </span>
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
                <div class="pointer" @click="changContent(item)">
                  <img
                    v-if="item.showhide"
                    src="@/assets/img/dwon.png"
                    alt=""
                  />
                  <img v-else src="@/assets/img/right.png" alt="" />
                </div>
              </div>
            </div>
            <div
              v-if="item.showhide"
              v-for="(itemChild, childIndex) in item.orderItems"
              :key="childIndex"
              class="child_list"
            >
              <div class="child_list_img">
                <div class="child_img_name">
                  <img :src="itemChild.picUrl" alt="" />
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
                      <span class="name_text">媒体描述</span>
                      <template #content>
                        <p class="content">
                          {{ itemChild.resourceDes }}
                        </p>
                      </template>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div
                v-if="itemChild.status !== 2 && itemChild.status !== 6"
                class="child_text_content chlid_link"
              >
                <div v-if="itemChild.status !== 1 && itemChild.status !== 18">
                  <span>服务反馈</span>
                  <span class="child_text_span">
                    <el-popover
                      v-if="itemChild.secondScreenshot || itemChild.screenshot"
                      placement="top"
                      :width="300"
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
                      target="_blank"
                      class="analyze_link"
                    >
                      链接
                    </a>
                  </span>
                </div>
              </div>
              <div
                v-if="itemChild.status === 6"
                class="child_text_content chlid_progress"
              >
                <span>预约日期</span>
                <span class="chlid_date_text">
                  {{ itemChild.appointmentReleaseTime }}</span
                >
              </div>
              <div
                v-if="itemChild.status === 2"
                class="child_text_content chlid_taking_orders"
              >
                <span>预约日期</span>
                <span class="chlid_date_text">
                  {{ itemChild.appointmentReleaseTime }}</span
                >
              </div>
              <div
                v-if="itemChild.status === 1"
                class="child_text_content chlid_to_pay"
              >
                <span>预约日期</span>
                <span class="chlid_date_text">
                  {{ itemChild.appointmentReleaseTime }}</span
                >
              </div>
              <div class="child_text_content chlid_pirce">
                <span>费用</span>
                <span class="child_text_span">
                  ￥{{ itemChild.totalAmount }}
                </span>
              </div>
              <div
                v-if="itemChild.status !== 2 && itemChild.status !== 1"
                class="child_text_content chlid_media"
              >
                <span>商家</span>
                <span class="chlid_media_ser">
                  <img :src="itemChild.avatar" alt="" />
                  <em v-if="itemChild.sfName === '自营'">
                    <img
                      src="@/assets/img/operated.jpg"
                      :alt="itemChild.sfName"
                    />
                  </em>
                  <em v-if="itemChild.sfName === '媒体主'">
                    <img src="@/assets/img/media.jpg" :alt="itemChild.sfName" />
                  </em>
                  <em v-if="itemChild.sfName === '服务商'">
                    <img
                      src="@/assets/img/service_provider.jpg"
                      :alt="itemChild.sfName"
                    />
                  </em>
                </span>
              </div>
              <div class="child_text_content schedule">
                <el-popover placement="left" :width="210" trigger="hover">
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
                <div>
                  <el-popover
                    v-if="itemChild.status === 11"
                    placement="left"
                    :width="210"
                    trigger="hover"
                  >
                    <template #reference>
                      <span class="schedule_sta schedule_refund">
                        <em></em>
                        {{ orderStatus(itemChild.status) }}
                      </span>
                    </template>
                    <div>
                      {{ itemChild.requestContent }}
                    </div>
                  </el-popover>
                  <el-popover
                    v-if="itemChild.status === 19"
                    placement="left"
                    :width="210"
                    trigger="hover"
                  >
                    <template #reference>
                      <span class="schedule_sta">
                        <em></em>
                        {{ orderStatus(itemChild.status) }}
                      </span>
                    </template>
                    <div>
                      {{ itemChild.rejectionContent }}
                    </div>
                  </el-popover>
                  <span
                    v-if="itemChild.status !== 11 && itemChild.status !== 19"
                    class="schedule_sta"
                  >
                    <em></em>
                    {{ orderStatus(itemChild.status) }}
                  </span>
                </div>
              </div>
              <div
                v-if="itemChild.status === 2 || itemChild.status === 6"
                class="child_text_content child_list_date"
              >
                <span v-if="itemChild.status === 2">待接单剩余时间</span>
                <span v-if="itemChild.status === 6">剩余上贴时间</span>
                <span v-if="itemChild.status === 2" class="child_date">
                  <el-countdown
                    :value="Date.now() + itemChild.remainingTimePost"
                    format="DD [天] HH:mm:ss"
                  />
                </span>
                <span v-else class="child_date">
                  <el-countdown
                    :value="Date.now() + itemChild.remainingTimeOrderPending"
                    format="DD [天] HH:mm:ss"
                  />
                </span>
              </div>
              <div class="child_text_botton">
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
                <el-popover
                  v-if="itemChild.status === 2"
                  placement="left"
                  :width="234"
                  trigger="click"
                >
                  <template #reference>
                    <span class="evaluate pointer"> 取消订单 </span>
                  </template>
                  <div class="close_details">
                    <div class="close_title">
                      <img
                        src="@/assets/img/close_set.jpg"
                        alt=""
                      />确定取消订单？
                    </div>
                    <div class="close_botton">
                      <span @click="handleRefund" class="close_c pointer">
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
                <!-- 17改待确认 -->
                <div
                  v-if="itemChild.status === 17"
                  class="child_footer child_footer_order"
                >
                  <div class="child_botton">
                    <span @click="handleVerifyOrder(itemChild)">确认订单</span>
                    <img src="@/assets/img/dwon.png" alt="" />
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
                    <img src="@/assets/img/dwon.png" alt="" />
                  </div>
                  <div class="select-box">
                    <p @click="handlePlatform(itemChild)">平台介入</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-checkbox-group>
      <pagination
        v-show="total > 2"
        :total="total"
        v-model:page="imgTextObj.current"
        v-model:limit="imgTextObj.pageSize"
        @pagination="getListUserPage"
      />
    </div>
    <!-- 评论 -->
    <el-dialog
      v-model="commentDialogVisible"
      title="评论"
      :close-on-click-modal="false"
      @close="resetClose"
      width="389"
    >
      <el-form
        ref="commentRef"
        :model="comment"
        :rules="commentRules"
        class="order_form"
      >
        <el-form-item label="评分" prop="score">
          <el-rate v-model="comment.score" :colors="colors" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="comment.content"
            type="textarea"
            :rows="2"
            placeholder="请写下你的评论~"
          />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="uploadScore"
          >
            <img v-if="comment.pic" :src="comment.pic" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetClose"> 取消 </el-button>
          <el-button
            type="primary"
            v-loading.fullscreen.lock="fullscreenLoading"
            @click="handleComment(commentRef)"
            >确认</el-button
          >
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
            disabled
            show-score
            text-color="#111111"
            :colors="['#026853', '#026853', '#026853']"
            score-template="{value} 分"
          />
        </div>
        <div class="comment_text">
          <p>{{ commentDs.content }}</p>
        </div>
        <div class="comment_img">
          <img :src="commentDs.pic" class="avatar" />
        </div>
      </div>
    </el-dialog>
    <!-- 申请退款 -->
    <el-dialog
      v-model="refundDialogVisible"
      title="申请退款"
      @close="refundResetClose"
      :close-on-click-modal="false"
      width="389"
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
            type="primary"
            class="dialog-footer-confirm"
            v-loading.fullscreen.lock="fullscreenLoading"
            @click="handleRefundVerify(refundRef)"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="payDialogVisible"
      title="订单详情"
      :close-on-click-modal="false"
      @close="closePay"
      width="600"
    >
      <div class="dialog_pirce">
        <div class="order_content">
          <h5>订单信息</h5>
          <div class="order_code">
            <span>
              订单编号：<em>{{ orderDetails.id }}</em>
            </span>
            <span class="order_title">
              产品标题：{{ orderDetails.resourceTitle }}
            </span>
          </div>
          <div class="pirce_discount">
            <!-- <span class="pirce_true">
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
            <qrcode-vue :value="qrCodeText" :size="120" level="H" />
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
                <Wallet />
              </el-icon>
              钱包余额
            </span>
            <span class="balance_actual">￥{{ balance }}</span>
          </div>
          <div
            class="handle_immediately"
            v-loading.fullscreen.lock="fullscreenLoading"
            @click="handleAtPay()"
          >
            立即支付
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      v-model="editDialogVisible"
      title="编辑产品信息"
      :close-on-click-modal="false"
      width="880"
    >
      <el-form
        ref="editRef"
        :model="editForm"
        :rules="editRules"
        label-position="top"
        class="order_form"
      >
        <el-form-item
          label="地区/国家"
          class="form_inline nation"
          prop="countryId"
        >
          <el-select
            disabled
            placeholder="请选择产品的地区或者国家"
            class="form_select"
            v-model="editForm.countryId"
          >
            <el-option
              v-for="item in nationArray"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <span style="display: inline-block">
                <img
                  style="width: 16px; height: 12px"
                  :src="item.pic"
                  :alt="item.name"
                />
              </span>
              <span>
                {{ item.name }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="购物平台"
          class="form_inline platform"
          prop="platformId"
        >
          <el-select
            disabled
            placeholder="请选择产品所在的购物平台"
            class="form_select"
            v-model="editForm.platformId"
          >
            <el-option
              v-for="item in countryArray"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产品标题" prop="resourceTitle">
          <el-input
            v-model="editForm.resourceTitle"
            type="text"
            placeholder="产品标题"
            style="width: 832px"
          ></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="originalPriceMin">
          <div class="form_pirce">
            <div class="form_pirce_iput">
              <el-input
                v-model="editForm.originalPriceMin"
                placeholder="最低价，必填"
                :formatter="
                  (value:any) => `${value}`.replace(/\B(?=(\d{13})+(?!\d))/g, ',')
                "
                :parser="(value:any)=> value.replace(/\$\s?|(,*)/g, '')"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
              >
                <template #prefix>
                  <span>{{ money }}</span>
                </template>
              </el-input>
            </div>
            <span class="form_pirce_span">至</span>
            <div class="form_pirce_iput">
              <el-input
                v-model="editForm.originalPriceMax"
                placeholder="最高价，可不填"
                :formatter="
                  (value:any) => `${value}`.replace(/\B(?=(\d{13})+(?!\d))/g, ',')
                "
                :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
              >
                <template #prefix>
                  <span>{{ money }}</span>
                </template>
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="折后价" prop="discountPriceMin">
          <div class="form_pirce">
            <div class="form_pirce_iput">
              <el-input
                v-model="editForm.discountPriceMin"
                placeholder="最低价，必填"
                :formatter="
                  (value:any) => `${value}`.replace(/\B(?=(\d{13})+(?!\d))/g, ',')
                "
                :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
              >
                <template #prefix>
                  <span>{{ money }}</span>
                </template>
              </el-input>
            </div>
            <span class="form_pirce_span">至</span>
            <div class="form_pirce_iput">
              <el-input
                v-model="editForm.discountPriceMax"
                placeholder="最高价，可不填"
                :formatter="
                  (value:any) => `${value}`.replace(/\B(?=(\d{13})+(?!\d))/g, ',')
                "
                :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
                onkeyup="this.value=this.value.match(/\d+\.?\d{0,2}/);this.dispatchEvent(new Event('input'))"
              >
                <template #prefix>
                  <span>{{ money }}</span>
                </template>
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="折扣码（无折扣请填nocode）"
          class="form_inline nation"
          prop="discountCode"
        >
          <div class="form_pirce">
            <div class="form_pirce_iput">
              <el-input
                v-model="editForm.discountCode"
                placeholder="请输入产品折扣码，50cc612u"
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item
          v-if="editForm.discountCode !== 'nocode'"
          label="优惠比例（不包含coupon优惠）"
          class="form_inline platform"
          prop="preferentialRatio"
        >
          <div class="form_pirce">
            <div class="form_pirce_iput">
              <el-input v-model="editForm.preferentialRatio" placeholder="%" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="可用变体（选填">
          <div class="form_pirce">
            <div class="form_pirce_variable">
              <el-input
                v-model="editFormArr.variable"
                placeholder="可用变体，不填代表所有变体可用"
              />
            </div>
            <span class="variable_botton" @click="handleVariable"
              >添加可变实体</span
            >
          </div>
          <div class="variable_list">
            <ul>
              <li v-for="(item, index) in array" :key="index">
                <span @click="deleteVariable(index)">{{ item }} X</span>
              </li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item label="coupon（选填）">
          <el-input
            v-model="editForm.coupon"
            placeholder="叠加coupon，如：5%或$2prime"
            style="width: 832px"
          />
        </el-form-item>
        <el-form-item label="折扣有效时间（PDT）" prop="date">
          <a-range-picker
            v-model:value="editForm.date"
            format="YYYY-MM-DD HH:mm"
            :disabledDate="disabledDateFn"
            show-time
            valueFormat="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="链接" prop="resourceUrl">
          <el-input
            v-model="editForm.resourceUrl"
            placeholder="示例 https://www.amazon.com/dp/{ASIN} 或 https://www.amazon.com/gp/mpc/{社媒标识}"
            style="width: 832px"
          />
        </el-form-item>
        <el-form-item label="自定义广告封面（不保证100%使用）">
          <div class="upload_footer">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadBanner"
            >
              <img v-if="editForm.pic" :src="editForm.pic" class="avatar" />
              <el-icon v-else class="avatar-uploader-footer">
                <Plus />
              </el-icon>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="dialog-footer-close"
            @click="editDialogVisible = false"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            class="dialog-footer-confirm"
            @click="handleEditForm(editRef)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 图片放大 -->
    <el-dialog v-model="productdialogVisible">
      <img
        w-full
        style="width: 100%; max-width: 100%"
        :src="dialogImageUrl"
        alt="Preview Image"
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
          <img src="@/assets/img/close_set.jpg" alt="" />确定关闭订单？
        </div>
        <div class="close_botton">
          <span @click="handlePopRefund" class="close_c pointer"> 取消 </span>
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
// const size = (ref < 'default') | 'large' | ('small' > 'default')
import { filters } from '@/enums'
import QrcodeVue from 'qrcode.vue'
import dayjs, {Dayjs} from 'dayjs'
import { copy } from '@/utils/method'
import { fileUploadAPI } from '@/api/user'
import { RangePicker } from 'ant-design-vue'
import type { FormInstance } from 'element-plus'
import { getCountry, platformAll } from '@/api/index'
import { useUserStore, useOrderStore } from '@/stores'
import type { imgTextObjApi, evaluateObjApi } from '@/types/personal'
import {
  orderListPage,
  addComment,
  improvementConfirmation,
  confirmOrder,
  requestRefun,
  platformIntervention,
  cancelOrder,
  editOrder,
  walletRuery,
  getEditOrderDe,
  cancelCreateOrderList,
  cancelOrderList,
  getPayStatus,
  getMergeId,
  orderStatusList,
  orderReject,
  checkComment,
  toDelayPay
} from '@/api/personal'

const array = ref<any>([])
const router = useRouter()
const loading = ref(false)
const balance = ref<any>()
const orderId = ref<any>()
const money = ref<any>('')
const commentDs = ref<any>()
const total = ref<number>(0)
const payNum = ref<number>(1)
const statusList = ref<any>()
const rejectList = ref<any>()
const closeOrder = ref<any>()
const checkList = ref<any>([])
const classNameTo = ref(false)
const dialogImageUrl = ref('')
const qrCodeText = ref<any>('')
const isBalance = ref<any>('1')
const timeInter = ref<any>(null)
const userStore = useUserStore()
const date_picker = ref<any>('')
const nationArray = ref<any>([])
const imgTextData = ref<any>([])
const countryArray = ref<any>([])
const orderStore = useOrderStore()
const editRef = ref<FormInstance>()
const payDialogVisible = ref(false)
const fullscreenLoading = ref(false)
const editDialogVisible = ref(false)
const orderSubmitParam = ref<any>([])
const colsedialogVisible = ref(false)
const refundRef = ref<FormInstance>()
const commentRef = ref<FormInstance>()
const aggPayType = ref<boolean>(false)
const refundDialogVisible = ref(false)
const commentDialogVisible = ref(false)
const productdialogVisible = ref(false)
const checkCommentDialogVisible = ref(false)
const colors = ref(['#098D72', '#098D72', '#098D72'])
const orderDetails = ref<any>({
  id: '',
  resourceTitle: '',
  memberPrice: '',
  originalPrice: '',
  discountedPrice: '',
  totalAmount: ''
})
const orderObj = reactive({
  order: '',
  orderTow: '',
  edit: '',
  pirce: ''
})
const comment = reactive<evaluateObjApi>({
  content: '',
  resourceId: undefined,
  orderItemId: undefined,
  pic: '',
  score: undefined,
  userId: userStore.userInfo?.userId
})
const commentRules = {
  score: [{ required: true, trigger: 'blur', message: '请评分' }]
}
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
    { required: true, trigger: 'change', message: '请选择退款原因' }
  ]
}
const editFormArr = reactive<any>({
  variable: '',
  variableArr: []
})
// 编辑
const editForm = ref<any>({
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
  memberId: userStore.userInfo?.userId,
  date: []
})
// 编辑
const editRules = {
  sellId: [{ required: true, trigger: 'change', message: '请选择营销分类' }],
  promId: [{ required: true, trigger: 'change', message: '请选择资源分类' }],
  countryId: [{ required: true, trigger: 'change', message: '请选择国家' }],
  platformId: [
    { required: true, trigger: 'change', message: '请选择购物平台' }
  ],
  articleType: [
    { required: true, trigger: 'change', message: '请选择文章类型' }
  ],
  resourceTitle: [
    { required: true, trigger: 'blur', message: '请输入标题' },
    { required: true, validator: titleText, trigger: 'blur' }
  ],
  originalPriceMin: [
    { required: true, trigger: 'blur', message: '请输入原价' },
    { required: true, validator: greaterPirceTo, trigger: 'blur' }
  ],
  discountPriceMin: [
    { required: true, trigger: 'blur', message: '请输入折后价' },
    { required: true, validator: greaterPirce, trigger: 'blur' }
  ],
  discountCode: [{ required: true, trigger: 'blur', message: '请输入折扣码' }],
  preferentialRatio: [
    { required: true, trigger: 'blur', message: '请输入优惠比例' }
  ],
  numberSamples: [
    { required: true, trigger: 'blur', message: '请输入样品数量' }
  ],
  date: [{ required: true, trigger: 'change', message: '请选择时间' }],
  resourceUrl: [{ required: true, trigger: 'blur', message: '请输入链接' }],
  articleContent: [
    { required: true, trigger: 'change', message: '请上传文章内容/Birft' }
  ],
  banner: [{ required: true, trigger: 'change', message: '请上传Banner图' }]
}
const handleCheckedCitiesChange = (value: any) => {
  checkList.value = value
}
const handleDatePicker = (time: any) => {
  if (time) {
    time[1] = time[1].substr(0, 10) + ' 23:59:59'
  }
}
const orderStatus = (status: any) =>
  statusList.value.find((item: any) => item.id === status).name

const changContent = (item: any) => {
  item.showhide = !item.showhide
}
const handleRefund = (val: any) => {
  document.body.click()
}
const handlePopRefund = () => {
  colsedialogVisible.value = false
}
// 图片放大
const handleProductPic = (item: any) => {
  productdialogVisible.value = true
  dialogImageUrl.value = item
}
// 复制
const handleUplicate = (val: any) => {
  const originalPriceMax = val.originalPriceMax ? val.originalPriceMax : ''
  const discountPriceMax = val.discountPriceMax ? val.discountPriceMax : ''
  const coupon = val.coupon ? val.coupon : ''
  const jsonString = `Product Name：${val.resourceTitle}\nOriginal Price：${val.originalPriceMin} - ${originalPriceMax}\nDiscount Price：${val.discountPriceMin} - ${discountPriceMax}\nDiscount：${val.preferentialRatio} + ${coupon}\nDiscount Code：${val.discountCode}\nCode Start Day：${val.startTime}\nCode End Day：${val.endTime}\nLink：${val.resourceUrl}`
  copy(jsonString)
}
//控制时间
const disabledDateFn = (current: Dayjs) => {
  return current < dayjs().subtract(2, 'days')
}
// 取出图片第一张
const filtersImg = (image: any) => {
  let array = image.split(',')
  return array[0]
}
// 折后价不能大于原价
function greaterPirce(rule: any, value: any, callback: any) {
  if (
    Number(editForm.value.discountPriceMin) >
    Number(editForm.value.originalPriceMin)
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
  console.log(editForm.countryId)
  const passwordRegex = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g
  if (editForm.value.countryId !== 99999) {
    if (passwordRegex.test(value)) {
      callback(new Error('请输入正确的产品标题'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 查询用户余额
const getWalletRuery = async () => {
  const id = {
    userId: userStore.userInfo?.userId
  }
  const res = await walletRuery(id)
  balance.value = res.data.balance
}
// 获取国家资源列表
const getCountryList = async () => {
  const res = await getCountry({})
  nationArray.value = res?.data
  console.log(nationArray.value)
}
// 购物平台管理
const platformList = async () => {
  const res = await platformAll()
  countryArray.value = res?.data
}
const handleVariable = () => {
  if (editFormArr.variable && array.value.length < 4) {
    array.value.push(editFormArr.variable)
    console.log(array)
  }
  editFormArr.variable = null
}
const deleteVariable = (index: any) => {
  array.value.splice(index, 1)
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
// 表单上传图片
const uploadBanner = async (params: any) => {
  let file = params.file
  if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  let formData = new FormData()
  formData.append('file', file)
  const res = await fileUploadAPI(formData)
  editForm.value.pic = res.data?.url
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
      getListUserPage()
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
      getListUserPage()
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
    data.payMethod = 0
    data.id = checkList.value[i].id
    data.memberId = checkList.value[i].memberId
    data.totalAmount = checkList.value[i].totalAmount
    data.note = '无'
    data.resourceTitle = checkList.value[i].resourceTitle
    data.orderItems = checkList.value[i].orderItems
    orderSubmitParam.value.push(data)
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
  orderDetails.value = orderDetails.value = Object.assign({}, item)
  getWalletRuery()
  payDialogVisible.value = true
  clearInterval(timeInter.value)
  qrCodeText.value = `${import.meta.env.VITE_APP_BASE_URL}?id=${item.id}&type=0`
  orderId.value = item.id
  loopOrderState()
}
// 立即支付
const handleAtPay = () => {
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
  console.log(orderSubmitParam.value)
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
      getListUserPage()
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
      getListUserPage()
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
            getListUserPage()
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
          getListUserPage()
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
// 关闭申请退款
const refundResetClose = () => {
  refundRef.value?.resetFields()
  refundDialogVisible.value = false
}
//再来一单
const handleLink = async (item: any) => {
  const obj = {
    banner: item.banner ? item.banner.split(',') : [],
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
  router.push({ path: '/placeOrder' })
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
      getListUserPage()
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
      getListUserPage()
      ElMessage({
        message: '取消订单成功!',
        type: 'success'
      })
      loading.value = false
      console.log(checkList.value)
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
      getListUserPage()
      ElMessage({
        message: '取消订单成功!',
        type: 'success'
      })
      loading.value = false
      colsedialogVisible.value = false
    })
    .catch(() => {
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
      getListUserPage()
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
// 编辑促销订单
const handleEdit = async (item: any) => {
  editDialogVisible.value = true
  platformList()
  getCountryList()
  const res = await getEditOrderDe(item.id)
  if (res.code === 200) {
    editForm.value = res.data
    console.log(res.data)
    editForm.value.date = [editForm.value.startTime, editForm.value.endTime]
    editForm.value.platformId = parseInt(editForm.value.platformId)
    editForm.value.countryId = parseInt(editForm.value.countryId)
    array.value = editForm.value.variableBody
      ? editForm.value.variableBody.split(',')
      : []
    handleChangeMoney(editForm.value.countryId)
  }
  console.log(editForm)
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
// 确认修改促销订单
const handleEditForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let arr = countryArray.value.find(
        (v: any) => v.id === editForm.value.platformId
      )
      if (!editForm.value.resourceUrl.includes(arr.url)) {
        ElMessage.error('请输入正确购物平台地址')
        return
      }
      if (editForm.value.discountCode === 'nocode') {
        editForm.value.preferentialRatio = ''
      }
      editForm.value.endTime =
        editForm.value.date.length > 0 ? editForm.value.date[1] : ''
      editForm.value.startTime =
        editForm.value.date.length > 0 ? editForm.value.date[0] : ''
      editForm.value.variableBody = array.value.toString()
      const res = await editOrder(editForm.value)
      if (res.code === 200) {
        editDialogVisible.value = false
        getListUserPage()
        ElMessage({
          message: '修改促销订单成功!',
          type: 'success'
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置
const handleReset = () => {
  imgTextObj.resourceTitle = ''
  imgTextObj.orderStatusList = undefined
  date_picker.value = ''
  getListUserPage()
}
// 搜索
const handleSearch = () => {
  imgTextObj.current = 1
  getListUserPage()
}
// 刷新
const handelRefresh = () => {
  classNameTo.value = true
  imgTextObj.current = 1
  setTimeout(() => {
    classNameTo.value = false
  }, 500)
  getListUserPage()
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
              fullscreenLoading.value = false
              getListUserPage()
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
// 获取订单状态列表
const getOrderStatusList = async () => {
  const res = await orderStatusList()
  if (res.code === 200) {
    statusList.value = res?.data
  }
}
// 获取图文订单列表
const getListUserPage = async () => {
  console.log(date_picker.value)
  imgTextObj.endOrderTime =
    date_picker.value.length > 0 ? date_picker.value[1] : ''
  imgTextObj.startOrderTime =
    date_picker.value.length > 0 ? date_picker.value[0] : ''
  const res = await orderListPage(imgTextObj)
  imgTextData.value = res.data.records ? res.data.records : []
  for (const item of imgTextData.value) {
    item.showhide = false
  }
  checkList.value = []
  total.value = res.data.total ? res.data.total : 0
}
getOrderStatusList()
getListUserPage()
</script>
<style lang="scss" scoped>

:deep(.el-overlay) {
  z-index: 1000 !important;
}
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
        border: 0;
        text-align: center;
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
        margin: 0 26px;
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
            .name_text {
              display: inline-block;
              width: 179px;
              height: 18px;
              width: 179px;
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
        width: 110px;
        margin-left: 30px;

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
        margin-left: 40px;
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
        margin-left: 38px;
        display: flex;
        align-items: center;
        // position: relative;
        .coming {
          width: 94px;
          height: 32px;
          color: #098d72;
          margin: 0 20px;
          text-align: center;
          line-height: 32px;
        }

        img {
          width: 20px;
          margin-left: 10px;
        }
        .child_none {
          width: 94px;
          margin: 0 20px;
        }
        .child_footer {
          width: 94px;
          height: 32px;
          margin: 0 20px;
          cursor: pointer;
          position: relative;
          // border: 1px solid #098d72;
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
              margin: 0 20px;
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
        .child_footer_order:hover .select-box {
          display: block;
        }

        .child_botton {
          width: 100%;
          height: 100%;
          background: #e6f4f1;
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
        .child_footer > span {
          cursor: pointer;
        }

        .select-box {
          width: 94px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          background-color: #e6fffa;
          color: #757fd9;
          position: absolute;
          bottom: -33px;
          z-index: 1000;
        }

        .select-box > p {
          cursor: pointer;
        }
      }

      .text_browser {
        width: 150px;
        span {
          display: flex;
          align-items: center;
        }
        .browser_coupon {
          max-width: 150px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          font-weight: bold;
          color: #111;
          em {
            font-weight: bold;
            color: #111;
          }
        }
        .browser_link {
          display: flex;
        }
        .el-icon {
          color: #098d72;
          margin-right: 3px;
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
        margin-left: 68px;

        .child_img_name {
          img {
            width: 60px;
            height: 60px;
            border-radius: 4px 4px 4px 4px;
          }
        }

        .child_img_title {
          margin-left: 8px;
          width: 110px;
          .name {
            margin-top: 7px;
            width: 110px;
            display: block;
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
        margin-left: 185px;
        .child_text_span {
          margin-top: 10px;
        }
        em {
          color: #098d72;
        }
        a {
          margin-top: 10px;
          color: #098d72;
        }
      }
      .chlid_progress {
        margin-left: 40px;
        .chlid_date_text {
          margin-top: 10px;
          color: #555;
        }
      }
      .chlid_taking_orders {
        margin-left: 195px;
        .chlid_date_text {
          margin-top: 10px;
          color: #555;
        }
      }
      .chlid_to_pay {
        margin-left: 35px;
        .chlid_date_text {
          margin-top: 10px;
          color: #555;
        }
      }
      .chlid_pirce {
        margin-left: 40px;
        .child_text_span {
          margin-top: 10px;
        }
      }
      .chlid_media {
        margin-left: 40px;

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
      }

      .schedule {
        margin-left: 40px;
        .progress {
          color: #4356ee;
        }
        .schedule_sta {
          margin-top: 10px;
          display: flex;
          align-items: center;
          color: #555;
          em {
            display: inline-block;
            background: #098d72;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            margin-right: 3px;
          }
        }
        .schedule_refund {
          color: #f3294d;
          em {
            background: #f3294d;
          }
        }
      }

      .child_list_date {
        margin-left: 40px;
        .child_date {
          margin-top: 4px;
          font-size: 12px;
          :deep(.el-statistic__number) {
            font-size: 13px;
            color: #f3294d !important;
          }
        }
      }
      .child_text_content {
        font-size: 14px;
        width: 115px;
        span {
          display: block;
        }
      }
      .child_text_botton {
        font-size: 14px;
        width: 130px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .evaluate {
          color: #098d72;
        }
        .child_footer_order:hover .select-box {
          display: block;
        }

        .child_footer {
          width: 94px;
          height: 32px;
          cursor: pointer;
          position: relative;

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
          }

          .select-box > p {
            cursor: pointer;
          }
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

  .comment {
    .comment_content {
      display: flex;
      align-items: center;

      span {
        margin-right: 14px;
      }
    }

    .comment_input {
      margin-top: 3px;
    }

    .comment_upload {
      margin-top: 12px;

      .avatar-uploader {
        width: 88px;
        height: 88px;

        img {
          width: 88px;
          height: 88px;
        }

        .avatar-uploader-icon {
          width: 88px;
          height: 88px;
        }
      }

      font-size: 14px;
      color: #555;

      .upload_png {
        display: block;
        margin-top: 6px;
      }
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
    .form_inline {
      display: inline-block;
      width: 368px;
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

    .form_select {
      width: 100%;
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
    .avatar {
      height: 100%;
      height: 100%;
    }
    .upload_footer {
      width: 100%;
      height: 118px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #dcdee0;

      .avatar-uploader-footer {
        height: 118px;
        width: 118px;
      }
    }
  }

  .dialog_address {
    .dialog_name {
      display: flex;
      align-items: center;
    }

    .address {
      margin-top: 10px;
    }
  }
}
.content {
  max-width: 300px;
  white-space: pre-wrap;
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

.text_discount_code {
  max-width: 110px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  color: #111;
  font-weight: bold;
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

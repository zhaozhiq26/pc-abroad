<template>
  <div class="customer_server">
    <div class="customer_details">
      <span>公司邮箱：</span> <em>sales@vqcm.com</em>
    </div>
    <div class="customer_details">
      <span>公司地址：</span>
      <em>深圳市龙岗区园山街道保安社区马五路1号2栋301-B037</em>
    </div>
    <div class="customer_details">
      <span>联系方式：</span> <em>86-18925783945</em>
    </div>
    <div class="customer_img">
      <img src="@/assets/img/firm-code.png" alt="" />
      <span>扫一扫添加客服</span>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.customer_server {
  background: #fff;
  border-radius: 0px 4px 4px 0px;
  border-left: 1px solid #ededed;
  height: 924px;
  width: 1226px;
  font-size: 14px;
  padding: 24px 0 0 48px;

  .customer_details {
    margin-top: 20px;

    span {
      color: #555555;
    }

    em {
      color: #111;
    }
  }

  .customer_img {
    margin-top: 51px;

    img {
      display: block;
      width: 88px;
    }

    span {
      display: block;
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>

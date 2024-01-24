<script setup lang="ts"></script>

<template>
  <div class="footer_box">
    <div class="footer_content">
      <div class="footer_friendship">
        <el-link
          href="https://tools.ikjzd.com"
          :underline="false"
          target="_blank"
        >
          <span>友情链接:</span>
          <img src="@/assets/img/friendship_link.png" alt="" />
        </el-link>
      </div>
      <div class="info_box">
        <el-link
          href="https://beian.miit.gov.cn/"
          :underline="false"
          target="_blank"
        >
          粤ICP备2023075993 号-2
        </el-link>
        <span> Copyright @ 2023 微企传媒.AII Rights Reserved </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer_box {
  height: 80px;
  background: #fff;
  margin-top: 10px;
  .footer_content {
    margin-left: auto;
    margin-right: auto;
    width: 1400px;
    padding: 15px 0;
    .footer_friendship {
      display: flex;
      font-size: 14px;
      color: #555;
      img {
        width: 56px;
        height: 20px;
        margin-left: 5px;
      }
    }
    .info_box {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      span {
        color: #555;
        font-size: 14px;
      }
    }
  }
}
</style>

<script setup lang="ts">
const route = useRoute()
const emit = defineEmits(['ywGuide'])
const checkAll = ref(false)
const ywGuideTo = () => {
  console.log(route.path);
  emit('ywGuide')
}
// 控制弹窗
const ywCheckbox = () => {
  let isWarmth = checkAll.value ? 'true' : 'false'
  localStorage.setItem('ywCheckAll', isWarmth)
}
</script>

<template>
  <div class="yw_float" :class="{ywHeight: route.path !== '/'}">
    <div class="float_box box_1" @click="ywGuideTo" v-if="route.path === '/'">
      <a>
        <svg-icon icon-class="guide" />
        <span class="float_title">新手引导</span>
      </a>
    </div>
    <div class="float_box box_1">
      <a
        href="https://www.yuque.com/yalishanda-2wckf/kb/xp5nlfkwa5x9lqbe?singleDoc#"
        target="_blank"
      >
        <svg-icon icon-class="manual" />
        <span class="float_title">用户指南</span>
      </a>
    </div>
    <div class="float_box">
      <a-popover placement="left" v-if="!checkAll">
        <template #content>
          <div class="yw_popover">
            <span class="popover_title">在线客服使用教程</span>
            <div class="popover_p">
              如电脑上已安装微信则在界面上点击【打开WeChat】如电脑上未安装微信则点击【
              查看二维码】后使用微信扫一扫或直接使用微信扫一扫下方二维码
            </div>
            <div class="popover_img">
              <img src="@/assets/img/float_left.png" class="left_img" alt="" />
              <img
                src="@/assets/img/float_right.png"
                class="right_img"
                alt=""
              />
            </div>
            <div class="popover_btn">
              <div>
                <a-checkbox
                  v-model:checked="checkAll"
                  @change="ywCheckbox"
                >
                  不再提示
                </a-checkbox>
              </div>
              <a
                href="https://work.weixin.qq.com/kfid/kfca6c9839b66de8472"
                target="_blank"
              >
                立即使用
              </a>
            </div>
          </div>
        </template>
        <a
          href="https://work.weixin.qq.com/kfid/kfca6c9839b66de8472"
          target="_blank"
        >
          <svg-icon icon-class="customerService" />
          <span class="float_title">在线客服</span>
        </a>
      </a-popover>
      <a
          v-else
          href="https://work.weixin.qq.com/kfid/kfca6c9839b66de8472"
          target="_blank"
        >
          <svg-icon icon-class="customerService" />
          <span class="float_title">在线客服</span>
        </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ywHeight {
  height: 149px !important;
}
.yw_float {
  position: fixed;
  top: 50%;
  right: 0;
  width: 60px;
  height: 229px;
  transform: translate(0, -50%);
  background: #098d72;
  .float_box {
    a {
      width: 100%;
      height: 69px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      svg {
        font-size: 28px;
        margin-bottom: 5px;
      }
      .float_title {
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .box_1 {
    height: 80px;
    border-bottom: 1px solid #09755f;
  }
}
.yw_popover {
  color: #000;
  font-size: 16px;
  padding: 24px 20px;
  .popover_title {
    font-weight: bold;
    margin-left: 17px;
  }
  .popover_p {
    width: 586px;
    margin: 22px 0 8px 17px;
    line-height: 25px;
  }
  .popover_img {
    width: 100%;
    height: 231px;
    display: flex;
    margin-bottom: 80px;
    justify-content: space-between;

    .left_img {
      width: 309px;
      height: 185px;
    }
    .right_img {
      width: 286px;
      height: 231px;
    }
  }
  .popover_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      width: 110px;
      height: 32px;
      color: #fff;
      font-size: 14px;
      margin-left: 65px;
      line-height: 32px;
      text-align: center;
      border-radius: 4px;
      display: inline-block;
      background-color: #098d72;
      &:hover {
        background-color: #22997d;
      }
    }
  }
}
</style>

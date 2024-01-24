<template>
  <div class="nation_date">
    <div class="main_herder">
      <span>
        <img src="@/assets/img/usa.png" alt="" />
        <em>美东 {{ usaEastCon }}</em>
      </span>
      <span>
        <img src="@/assets/img/usa.png" alt="" />
        美西 {{ usaWestCon }}
      </span>
      <span>
        <img src="@/assets/img/europe.png" alt="" />
        欧洲 {{ europeCon }}
      </span>
      <span>
        <img src="@/assets/img/russia.png" alt="" />
        俄罗斯 {{ russiaCon }}
      </span>
      <span>
        <img src="@/assets/img/korea.png" alt="" />
        韩国 {{ koreaCon }}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getNationDate } from '@/api/user'
const usaEastCon = ref<any>()
const usaWestCon = ref<any>()
const europeCon = ref<any>()
const russiaCon = ref<any>()
const koreaCon = ref<any>()
const date = reactive<any>({
  usaEast: null,
  usaWest: null,
  europe: null,
  russia: null,
  korea: null
})
// 获取时间
const getNationDateData = async () => {
  const res = await getNationDate()
  date.usaEast = res.data ? res.data - 46800000 : 0
  date.usaWest = res.data ? res.data - 57600000 : 0
  date.europe = res.data ? res.data - 21600000 : 0
  date.russia = res.data ? res.data - 18000000 : 0
  date.korea = res.data ? res.data + 3600000 : 0
  // console.log(times)
}
//创建一个时间日期对象
const padaDate = function (value: any) {
  return value < 10 ? '0' + value : value
}
const nationDate = (date: any) => {
  const time = new Date(date)
  const year = time.getFullYear()
  const month = padaDate(time.getMonth() + 1)
  const day = padaDate(time.getDate())
  const hour = padaDate(time.getHours())
  const minute = padaDate(time.getMinutes())
  const second = padaDate(time.getSeconds())
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
const getTimes: any = () => {
  setInterval(() => {
    usaEastCon.value = nationDate((date.usaEast += 1000))
    usaWestCon.value = nationDate((date.usaWest += 1000))
    europeCon.value = nationDate((date.europe += 1000))
    russiaCon.value = nationDate((date.russia += 1000))
    koreaCon.value = nationDate((date.korea += 1000))
  }, 1000)
}
onMounted(() => {
  getTimes()
})
onUnmounted(() => {
  clearInterval(getTimes)
})
getNationDateData()
</script>
<style lang="scss" scoped>
.nation_date {
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
}
</style>

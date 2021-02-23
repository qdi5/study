<template>
  <div>
     <van-count-down v-if="showTime" @finish="finish" :time="time" format="ss" />
     <span v-else @click="resend">重新发送</span>  
  </div>
 
</template>

<script>
import { CountDown } from 'vant'
export default {
  data () {
    return {
      time: 60 * 1000,
      showTime: true
    }
  },
  methods: {
    finish () {
      this.showTime = false
    },
    resend () {
      this.showTime = true
      this.time = 60 * 1000
    }
  },
  components: {
    [CountDown.name]: CountDown
  }
}

</script>
<style>
</style>
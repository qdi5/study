<template>
  <div>首页</div>
</template>

<script>
export default {
  asyncData({ $config }) {
    console.log(`$config:`, $config)
  },
}
</script>

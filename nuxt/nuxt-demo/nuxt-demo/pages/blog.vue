<template>
  <div>
    使用自定义的blog layout啦
  </div>
</template>

<script>
export default {
  layout: 'blog',
  head() {
    return {
      title: '我的博客',
      meta: [
        {
          hid: 'vue、node、webpack',
          name: 'my blog',
          content: '啊哈前端'
        }
      ],
      // 只在当前页面加载的脚本与css
      script: [
        {
          src: 'https://cdn.ahafe.tech/github-qdi5/holder.min.js'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.ahafe.tech/github-qdi5/font-awesome.min.css'
        }
      ]
    }
  },

}
</script>

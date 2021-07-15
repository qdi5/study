<template>
  <div>
    使用自定义的layout啦
    <nuxt-link to="/book/2">第二个</nuxt-link>
  </div>
</template>

<script>
export default {
  key(route) {
    debugger
    return route.fullPath
  },
  layout: 'blog',
  async asyncData ({ params, query, $axios, error }) {
    const id = params.id
    try {
      const post = await $axios.$get(`https://api.nuxtjs.dev/posts/${id}`)
      // eslint-disable-next-line no-debugger
      debugger
      return {
        post
      }
    } catch (e) {
      error(e)
    }
  },
  mounted() {
    const params = this.$route.params
    // eslint-disable-next-line no-debugger
    debugger
    // eslint-disable-next-line no-console
    console.log(params)
  },
}
</script>

<template>
  <div>
    使用自定义的layout啦
  </div>
</template>

<script>
export default {
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
  }
}
</script>

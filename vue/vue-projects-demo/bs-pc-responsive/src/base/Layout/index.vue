<template>
  <div>
      <tb-header></tb-header>
      <main>
          <slot></slot>
      </main>
      <tb-footer></tb-footer>
  </div>
</template>

<script>
export default {
    name: 'TbLayout'
}
</script>

<style>

</style>
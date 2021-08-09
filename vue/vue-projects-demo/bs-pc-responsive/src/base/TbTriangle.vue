<template>
  <div class="triangle" :class="`triangle-${direction}`"></div>
</template>

<script>
export default {
    name: 'TbTriangle',
    props: {
        direction: {
            type: String,
            default: 'left'
        },
        bgColor: {
            type: String,
            default: '#fff'
        }
    }

}
</script>

<style lang="scss" scoped>
.triangle {
    width: 100%;
    height: 160px;
}
.triangle-left {
    border-style: solid;
    border-width: 160px 0 0 100vw;
    border-color: #d2eaff #fff;
}

.triangle-right {
    border-style: solid;
    border-width: 0 0 160px 100vw;
    border-color: #d2eaff #fff;
}

</style>
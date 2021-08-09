<template>
    <div class="software-brief" :class="{'text-r': isTextRight}">
        <div class="prod-name">{{ softwareName }}</div>
        <div class="prod-desc">
            <slot></slot>
        </div>
        <div class="prod-btn">
            <b-button variant="primary" size="lg" mr20 href="http://www.tbquant.net/dist/downloadmobile.html">立即下载</b-button>
            <b-button variant="outline-primary" size="lg" href="http://www.tbquant.net/phoneuser.html">查看详情</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SoftwareBrief',
    props: {
        isTextRight: {
            type: Boolean,
            default: false
        },
        softwareName: {
            type: String,
            default: 'TB宽客宝'
        },
        // 立即下载
        downloadUrlLink: {
            type: String,
            default: 'http://www.tbquant.net/phoneuser.html'
        },
        //详情
        detailUrlLink: {
            type: String,
            default: 'http://www.tbquant.net/dist/downloadmobile.html'
        }
    }
}
</script>

<style lang="scss" scoped>
.software-brief {
    .prod-name {
        font-size: 32px;
        font-weight: bold;
        color: #026ab8;
    }
    .prod-desc {
        margin-top: 30px;
        font-size: 20px;
        line-height: 48px;
        color: #333333;
    }
    .prod-btn {
        margin-top: 30px;
    }
}
.text-r {
    text-align: right;
}

</style>
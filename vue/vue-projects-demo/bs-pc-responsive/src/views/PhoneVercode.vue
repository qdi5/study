<template>
<tb-layout>
    <div class="register">
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label=""
                label-for="input-3"
            >
                <b-form-input
                    id="input-3"
                    v-model="form.username"
                    type="text"
                    placeholder="请输入手机号"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group  id="input-group-2" label="" label-for="input-4">
                <b-input-group>
                    <b-form-input
                        id="input-4"
                        v-model="form.pwd"
                        placeholder="验证码"
                        required
                        type="text"
                        >
                    </b-form-input>
                    <template v-slot:append>
                        <b-input-group-text >获取验证码</b-input-group-text>
                    </template>
                </b-input-group>
            </b-form-group>
            <b-button type="submit" block variant="primary">提交</b-button>
        </b-form>
    </div>
</tb-layout>

</template>

<script>
export default {
    data () {
        return {
            form: {
                username: '',
                pwd: ''
            },
            activedTab: 0
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        }
    },
    activated () {
        debugger
        const { type } = this.$route.query
        if (type === 'pwd') {
            this.activedTab = 0
        } else if (type === 'phone') {
            this.activedTab = 1
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
    width: 420px;
    padding: 25px;
    margin: auto;
}
::v-deep .tab--pt {
    margin-top: 30px;
}
.logo {
    width: initial;
}
.img--wrapper {
    height: 150px;
    line-height: 150px;
    text-align: center;
    img {
        width: 80px;
        height: 80px;
    }
}
::v-deep #input-group-1__BV_label_,
::v-deep #input-group-2__BV_label_ {
    flex-basis: 17%;
}
.wechat--link {
    color: #4184e1;
}
.scan-login--wrap {
    a {
        & + a {
            margin-left: 15px;
        }
    }
}
::v-deep .nav-tabs .nav-link {
    border: none;
    border-radius: 0;
    &:hover, &:focus {
        border: none;
        border-radius: 0;
    }
}

</style>
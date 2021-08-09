<template>
  <div class="login--pwdphone">
    <b-tabs
        content-class="tab--pt"
        justified
        v-model="activedTab"
    >
        <b-tab pr30 pl30 title="账号密码登录">
            <div class="img--wrapper">
                <img :src="require('@/assets/TBforum_home_img_01.png')" alt="" class="logo">
            </div>
            <validation-observer ref="normalObs" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                    <validation-provider
                        name="用户名"
                        :rules="{ required: true }"
                        v-slot="validationContext"
                    >
                        <b-form-group
                            id="input-group-1"
                            label=""
                            label-for="input-1"
                        >
                            <b-form-input
                            id="input-1"
                            v-model="form.username"
                            type="text"
                            placeholder="请输入用户名"
                            :state="getValidationState(validationContext)"
                            
                            ></b-form-input>
                            <b-form-invalid-feedback id="input-1-live-feedback">
                                {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                    </b-form-group>
                    </validation-provider>
                    <validation-provider
                        name="密码"
                        :rules="{ required: true }"
                        v-slot="validationContext"
                    >
                        <b-form-group  id="input-group-2" label="" label-for="input-2">
                            <b-form-input
                                id="input-2"
                                v-model="form.pwd"
                                placeholder="请输入密码"
                                :state="getValidationState(validationContext)"
                                type="password"
                            ></b-form-input>
                            <b-form-invalid-feedback
                                id="input-2-live-feedback"
                            >
                                {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>
                    
                    <b-button type="submit" block variant="primary">登录</b-button>
                </b-form>
            </validation-observer>
            
        </b-tab>
        <b-tab pr30 pl30 title="手机免密登录">
            <div class="img--wrapper">
                <img :src="require('@/assets/TBforum_home_img_01.png')" alt="" class="logo">
            </div>
            <validation-observer ref="phoneObs" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit2)">
                    <validation-provider 
                        name="手机号"
                        :rules="{ required: true, mobilephone: true }"
                        v-slot="validationContext"
                    >
                        <b-form-group
                            id="input-group-2"
                            label=""
                            label-for="input-3"
                        >
                            <b-form-input
                                id="input-3"
                                v-model="form2.phone"
                                type="text"
                                placeholder="请输入手机号"
                                :state="getValidationState(validationContext)"
                            ></b-form-input>
                            <b-form-invalid-feedback
                                id="input-3-live-feedback"
                            >
                                {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>
                    <validation-provider
                        name="验证码"
                        :rules="{ required: true, length: 4 }"
                        v-slot="validationContext"
                    >
                        <b-form-group  id="input-group-3" label="" label-for="input-4">
                            <b-input-group>
                                <b-form-input
                                    id="input-4"
                                    v-model="form2.vercode"
                                    placeholder="验证码"
                                    type="text"
                                    :state="getValidationState(validationContext)"
                                    >
                                </b-form-input>
                                <template v-slot:append>
                                    <b-input-group-text >获取验证码</b-input-group-text>
                                </template>
                            </b-input-group>
                            <b-form-invalid-feedback
                                :state="getValidationState(validationContext)"
                                id="input-4-live-feedback"
                            >
                                {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                       
                    </validation-provider>
                    <b-button type="submit" block variant="primary">登录</b-button>
                </b-form>
            </validation-observer>
        </b-tab>
    </b-tabs>
    <div class="div" pr30 pl30>
        <div class="text-right">
            <router-link :to="{ name: 'ForgetPwd' }">忘记密码?</router-link>
        </div>
        <div class="scan-login--wrap">
            <router-link :to="{ name: 'WechatLogin' }" class="wechat--link">微信注册登录</router-link>
            <router-link :to="{ name: 'AppLogin' }" class="wechat--link">APP扫码登录</router-link>
        </div>
    </div>
</div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data () {
        return {
            form: {
                username: '',
                pwd: ''
            },
            form2: {
                phone: '',
                vercode: ''
            },
            activedTab: 0
        }
    },
    methods: {
        getValidationState ({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null
        },
        onSubmit() {
            alert(JSON.stringify(JSON.stringify(this.form)))
        },
        onSubmit2 () {
            alert(this.form)
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
.login--pwdphone ::v-deep .tab--pt {
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
.login--pwdphone ::v-deep #input-group-1__BV_label_,
.login--pwdphone ::v-deep #input-group-2__BV_label_,
.login--pwdphone ::v-deep #input-group-3__BV_label_ {
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
.login--pwdphone ::v-deep .nav-tabs .nav-link {
    border: none;
    border-radius: 0;
    &:hover, &:focus {
        border: none;
        border-radius: 0;
    }
}
.login--pwdphone ::v-deep .nav-item {
    &:first-child {
        border-right: 1px solid #dee2e6
    }
}
</style>
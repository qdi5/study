<template>
<tb-layout>
    <div class="register">
        <validation-observer ref="registerObs" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                <validation-provider
                    name="手机号"
                    :rules="{ required: true, mobilephone: true }"
                    v-slot="validationContext"
                >
                    <b-form-group
                        id="input-group-1"
                        label=""
                        label-for="input-3"
                    >
                        <b-form-input
                            id="input-3"
                            v-model="form.phoneNumber"
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
                    <b-form-group  id="input-group-2" label="" label-for="input-4">
                        <b-input-group>
                            <b-form-input
                                id="input-4"
                                v-model="form.vercode"
                                placeholder="验证码"
                                :state="getValidationState(validationContext)"
                                >
                            </b-form-input>
                            <template v-slot:append>
                                <b-input-group-text>获取验证码</b-input-group-text>
                            </template>
                        </b-input-group>
                        <!--
                            设置state来手动控制错误信息的出现；默认情况下是基于
                            浏览器input的原生验证状态来显示错误信息
                        -->
                        <b-form-invalid-feedback
                            :state="getValidationState(validationContext)"
                            id="input-4-live-feedback"
                        >
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                
                <b-button type="submit" block variant="primary">注册</b-button>
            </b-form>
        </validation-observer>
    </div>
</tb-layout>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data () {
        return {
            form: {
                phoneNumber: '',
                vercode: ''
            }
        }
    },
    methods: {
        getValidationState ({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null
        },
        onSubmit(event) {
            alert(JSON.stringify(this.form))
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
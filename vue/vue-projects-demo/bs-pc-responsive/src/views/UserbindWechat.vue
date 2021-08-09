<template>
  <tb-layout>
    <div class="account--bind">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
            <validation-provider
                name="用户名"
                :rules="{ required: true}"
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
                        :state="getValidationState(validationContext)"
                        placeholder="请输入用户名"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">
                        {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>
            <validation-provider name="密码" :rules="{ required: true }" v-slot="validationContext">
                <b-form-group  id="input-group-2" label="" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="form.pwd"
                        placeholder="请输入密码"
                        type="password"
                        :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-2-live-feedback">
                        {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>
            <b-button type="submit" block variant="primary">绑定账号</b-button>
          </b-form>
      </validation-observer>
      
      <br>
      <br>
      <br>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
            <validation-provider
            name="Name"
            :rules="{ required: true, min: 3 }"
            v-slot="validationContext"
            >
                <b-form-group id="example-input-group-1" label="Name" label-for="example-input-1">
                    <b-form-input
                    id="example-input-1"
                    name="example-input-1"
                    v-model="form.name"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-1-live-feedback"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>

            <validation-provider name="Food" :rules="{ required: true }" v-slot="validationContext">
                <b-form-group id="example-input-group-2" label="Food" label-for="example-input-2">
                    <b-form-select
                    id="example-input-2"
                    name="example-input-2"
                    v-model="form.food"
                    :options="foods"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-2-live-feedback"
                    ></b-form-select>

                    <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button class="ml-2" @click="resetForm()">Reset</b-button>
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
                username: '',
                pwd: ''
            },
            activedTab: 0,
             foods: [
                { value: null, text: "Choose..." },
                { value: "apple", text: "Apple" },
                { value: "orange", text: "Orange" }
            ],
            form: {
                name: null,
                food: null
            }
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null
        },
        resetForm() {
            this.form = {
                name: null,
                food: null
            };

            this.$nextTick(() => {
                this.$refs.observer.reset()
            })
        },
        onSubmit() {
            alert("Form submitted!")
        }
    }
}
</script>

<style lang="scss" scoped>
.account--bind {
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
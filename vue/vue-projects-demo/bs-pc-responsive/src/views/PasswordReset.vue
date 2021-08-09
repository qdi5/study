<template>
  <tb-layouer>
    <div class="account--bind">
      <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label=""
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.username"
                type="text"
                placeholder="请输入新密码"
                ></b-form-input>
            </b-form-group>
            <b-form-group  id="input-group-2" label="" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.pwd"
                placeholder="请确认新密码"
                type="password"
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" block variant="primary">绑定账号</b-button>
      </b-form>
    </div>
  </tb-layouer>  
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
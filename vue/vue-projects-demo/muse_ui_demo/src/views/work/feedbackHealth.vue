<template>
  <div class="feedback-health-wrapper">
    <div v-if="!isValidateUser" class="phone-form-wrapper">
      <mu-container>
        <mu-form label-position="top" :model="phoneForm" ref="phoneForm">
          <mu-form-item :rules="phoneFormValidate.usernameRules" prop="username">
            <div slot="label">
                <span class="wk-required"></span>
                姓名：
            </div>
            <mu-text-field type="text" v-model="phoneForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item :rules="phoneFormValidate.phoneRules" prop="phone">
            <div slot="label">
                <span class="wk-required"></span>
                手机号：
            </div>
            <mu-text-field type="text" v-model="phoneForm.phone" prop="phone"></mu-text-field>
          </mu-form-item>
          <mu-form-item class="wk-submit-btn">
            <mu-button color="primary" full-width @click="handlePhoneSubmit">提交</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-container>
    </div>
    <div v-else>
      <p class="hello">
        亲爱的租客：<br/>
        为了您和全体租客的健康，请您配合公寓完成信息登记，感谢您的理解与支持！
      </p>
      <mu-container>
        <mu-form ref="form" label-position="top" :model="healthForm">
          
          <mu-form-item label="公司名称">
            <mu-text-field type="text" readonly v-model="healthForm.companyName"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="合同号">
            <mu-text-field type="text" readonly v-model="healthForm.deedsn"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
                  <div slot="label">
                  <span class="wk-required"></span>
                  合同起租时间：
              </div>
              <mu-date-input v-model="healthForm.deedsnStart" value-format="YYYY-MM-DD" no-display  action-icon="today" type="date"></mu-date-input>
          </mu-form-item>
          <mu-form-item>
                  <div slot="label">
                  <span class="wk-required"></span>
                  合同结束时间：
              </div>
              <mu-date-input v-model="healthForm.deedsnEnd"  value-format="YYYY-MM-DD" no-display  action-icon="today" type="date"></mu-date-input>
          </mu-form-item>
          <mu-form-item label="物业名称">
            <mu-text-field type="text" v-model="healthForm.houseName"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="房源编号">
            <mu-text-field type="text" v-model="healthForm.roomsn"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="姓名">
            <mu-text-field type="text" v-model="healthForm.renterName"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="手机号">
            <mu-text-field type="text" v-model="healthForm.renterPhone"></mu-text-field>
          </mu-form-item>


          <!---------------------------华丽的分割线----------------------------------->
          <mu-form-item prop="phoneFromPerson">
              <div slot="label">
                  <span class="wk-required"></span>
                  去电人：
              </div>
              <mu-text-field type="text" v-model="healthForm.phoneFromPerson" prop="phoneFromPerson"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="isAnswerThePhone">
            <div slot="label">
                <span class="wk-required"></span>
                是否已接通电话？
            </div>
            <mu-radio v-model="healthForm.isAnswerThePhone" value="1" label="是"></mu-radio>
            <mu-radio v-model="healthForm.isAnswerThePhone" value="0" label="否"></mu-radio>
            <mu-radio v-model="healthForm.isAnswerThePhone" value="2" label="再约时间"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="isBackSz">
            <div slot="label">
                <span class="wk-required"></span>
                是否已回深圳？
            </div>
            <mu-radio v-model="healthForm.isBackSz" value="true" label="是"></mu-radio>
            <mu-radio v-model="healthForm.isBackSz" value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item :rules="healthFormValidate.cityRules" prop="city">
              <div slot="label">
                  <span class="wk-required"></span>
                  目前所在城市：
              </div>
              <mu-text-field v-model="healthForm.city" prop="city"></mu-text-field>
          </mu-form-item>
          <mu-form-item :rules="healthFormValidate.backSzDateRules" prop="contractBeginDate">
                  <div slot="label">
                  <span class="wk-required"></span>
                  回深圳日期：
              </div>
              <mu-date-input v-model="healthForm.backSzDate" placeholder="请选择回深圳日期" value-format="YYYY-MM-DD" no-display  action-icon="today" type="date"></mu-date-input>
          </mu-form-item>
          <mu-form-item :rules="healthFormValidate.isGoneWhRules" prop="isGoneWh">
            <div slot="label">
                <span class="wk-required"></span>
                近期是否去过湖北？
            </div>
            <mu-radio v-model="healthForm.isGoneWh" value="true" label="是"></mu-radio>
            <mu-radio v-model="healthForm.isGoneWh" value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item :rules="healthFormValidate.withWuHanRules" prop="withWuHan">
            <div slot="label">
                <span class="wk-required"></span>
                是否与湖北人有过接触？
            </div>
            <mu-radio v-model="healthForm.withWuHan" value="true" label="是"></mu-radio>
            <mu-radio v-model="healthForm.withWuHan" value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item :rules="healthFormValidate.healthyRules" prop="healthy">
            <div slot="label">
                <span class="wk-required"></span>
                目前身体是否有不适？
            </div>
            <mu-radio v-model="healthForm.healthy" value="true" label="是"></mu-radio>
            <mu-radio v-model="healthForm.healthy" value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="healthDescription" v-if="healthForm.healthy == true">
            <div slot="label">
                <span class="wk-required"></span>
                身体不适描述：
            </div>
            <mu-text-field v-model="healthForm.healthDescription" multi-line :rows="3" full-width></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="end">
            <div slot="label">
                <span class="wk-required"></span>
                回访是否已结束？
            </div>
            <mu-radio v-model="healthForm.end" value="true" label="是"></mu-radio>
            <mu-radio v-model="healthForm.end" value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="Remarks">
            <div slot="label">
                <span class="wk-required"></span>
                备注：
            </div>
            <mu-text-field v-model="healthForm.Remarks" multi-line :rows="3" full-width></mu-text-field>
          </mu-form-item>
          <mu-form-item class="wk-submit-btn">
            <mu-button color="primary"  full-width @click="submit">提交</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-container>
    </div>
    
  </div>
</template>

<script>
const phoneRegexp =  /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
export default {
  data () {
    return {
      // 是否验证过了用户了
      isValidateUser: true,
      // 手机号输入表单
      phoneForm: {
        username: '',
        phone: ''
      },
      phoneFormValidate: {
        usernameRules: [{
          validate: val => !!val,
          message: '必须填写用户名' 
        }],
        phoneRules: [{
          validate: val => !!val,
          message: '必须填写手机号' 
        },
        {
          validate: val => phoneRegexp.test(val),
          message: '请填写正确的手机号'
        }],
      },
      // 表单字段
      healthForm: {
        // 公司名称
        companyName: '',
        // 合同号
        deedsn: '',
        // 合同起租时间
        deedsnStart: '',
        // 合同结束时间
        deedsnEnd: '',
        // 物业名称
        houseName: '',
        // 房源编号
        roomsn: '',
        // 租客姓名
        renterName: '',
        // 租客手机号
        renterPhone: '',
        
        //==============华丽的分割线=============//


        // 去电人
        phoneFromPerson: '',
        // 是否接通电话
        isAnswerThePhone: '',
        // 是否已回深圳
        isBackSz: '',
        // 目前所在城市
        city: '',
        // 回深圳日期
        backSzDate: '',
        // 是否去过武汉
        isGoneWh: '',
        // 是否与武汉人有接触
        withWuHan: '',
        // 身体是否不适
        healthy: '',
        // 身体不适描述
        healthDescription: '',
        // 回访是否结束
        end: '',
        // 备注
        Remarks: ''
      },
      healthFormValidate: {
        
        cityRules: [
          {
            validate: (val) => {
              debugger
              return !!val}, message: '必须选择城市'
          }
        ],
        backSzDateRules: [
          {
            validate: (val) => {
              debugger
              return !!val
            }, 
            message: '必须选择回深日期'
          }
        ],
        isGoneWhRules:[
          {
            validate: (val) => {
              debugger
              return val !== ''
            }, 
            message: '请选择'
          }
        ],
        withWuHanRules:[
          {
            validate: (val) => {
              debugger
              return val !== ''
            }, 
            message: '请选择'
          }
        ],
        healthyRules: [
          {
            validate: (val) => {
              debugger
              return val !== ''
            }, 
            message: '请选择'
          }
        ]


      }
    }
  },
  methods: {
    handlePhoneSubmit() {
      this.$refs.phoneForm.validate().then(result => {
        console.log('提交手机号表单：', result)
        setTimeout(() => {
          this.isValidateUser = true
        }, 1500);
      })
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
      });
    },
    // 提交反馈表单
    handleSubmitFeedback() {
      var params = {
        companyName: this.healthForm.companyName,
        deedsn: this.healthForm.deedsn,
        deedsnStart: this.healthForm.deedsnStart,
        deedsnEnd: this.healthForm.deedsnEnd,
        houseName: this.healthForm.houseName,
        roomsn: this.healthForm.roomsn,
        renterName: this.healthForm.renterName,
        renterPhone: this.healthForm.renterPhone,
        electricityUsers: this.healthForm.phoneFromPerson,
        connect: this.healthForm.isAnswerThePhone,
        comeBack: this.healthForm.isBackSz,
        currentCity: this.healthForm.city,
        whenGo: this.healthForm.backSzDate,
        goWuHan: this.healthForm.isGoneWh,
        withWuHan: this.healthForm.withWuHan,
        healthy: this.healthForm.healthy,
        healthDescription: this.healthForm.healthDescription,
        end: this.healthForm.end,
        Remarks: this.healthForm.Remarks
      }
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      };
    }
  }  
}
</script>

<style lang="less" scoped>
// 必填字段样式*
.wk-required {
  &:before {
    content: '*';
    color: red;
  }      
}
.hello {
  padding: 20px;
  background: #fffcef;
  font-size: 14px;
  color: #e6a23c;
  margin-bottom: 10px;
  margin-top: 0;
}
.wk-submit-btn /deep/ .mu-button {
  margin: 0
}
.phone-form-wrapper {
  padding-top: 46.7vw
}
</style>
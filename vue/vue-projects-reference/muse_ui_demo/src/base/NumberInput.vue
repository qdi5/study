<template>
  <mu-flex direction="row" class="number-input">
      <i class="material-icons minus handle-icon" :class="{disabled: inputValue <= min}" @click="minus">remove</i>
      <input class="core-input" @input="handleInput($event)" :value="inputValue" type="number">
      <i class="material-icons add handle-icon" :class="{disabled: inputValue >= max}" @click="add">add</i>
  </mu-flex>
</template>

<script>
/** 
 *
 * 一、数字输入框组件的优化点：
    1、在mounted钩子函数里面，将v-model传入的值过滤下。
    2、获取input里面的值时，未调用trim()
    3、未判断input里面的值是否是一个数字类型
 * 
 * 
 * 
*/
export default {
    props: {
        // 步长
        step: {
            type: Number,
            default: 1
        },
        // 最小值
        min: {
            type: Number,
            default: 1
        },
        // 最大值
        max: {
            type: Number,
            default: Infinity
        },
        // v-model将值绑定在这个value属性上
        value: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            // input绑定的值
            inputValue: null
        }
    },
	mounted() {
		if (this.min >= this.max) {
			throw new Error('min must less than max')
		}
		if (this.value > this.max) {
			this.value = this.max
		}
		if (this.value < this.min) {
			this.value = this.min
		}
		this.inputValue = this.value
	},
    methods: {
        add() {
            if (this.inputValue < this.max) {
                if (this.inputValue + this.step < this.max) {
                    this.inputValue += this.step
                } else {
                    this.inputValue = this.max
                }
            }
        },
        minus() {
            if (this.inputValue > this.min) {
                if (this.inputValue - this.step > this.min) {
                    this.inputValue -= this.step
                } else {
                    this.inputValue = this.min
                }
            }
        },
        handleInput($event) {
            let inputNewValue = $event.target.value.trim()
            this.inputValue = Number(inputNewValue)
        },
        // 只允许输入数字
        onlyNumber() {
             // 匹配非负整数 /^[1-9]\d*|0$/
             // 
             // /\d/g
        }
    },
    watch: {
		// 父组件通过v-model传递过来的值，需要同步给当前组件
        'value': function(newValue, oldValue) {
            debugger
            this.inputValue = newValue
        },
        'inputValue': function(newValue, oldValue) {
            debugger
            // 触发自定义组件上的input事件,并将最新的值传递过去,赋值给父组件上的v-model绑定的属性值
            //（假设这个属性值为temp），temp从而更新了这个组件的prop:value
            this.$emit('input', newValue)
        }
    }
}
</script>
<style lang="stylus" scoped>
.number-input {
    width: (298/2)px;
    height: (70/2)px;
    
    input {
        color: #333333;
       
    }
    .handle-icon {
        display: block;
        width: 35px;
        font-size: (70/2)px;
        height: 100%;
        background: #1e6def;
        color: #fff;
    }
    .core-input {
        flex: 1;
        height: 100%;
        width: auto;
        text-align: center;
        display: block;
        overflow: hidden;
        padding: 0 5px;
        border-left: none;
        border-right: none;
        border-top: 1px solid #1e6def;
        border-bottom: 1px solid #1e6def;
    }

    .add,
    .minus {
        border: 1px solid #1e6def;
        &.disabled {
            opacity: 0.6;
            cursor: not-allowed;
           
        }
    }
}

// 去掉type=number箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
        -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}
</style>
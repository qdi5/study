function plusReady(callback) {
    function ready() {
        callback && callback(window.plus)
    }
    if (window.plus) {
        ready();
    } else {
        document.addEventListener("plusready", function () {
            plusReady(callback)
        }, false);
    }
}

export default {
    install(Vue, options) {
        Vue.mixin({
            beforeCreate() {
                var plusReadyFn = this.$options.plusReady
                console.log(`plusReadyFn: ${plusReadyFn}`)
                if (plusReadyFn) {
                    plusReady(function (plus) {
                        debugger
                        if (typeof plusReadyFn === 'function') {
                            plusReadyFn.call(this, plus)
                        }
                    }.bind(this))
                }
            }
        })
    }
}
import h5plusReady from "common/js/h5plusReady.js";
export let h5plusMixins = {
    data() {
        return {
            plus: null
        }
    },
    beforeCreate() {
        h5plusReady(plus => {
            window.plus = plus
            this.plus = plus
        })
    }

}
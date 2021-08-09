import { debounce, throttle } from 'lodash-es'

/* 性能优化相关 */
export const performance = {
    debounce (fn, timer) {
        return debounce(fn, timer)
    },
    throttle (fn, timer) {
        return throttle(fn, timer)
    }
}

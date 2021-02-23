import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import 'uikit-css'

UIkit.use(Icons);

export default (Vue, options) => {
	// 向实例注入UIkit的对话框类方法
	UIkit.modal.labels = Object.assign(UIkit.modal.labels, { ok: '确认', cancel: '取消' });
	Vue.prototype.$ui = {
		
		alert: UIkit.modal.alert,
		// confirm: UIkit.modal.confirm,
		confirm (question, okFn, cancelFn) {
			
			UIkit.modal.confirm(question).then(okFn && okFn.bind( this ), cancelFn && cancelFn.bind( this ));
		},
		prompt: UIkit.modal.prompt
		
	}
}

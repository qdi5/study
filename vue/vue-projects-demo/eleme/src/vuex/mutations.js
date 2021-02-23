export default {
	
	vxAddCart (state, val) {
		state.vxfood.push(val);
	},
	vxMinusCart (state, food) {
		console.log(arguments);
		state.vxfood.forEach((value, index) => {
			if (value.name === food.name) {
				state.vxfood.splice(index, 1);
			}
		});
	}
};

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	strict: true,
	
	// 存储数据
	state: {
		products: [
			{
				name: '马云',
				price: 200
			},
			{
				name: '马化腾',
				price: 140
			},
			{
				name: '马冬梅',
				price: 20
			},
			{
				name: '马蓉',
				price: 10
			}
		]
	},
	
	// 获取数据
	getters: {
		saleProduct: state => {
			let saleProducts = state.products.map(product => {
				return {
					name: '**' + product.name + '**',
					price: product.price / 2
				}
			});
			return saleProducts;
		}
	},
	
	// 
	mutations: {
		reducePrice: (state, payload)=> {
			state.products.forEach(product => {
				product.price -= payload;
			});
		}
	},
	
	// 提交mutations
	// 易于调试；方便传参
	actions: {
		reducePrice: (context, payload) => {
			setTimeout(() => {
				// 触发mutations里面的函数reducePrice
				context.commit('reducePrice', payload);
			}, 3000);
		}
	}
});
export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// 登录成功之后的 token 字符串
		token: uni.getStorageSync('token') || '',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		 // 重定向的 object 对象 { openType, from }
		  redirectInfo: null
	}),
	mutations: {
		updateAddress(state, address) {
			state.address = address
			// 2. 通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
			this.commit('m_user/saveAddressToStorage')
		},
		// 1. 定义将 address 持久化存储到本地 mutations 方法
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		 // 更新用户的基本信息
		  updateUserInfo(state, userinfo) {
		    state.userinfo = userinfo
		    // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
		    this.commit('m_user/saveUserInfoToStorage')
		  },
		
		  // 将 userinfo 持久化存储到本地
		  saveUserInfoToStorage(state) {
		    uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		  },
		  updateToken(state,token){
			  state.token = token
			  this.commit('m_user/saveTokenStorage')
		  },
		  saveTokenStorage(state){
			  uni.setStorageSync('token',state.token) 
		  },
		 // 更新重定向的信息对象
		  updateRedirectInfo(state, info) {
		    state.redirectInfo = info
			console.log(this.redirectInfo);
		  }
	},
	// 数据包装器
	getters: {
		// 收货详细地址的计算属性
		addstr(state) {
			if (!state.address.provinceName) return ''

			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		},
	},
}
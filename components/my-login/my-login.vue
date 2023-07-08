<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
		<!-- 直接使用click事件，在事件中调用uni.getUserProfile({ desc:“调用该API的用途说明", success:function(res){}, fail:function(}) -->
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			// 获取微信用户的基本信息
			getUserInfo(e) {
				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')

				// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
				// console.log(e)
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			async getToken(info) {
				//获取code值
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登陆失败')
				// 准备参数对象
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}

				// 换取 token
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				const token =
					"Bearer 	eyJhbGci0iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWOiOjEyLCJpYXQi0OjE1MjUGNDIyMjMsImV4cCI6NTUyNTO40DvYyN30.g-4GtEQNPwT_Xs8Pq7Lrco_9nlHQQsBi0KZerkO-0-o"

				this.updateToken(token)
				this.navigateBack()
				// if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
				// uni.$showMsg('登录成功')
			},
			// 返回登录之前的页面
			navigateBack() {
					// 调用小程序提供的 uni.switchTab() API 进行页面的导航
					uni.switchTab({
						// 要导航到的页面地址
						url: '/pages/cart/cart',
					})
			}
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;

		// 绘制登录盒子底部的半椭圆造型
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
<template>
	<view class="page">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {

			}
		},
		methods: {

		},
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style>
.page{
	height: 100%;
}
</style>
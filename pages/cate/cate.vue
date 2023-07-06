<template>
	<view>
		<!-- <my-search :bgcolor="'pink'" :radius="3"></my-search> -->
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-view-item',index === active ? 'active' : '']"
						@click="activeChange(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate_lv2" v-for="(item2,idnex) in cateLevel2" :key="idnex">
					<view class="cate_lv2_title">/ {{item2.cat_name}} /</view>
					<!-- 三级分类 -->
					<view class="cate_lv3_list">
						<view class="cate-lv3-item" v-for="(item3,index) in item2.children" :key="index"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				cateList: [],
				active: 0,
				cateLevel2: [],
				scrollTop: 0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync() //获取设备的信息
			this.wh = sysInfo.windowHeight - 50 //设置高度达到自适应的效果
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			activeChange(index) {
				this.active = index
				this.cateLevel2 = this.cateList[index].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 240rpx;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #fff;
					position: relative;

					&::before {
						content: " ";
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.cate_lv2_title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate_lv3_list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>
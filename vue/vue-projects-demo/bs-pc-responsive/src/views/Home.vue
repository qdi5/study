<template>
  <div>
    <div class="header">
      <tb-header></tb-header>
     <!--  <el-carousel height="560px" class="carousel--adjust">
        <el-carousel-item v-for="item in 3" :key="item">
          <img :src="require(`@/assets/imgs/${item}.png`)" alt="">
        </el-carousel-item>
      </el-carousel> -->
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="560"
        style="text-shadow: 1px 1px 2px #333;"
      >
      <b-carousel-slide
        v-for="item in 3" :key="item"
        :img-src="require(`@/assets/imgs/${item}.png`)"
      ></b-carousel-slide>
    </b-carousel>
    </div>
    <main>
      <div class="w-100 tbsmart-wrapper">
        <b-container align-h="between">
          <b-row>
            <b-col md="5">
              <software-brief software-name="TBSmart">
                  TBSmart旨在帮助投资者跨越程序化编程技术等门槛，便捷实现智能化主观交易，是主观手动投资者的量化利器！
              </software-brief>
            </b-col>
            <b-col md="7" class="sm-mt">
              <!-- <el-carousel indicator-position="none" class="carousel__card--large" @change="carouselChange" :interval="2000" :type="carouselType">
                <el-carousel-item key="item10">
                  <img :src="require(`@/assets/imgs/8.png`)" alt="">
                </el-carousel-item>
                <el-carousel-item key="item11">
                  <img :src="require(`@/assets/imgs/7.png`)" alt="">
                </el-carousel-item>
                <el-carousel-item key="item12">
                  <img :src="require(`@/assets/imgs/9.png`)" alt="">
                </el-carousel-item>
              </el-carousel> -->
                        <div id="certify">
                <swiper 
                  ref="mySwiper"
                  :options="swiperOptions"
                >
                    <swiper-slide>
                        <img :src="require(`@/assets/imgs/8.png`)" alt="">
                    </swiper-slide>
                    <swiper-slide>
                        <img :src="require(`@/assets/imgs/7.png`)" alt="">
                    </swiper-slide>
                    <swiper-slide>
                        <img :src="require(`@/assets/imgs/9.png`)" alt="">
                    </swiper-slide>
                </swiper>
            </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <tb-triangle direction="left"></tb-triangle>
      <b-container>
        <b-row align-h="between">
          <b-col md="7">
            <el-carousel indicator-position="none" class="carousel__card--large" :interval="2000" :type="carouselType" height="671px">
              <el-carousel-item key="item10">
                <img :src="require(`@/assets/imgs/10.png`)" alt="">
              </el-carousel-item>
              <el-carousel-item key="item11">
                <img :src="require(`@/assets/imgs/11.png`)" alt="">
              </el-carousel-item>
              <el-carousel-item key="item12">
                <img :src="require(`@/assets/imgs/12.png`)" alt="">
              </el-carousel-item>
            </el-carousel>
          </b-col>
          <b-col md="5" class="sm-mt">
            <software-brief :is-text-right="true">
                实现手机端看盘，同时赋予了在线监控功能，支持与TB软件客户端同步连接。二者搭配使用，交易路途上能助您“一臂之力”！
            </software-brief>
          </b-col>
        </b-row>
      </b-container>
      <tb-triangle direction="right"></tb-triangle>
      <div class="w-100 tbsmart-wrapper">
        <b-container>
          <b-row align-h="between">
            <b-col md="5">
              <software-brief software-name="交易开拓者 · TBQuant">
                  TBQuant是一款支持多市场的专业金融量化分析软件，是交易开拓者十年磨一剑匠心打造的又一利器。
              </software-brief>
            </b-col>
            <b-col md="7" class="sm-mt">
              <el-carousel indicator-position="none" class="carousel__card--large" :interval="2000" :type="carouselType" height="418px">
                <el-carousel-item key="item10">
                  <img :src="require(`@/assets/imgs/5.png`)" alt="">
                </el-carousel-item>
                <el-carousel-item key="item11">
                  <img :src="require(`@/assets/imgs/6.png`)" alt="">
                </el-carousel-item>
                <el-carousel-item key="item12">
                  <img :src="require(`@/assets/imgs/4.png`)" alt="">
                </el-carousel-item>
              </el-carousel>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="w-100">
        <b-container>
          <b-row>
            <b-col cols="12">
              <div class="tbprod-special text-center">
                <div class="tbprod-special-title">特色功能 </div>
                <div class="tbprod-special-text">支持证券、期货、外盘市场的专业金融量化分析</div>
                <div class="tbprod-special-text">准确、快速、稳定的实时云行情和完整的全市场历史数据</div>
              </div>
            </b-col>
          </b-row>
          <b-row mt30>
            <b-col cols="12">
              <b-tabs v-model="tabsActive" fill class="tabs--diy">
                <b-tab active title-link-class="tab__title--bgimg">
                  <template #title>
                    <div class="tab__title--diy">
                      TBQuant
                    </div>
                  </template>
                  <div class="tbprod-box" data-index="tbquant">
                    <div class="tbprod-dfl">
                      <b-row align-h="between">
                        <b-col class="row__col--diy" :class="{active: activeIndex === 1}" @click="activeIndex = 1">
                          <div class="tbprod-item"  data-index="1">
                            <div class="tbprod-item-b">
                              <img class="tbprod-item-sel" :src="activeIndex === 1 ? tb01Img : tb01Img2 " alt="">
                              <div class="tbprod-item-name" @click="changeImg">强大的TB语言</div>
                            </div>
                          </div>
                        </b-col>
                        <b-col class="row__col--diy" :class="{active: activeIndex === 2}" @click="activeIndex = 2">
                          <div class="tbprod-item"  data-index="2">
                            <div class="tbprod-item-b">
                              <img class="tbprod-item-sel" :src="activeIndex === 2 ? tb02Img : tb02Img2" alt="">
                              <div class="tbprod-item-name">丰富的基础数据</div>
                            </div>
                          </div>
                        </b-col>
                        <b-col class="row__col--diy" :class="{active: activeIndex === 3}" @click="activeIndex = 3">
                           <div class="tbprod-item"  data-index="3">
                              <div class="tbprod-item-b">
                                <img class="tbprod-item-sel" :src="activeIndex === 3 ? tb03Img : tb03Img2" alt="">
                                <div class="tbprod-item-name">详尽的策略分析报告</div>
                              </div>
                           </div>
                        </b-col>
                        <b-col class="row__col--diy" :class="{active: activeIndex === 4}" @click="activeIndex = 4">
                             <div class="tbprod-item"   data-index="4">
                              <div class="tbprod-item-b">
                                <img class="tbprod-item-sel" :src="activeIndex === 4 ? tb04Img : tb04Img2" alt="">
                                <div class="tbprod-item-name">强大策略分析和运行</div>
                              </div>
                            </div>
                        </b-col>
                        <b-col class="row__col--diy" :class="{active: activeIndex === 5}" @click="activeIndex = 5">
                            <div class="tbprod-item" data-index="5">
                              <div class="tbprod-item-b">
                                <img class="tbprod-item-sel" :src="activeIndex === 5 ? tb05Img : tb05Img2" alt="">
                                <div class="tbprod-item-name">强大的策略运行辅助功能</div>
                              </div>
                            </div>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </b-tab>
                <b-tab title-link-class="tab__title--bgimg">
                  <template #title>
                    <div class="tab__title--diy">
                      TBSmart
                    </div>
                  </template>
                  <div class="tbprod-box" data-index="tbquant">
                    <div class="tbprod-dfl">
                      <b-row align-h="between">
                        <b-col class="row__col--diy" :class="{active: activeIndex2 === 6}" @click="activeIndex2 = 6">
                          <div class="tbprod-item"  data-index="1">
                            <div class="tbprod-item-b">
                              <img class="tbprod-item-sel" :src="activeIndex2 === 6 ? tb06Img : tb06Img2 " alt="">
                              <div class="tbprod-item-name" @click="changeImg">投资分析</div>
                            </div>
                          </div>
                        </b-col>
                        <b-col class="row__col--diy" :class="{active: activeIndex2 === 7}" @click="activeIndex2 = 7">
                          <div class="tbprod-item"  data-index="2">
                            <div class="tbprod-item-b">
                              <img class="tbprod-item-sel" :src="activeIndex2 === 7 ? tb07Img : tb07Img2" alt="">
                              <div class="tbprod-item-name">行情报价</div>
                            </div>
                          </div>
                        </b-col>
                        <b-col class="row__col--diy" :class="{active: activeIndex2 === 8}" @click="activeIndex2 = 8">
                           <div class="tbprod-item"  data-index="3">
                              <div class="tbprod-item-b">
                                <img class="tbprod-item-sel" :src="activeIndex2 === 8 ? tb08Img : tb08Img2" alt="">
                                <div class="tbprod-item-name">手工下单</div>
                              </div>
                           </div>
                        </b-col>
                        <b-col class="row__col--diy" :class="{active: activeIndex2 === 9}" @click="activeIndex2 = 9">
                             <div class="tbprod-item"   data-index="4">
                              <div class="tbprod-item-b">
                                <img class="tbprod-item-sel" :src="activeIndex2 === 9 ? tb09Img : tb09Img2" alt="">
                                <div class="tbprod-item-name">账户透视</div>
                              </div>
                            </div>
                        </b-col>
                        <b-col class="row__col--diy" :class="{active: activeIndex2 === 10}" @click="activeIndex2 = 10">
                            <div class="tbprod-item" data-index="5">
                              <div class="tbprod-item-b">
                                <img class="tbprod-item-sel" :src="activeIndex2 === 10 ? tb10Img : tb10Img2" alt="">
                                <div class="tbprod-item-name">模式下单</div>
                              </div>
                            </div>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </b-tab>
                
              </b-tabs>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="w-100 container-wrapper">
         <b-container>
          <div class="tbprod-cnt">
          <div class="tbprod-cnt-box main-w">
            <ul class="tbprod-cnt-list" data-index="1" v-show="tabsActive===0 && activeIndex === 1">
              <li class="tbprod-cnt-li">适合数据时间序列的多种数据类型</li>
              <li class="tbprod-cnt-li">跨周期全市场数据叠加、序列基本面数据调用、便捷的截面数据运算</li>
              <li class="tbprod-cnt-li">支持一维数组、二维数组、矩阵运算、多元线性回归求解等数据计算</li>
              <li class="tbprod-cnt-li">各类期权函数</li>
              <li class="tbprod-cnt-li">事件驱动运算，全面支持基于高频数据的策略与算法交易</li>
            </ul>
            <ul class="tbprod-cnt-list tb-hide" data-index="2" v-show="tabsActive===0 && activeIndex === 2">
              <li class="tbprod-cnt-li">期货除权换月</li>
              <li class="tbprod-cnt-li">股票的财务数据</li>
              <li class="tbprod-cnt-li">行业板块数据</li>
              <li class="tbprod-cnt-li">自定义基础数据</li>
            </ul>
            <ul class="tbprod-cnt-list tb-hide" data-index="3" v-show="tabsActive===0 &&activeIndex === 3">
              <li class="tbprod-cnt-li">策略指标</li>
              <li class="tbprod-cnt-li">阶段总结</li>
              <li class="tbprod-cnt-li">图表分析</li>
              <li class="tbprod-cnt-li">交易记录</li>
              <li class="tbprod-cnt-li">资产变化</li>
            </ul>
            <ul class="tbprod-cnt-list tb-hide" data-index="4" v-show="tabsActive===0 &&activeIndex === 4">
              <li class="tbprod-cnt-li">支持多品种多周期叠加的策略单元</li>
              <li class="tbprod-cnt-li">支持递进优化、定时优化、批量优化等</li>
              <li class="tbprod-cnt-li">支持多账户自动运行</li>
            </ul>
            <ul class="tbprod-cnt-list tb-hide" data-index="5" v-show="tabsActive===0 &&activeIndex === 5">
              <li class="tbprod-cnt-li">头寸监控：从账户分类商品视角对头寸实时监控</li>
              <li class="tbprod-cnt-li">策略监控：从策略角度对实盘运行进行实时监控</li>
              <li class="tbprod-cnt-li">模式监控：对运行中的模式集中监控管理</li>
              <li class="tbprod-cnt-li">高频代理：算法交易实现委托单的智能处理</li>
            </ul>
            <ul class="tbprod-cnt-list tb-hide" data-index="6" v-show="tabsActive===1 &&activeIndex2 === 6">
              <li class="tbprod-cnt-li">让用户全面了解实盘交易的执行结果，为后继交易决策提供依据</li>
              <li class="tbprod-cnt-li">实现程序化交易策略的分析</li>
              <li class="tbprod-cnt-li">支持对本地账户记录、期货保证金监控中心文件、股票柜台成交数据的导入分析</li>
              <li class="tbprod-cnt-li">支持复盘功能</li>
            </ul>
            <ul class="tbprod-cnt-list tb-hide" data-index="7" v-show="tabsActive===1 &&activeIndex2 === 7">
              <li class="tbprod-cnt-li">拥有强大的行情订阅和检索功能</li>
              <li class="tbprod-cnt-li">可以根据需要定制或修改自定的行情报价板块</li>
              <li class="tbprod-cnt-li">支持整个自定义行情设置的导入导出的功能</li>
              <li class="tbprod-cnt-li">功能强大操作简单的查看工具——多级排序</li>
              <li class="tbprod-cnt-li">行情报价显示持仓和盈亏/指标计算/板块计算/公式选股/阶段统计等</li>
            </ul>
            <ul class="tbprod-cnt-list tb-hide" data-index="8" v-show="tabsActive===1 &&activeIndex2 === 8">
              <div class="tbprod-cnt-lit">多种下单工具，满足各类投资人群的交易需要：</div>
              <div class="tbprod-cnt-fl">
                <li class="tbprod-cnt-li">交易师</li>
                <li class="tbprod-cnt-li">合约调仓</li>
                <li class="tbprod-cnt-li">账户调仓</li>
                <li class="tbprod-cnt-li">快速下单</li>
              </div>
              <div class="tbprod-cnt-fl tbprod-cnt-mgl">
                <li class="tbprod-cnt-li">批量下单</li>
                <li class="tbprod-cnt-li">盘口下单</li>
                <li class="tbprod-cnt-li">超级下单</li>
              </div>
            </ul>
            <ul class="tbprod-cnt-list tb-hide" data-index="9" v-show="tabsActive===1 &&activeIndex2 === 9">
              <li class="tbprod-cnt-li">支持历史截面查询和阶段查询，可查询某段时间的委托记录与交易记录</li>
              <li class="tbprod-cnt-li">可以同时查看账户的账户信息、委托/成交列表、分类持仓列表</li>
              <li class="tbprod-cnt-li">过滤商品：根据持仓进行筛选委托成交的功能</li>
            </ul>
            <ul class="tbprod-cnt-list tb-hide" data-index="10" v-show="tabsActive===1 &&activeIndex2 === 10">
              <li class="tbprod-cnt-li">支持四周规则跟踪止盈模式</li>
              <li class="tbprod-cnt-li">支持固定止损模式</li>
              <li class="tbprod-cnt-li">支持布林进场、布林出场模式</li>
              <li class="tbprod-cnt-li">支持跟踪止盈模式</li>
              <li class="tbprod-cnt-li">支持委托追价、委托改价模式等</li>
            </ul>
          </div>
        </div>
        </b-container>
      </div>
     <!--  <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        img-height="560"
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
    >
      
      <b-carousel-slide
        :img-src="require(`@/assets/imgs/5.png`)"
      ></b-carousel-slide>
      <b-carousel-slide
        :img-src="require(`@/assets/imgs/4.png`)"
      ></b-carousel-slide>
      <b-carousel-slide
        :img-src="require(`@/assets/imgs/6.png`)"
      ></b-carousel-slide>
      </b-carousel> -->
    </main>
    <tb-footer></tb-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { performance } from '@/common/js'
import SoftwareBrief from '@/components/home'
export default {
    components: {
      SoftwareBrief
    },
    data() {
      return {
        dialogVisible: false,
        slide: 0,
        sliding: null,
        tb01Img2: require('@/assets/imgs/tabs/icon_01_2.png'),
        tb01Img: require('@/assets/imgs/tabs/icon_01.png'),
        tb02Img2: require('@/assets/imgs/tabs/icon_02_2.png'),
        tb02Img: require('@/assets/imgs/tabs/icon_02.png'),
        tb03Img2: require('@/assets/imgs/tabs/icon_03_2.png'),
        tb03Img: require('@/assets/imgs/tabs/icon_03.png'),
        tb04Img2: require('@/assets/imgs/tabs/icon_04_2.png'),
        tb04Img: require('@/assets/imgs/tabs/icon_04.png'),
        tb05Img2: require('@/assets/imgs/tabs/icon_05_2.png'),
        tb05Img: require('@/assets/imgs/tabs/icon_05.png'),
        tb06Img2: require('@/assets/imgs/tabs/icon_06_2.png'),
        tb06Img: require('@/assets/imgs/tabs/icon_06.png'),
        tb07Img2: require('@/assets/imgs/tabs/icon_07_2.png'),
        tb07Img: require('@/assets/imgs/tabs/icon_07.png'),
        tb08Img2: require('@/assets/imgs/tabs/icon_08_2.png'),
        tb08Img: require('@/assets/imgs/tabs/icon_08.png'),
        tb09Img2: require('@/assets/imgs/tabs/icon_09_2.png'),
        tb09Img: require('@/assets/imgs/tabs/icon_09.png'),
        tb10Img2: require('@/assets/imgs/tabs/icon_10_2.png'),
        tb10Img: require('@/assets/imgs/tabs/icon_10.png'),
        activeIndex: 1,
        activeIndex2: 6,
        tabsActive: 0,
        carouselType: 'card',
        swiperOptions: {
            /**
             * 开启这个参数来计算slide的progress，
             * progress值和swiper或slide的位置比例相关联
            */
            watchSlidesProgress: true,
            /** 
             * 
             * 设置slider容器能够同时显示的slides数量（carousel模式） 
             * loop模式下如果设置为'auto'还需要设置另外一个参数"loopedSlides"
             * 
             * */
            slidesPerView: 'auto',
            // 设定为true时，active slide会居中，而不是默认状态下的居左。
            centeredSlides: true,
            /* 
                loop模式：会在原本slide前后复制若干个slide（默认一个）并在合适的时候切换，
                让Swiper看起来是循环的。
            */
            loop: true,        
            autoplay:true,
            /**
             * 在loop模式下使用slidesPerview: 'auto',
             * 还需使用该参数设置所要用到的loop个数（一般设置大于可视slide个数2个即可）
             *  */        
            loopedSlides: 5,        
            autoplay: true,        
            on: {
                /**
                 * 回调函数，当Swiper的progress被改变时执行。
                 * 接受swiper实例和此swiper的progress作为参数（返回值范围一般在0-1）
                 */
                progress: function(progress) {
                    console.log(`progress:${ progress }`)
                    for (let i = 0; i < this.slides.length; i++) {
                        var slide = this.slides.eq(i);
                        /**
                         * 当前轮播的item的progress 
                         * 对于slide的progress属性，活动块slide的progress为0，其他的依次减1。
                         * 例：如果一共有6个slide，活动块slide时第三个，那么从第一个到第六个
                         * 的progress属性分别是：2、1、0、-1、-2、-3
                         * */
                        var slideProgress = this.slides[i].progress;
                        var modify = 1;
                        // 左边或右边从第二个item开始
                        if (Math.abs(slideProgress) > 1) {
                                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1; // modify越大移动的距离越远                
                        }
                        // 位移                    
                        var translate = slideProgress * modify * 260 + 'px';
                        // 缩放
                        var scale = 1 - Math.abs(slideProgress) / 5; // 这里的5指的是loopedSlides？？？  
                        // 层级
                        var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                        slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                        slide.css('zIndex', zIndex);                    
                        slide.css('opacity', 1);
                        // 隐藏progress绝对值大于3的item                    
                        if (Math.abs(slideProgress) > 3) {                        
                            slide.css('opacity', 0);                    
                        }
                    }            
                },
                /* 
                    回调函数，每当设置Swiper开始过渡动画时执行。
                    transition获取到的是Swiper的speed
                    （切换速度，即slider自动滑动开始到结束的时间（单位ms），
                    也是触摸滑动时释放至贴合的时间））
                */         
                setTransition: function(transition) {
                    for (var i = 0; i < this.slides.length; i++) {
                        var slide = this.slides.eq(i);
                        slide.transition(transition);
                    }            
                }
            }
        }
      };
    },
    
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      changeImg () {
        this.tb01Img = require('@/assets/imgs/tabs/icon_01_2.png')
      },
      carouselChange (newIndex, oldIndex) {

      }
    },
    mounted () {
      const wrapHandle = performance.debounce(handleWinresize, 500)
      window.addEventListener('resize', wrapHandle, false)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', wrapHandle, false)
      })
      const _this = this
      function handleWinresize () {
        const body = document.documentElement || document.body
        const viewport = body.clientWidth
        if (viewport <= 576) {
          console.log('更改卡片类型')
          _this.carouselType = ''
        } else {
          _this.carouselType = 'card'
        }
      }
      handleWinresize()
    }
    
  }
</script>
<style lang="scss" scoped>
#carousel-1 {
  ::v-deep ol {
    /** 避免轮播指示器太高 */
    @media screen and (max-width: $sm-bks) {
      margin-bottom: 0;
    }
  }
}
.tbsmart-wrapper {
  padding-top: 30px;
  padding-bottom: 56px;
  background: #d2eaff;
}
.carousel--adjust ::v-deep img {
  display: block;
  height: 100%;
  @media screen and (max-width: $sm-bks) {
    height: auto;
  }
}
.el-carousel__item ::v-deep h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  ::v-deep .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  ::v-deep .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .carousel__card--large {
    img {
      display: block;
      height: 100%;
    }
  }
  .tbprod-item-b {
    text-align: center;
    :hover {
      opacity: 0.7;
    }
  }
  .tbprod-item {
    position: relative;
    padding: 20px 0;
    .tbprod-item-b {
      padding: 20px;
      border-radius: 8px;
      color: #000;
      text-align: center;
      cursor: pointer;
      @media screen and (max-width: $sm-bks) {
        padding: 4px;
      }
    }
  }
  .tbprod-item-name {
    margin-top: 15px;
    font-size: 22px;
    line-height: 32px;
    font-weight: bold;
    @media screen and (max-width: $md-bks) {
      font-size: 14px;
    }

}
.row__col--diy {
  &.active {
     &:before {
        content: '';
        font-size: 0;
        line-height: 0;
        border-width: 10px;
        border-color: #6775a0;
        border-style: dashed;
        border-top-width: 0;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
        position: absolute;
        left: 50%;
        bottom: 0;
        margin-left: -10px;
      }
      .tbprod-item-b {
        background-color: #6775a0;
        color: #fff;
        &:hover {
          opacity: 1;
        }
      }
  }
}
.container-wrapper, .tbprod-cnt {
    background-color: #6775a0;
}
.tbprod-cnt-list {
    padding: 40px 0;
    min-height: 320px;
}
.tbprod-cnt-lit, .tbprod-cnt-li {
    font-size: 20px;
    line-height: 48px;
    color: #fff;
}
.tbprod-cnt-li {
    padding-left: 30px;
    position: relative;
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -4px;
    }
}
 .tab__title--diy {
    color: #999;
    font-size: 36px;
    &:hover {
      color: #026ab8;
    }
    @media screen and (max-width: $sm-bks) {
      font-size: 26px;
    }
}
::v-deep .tab__title--bgimg {
  position: relative;
  &.active {
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -16px;
        height: 21px;
        width: 100%;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAAVCAYAAACaP5BHAAACH0lEQVR4nO3dvWoUURiH8Wc32wh7B5ILsImfhUWIWtl5AaaySKOgopWNYJVCSVCxsPEirLSSqCEWmiKV303wEtwYspmRk30LEfzck/lYnh8sy7Az57ycgeXPO7OznbIskaRxdM4t7h3dnT5Gsbl+vHtw5jXdXnvWtBhSfNk4AbxJm+XjG/XXJKnVup4+SZktsPOtXWs6qneh/kIkTQoDlqRsis31PjBfDtsVsMrhdnqbB/r1VyNpEhiwJOV0fi+k7Gy3a1FHHax+hCxJGltv6tJTV1FSLqPLbC3rYP1Qb6r/od+LksbV6V584l3ukiRJGXmJUJIkKTMDliRJUmYGLEmSpMzSkwA7LqqkChwCHgEna1zsV8AF4K0nXNJ+8knukrL5i1/fTQHXgFvAgQpXfgu4CSwDu7/aaffB2QpLkjTJvEQoqUop3NwGjgJrFc27FvPd+V24kqScDFiS6vAOmAWuR3dpP2zF+LMxnyRVxoAlqS4FsAQcAVYz17Aa4y7FPJJUKQOWpLq9B+bi3qzBmLUMYpy5GFeSamHAktQERdyAnrpOL/6znpdx/LJdK0l1M2BJapIPwGng6j90swax/6k4XpJqZ8CS1DSp+3QXmAGe/6G29Pnh2N+ulaTGMGBJaqpPwBngMvD1pxrT9pX4/KNnUFLTGLAkNVnqSt2PbtZK1LkSXat7dq0kNVXPMyOpBT5Htyq9ngH+BYWk5gK+A4C3ac+8N8/ZAAAAAElFTkSuQmCC) no-repeat;
        background-position: center bottom;
      }
       .tab__title--diy {
        color: #026ab8;
      }
   
  }
}
.tabs--diy {
  ::v-deep  {
    .nav-tabs {
      border-bottom: 4px solid #dee2e6;
      @media screen and (max-width: $md-bks) {
        flex-wrap: nowrap;  
      }
    }
    .nav-tabs .nav-link {
      border: none;
      border-radius: 0;
      &:hover, &:focus {
        border: none;
        border-radius: 0;
      }
    }
    .nav-tabs .nav-item {
      margin-bottom: 0;
    }
    .tbprod-dfl {
      .row {
        flex-wrap: nowrap;
        .col:not(:last-child) {
          padding-right: 0
        }
        .col:not(:first-child) {
          padding-left: 0
        }
      }    
    }
  }
}

.tbprod-special {
    margin-top: 80px;
}
.tbprod-special-title {
    font-size: 36px;
    font-weight: bold;
    line-height: 48px;
    color: #026ab8;
}
.tbprod-special-text {
    font-size: 18px;
    font-weight: bold;
    line-height: 32px;
    color: #999;
    @media screen and (max-width: $sm-bks) {
      font-size: 16px;
    }
}
.sm-mt {
  @media screen and (max-width: $md-bks) {
    padding-top: 68px;
  }
}


</style>
<style lang="scss">
#certify {
    position: relative;
    width: 100%;
    margin: 0 auto;
}
#certify img{width: 100%;}
#certify .swiper-container {
    padding-bottom: 60px
}

#certify .swiper-slide {
    width: 566px;
    background: #fff;
    box-shadow: 0 8px 30px #ddd;
    @media screen and (max-width: $sm-bks) {
        width: 300px;            
    }
}

#certify .swiper-slide img {
    display: block
}

#certify .swiper-slide p {
    line-height: 98px;
    padding-top: 0;
    text-align: center;
    color: #636363;
    font-size: 1.1em;
    margin: 0
}

#certify .swiper-pagination {
    width: 100%;
    bottom: 20px
}

#certify .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 5px;
    border: 3px solid #fff;
    background-color: #d5d5d5;
    width: 10px;
    height: 10px;
    opacity: 1
}

#certify .swiper-pagination-bullets .swiper-pagination-bullet-active {
    border: 3px solid #00aadc;
    background-color: #fff
}


#certify .swiper-slide p{
    position: absolute;width: 100%;line-height: 30px;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;
    bottom: 0px; color: #fff; background-color: rgba(0,0,0,0.5);
}
  
</style>

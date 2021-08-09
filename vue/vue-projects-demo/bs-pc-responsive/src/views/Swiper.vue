<template>
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
</template>

<script>
export default {
    name: 'SwiperCarousel',
    data () {
        return {
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
                            if (Math.abs(slideProgress) > 1) {                        
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
        }
    }
}
</script>

<style lang="scss">
@charset "utf-8";

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
    width: 650px;
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
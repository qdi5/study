<script>
import { range } from '../utils/format/number';
import { preventDefault } from '../utils/dom/event';
import { PopupMixin } from '../mixins/popup';
import { TouchMixin } from '../mixins/touch';
import { CloseOnPopstateMixin } from '../mixins/close-on-popstate';
import Image from '../image';
import Loading from '../loading';
import Swipe from '../swipe';
import SwipeItem from '../swipe-item';
import './style/less.js'

function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}

export default {
  name: 'ImagePreview',
  mixins: [PopupMixin, TouchMixin, CloseOnPopstateMixin],
  props: {
    // 自定义类名
    className: null,
    // 是否开启图片懒加载
    lazyLoad: Boolean,
	// 是否开启异步关闭
    asyncClose: Boolean,
	// 是否显示轮播指示器
    showIndicators: Boolean,
	// 需要预览的图片URL数组
    images: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
	// 是否开启循环播放
    loop: {
      type: Boolean,
      default: true
    },
	// 动画时长（ms）
    swipeDuration: {
      type: Number,
      default: 500
    },
	// 
    overlay: {
      type: Boolean,
      default: true
    },
	// 是否显示页码
    showIndex: {
      type: Boolean,
      default: true
    },
	// 图片预览起始位置索引
    startPosition: {
      type: Number,
      default: 0
    },
	// 手势缩放时，最小缩放比例
    minZoom: {
      type: Number,
      default: 1 / 3
    },
	// 手势缩放时，最大缩放比例
    maxZoom: {
      type: Number,
      default: 3
    },
    overlayClass: {
      type: String,
      default: 'overlay'
    }
  },
  data: function data() {
    return {
      scale: 1,
      moveX: 0,
      moveY: 0,
      active: 0,
      moving: false,
      zooming: false,
      doubleClickTimer: null
    };
  },
  computed: {
    imageStyle: function imageStyle() {
      var scale = this.scale;
      var style = {
        transitionDuration: this.zooming || this.moving ? '0s' : '.3s'
      };

      if (scale !== 1) {
        style.transform = "scale3d(" + scale + ", " + scale + ", 1) translate(" + this.moveX / scale + "px, " + this.moveY / scale + "px)";
      }

      return style;
    }
  },
  watch: {
	// 监听v-model绑定的值  
    value: function value() {
      this.setActive(this.startPosition);
    },
    startPosition: function startPosition(active) {
      this.setActive(active);
    }
  },
  methods: {
    onWrapperTouchStart: function onWrapperTouchStart() {
      this.touchStartTime = new Date();
    },
    onWrapperTouchEnd: function onWrapperTouchEnd(event) {
      var _this = this;

      preventDefault(event);
      var deltaTime = new Date() - this.touchStartTime;

      var _ref = this.$refs.swipe || {},
          _ref$offsetX = _ref.offsetX,
          offsetX = _ref$offsetX === void 0 ? 0 : _ref$offsetX,
          _ref$offsetY = _ref.offsetY,
          offsetY = _ref$offsetY === void 0 ? 0 : _ref$offsetY; // prevent long tap to close component


      if (deltaTime < 300 && offsetX < 10 && offsetY < 10) {
        if (!this.doubleClickTimer) {
          this.doubleClickTimer = setTimeout(function () {
            var index = _this.active;

            _this.$emit('close', {
              index: index,
              url: _this.images[index]
            });

            if (!_this.asyncClose) {
              _this.$emit('input', false);
            }

            _this.doubleClickTimer = null;
          }, 300);
        } else {
          clearTimeout(this.doubleClickTimer);
          this.doubleClickTimer = null;
          this.toggleScale();
        }
      }
    },
    startMove: function startMove(event) {
      var image = event.currentTarget;
      var rect = image.getBoundingClientRect();
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;
      this.touchStart(event);
      this.moving = true;
      this.startMoveX = this.moveX;
      this.startMoveY = this.moveY;
      this.maxMoveX = Math.max(0, (rect.width - winWidth) / 2);
      this.maxMoveY = Math.max(0, (rect.height - winHeight) / 2);
    },
    startZoom: function startZoom(event) {
      this.moving = false;
      this.zooming = true;
      this.startScale = this.scale;
      this.startDistance = getDistance(event.touches);
    },
    onImageTouchStart: function onImageTouchStart(event) {
      var touches = event.touches;

      var _ref2 = this.$refs.swipe || {},
          _ref2$offsetX = _ref2.offsetX,
          offsetX = _ref2$offsetX === void 0 ? 0 : _ref2$offsetX;

      if (touches.length === 1 && this.scale !== 1) {
        this.startMove(event);
      }
      /* istanbul ignore else */
      else if (touches.length === 2 && !offsetX) {
          this.startZoom(event);
        }
    },
    onImageTouchMove: function onImageTouchMove(event) {
      var touches = event.touches;

      if (this.moving || this.zooming) {
        preventDefault(event, true);
      }

      if (this.moving) {
        this.touchMove(event);
        var moveX = this.deltaX + this.startMoveX;
        var moveY = this.deltaY + this.startMoveY;
        this.moveX = range(moveX, -this.maxMoveX, this.maxMoveX);
        this.moveY = range(moveY, -this.maxMoveY, this.maxMoveY);
      }

      if (this.zooming && touches.length === 2) {
        var distance = getDistance(touches);
        var scale = this.startScale * distance / this.startDistance;
        this.scale = range(scale, this.minZoom, this.maxZoom);
      }
    },
    onImageTouchEnd: function onImageTouchEnd(event) {
      /* istanbul ignore else */
      if (this.moving || this.zooming) {
        var stopPropagation = true;

        if (this.moving && this.startMoveX === this.moveX && this.startMoveY === this.moveY) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          this.moving = false;
          this.zooming = false;
          this.startMoveX = 0;
          this.startMoveY = 0;
          this.startScale = 1;

          if (this.scale < 1) {
            this.resetScale();
          }
        }

        if (stopPropagation) {
          preventDefault(event, true);
        }
      }
    },
	// 设置激活的图片索引
    setActive: function setActive(active) {
      this.resetScale();

      if (active !== this.active) {
        this.active = active;
        this.$emit('change', active);
      }
    },
	// 重置缩放
    resetScale: function resetScale() {
      this.scale = 1;
      this.moveX = 0;
      this.moveY = 0;
    },
	// 切换缩放
    toggleScale: function toggleScale() {
      var scale = this.scale > 1 ? 1 : 2;
      this.scale = scale;
      this.moveX = 0;
      this.moveY = 0;
    },
    // 展示生成的索引
	genIndex: function genIndex() {
      var h = this.$createElement;

      if (this.showIndex) {
        return h("div", {
          "class": 'index'
        }, [this.slots('index') || this.active + 1 + " / " + this.images.length]);
      }
    },
    genCover: function genCover() {
      var h = this.$createElement;
      var cover = this.slots('cover');

      if (cover) {
        return h("div", {
          "class": 'cover'
        }, [cover]);
      }
    },
    genImages: function genImages() {
      var _this2 = this;

      var h = this.$createElement;
      var imageSlots = {
        loading: function loading() {
		  // 在渲染函数中，调用已有的Loading组件
          return h(Loading, {
            "attrs": {
              "type": "spinner"
            }
          });
        }
      };
	  // 在渲染函数中，调用已有的Swipe组件
      return h(Swipe, {
        "ref": "swipe",
        "attrs": {
          "loop": this.loop,
          "duration": this.swipeDuration,
          "indicatorColor": "white",
          "initialSwipe": this.startPosition,
          "showIndicators": this.showIndicators
        },
        "class": 'swipe',
        "on": {
          "change": this.setActive
        },
        "nativeOn": {
          "touchstart": this.onWrapperTouchStart,
          "touchMove": preventDefault,
          "touchend": this.onWrapperTouchEnd,
          "touchcancel": this.onWrapperTouchEnd
        }
      }, [this.images.map(function (image, index) {
		// 在渲染函数中，调用已有的SwipeItem组件，并在SwipeItem组件里面，调用已有的Image组件  
        return h(SwipeItem, [h(Image, {
          "attrs": {
            "src": image,
            "fit": "contain",
            "lazyLoad": _this2.lazyLoad
          },
          "class": 'image',
          "scopedSlots": imageSlots,
          "style": index === _this2.active ? _this2.imageStyle : null,
          "nativeOn": {
            "touchstart": _this2.onImageTouchStart,
            "touchmove": _this2.onImageTouchMove,
            "touchend": _this2.onImageTouchEnd,
            "touchcancel": _this2.onImageTouchEnd
          }
        })]);
      })]);
    }
  },
  render(h) {
	if (!this.value) {
      return;
    }

    return h("transition", {
      "attrs": {
        "name": "van-fade"
      }
    }, [h("div", {
      "class": ['image-preview', this.className]
    }, [this.genImages(), this.genIndex(), this.genCover()])]);
  }
}
</script>

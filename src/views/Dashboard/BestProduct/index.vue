<template>
  <div class="product-container">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="item in products" :key="item.id">
        <div class="product-card">
          <div class="img-container">
            <img :src="item.image.thumb_url" alt="" />
          </div>
          <div class="info-container p-2">
            <h6>{{ item.name }}</h6>
            <button class="btn btn-primary">مشاهده محصول</button>
          </div>
        </div>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
  data() {
    return{
      swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          // Some Swiper option/callback...
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.product-container {
  margin-top: 10px;
  padding: 20px;
  .product-card {
    display: flex;
    .img-container {
      width: 150px;
      height: 150px;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .info-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>

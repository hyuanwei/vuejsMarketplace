
<template lang="pug">
  transition(name = "product")
    a.product(v-if='productData' :href='productData.url' :data-index='index')
      .product-image-wrapper
        img.hot-deal(v-show='productData.promotions.includes("Hot Deal")' :src='hotDealsImg')
        img.product-image(:src='productData.placeholder')
      p.product-name {{ productData.name }}
      .product-stars(v-if='productData.rating')
          .star(v-for='n in floorRating(productData.rating)')
            span.star-yellow ★
          .star.star-percentage(v-show='remainingDecimal(productData.rating)')
            span.star-gray ★
            span.star-yellow.percent-star(:style='{ width: calculatePercentageStarWidth(remainingDecimal(productData.rating)) }') ★
          .star(v-for='n in remainingRating(productData.rating)')
            span.star-gray ★
      p.product-price(v-if='!productData.specialPrice')
        span.starting-at(v-show='productData.startingAt') Starting at:&nbsp;
        span.price {{ productData.price | currency }}
      p.product-price(v-else)
        span.price {{ productData.specialPrice | currency }}
        br
        span.old-price {{ productData.price | currency }}
</template>

<script>
export default {
  props: ["productData", "index"],

  data: () => ({
    hotDealsImg:
      "https://www.roguefitness.com/skin/frontend/rg/2015/images/matte-black-friday/hot-deal-icon-2015.jpg"
  }),

  methods: {
    /**
     * Return integer from float for yellow stars
     * @param  {float} rating
     * @return {integer}
     */
    floorRating(rating) {
      return Math.floor(rating);
    },

    /**
     * Return remaining stars for gray stars
     * @param  {float} rating
     * @return {integer}
     */
    remainingRating(rating) {
      return Math.abs(Math.floor(5 - rating));
    },

    /**
     * Return remaining decimal for fractional star
     * @param  {float} rating
     * @return {integer}
     */
    remainingDecimal(rating) {
      return parseFloat("." + (rating + "").split(".")[1]) || null;
    },

    /**
     * Return percentage width of fractional star
     * @param  {float} rating
     * @return {string}
     */
    calculatePercentageStarWidth(rating) {
      return `${rating * 100}%`;
    }
  },

  mounted: function() {
    this.$store.commit("replacePlaceholder", this.index);
  },

  filters: {
    /**
     * Currency filter for prices (US only)
     * @param  {float} rating
     * @return {string}
     */
    currency(n) {
      return parseFloat(n).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/variables";

.product {
  text-align: center;
  margin: 0;
  max-width: 100%;
  backface-visibility: hidden;
  transform-origin: 10% 50%;
  z-index: 1;

  &,
  &:hover,
  &:active,
  &:visited {
    text-decoration: inherit;
    color: inherit;
  }

  p {
    margin: 0 auto 0.25em;
    max-width: 190px;
  }

  &-name {
    font-weight: bold;
  }

  &-image-wrapper {
    position: relative;
    margin-bottom: 0.25em;

    .hot-deal {
      position: absolute;
      top: 0.25em;
      left: 0.25em;
    }

    .product-image {
      width: 100%;
      height: auto;
    }
  }

  &-stars {
    font-size: 0.9em;
    display: inline-block;
    width: 80px;
    margin: 0 auto 0.45em;
    vertical-align: middle;

    .star {
      display: inline-block;
      position: relative;
      margin: 0;
      padding: 0;

      .percent-star {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
      }

      span {
        &.star-gray {
          color: $gray-light;
        }

        &.star-yellow {
          color: $yellow;
        }
      }
    }
  }

  &-price {
    font-size: 0.9em;

    .price {
      color: $green;
      font-weight: bold;
    }

    .starting-at {
      font-size: 0.8em;
    }

    .old-price {
      font-size: 0.9em;
      color: gray;
      text-decoration: line-through;
    }
  }

  //animations
  &-move {
    transition: all 600ms ease-in-out 50ms;
  }
  &-enter-active {
    transition: all 300ms ease-out;
  }

  &-leave-active {
    transition: all 200ms ease-in;
    position: absolute;
    z-index: -1;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  //animations
}
</style>

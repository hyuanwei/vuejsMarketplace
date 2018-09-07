<template lang='pug'>
  div 
    .main-wrapper
      filters(
        v-for="filter in allFilters" 
        v-bind:key="filter" 
        :filterKey = "filter"
      ) 
      .products-wrapper
        product(
          v-for="product in allProducts" 
          v-bind:key="product.sku" 
          v-bind:productData="product"
        )
    #preloadedImages
</template>

<script>
const LINK = "products.json";

export default {
  data: () => ({
    allProducts: [],
    allFilters: ["brand", "promotions"]
  }),

  methods: {
    getProducts: function() {
      let vm = this;

      this.$http.get(LINK).then(
        function(response) {
          vm.allProducts = response.data;
          console.log(vm.allProducts);
        },
        function(error) {
          console.log(error.statusText);
        }
      );
    }
  },

  mounted: function() {
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/base";

.main-wrapper {
  display: flex;
  margin: 0 auto;
  padding: 1em;
  max-width: 1280px;
}

.products-wrapper {
  // @media (min-width: $tablet) {
  //   margin: 0.25em 1.25em 1.25em 0.25em;
  // }
}
</style>

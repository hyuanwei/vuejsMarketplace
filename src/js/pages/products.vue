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
          v-for="(product, index) in filtedProducts" 
          v-bind:key="product.sku" 
          v-bind:index="index"
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

  computed: {
    checkedFilters() {
      return this.$store.state.checkedFilters;
    },
    filtedProducts() {
      let vm = this;

      let filtedProducts = [];

      let filterCount = 0;
      for (var key in vm.checkedFilters) {
        filterCount += vm.checkedFilters[key].length;
      }

      if (filterCount > 0) {
        this.allProducts.filter(product => {
          for (var key in vm.checkedFilters) {
            if (vm.checkedFilters.hasOwnProperty(key)) {
              if (Array.isArray(vm.checkedFilters[key])) {
                vm.checkedFilters[key].forEach(function(value) {
                  if (product[key].includes(value)) {
                    filtedProducts.push(product);
                  }
                });
              } else {
                if (vm.checkedFilters[key].includes(product[key])) {
                  filtedProducts.push(product);
                }
              }
            }
          }
        });
      } else {
        filtedProducts = vm.allProducts;
      }

      return filtedProducts;
    }
  },

  methods: {
    getProducts: function() {
      let vm = this;

      this.$http.get(LINK).then(
        function(response) {
          vm.allProducts = response.data;
          //console.log(vm.allProducts);
          vm.$store.commit("setProductData", vm.allProducts);
        },
        function(error) {
          console.log(error.statusText);
        }
      );

      console.log(vm.$store.state);
    }
  },

  mounted: function() {
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/base";


.products-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;  
  margin: 0 auto;  
}

.product {
  padding: 1em 0.5em;
  flex: 1 1 200px;
}
</style>

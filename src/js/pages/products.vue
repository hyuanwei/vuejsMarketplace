<template lang='pug'>
  div
    .main-wrapper
      .filters-wrapper
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
        h1(
          v-if="filtedProducts.length == 0"
        ) NO RESULT
    #preloadedImages
</template>

<script>
const LINK = "products.json";

export default {
  data: () => ({
    allProducts: [],
    // currentProducts: [],
    allFilters: ["brand", "promotions"]
  }),

  computed: {
    checkedFilters() {
      return this.$store.state.checkedFilters;
    },

    filterCount() {
      let filterCount = 0;
      for (var key in this.checkedFilters) {
        filterCount += this.checkedFilters[key].length;
      }
      return filterCount;
    },

    filtedProducts() {
      let vm = this;

      let filtedProducts = vm.allProducts;

      if (vm.filterCount > 0) {
        filtedProducts = [];

        this.allProducts.forEach(product => {
          for (var key in vm.checkedFilters) {
            if (vm.checkedFilters.hasOwnProperty(key)) {
              if (Array.isArray(vm.checkedFilters[key])) {
                vm.checkedFilters[key].forEach(function(value) {
                  if (product[key].includes(value)) {
                    if (filtedProducts.indexOf(product) < 0) {
                      filtedProducts.push(product);
                    }
                  }
                });
              } else {
                if (vm.checkedFilters[key].includes(product[key])) {
                  if (filtedProducts.indexOf(product) < 0) {
                    filtedProducts.push(product);
                  }
                }
              }
            }
          }
        });

        // filtedProducts = vm.allProducts.filter(product =>
        //   Object.keys(vm.checkedFilters).every(filterKey => vm.checkedFilters[filterKey].some(filterValue => filterValue == product[filterKey]))
        // );
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
    }
  },

  watch: {
    // filtedProducts: function(val) {
    //   this.currentProducts = val;
    // }
  },

  mounted: function() {
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/base";

.main-wrapper {
  @media (min-width: $tablet) {
    display: flex;
  }
}

.products-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}

.product {
  padding: 1em 0.5em;
  flex: 0 1 200px;
}
</style>

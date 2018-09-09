<template lang='pug'>
  div
    //- div {{checkedFilters}}
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
    allFilters: ["brand", "promotions"]
  }),

  computed: {
    checkedFilters() {
      let allFilters = this.$store.state.checkedFilters;
      let checkedFilters = {};

      Object.keys(allFilters).forEach(key => {
        if (allFilters[key].length > 0) {
          checkedFilters[key] = allFilters[key];
        }
      });

      return checkedFilters;
    },

    filtedProducts() {
      let vm = this;

      let filtedProducts = this.allProducts;

      if (Object.keys(this.checkedFilters).length > 0) {
        filtedProducts = vm.allProducts.filter(product =>
          Object.keys(vm.checkedFilters).every(filterKey =>
            vm.checkedFilters[filterKey].some(
              filterValue =>
                filterValue === product[filterKey] ||
                product[filterKey].includes(filterValue)
            )
          )
        );
      }

      return filtedProducts;
    }
  },

  methods: {
    getProducts: function() {
      this.axios
        .get(LINK)
        .then(response => {
          this.allProducts = response.data;
          this.$store.commit("setProductData", this.allProducts);
        })
        .catch(error => {
          console.log(error);
        });
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

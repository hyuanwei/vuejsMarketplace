<template lang="pug">
  .filter-wrapper
    h3.filter-header {{ filterKey }}
    .filters
      .filter(v-for='filter in computedFilters')
        .v-input-checkbox
          input(
            v-model="$store.state.checkedFilters[filterKey]"
            :value="filter"
            :id='filter + "-filter"'
            :name='filter + "-filter"'
            type='checkbox'
          )
          label(:for='filter + "-filter"') {{ filter }}
</template>

<script>
export default {
  props: ["filterKey"],

  computed: {
    /**
     * Filter through provided products
     * to produce product filters based on provided filterKey
     * @return {array}
     */
    computedFilters() {
      let filters = [];

      this.$store.state.productsData.filter(product => {
        if (typeof product[this.filterKey] === "object") {
          product[this.filterKey].map(filter => {
            if (!filters.includes(filter)) {
              filters.push(filter);
            }
          });
        } else {
          if (!filters.includes(product[this.filterKey])) {
            filters.push(product[this.filterKey]);
          }
        }
      });

      return filters;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/base";

.filter-wrapper {

  margin: 0.25em 0.25em 1em;

  @media (min-width: $tablet) {
    margin: 0.25em 1.25em 1.25em 0.25em;
  }

  .filter-header {
    border-bottom: 1px solid $black;
  }

  .filters {
    margin: 0;
    width: 200px;

    .filter {
      margin: 1em 0;
    }
  }
}
</style>

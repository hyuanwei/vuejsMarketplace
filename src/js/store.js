export default {
  state: {
    productsData   : [],
    checkedFilters : {
      brand      : [],
      promotions : [],
    },
  },

  mutations: {
    /**
     * Set productsData
     * @param  {object} state
     * @param  {array} sentProductData
     */
    setProductData(state, sentProductData = []) {
      state.productsData = sentProductData
    },

    /**
     * Reset sent filter array
     * @param  {object} state
     * @param  {string} sentFilter
     */
    resetFilterGroup(state, sentFilter) {
      state.checkedFilters[sentFilter].length = 0
    },

    /**
     * Replace placeholder image with real one
     * @param  {object} context
     * @param  {string} index
     */
    replacePlaceholder(state, index) {
      state.productsData[index].placeholder = state.productsData[index].image
    },
  },
}

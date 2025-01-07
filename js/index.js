const App = {
  data() {
    return {
      dataName:"中都愛河濕地公園",
      datastore: [],
      cacheSearch: "",
      browseLog: [],
    };
  },
  created() {
    this.fetchApi();
  },
  methods: {
    // get api function
    async fetchApi() {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"
        );
        console.log("success");
        this.datastore = response.data.result.records;
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  watch: {
    dataName(){
      this.browseLog.push(this.dataName)
    }
  },
  // search function
  computed: {
    searchFunc(){
      return this.datastore.filter(item=>{
        return item.Name.match(this.cacheSearch)
      })
    }
  },
};

Vue.createApp(App).mount("#app");

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
    // 監聽dataName的變化
    dataName(){
      // unshift將元素加入陣列最前面
      this.browseLog.unshift(this.dataName);
      // 如果陣列大於10個，則刪除最後一個
      if(this.browseLog.length > 10){
        this.browseLog.splice(10);
      }
    }
  },
  // search function 監聽cacheSearch的變化
  computed: {
    searchFunc(){
      return this.datastore.filter(item=>{
        return item.Name.match(this.cacheSearch)
      })
    }
  },
};

Vue.createApp(App).mount("#app");

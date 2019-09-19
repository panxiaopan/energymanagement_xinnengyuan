

<script>
export default {
  name: "verticalStationList",
  componentName: "verticalStationList",
  mixins: [],
  components: {},
  props: {
    verticalTitle: {
      type: String,
      default: ""
    },
    list: {
      type: [Object, Array, Number],
      default: 10
    },
    url: {
      type: String,
      default: ""
    },
    json: {
      type: Object,
      default: () => null
    },
    total: {
      type: [Number, String],
      default: 0
    },
    selectNodeId: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      start: 0,
      listData: [],
      currentNodeId: 0
    };
  },
  computed: {},

  methods: {
    handleCurrentChange(val) {
      console.log("handleCurrentChange");
      this.currentPage = val;
      this.start = this.pageSize * (val - 1);
      this.queryData(false, this.start);
      console.log(val);
    },
    handleSizeChange(val) {
      // console.log('handleCurrentChange')
      this.pageSize = val;
      this.currentPage = 1;
      this.start = 0;
      this.queryData(false, this.start);
      console.log(val);
    },
    clickNode(item) {
      // console.log('fsfsdfdf clickNode',item.userId)
      if (this.currentNodeId == item.userId) {
        return;
      }
      this.currentNodeId = item.userId;
      console.log("change-node item", item);
      this.$emit("change-node", item.userId, item);
    },
    queryData(isEmit, val) {
      if (!this.url || !this.json) {
        return;
      }
      var json = {};
      Object.assign(json, this.json);

      if (!isNaN(+val)) {
        json.start = +val;
      } else {
        this.currentPage = parseInt(this.json.start / this.pageSize) + 1;
      }
      this.$http({
        url: this.url,
        json
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        if (+code === 0) {
          this.listData = response.data.data.rows;

          if (isEmit) {
            var matchItem = null;
            this.listData.some(item => {
              console.log("item.userId", item.userId);
              if (item.userId == this.currentNodeId) {
                matchItem = item;
                return true;
              } else {
                return false;
              }
            });
            console.log("matchItem", matchItem);

            if (matchItem) {
              this.$emit("change-node", this.currentNodeId, matchItem);
            }
          }
        }
      });
    }
  },
  created() {
    this.currentNodeId = this.selectNodeId;
    if (this.list && this.list.length) {
      this.listData = this.list;
    }
  },
  mounted() {},
  render(h, context) {
    var clickHandler = function(e) {};
    var myEl = (
      <div>
        <h3 onClick={clickHandler}>{this.verticalTitle}</h3>
        {this.$slots.default}
      </div>
    );
    this.ulEl = <ul class="hj-vertical-list" style="padding-top:15px;" />;
    // 旧版vue貌似默认children属性存在且为数组 这里需初始化 否则报错undefined 2018-08-08 hgx
    myEl.children = [];
    this.ulEl.children = [];
    // 带事件的传参方式,
    if (this.listData && this.listData.length) {
      this.listData.forEach((item, index) => {
        var middleFun = e => {
          e.stopPropagation();
          console.log("当前节点");
          console.log(item);
          this.clickNode(item);
        };
        // console.log("this.ulEl++++++++++++", this.ulEl);
        // this.ulEl.children.push(<li dataset={item} onClick={testFun}>{item.username}</li>)
        this.ulEl.children.push(
          <li
            class={{ active: this.currentNodeId == item.userId }}
            onClick={middleFun}
          >
            {item.username}
          </li>
        );
        // this.ulEl.children.push(<li onClick={middleFun}>{item.username}</li>)
      });
      // Array.apply(null,{length:10}).forEach((item,index)=>{
    }
    myEl.children.push(this.ulEl);
    const pagination = (
      <el-pagination
        class="pull-right"
        onSize-change={this.handleSizeChange}
        onCurrent-change={this.handleCurrentChange}
        currentPage={this.currentPage}
        pageSizes={[10, 20, 30]}
        pageSize={this.pageSize}
        layout=" prev, pager, next"
        total={this.total}
      >
        {" "}
      </el-pagination>
    );
    myEl.children.push(pagination);
    return myEl;
  },
  destroyed() {}
};
</script>

<style lang='less'>
.hj-vertical-list {
  margin: 0;
  padding: 0;
}
.hj-vertical-list > li {
  /*color: red;*/
  cursor: pointer;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-indent: 10px;
  list-style: none;
  &:hover {
    background-color: #b9ccec;
  }
  &.active {
    background-color: #86a1cf;
  }
  /*background-color: red;*/
}
</style>
<template>
  <div>
    <el-row v-show="editBelongGroup" type="flex" justify="space-between">
      <el-cascader ref="cascader" :options="optionsList" change-on-select clearable @change="change" :props="props" v-model="selectedList" style="width:70%;"></el-cascader>
      <el-button @click="confirmAdd">{{$t("systemSetting.confirmAdd")}}</el-button>
    </el-row>
    <ul style="overflow-y: scroll;margin-top:15px;border:1px solid #ccc;border-radius:3px;min-height:200px;">
      <li class="hj-role-list-li" v-for="(item, $index) in belongingPathList" :key="$index">
        <div style="display:flex;justify-content:space-between;">
          <span>{{item[props.label]}}</span>
          <div v-if="!!item.isAllowDelete">
            <el-button   @click.native.prevent="deleteRow(item, $index)" size="mini" style="border-radius:14px;border:1px solid #ccc;"><i class="el-icon-delete2"></i></el-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<style lang='less'>
.hj-role-list-li {
  padding: 5px;
  &:hover {
    background-color: #9399a4;
  }
}
</style>
<script>
import clone from "clone";
export default {
  name: "editStationPath",
  componentName: "editStationPath",
  mixins: [],
  components: {},
  props: {
    row: {
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    },
    props: {
      type: Object,
      default: () => {
        return {
          label: "name",
          children: "subTrees",
          value: "id"
        };
      }
    }
  },
  data() {
    return {
      editBelongGroup: false,
      editStationPath: "editStationPath",
      selectedList: [],
      currentPath: "",
      belongingPathList: [],
      optionsList: [],
      deletedList: []
    };
  },
  computed: {},
  watch: {
    row(newVal, oldVal) {
      if (newVal.pathList && newVal.pathList.length) {
        this.belongingPathList = newVal.pathList.map((item, index) => {
          var isAllowDelete = !item.ownerPathFlag;
          return {
            [this.props.label]: item.attachPath,
            [this.props.value]: item.pathId,
            isAllowDelete
          };
        });
      }
    }
  },
  methods: {
    deleteRow(item, index) {
      console.log("item", item);
      console.log("index", index);
      // this.getPathList().splice(index,1)

      this.deletedList.push(this.belongingPathList[index][this.props["value"]]);
      console.log(
        this.belongingPathList[index][this.props["value"]],
        this.deletedList
      );
      this.belongingPathList.splice(index, 1);
    },
    change(val) {
      console.log(val);
      this.currentPath = val;
    },
    resetBelongingPathList() {
      if (this.row.pathList && this.row.pathList.length) {
        this.belongingPathList = this.row.pathList.map((item, index) => {
          var isAllowDelete = !item.ownerPathFlag;
          return {
            [this.props.label]: item.attachPath,
            [this.props.value]: item.pathId,
            isAllowDelete
          };
        });
      }
    },
    clear() {
      // this.cascaderVm = this.$refs.cascader
      this.$refs.cascader.handlePick([], true);
      this.deletedList = [];
    },
    getTreeItemByPathArr(arrayList, currentPath, result) {
      if (!arrayList || !arrayList.length || !currentPath.length) {
        console.log("getTreeItemByPathArr", result);
        return result;
      }
      arrayList.some(item => {
        if (item && item[this.props.value] == currentPath[0]) {
          currentPath.shift();
          console.log("currentPath", currentPath);
          console.log("item", item);
          console.log("result", result);
          result.push(item);
          // this.getTreeItemByPathArr(item[this.props.children], currentPath, result)
          // if (item[this.props.children] && item[this.props.children].length) {
          if (item[this.props.children] && item[this.props.children].length) {
            this.getTreeItemByPathArr(
              item[this.props.children],
              currentPath,
              result
            );
          }
          return true;
        } else {
          return false;
        }
      });
      return result;
    },
    getPathList() {
      return this.deletedList;
      // return this.belongingPathList;
    },
    confirmAdd() {
      // attachPath
      // pathId
      console.log("currentPath", this.currentPath);
      if (this.currentPath && this.currentPath.length) {
        var result = [];
        console.log("this.optionsList", this.optionsList);
        this.getTreeItemByPathArr(this.optionsList, this.currentPath, result);
        var id = result[result.length - 1][this.props.value];
        var name = result
          .map(item => {
            return item[this.props.label];
          })
          .join("/");
        console.log("this.currentPath", this.currentPath);
        console.log("result", result);
        console.log(
          "this.belongingPathList.length",
          this.belongingPathList.length
        );
        console.log("this.belongingPathList", this.belongingPathList);
        if (this.belongingPathList && this.belongingPathList.length) {
          var isExist = this.belongingPathList.every(item => {
            console.log("item[this.props.value]", item[this.props.value]);
            console.log("id", id);
            return item[this.props.value] !== id;
          });
          isExist &&
            this.belongingPathList.push({
              [this.props.label]: name,
              [this.props.value]: id
            });
        } else {
          this.belongingPathList.push({
            [this.props.label]: name,
            [this.props.value]: id
          });
        }
      }
    },
    checkChildArr(arr) {
      if (!arr || !arr.length) {
        return;
      }
      arr.forEach(item => {
        if (!item.subTrees) {
          return;
        }
        // item.id=item.id+''
        if (!item.subTrees.length) {
          item.subTrees = undefined;
          return;
        }
        this.checkChildArr(item.subTrees);
        // arguments.callee(item.subTrees)
        // this.checkChildArr(item.subTrees)
      });
    },
    processData(response, that, json) {
      if (response.data) {
        var optionsList = [response.data.data];
        that.checkChildArr(optionsList);
        that.optionsList = optionsList;
      }
    },
    processFailedFun(response, that, json) {},
    queryData() {
      var url = "./auth/groups/tree";
      var json = { terminal: true };
      this.$http({
        json,
        url
        // successFun: this.processData,
        // failedFun: this.processFailedFun
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        if (+code === 0) {
          if (response.data) {
            var optionsList = [response.data.data];
            this.checkChildArr(optionsList);
            this.optionsList = optionsList;
          }
        }
      });
    }
  },
  created() {
    this.resetBelongingPathList();
    this.queryData();
  },
  mounted() {},
  destroyed() {}
};
</script>


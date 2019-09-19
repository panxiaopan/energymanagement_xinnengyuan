 <template>
  <div class="">
     <div v-if="currentConfig.showSearch" style="display:flex;padding-top:15px;align-items:center;">
      <div style="min-width:100px;">{{$t("systemSetting.search")}}</div>
      <el-input v-model="queryString" icon="search" style="width:350px;" size="small" :on-icon-click="handleIconClick" @keyup.native.enter="handleIconClick" :placeholder="currentConfig.placeholder"></el-input>
      </div>
     <el-row type="flex" justify="space-between" style="margin:15px;">
      <span>
      <span v-if="currentConfig.showPath">{{$t("systemSetting.currentGroup")}}:{{currentConfig.nodePath}}</span>
      <el-checkbox v-show="currentConfig.checkAll&&currentConfig.showPath" v-model="showChildrenContent" @change="handleIconClick">{{$t("systemSetting.showSubUsergroup")}}{{currentConfig.childrenLabel}}</el-checkbox>
      <span v-if="!currentConfig.showPath">{{$t("systemSetting.socialUnitListCanView")}}</span>
      </span>
      <el-button v-if="currentConfig.showAddIcon" size="mini" circle @click.native.stop="clickAdd"><i class="el-icon-plus"></i></el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "searchWidget",
  componentName: "searchWidget",
  mixins: [],
  components: {},
  props: {
    config: {
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    }
  },
  data() {
    var defaultConfig = {
      showPath: true,
      showAddIcon: true,
      nodePath: "",
      checkAll: true,
      childrenLabel: this.$t("systemSetting.opsMember"),
      showSearch: true,
      placeholder: this.$t("systemSetting.inputUserNameOrTel")
    };
    return {
      defaultConfig,
      currentConfig: { ...defaultConfig },
      queryString: "",
      showChildrenContent: true
    };
  },
  computed: {},
  watch: {
    config: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal) {
          Object.keys(newVal).forEach(item => {
            if (
              this.currentConfig.hasOwnProperty(item) &&
              this.currentConfig[item] !== newVal[item]
            ) {
              this.currentConfig[item] = newVal[item];
            }
          });
        }
      }
    }
  },
  methods: {
    handleIconClick() {
      if (this.$parent.queryData) {
        this.$parent.queryData();
      }
      console.log("this.$refs.table", this.$refs.table);
    },
    clickAdd() {
      this.$emit("click-add");
    },
    searchData() {}
  },
  created() {},
  mounted() {},
  destroyed() {}
};
</script>



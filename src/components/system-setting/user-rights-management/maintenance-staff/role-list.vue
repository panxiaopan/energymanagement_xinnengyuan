<template>
  <div>
    <el-row v-if="showAdd" type="flex" justify="space-between">
      <span>{{$t("systemSetting.roleList")}}: </span>
      <el-button size="mini" style="border-radius:14px;" @click="clickAdd"><i class="el-icon-plus"></i></el-button>
    </el-row>
    <ul style="overflow-y: scroll;margin-top:15px;padding:10px;border:1px solid #fff;">
      <li class="hj-role-list-li" v-for="item in roleList" :key="item.label">
        <div style="display:flex;justify-content:space-between;">
          <span>{{item.label}}</span>
          <div>
            <el-button @click.native.prevent="deleteRow(item)" size="mini" style="border-radius:14px;border:1px solid #ccc;"><i class="el-icon-delete2"></i></el-button>
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
export default {
  name: "roleList",
  componentName: "roleList",
  mixins: [],
  components: {},
  props: {
    showAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      getAllRolesUrl: "./auth/roles",
      roleList: [
        {
          label: this.$t("systemSetting.opsMember")
        },
        {
          label: this.$t("systemSetting.installCompany")
        },
        {
          label: this.$t("systemSetting.administrator")
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    deleteRow(row, index, tableData) {
      console.log("deleteRow", row);
    },
    clickAdd() {
      this.$emit("click-add");
    },
    processData(response) {
      console.log("roleList", response.data.data);
    },
    qeuryData() {
      var url = getAllRolesUrl;
      this.$http({ url, json: {} });
    }
  },
  created() {},
  mounted() {},
  destroyed() {}
};
</script>


<template>
  <div class="hj-bind-user">
    <el-row :gutter="30">
      <el-col :span="4">{{$t("systemSetting.search")}}</el-col>
      <el-col :span="20">
        <el-input
          v-model="queryString"
          icon="search"
          :placeholder="$t('systemSetting.inputUsrNameOrPhoneNum')"
          size="small"
          :on-icon-click="handleIconClick"
          @keyup.native.enter="handleIconClick"
        ></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top:15px;">
      <el-col :span="4">{{$t("systemSetting.userList")}}</el-col>
      <el-col v-loading="loading" :span="20" class="hj-bind-user__box">
        <ul>
          <li
            v-for="i in userList"
            :key="i.id"
            :class="i.id==currentId?'active':''"
            @click.stop="selecteCurrentUser(i)"
          >{{i.name}},{{$t("systemSetting.telephone")}}{{i.tel}}</li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import "./index.less";
export default {
  name: "bindUser",
  componentName: "bindUser",
  mixins: [],
  components: {},

  data() {
    return {
      loading: false,
      queryString: "",
      currentId: 0,
      userList: [
        { name: "test", tel: 12323232, id: 1 },
        { name: "test", tel: 12323232, id: 2 }
      ] // name, tel, id
    };
  },
  computed: {
    // currentId(){
    //   if(!this.userList.length){
    //     return ''
    //   }else{
    //     return this.userList[0].id
    //   }
    // }
  },
  watch: {},
  methods: {
    selecteCurrentUser(item) {
      if (item) {
        this.currentId = +item.id;
        this.currentItem = item;
      } else {
        this.currentItem = null;
        this.currentId = NaN;
      }
    },
    reset() {
      this.queryString = "";
      this.currentId = NaN;
      this.userList = [];
    },
    handleIconClick() {
      this.queryUserList();
    },
    getSelectedItem() {
      if (this.userList && this.userList.length) {
        return this.currentItem;
      } else {
        return null;
      }
    },
    queryUserList() {
      this.loading = true;
      var url = "./auth/users";
      var json = { keyword: this.queryString };
      this.$http({
        url,
        json
      }).then(response => {
        let code =
          response.data && response.data.head && response.data.head.code;
        if (+code === 0) {
          this.loading = false;
          console.log(response);
          var userList = response.data.data;
          this.userList = userList;
          this.$nextTick(() => {
            if (userList && userList.length) {
              this.selecteCurrentUser(userList[0]);
            }
          });
        } else {
          this.userList = [];
          this.loading = false;
        }
      });
    }
  },
  created() {},
  mounted() {
    this.queryUserList();
  },
  destroyed() {}
};
</script>
<style lang="less">
@import "./index.less";
</style>


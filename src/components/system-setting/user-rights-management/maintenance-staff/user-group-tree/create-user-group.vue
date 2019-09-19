<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item v-if="authShowGroup" :label="userGroupType" prop="type">
        <el-radio-group v-model="form.type">
          <!-- $t("systemSetting.enterpriseUserGroup") -->
          <el-radio label="groupUser">{{self.$t("systemSetting.enterpriseUserGroup")}}</el-radio>
          <!-- $t("systemSetting.backendOpsGroup") -->
          <el-radio label="maintainerGroup">{{self.$t("systemSetting.backendOpsGroup")}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="userGroupName" prop="groupName">
        <el-input v-model="form.groupName" :placeholder="inputPlaceHolder"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AuthValidator from "@/mixins/authValidator.js";
export default {
  name: "createUserGroup",
  componentName: "createUserGroup",
  mixins: [AuthValidator],
  components: {},
  props: {
    authShowGroup: {
      type: Boolean,
      default: true
    },
    self: {
      type: Object
    }
  },
  data() {
    var typeValidator = (rules, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(
          new Error(this.self.$t("systemSetting.usrGroupTypeCanNotBeNull"))
        );
      }
    };
    var groupNameValidator = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error(this.self.$t("systemSetting.usrNameCanNotBeNull")));
      }
    };
    return {
      inputPlaceHolder: this.self.$t("systemSetting.inputUserGroupName"),
      userGroupName: this.self.$t("systemSetting.userGroupName") + ": ",
      userGroupType: this.self.$t("systemSetting.userGroupType") + ": ",
      form: {
        type: "maintainerGroup",
        groupName: ""
      },
      rules: {
        type: [
          // typeValidator
          {
            require: true,
            message: this.self.$t("systemSetting.selectUserGroupType"),
            trigger: "blur"
          }
        ],
        groupName: [
          groupNameValidator
          // {
          //   // require: true,
          //   pattern: /.+/g,
          //   message: '请输入用户组名称',
          //   trigger: 'blur,change'
          // }
        ]
      }
      // showUserGroupType: true
    };
  },
  // computed: {
  //   addUserGroupShowGroupAuth(){
  //     return this.$store.state.hjSystemAuthObj.addUserGroupShowGroupAuth
  //   }
  // },

  methods: {
    testClick() {
      this.$refs.form.resetFields();

      // console.log('this.form', this.form)
    },
    initI18n(type) {
      console.log("-------------");
      console.log(this.self.$t(`systemSetting.enterpriseUserGroup`));
      return this.self.$t(`systemSetting[${type}]`);
    },
    submitForm(submitFun) {
      var validated = false;
      this.$refs.form.validate(valid => {
        validated = valid;
        if (valid) {
          if (submitFun) {
            submitFun();
          }
          console.log("submit");
          return true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      return validated;
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  },
  created() {},
  mounted() {
    console.log("mounted-----");
    console.log(this);
    console.log(this.self);
    this.initI18n("enterpriseUserGroup");
    // var auth = this.authValidator("user_permission_mgr_add_usergroup");
    // if (!this.auth) {
    //   // groupUser maintainerGroup
    //   this.showUserGroupType = false;
    //   this.form.type = "maintainerGroup";
    // }
  },
  destroyed() {}
};
</script>


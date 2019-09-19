<template>
  <div class="hj-enterprise-user-setting">
    <!-- <div>
      <el-button type="primary" icon="el-icon-refresh" round>刷新</el-button>
      <el-button type="primary" icon="el-icon-edit" round>修改参数</el-button>&nbsp;&nbsp;
    </div>-->
    <el-form
      :model="customForm"
      :rules="customRules"
      ref="customForm"
      class="hj-enterprise-user-setting__form"
      label-width="150px"
      size="small"
    >
      <div class="form__header">
        <fieldset>
          <legend>{{labelTextObj.sysName}}</legend>
          <div class="form__header__systemName">
            <el-form-item :label="labelTextObj.sysNameCn" prop="sysNameCn" label-width="80px">
              <el-input v-model="customForm.sysNameCn" :placeholder="placeholderObj.sysNameCn"></el-input>
            </el-form-item>
            <el-form-item :label="labelTextObj.sysNameEn" prop="sysNameEn" label-width="80px">
              <el-input v-model="customForm.sysNameEn" :placeholder="placeholderObj.sysNameEn"></el-input>
            </el-form-item>
          </div>
        </fieldset>

        <fieldset>
          <legend>{{labelTextObj.logoIconInfo}}</legend>
          <div class="form__header__logoIcon">
            <el-form-item
              v-for="item in logoIconList"
              :key="item.key"
              :label="item.label"
              :prop="item.key"
            >
              <el-upload
                :ref="item.key"
                action
                :on-remove="handleRemove"
                :on-change="handleChange"
                :file-list="item.fileList"
                list-type="picture-card"
                :auto-upload="false"
                :limit="item.limit"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                  @click="click2Upload(item)"
                >{{$t("systemSetting.selectFile")}}</el-button>
                <!-- <div slot="tip" class="el-upload__tip">{{$t("systemSetting.imageFormatLimit")}}</div> -->
              </el-upload>
            </el-form-item>
          </div>
          <div class="form__header__logoTips">
            <span>{{labelTextObj.logoTips}}</span>
          </div>
        </fieldset>
      </div>
      <div class="form__footer">
        <fieldset>
          <legend>{{labelTextObj.customDomain}} & {{labelTextObj.contactInfo}}</legend>

          <el-form-item
            class="form__footer__returnUrl"
            :label="labelTextObj.returnUrl"
            prop="returnUrl"
            label-width="150px"
            label-position="left"
          >
            <el-input v-model="customForm.returnUrl" :placeholder="placeholderObj.returnUrl"></el-input>
          </el-form-item>
          <el-form-item class="form__footer__customDomain" prop="domain" label-width="20px">
            <el-checkbox
              v-model="isCustomDomain"
              @change="checkCustomDomain"
            >{{labelTextObj.customDomain}}</el-checkbox>
            <el-input
              v-model="customForm.domain"
              :disabled="!isCustomDomain"
              :placeholder="placeholderObj.customDomain"
            ></el-input>
          </el-form-item>

          <div class="form__footer__contactTable">
            <div class="form__footer__contactTable__button">
              <el-button
                round
                size="mini"
                type="primary"
                @click="click2AddNewItem"
              >{{labelTextObj.addNewContactItem}}</el-button>&nbsp;&nbsp;
              <span
                class="form__footer__contactTable__button__tips"
              >{{labelTextObj.addNewContactItemNotice}}</span>
            </div>
            <el-table :data="contactTableList" stripe border>
              <el-table-column prop="name" min-width="100" :label="labelTextObj.nameCn">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="nameEn" min-width="100" :label="labelTextObj.nameEn">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.nameEn"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="content" min-width="200" :label="labelTextObj.description">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.content"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="contentEn" min-width="200" :label="labelTextObj.descriptionEn">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.contentEn"></el-input>
                </template>
              </el-table-column>

              <el-table-column
                prop="isLink"
                min-width="80"
                :label="labelTextObj.isLink"
                align="center"
              >
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.isLink" @change="changeCkb(scope)"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                prop="attachedAttrValue"
                min-width="120"
                :label="labelTextObj.linkAddr"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.attachedAttrValue" :disabled="!scope.row.isLink"></el-input>
                </template>
              </el-table-column>
              <el-table-column min-width="50" :label="labelTextObj.operation">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.$index !== contactTableList.length-1"
                    circle
                    size="mini"
                    :title="labelTextObj.delete"
                    type="primary"
                    @click.native="removeContactItem(scope)"
                  >
                    <i class="el-icon-delete"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <fieldset>
            <legend>{{labelTextObj.qrcodePic}}</legend>
            <div class="form__footer__qrcode">
              <el-form-item
                v-for="item in qrcodePicList"
                :key="item.key"
                :label="item.label"
                :prop="item.key"
              >
                <el-upload
                  :ref="item.key"
                  action
                  :limit="item.limit"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="item.fileList"
                  list-type="picture-card"
                  :auto-upload="false"
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                    @click="click2Upload(item)"
                  >{{$t("systemSetting.selectFile")}}</el-button>
                </el-upload>
              </el-form-item>
            </div>
          </fieldset>
        </fieldset>
      </div>

      <el-form-item class="form__submitButton">
        <el-button type="primary" @click="submitForm('customForm')">保存</el-button>
        <el-button @click="resetForm('customForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "EnterpriseUserSetting",
  props: {
    queryUrl: {
      type: String,
      default: "./logos/byUserId"
    },
    updateUrl: {
      type: String,
      default: "./logos"
    },
    queryShowedUrl: {
      type: String,
      default: "./logos/showedByUserId"
    }
  },
  data() {
    const labelTextObj = {
      sysName: "产品名称",
      sysNameCn: "中文",
      sysNameEn: "英文",
      logoIconInfo: "logo & icon",
      loginLogo: "登录logo",
      navLogo: "导航logo",
      favicon: "页面icon",
      customDomain: "自定义域名",
      contactInfo: "联系方式",
      returnUrl: "点击logo跳转链接",
      // customDomainTips: ''
      nameCn: "名称",
      nameEn: "英文名称",
      description: "描述",
      descriptionEn: "英文描述",
      linkAddr: "链接地址",
      isLink: "是否为链接",
      operation: "操作",
      delete: "删除",
      addNewContactItem: "添加自定义项",
      qrcodePic: "二维码图片",
      weChat: "微信公众号",
      miniProgram: "微信小程序",
      addNewContactItemNotice: "注：默认最后一项为版权信息，可为空但不可删除",
      logoTips: "注：建议logo图片宽高比为3:1~4:1的范围，icon的宽高比1:1"
    };
    const placeholderObj = {
      customDomain: "请输入完整格式的域名，如www.safe.huajiecloud.com",
      sysNameCn: "请输入中文名称（必须）",
      sysNameEn: "请输入英文名称（非必须项）",
      returnUrl: "请输入点击logo的跳转链接，默认为空，点击无效果"
    };
    const logoIconList = [
      {
        key: "loginFile",
        label: labelTextObj.loginLogo,
        fileList: [],
        limit: 1
      },
      {
        key: "defaultFile",
        label: labelTextObj.navLogo,
        fileList: [],
        limit: 1
      },
      {
        key: "iconFile",
        label: labelTextObj.favicon,
        fileList: [],
        limit: 1
      }
    ];
    const qrcodePicList = [
      {
        key: "weixinPic",
        label: labelTextObj.weChat,
        fileList: [],
        limit: 1
      },
      {
        key: "appPic",
        label: labelTextObj.miniProgram,
        fileList: [],
        limit: 1
      }
    ];
    const domainValidator = (rule, value, callback) => {
      let domainReg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
      if (value === "" || value.trim() === "") {
        if (this.isCustomDomain) {
          callback(new Error("域名不能为空"));
        } else {
          callback();
        }
      } else if (!domainReg.test(value)) {
        callback(new Error("域名格式填写错误"));
      } else {
        callback();
      }
    };
    const sysNameCnValidator = (rule, value, callback) => {
      let cnNameReg = /^[\u4e00-\u9fa5\s]+$/;
      if (value === "" || value.trim() === "") {
        callback(new Error("产品名称不能为空"));
      } else if (!cnNameReg.test(value)) {
        callback(new Error("必须输入中文字符"));
      } else if (value.length >= 15) {
        callback(new Error("产品名称过长"));
      } else {
        callback();
      }
    };
    const sysNameEnValidator = (rule, value, callback) => {
      let enNameReg = /^[a-zA-Z\s]+$/;
      if (value === "" || value.trim() === "") {
        callback();
      } else if (!enNameReg.test(value)) {
        callback(new Error("必须输入英文字符"));
      } else if (value.length >= 20) {
        callback(new Error("产品名称过长"));
      } else {
        callback();
      }
    };
    const customRules = {
      sysNameCn: [
        {
          type: "string",
          required: true,
          // message: "请输入产品名称",
          validator: sysNameCnValidator,
          trigger: "blur"
        }
      ],
      domain: [
        {
          type: "string",
          validator: domainValidator,
          trigger: "blur"
        }
      ],
      sysNameEn: [
        {
          type: "string",
          validator: sysNameEnValidator,
          trigger: "blur"
          // required: true,
          // message: '请输入产品名称'
        }
      ]
    };
    return {
      customForm: {
        sysNameCn: "",
        sysNameEn: "",
        domain: "www.safe.huajiecloud.com",
        returnUrl: ""
        // loginLogo: ""
      },
      customRules,
      labelTextObj,
      placeholderObj,
      logoIconList,
      qrcodePicList,
      isCustomDomain: false,
      contactTableList: [],
      isAdd: true, //是否第一次设置
      initData: null
    };
  },
  computed: {
    // showUpload(item) {
    //   return item.length < 1;
    // }
  },
  methods: {
    ...mapActions("login", ["setCustomSetting"]),
    showUpload(item) {
      return item.fileList.length < 1;
    },
    click2Upload(item) {
      console.log("item +++++++++", item, item.key);
      console.log(this.$refs[item.key]);
      // let files =
      //   this.$refs[item.key][0] && this.$refs[item.key][0].uploadFiles;
      // let picCard = this.$refs[item.key][0] && this.$refs[item.key][0].$el
      // if (files.length > 0) {
      //   // this.$message.error("只能上传一张logo，请删除原logo");
      //   picCard.lastChild.style.display = 'none'
      //   return;
      // }
    },
    checkCustomDomain(value) {
      this.$refs["customForm"].validateField("domain");
    },
    changeCkb(scope) {
      console.log("scope++++++++", scope);
      this.contactTableList = this.contactTableList.map((item, index) => {
        if (scope.row.index === index) {
          item.isLink = !item.isLink;
        }
        return item;
      });
    },
    handleRemove() {
      // --logo
      this.logoIconList.forEach(item => {
        let files =
          this.$refs[item.key][0] && this.$refs[item.key][0].uploadFiles;
        let picCard = this.$refs[item.key][0] && this.$refs[item.key][0].$el;
        if (files.length === 0) {
          // this.$message.error("只能上传一张logo，请删除原logo");
          picCard.lastChild.style.display = "inline-block";
          return;
        }
      });
      // --微信和小程序二维码
      this.qrcodePicList.forEach(item => {
        let files =
          this.$refs[item.key][0] && this.$refs[item.key][0].uploadFiles;
        let picCard = this.$refs[item.key][0] && this.$refs[item.key][0].$el;
        if (files.length === 0) {
          // this.$message.error("只能上传一张logo，请删除原logo");
          picCard.lastChild.style.display = "inline-block";
          return;
        }
      });
    },
    handleChange() {
      // 选择图片后，隐藏选择图片按钮
      // --logo
      this.logoIconList.forEach(item => {
        let files =
          this.$refs[item.key][0] && this.$refs[item.key][0].uploadFiles;
        let picCard = this.$refs[item.key][0] && this.$refs[item.key][0].$el;
        if (files.length > 0) {
          // this.$message.error("只能上传一张logo，请删除原logo");
          picCard.lastChild.style.display = "none";
          return;
        }
      });
      // --微信和小程序二维码
      this.qrcodePicList.forEach(item => {
        let files =
          this.$refs[item.key][0] && this.$refs[item.key][0].uploadFiles;
        let picCard = this.$refs[item.key][0] && this.$refs[item.key][0].$el;
        if (files.length > 0) {
          // this.$message.error("只能上传一张logo，请删除原logo");
          picCard.lastChild.style.display = "none";
          return;
        }
      });
    },
    click2AddNewItem() {
      let newItem = {
        name: "",
        nameEn: "",
        content: "",
        contentEn: "",
        isLink: false,
        // linkAddr: "",
        attachedAttrType: "",
        attachedAttrValue: ""
      };
      let addIndex = this.contactTableList.length - 1;
      this.contactTableList.splice(addIndex, 0, newItem);
    },
    removeContactItem(scope) {
      // console.log("scope+++++++++++", scope);
      this.$confirm("确认删除该项联系方式?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let deleteIndex = scope.$index;
          this.contactTableList.splice(deleteIndex, 1);
        })
        .catch(() => {});
    },
    validateFormItem() {
      let productNameValid = this.$refs["customForm"].validateField(
        error => {}
      );

      console.log("productNameValid", productNameValid);
      return false;
    },
    submitForm(formName) {
      // let isValid = this.validateFormItem();
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = this.updateUrl;
          let method = "post";
          if (this.initData) {
            method = "put";
          }
          let {
            sysNameCn: logoNameCn,
            sysNameEn: logoNameEn,
            domain: domainName,
            returnUrl
          } = this.customForm;
          // // 若域名没有'www'，填充前缀
          // if (this.isCustomDomain && domainName.trim().slice(0, 3) !== "www") {
          //   domainName = "www." + domainName;
          // }
          let homePageCustomInfo = this.contactTableList.map(item => {
            item.attachedAttrType = item.isLink ? "href" : "";
            delete item.isLink;
            return item;
          });
          console.log("homePageCustomInfo", JSON.stringify(homePageCustomInfo));
          let json = {
            domainName,
            logoNameCn,
            logoNameEn,
            returnUrl,
            enabled: true,
            homePageCustomInfo: JSON.stringify(homePageCustomInfo)
          };
          let originFile = {
            defaultFile:
              (this.logoIconList[0].fileList[0] &&
                this.logoIconList[0].fileList[0].url) ||
              "",
            loginFile:
              (this.logoIconList[1].fileList[0] &&
                this.logoIconList[1].fileList[0].url) ||
              "",
            iconFile:
              (this.logoIconList[2].fileList[0] &&
                this.logoIconList[2].fileList[0].url) ||
              "",
            weixinPic:
              (this.qrcodePicList[0].fileList[0] &&
                this.qrcodePicList[0].fileList[0].url) ||
              "",
            appPic:
              (this.qrcodePicList[1].fileList[0] &&
                this.qrcodePicList[1].fileList[0].url) ||
              ""
          };
          [
            "defaultFile",
            "loginFile",
            "iconFile",
            "weixinPic",
            "appPic"
          ].forEach(key => {
            let files = this.$refs[key][0] && this.$refs[key][0].uploadFiles;
            if (files.length === 0) {
              return;
            }
            console.log("files", files);

            json[key] = files[0].raw || originFile[key];
          });

          console.log("json++", json);
          // // 监测图片是否上传
          // let
          // if (!isCompletedLogo) {
          //   let message = "logo或icon未上传成功";
          //   this.$message.error(message);
          //   return;
          // }

          let jsonFormData = new FormData();
          Object.keys(json).forEach(key => {
            jsonFormData.set(key, json[key]);
          });

          this.$http({
            url,
            json: jsonFormData,
            method,
            contentType: "formData"
          }).then(response => {
            let code = response.data.head && response.data.head.code;
            if (code === 0) {
              let message = "保存成功";
              this.$message.success(message);
              // 更新导航、云平台的页面logo信息
              this.queryShowedCustomSetting();
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      if (this.initData) {
        this.updateFormByInitData(this.initData);
      } else {
        Object.keys(this.customForm).forEach(key => {
          this.customForm[key] = "";
        });
        this.isCustomDomain = false; //默认没有自定义域名
        this.logoIconList = this.logoIconList.map(item => {
          item.fileList = [];
          // 显示图片选择区域
          let files =
            this.$refs[item.key][0] && this.$refs[item.key][0].uploadFiles;
          let picCard = this.$refs[item.key][0] && this.$refs[item.key][0].$el;
          picCard.lastChild.style.display = "inline-block";
          return item;
        });
        this.qrcodePicList = this.qrcodePicList.map(item => {
          item.fileList = [];
          // 显示图片选择区域
          let files =
            this.$refs[item.key][0] && this.$refs[item.key][0].uploadFiles;
          let picCard = this.$refs[item.key][0] && this.$refs[item.key][0].$el;
          picCard.lastChild.style.display = "inline-block";
          return item;
        });
        this.contactTableList = [];
      }
    },
    updateFormByInitData(data) {
      // 表单项
      let {
        logoNameCn: sysNameCn,
        logoNameEn: sysNameEn,
        domainName: domain,
        returnUrl,
        groupId,
        logoDefaultFile,
        logoIconFile
      } = data;
      let { homePageCustomInfo: contactTableList, logoLoginFile } = data.data;
      Object.assign(this.customForm, {
        sysNameCn,
        sysNameEn,
        domain,
        returnUrl
      });
      this.isCustomDomain = !!returnUrl;
      // logo & icon
      this.logoIconList = this.logoIconList.map(item => {
        let picName = "";
        switch (item.key) {
          case "loginFile":
            picName = logoLoginFile;
            break;
          case "defaultFile":
            picName = logoDefaultFile;
            break;
          case "iconFile":
            picName = logoIconFile;
            break;
        }
        let host = location.host;
        if (host === "localhost" || host.split(":")[0] === "localhost") {
          host = "192.168.1.99";
        }
        let prevUrl = `${location.protocol}//${host}`;

        let picUrl = `${prevUrl}/efm-web/files/filestream?type=efm-logo&id=${groupId}&filename=${picName}`;
        if (!picName) {
          item.fileList = [];
        } else {
          item.fileList = [{ name: picName, url: picUrl }];
          let picCard = this.$refs[item.key][0] && this.$refs[item.key][0].$el;
          picCard.lastChild.style.display = "none";
        }
        return item;
      });
      console.log("this.logoIconList", this.logoIconList);
      contactTableList.forEach(item => {
        if (item.attachedAttrType === "src") {
          let picName = "";
          let picUrl = item.attachedAttrValue;
          if (item.name === "官方微信") {
            picName = "wechat";
            this.qrcodePicList[0].fileList = [{ name: picName, url: picUrl }];
            let picCard =
              this.$refs[this.qrcodePicList[0].key][0] &&
              this.$refs[this.qrcodePicList[0].key][0].$el;
            picCard.lastChild.style.display = "none";
          } else if (item.name === "app下载") {
            picName = "miniProgram";
            this.qrcodePicList[1].fileList = [{ name: picName, url: picUrl }];
            let picCard =
              this.$refs[this.qrcodePicList[1].key][0] &&
              this.$refs[this.qrcodePicList[1].key][0].$el;
            picCard.lastChild.style.display = "none";
          }
        }
      });
      console.log("this.qrcodePicList", this.qrcodePicList);
      this.contactTableList = contactTableList
        .filter(item => {
          return item.attachedAttrType !== "src";
        })
        .map(item => {
          item.isLink = item.attachedAttrType === "href";
          // item.linkAddr = item.attachedAttrValue;
          return item;
        });
      console.log("this.contactTableList", this.contactTableList);
    },
    queryShowedCustomSetting() {
      let url = this.queryShowedUrl;
      this.$http({
        url
      }).then(response => {
        let code = response.data.head && response.data.head.code;
        let data = response.data.data;
        if (code === 0 && data) {
          // 更新自定义设置
          this.setCustomSetting(data);
          console.log("data++++++++++++ updated", data);
        }
      });
    },
    queryCustomSetting() {
      let url = this.queryUrl;
      this.$http({
        url
      }).then(response => {
        let code = response.data.head && response.data.head.code;
        let data = response.data.data;
        if (code === 0 && data) {
          console.log("custom setting response", data);
          // this.isAdd = false; //修改模式
          this.initData = data;
          this.updateFormByInitData(data);
        }
      });
    }
  },
  mounted() {
    this.queryCustomSetting();
  }
};
</script>
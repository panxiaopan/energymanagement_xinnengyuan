export default {
  methods: {
    getCompleteImgUrl(url) {
      // var url = this.data && this.data.picUrl;
      var preUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        "/" +
        window.location.pathname.split("/")[1];
      if (url) {
        if (process.env.NODE_ENV === "production") {
          url = preUrl + url;
        } else {
          url = "." + url;
        }
      }
      return url
    }
  }
}
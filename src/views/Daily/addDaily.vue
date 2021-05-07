<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <fav-input placeholder="نام محصول" v-model="model.name" />
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <fav-input placeholder="قیمت محصول" v-model="model.price" />
                </div>

                <div class="col-lg-4 col-md-12 col-sm-12">
                  <fav-file-upload label="عکس محصول" @input="getMainPic" />
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-5">
                      <fieldset
                        class="form-label-group form-group position-relative has-icon-left "
                        v-for="(item, index) in specItem"
                        :key="index"
                      >
                        <input
                          type="text"
                          class="form-control"
                          id="product-synopsis"
                          v-model="item.name"
                          placeholder="عنوان ویژگی"
                          required
                        />
                      </fieldset>
                    </div>
                    <div class="col-5">
                      <fieldset
                        class="form-label-group form-group position-relative has-icon-left "
                        v-for="(item, index) in specItem"
                        :key="index"
                      >
                        <input
                          type="text"
                          class="form-control"
                          id="product-synopsis"
                          v-model="item.value"
                          placeholder="مقدار ویژگی"
                          required
                        />
                      </fieldset>
                    </div>
                    <div class="col-1">
                      <div
                        class="btn btn-success add-more-item"
                        @click="addSpecItem"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 mt-4">
                  <ckeditor
                    :editor="editor"
                    v-model="model.description"
                    :config="editorConfig"
                    class="textaeae"
                    id="editor"
                  ></ckeditor>
                </div>
              </div>
              <div class="row">
                <div class="btn-container mt-4 mb-2">
                  <div class="btn btn-primary" @click="addProduct">
                    افزودن محصول
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      name: null,
      description: null,
      editor: ClassicEditor,
      productCategory: [],
      editorConfig: {},
      productSubCategory: [],
      model: {
        image: null,
        name: null,
        price: null,
        description: null,
        details: [{ name: "", value: "" }],
        status: false
      },
      specItem: [{ name: "", value: "" }]
    };
  },
  created() {},
  methods: {
    async getMainPic(value) {
      let fd = new FormData();
      fd.append("image", value.files[0]);
      const response = await this.$ApiServiceLayer.post("upload", fd);
      if (response.filename) {
        this.$notify({
          group: "tc",
          type: "success",
          text: "ایکون با موفقیت بارگذاری شد!"
        });
        this.model.image = `http://api.appledailystore.com/upload/${response.filename}`;
      }
    },
    async addProduct() {
      this.model.details = this.specItem;
      const response = await this.$ApiServiceLayer.post(
        "daily/create",
        this.model
      );
      console.log(response);
      if (response.statusCode === 200) {
        this.$notify({
          group: "tc",
          type: "success",
          text: "محصول با موفقیت اضافه شد!"
        });
        this.$router.push({ path: "/daily" });
      }
    },
    addSpecItem() {
      this.specItem.push({ name: "", value: "" });
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  padding: 10px !important;
}
.btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-left: 20px;
}
</style>
<style>
.ck-editor__editable {
  min-height: 500px;
}
</style>

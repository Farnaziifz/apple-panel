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
                <div class="col-lg-1 col-md-12 col-sm-12">
                  <fav-checkbox label="دارای تخفیف" @inputChanged="discount" />
                </div>
                <div
                  class="col-lg-3 col-md-12 col-sm-12"
                  v-if="model.hasDiscount"
                >
                  <fav-input
                    placeholder="میزان تخفیف محصول"
                    v-model="model.discount"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-dropdown
                    :items="productCategory"
                    title="دسته بندی مرجع"
                    @input="setCat"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-dropdown
                    :items="productSubCategory"
                    title="دسته بندی محصول"
                    @input="setSubCat"
                  />
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <fav-file-upload label="عکس محصول" @input="getMainPic" />
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
        subCat_id: null,
        hasDiscount: false,
        image: null,
        name: null,
        price: null,
        discount: null,
        description: null,
        details: [{ name: "test", value: "salam" }]
      }
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const response = await this.$ApiServiceLayer.get("product-category");
      if (response.statusCode === 200) {
        response.productCategory.forEach(item => {
          this.productCategory.push({ text: item.name, value: item._id });
        });
      }
    },
    setCat(value) {
      this.getSubCat(value.value);
    },
    async getSubCat(id) {
      const response = await this.$ApiServiceLayer.get(
        `product-sub-category/${id}`
      );
      if (response.statusCode === 200) {
        response.subCategory.forEach(item => {
          this.productSubCategory.push({ text: item.name, value: item._id });
        });
      }
    },
    setSubCat(value) {
      this.model.subCat_id = value.value;
    },
    discount(value) {
      console.log("value", value.target.checked);
      this.model.hasDiscount = value.target.checked;
    },
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
      const response = await this.$ApiServiceLayer.post(
        "product/create",
        this.model
      );
      console.log(response);
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

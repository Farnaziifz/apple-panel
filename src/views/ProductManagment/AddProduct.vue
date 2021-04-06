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
                  <fav-input placeholder="نام محصول" v-model="name" />
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <fav-input placeholder="قیمت محصول" v-model="name" />
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <fav-input placeholder="میزان تخفیف محصول" v-model="name" />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-dropdown
                    :items="productCategory"
                    title="دسته بندی مرجع"
                    @input="setStatus"
                  />
                </div>
                <div class="col-12 mt-4">
                  <ckeditor
                    :editor="editor"
                    v-model="description"
                    :config="editorConfig"
                    class="textaeae"
                    id="editor"
                  ></ckeditor>
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
      editorConfig: {}
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const response = await this.$ApiServiceLayer.get("product-category");
      console.log(response);
      response.forEach(item => {
        this.productCategory.push({ text: item.name, value: item.id });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  padding: 10px !important;
}
</style>
<style>
.ck-editor__editable {
  min-height: 500px;
}
</style>

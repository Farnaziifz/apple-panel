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
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <fav-input v-model="title" label="عنوان مقاله" />
                </div>
                <div class="col-lg-8 col-md-6 col-sm-12">
                  <fav-input v-model="seo_desc" label="خلاصه مقاله" />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-dropdown
                    :items="blogStatus"
                    title="وضعیت مقاله"
                    @input="setStatus"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <fav-dropdown
                    :items="category"
                    title="دسته بندی مقاله"
                    @input="setCategory"
                  />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <fav-file-upload label="تصویر اصلی" @input="getMainPic" />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <fav-file-upload label="تصویر کوچگ" @input="getThum" />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <div class="img-container" v-if="MainUrl">
                    <div class="close-btn" @click="removeMain()">
                      <button class="btn btn-danger">X</button>
                    </div>
                    <img :src="MainUrl" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <div class="img-container" v-if="thumUrl">
                    <div class="close-btn" @click="removeMain()">
                      <button class="btn btn-danger">X</button>
                    </div>
                    <img :src="thumUrl" />
                  </div>
                </div>
                <div class="col-lg-12 col-md-6 col-sm-12">
                  <fav-multi-input title="تگ‌ها مقاله" @items="getItems" />
                </div>
                <div class="col-12">
                  <ckeditor
                    :editor="editor"
                    v-model="body"
                    :config="editorConfig"
                    class="textaeae"
                    id="editor"
                  ></ckeditor>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="btn-container">
                    <button class="btn btn-success" @click="addAdminBlog">
                      افزودن مقاله الماس
                    </button>
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
import UploadAdapter from "../../UploadAdapter";

export default {
  data() {
    return {
      title: "",
      category: [],
      editor: ClassicEditor,
      tags: null,
      body: "",
      editorData: "",
      selectedStatus: null,
      selectedCategory: null,
      seo_desc: null,
      MainUrl: "",
      mainUrlSelected: "",
      thumUrl: "",
      thumUrlSelected: "",
      blogStatus: [{ text: "فعال", value: 1 }, { text: "غیرفعال", value: 0 }],
      editorConfig: {
        // The configuration of the editor.
        extraPlugins: [this.uploader],
        image: {
          toolbar: ["imageTextAlternative", "ImageCaptio"],
        },
      },
    };
  },
  created() {
    this.getBlogCategory();
  },
  methods: {
    setStatus(value) {
      this.selectedStatus = value.value;
    },
    setCategory(value) {
      this.selectedCategory = value.value;
    },
    async getBlogCategory() {
      const response = await this.$ApiServiceLayer.get("articleCategory");
      response.data.forEach((item) => {
        this.category.push({ text: item.name, value: item.id });
      });
    },
    async getItems(value) {
      this.tags = value;
    },
    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    },
    async addAdminBlog() {
      let temptag = [];
      this.tags.forEach((el) => {
        temptag.push(el.item);
      });
      let fd = new FormData();
      fd.append("title", this.title);
      fd.append("body", this.body);
      fd.append("status", this.selectedStatus);
      fd.append("article_category_id", this.selectedCategory);
      fd.append("keywords", temptag);
      fd.append("image", this.mainUrlSelected);
      fd.append("thumbnail_image", this.thumUrlSelected);
      fd.append("seo_desc", this.seo_desc);
      const response = await this.$ApiServiceLayer.post("article", fd);
      if (response.responseCode === 200) {
        this.$router.push({ path: `/adminBlogList` });
        console.log(response);
      }
      if (response.status === 401) {
        for (let item in response.data.message) {
          console.log(item);
          this.$notify({
            group: "tc",
            type: "danger",
            text: `${response.data.message}.${item}`,
          });
        }
      }
    },
    getMainPic(value) {
      this.MainUrl = URL.createObjectURL(value.files[0]);
      this.mainUrlSelected = value.files[0];
    },
    getThum(value) {
      this.thumUrl = URL.createObjectURL(value.files[0]);
      this.thumUrlSelected = value.files[0];
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  padding: 10px !important;
}
.img-container {
  width: 100%;
  height: 200px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .close-btn {
    position: absolute;
    top: -10px;
    right: 0;
    .btn {
      min-width: 30px !important;
    }
  }
}
.btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}
</style>

<style>
.ck-editor__editable {
  min-height: 500px;
}
</style>

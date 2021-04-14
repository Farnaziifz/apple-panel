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
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <fav-input placeholder="عنوان پست" v-model="name" />
                </div>
                <div class="col-lg-12">
                  <fav-dropdown
                    :items="tags"
                    title="تگ مقاله"
                    @input="setTag"
                  />
                </div>
                <div class="items-container">
                  <div
                    class="item"
                    v-for="(item, index) in tagList"
                    :key="index"
                  >
                    <fav-chip
                      :text="item"
                      @iconClicked="iconClicked(item.id)"
                    />
                  </div>
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
              <div class="row mt-2">
                <div class="col-12">
                  <div class="btn-container">
                    <button class="btn btn-success" @click="addBlog">
                      افزودن مقاله
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
export default {
  data() {
    return {
      name: null,
      description: null,
      editor: ClassicEditor,
      productCategory: [],
      editorConfig: {},
      tags: [],
      tagList: []
    };
  },
  created() {
    this.getTags();
  },
  methods: {
    async getTags() {
      const response = await this.$ApiServiceLayer.get("blog-tags");
      if (response.statusCode === 200) {
        response.blogTags.forEach(item => {
          this.tags.push({ text: item.title, value: item._id });
        });
      }
    },
    setTag(value) {
      this.tagList.push(value.text);
    },
    async addBlog() {
      const response = await this.$ApiServiceLayer.post("blog/create", {
        title: this.name,
        description: this.description,
        tags: this.tagList
      });
      if (response.statusCode === 200) {
        this.$router.push({ path: "/blogList" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  padding: 10px !important;
}
.items-container {
  display: flex;
  margin-right: 40px;
  .item {
    margin-left: 10px;
  }
}
</style>
<style>
.ck-editor__editable {
  min-height: 500px;
}
</style>

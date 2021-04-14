<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <router-link to="/addBlog" class="btn btn-primary mb-2">
          افزودن بلاگ جدید
        </router-link>
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
              <fav-table-view>
                <template slot="TableTitle">
                  <tr>
                    <th v-for="(item, index) in tableTitle" :key="index">
                      <span v-if="item.title">{{ item.title }}</span>
                    </th>
                  </tr>
                </template>
                <template slot="TableBody">
                  <tr v-for="(item, index) in blogs" :key="item._id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.title }}
                    </td>
                    <td class="operation">
                      <router-link :to="`/editBlog/${item._id}`" tag="span"
                        ><i class="feather icon-edit"></i
                      ></router-link>
                      <span @click="showModal(item._id, item.title)"
                        ><i class="feather icon-trash-2"></i
                      ></span>
                      <span @click="showModal(item._id, item.title)"
                        ><i class="feather icon-list"></i
                      ></span>
                    </td>
                  </tr>
                </template>
              </fav-table-view>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fav-confirm-modal
      ref="confirmForDelete"
      @onConfirm="deleteUserItem"
      :title="deleteName"
      confirmTitle="حذف"
      confirmDescription="از حذف این رکورد اطمینان دارید؟"
      confirmBtn="بله حذف کن"
      cancelBtn="انصراف"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableTitle: [
        {
          title: "ردیف",
          name: "row"
        },
        {
          title: "عنوان بلاگ ",
          name: "unit-name"
        },
        {
          title: "عملیات",
          name: null
        }
      ],
      blogs: null,
      deleteName: null,
      deleteid: null
    };
  },
  created() {
    this.getBlog();
  },
  methods: {
    async getBlog() {
      const response = await this.$ApiServiceLayer.get("blog");
      if (response.statusCode === 200) {
        this.blogs = response.blogs;
      }
    },
    showModal(id, name) {
      this.deleteName = name;
      this.deleteid = id;
      this.$refs.confirmForDelete.openModal();
    },
    async deleteUserItem() {
      const response = await this.$ApiServiceLayer.delete(
        `blog/delete/${this.deleteid}`
      );
      console.log(response);
      if (response.statusCode === 200) {
        this.$refs.confirmForDelete.closeModal();
        this.getBlog();
        this.$notify({
          group: "tc",
          type: "success",
          text: "پست با موفقیت ویرایش شد!"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 10px !important;
}
.operation {
  i {
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
}
.image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}
</style>

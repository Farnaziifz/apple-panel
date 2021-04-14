<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div @click="openAddModal" class="btn btn-primary mb-2">
          افزودن تگ جدید
        </div>
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
                  <tr v-for="(item, index) in tags" :key="item._id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.title }}
                    </td>
                    <td class="operation">
                      <span @click="showEditModal(item._id, item.title)"
                        ><i class="feather icon-edit"></i
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
    <fav-modal ref="addModal">
      <template slot="mnx-header">
        <h5 class="dark">تگ جدید اضافه کنید</h5>
      </template>
      <template slot="mnx-body">
        <fav-input placeholder="نام تگ" v-model="title" />
      </template>
      <template slot="mnx-footer">
        <div class="btn-container">
          <button class="btn btn-success" @click="addTag">
            افزودن تگ
          </button>
        </div>
      </template>
    </fav-modal>
    <fav-modal ref="EditModal">
      <template slot="mnx-header">
        <h5 class="dark">تک زیر را ویرایش کنید</h5>
      </template>
      <template slot="mnx-body">
        <fav-input placeholder="نام تگ" v-model="editname" />
      </template>
      <template slot="mnx-footer">
        <div class="btn-container">
          <button class="btn btn-success" @click="editTag">
            افزودن تگ
          </button>
        </div>
      </template>
    </fav-modal>
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
          title: "تگ بلاگ ",
          name: "unit-name"
        },
        {
          title: "عملیات",
          name: null
        }
      ],
      tags: null,
      title: null,
      editname: null,
      editId: null
    };
  },
  created() {
    this.getBlogTag();
  },
  methods: {
    async getBlogTag() {
      const response = await this.$ApiServiceLayer.get("blog-tags");
      if (response.statusCode === 200) {
        this.tags = response.blogTags;
      }
    },
    openAddModal() {
      this.$refs.addModal.open();
    },
    async addTag() {
      const response = await this.$ApiServiceLayer.post("blog-tags/create", {
        title: this.title
      });
      if (response.statusCode === 200) {
        this.$refs.addModal.close();
        this.getBlogTag();
        this.$notify({
          group: "tc",
          type: "success",
          text: "تگ با موفقیت افوزده شد!"
        });
      }
    },
    showEditModal(id, name) {
      this.$refs.EditModal.open();
      this.editname = name;
      this.editId = id;
    },
    async editTag() {
      const response = await this.$ApiServiceLayer.put(
        `blog-tags/update/${this.editId}`,
        {
          title: this.editname
        }
      );
      console.log(response);
      if (response.statusCode === 200) {
        this.$refs.EditModal.close();
        this.getBlogTag();
        this.$notify({
          group: "tc",
          type: "success",
          text: "تگ با موفقیت ویرایش شد!"
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

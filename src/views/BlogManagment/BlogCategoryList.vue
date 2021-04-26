<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div @click="addCategory" class="btn btn-primary mb-2">
          افزودن دسته‌بندی جدید
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
                  <tr v-for="(item, index) in data" :key="item._id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td class="operation">
                      <span @click="openEdit(item._id, item.name)" tag="span">
                        <i class="feather icon-edit"></i>
                      </span>
                      <span @click="showModal(item._id, item.name)"
                        ><i class="feather icon-trash-2"></i
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
        <h5 class="dark">دسته‌بندی جدید جدید اضافه کنید</h5>
      </template>
      <template slot="mnx-body">
        <fav-input placeholder="نام دسته‌بندی جدید" v-model="title" />
      </template>
      <template slot="mnx-footer">
        <div class="btn-container">
          <button class="btn btn-success" @click="add">
            افزودن دسته‌بندی جدید
          </button>
        </div>
      </template>
    </fav-modal>
    <fav-modal ref="EditModal">
      <template slot="mnx-header">
        <h5 class="dark">دسته‌بندی زیر را ویرایش کنید</h5>
      </template>
      <template slot="mnx-body">
        <fav-input placeholder="نام دسته‌بندی" v-model="editName" />
      </template>
      <template slot="mnx-footer">
        <div class="btn-container">
          <button class="btn btn-warning" @click="editTag">
            ویرایش دسته‌بندی
          </button>
        </div>
      </template>
    </fav-modal>
    <fav-confirm-modal
      ref="confirmForDelete"
      @onConfirm="deleteUserItem"
      :title="itemName"
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
      data: null,
      tableTitle: [
        {
          title: "ردیف",
          name: "row"
        },
        {
          title: "عنوان دسته بندی ",
          name: "unit-name"
        },
        {
          title: "عملیات",
          name: null
        }
      ],
      title: null,
      editName: null,
      itemForEdit: null,
      itemName: null,
      itemForDelete: null
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const response = await this.$ApiServiceLayer.get("blog-categories");
      if (response.statusCode === 200) {
        this.data = response.blogCategory;
      }
    },
    addCategory() {
      this.$refs.addModal.open();
    },
    async add() {
      const response = await this.$ApiServiceLayer.post(
        "blog-categories/create",
        {
          name: this.title
        }
      );
      if (response.statusCode === 200) {
        this.$refs.addModal.close();
        this.getCategory();
      }
    },
    openEdit(id, name) {
      this.$refs.EditModal.open();
      this.itemForEdit = id;
      this.editName = name;
    },
    async editTag() {
      const response = await this.$ApiServiceLayer.put(
        `blog-categories/delete/${this.itemForEdit}`,
        { name: this.editName }
      );
      console.log(response);
      if (response.statusCode === 200) {
        this.$refs.EditModal.close();
        this.getCategory();
      }
    },
    showModal(id, name) {
      this.itemForDelete = id;
      this.itemName = name;
      this.$refs.confirmForDelete.openModal();
    },
    async deleteUserItem() {
      const response = await this.$ApiServiceLayer.delete(
        `blog-categories/${this.itemForDelete}`
      );
      console.log(response);
      if (response.statusCode === 200) {
        this.$refs.confirmForDelete.closeModal();
        this.getCategory();
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

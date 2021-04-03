<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <button class="btn btn-primary mb-2" @click="openAddModal">
          افزودن ویژگی مرجع جدید
        </button>
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
                  <tr v-for="(item, index) in gpAttr" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.description }}
                    </td>
                    <td>
                      {{ item.category.name }}
                    </td>
                    <td class="operation">
                      <span @click="showModal(item.id, item.name)"
                        ><i class="feather icon-trash-2"></i
                      ></span>
                    </td>
                  </tr>
                </template>
              </fav-table-view>
              <fav-modal ref="addModal">
                <template slot="mnx-header">
                  <h5 class="dark">دسته بندی جدید اضافه کنید</h5>
                </template>
                <template slot="mnx-body">
                  <fav-input placeholder="نام ویژگی مرجع" v-model="gpCatName" />
                  <fav-input
                    placeholder="نشانک ویژگی مرجع"
                    v-model="gpCatSlug"
                  />
                  <fav-dropdown
                    palceholder="دسته بندی محصول"
                    :items="cetagory"
                    @input="getCat"
                  />
                </template>
                <template slot="mnx-footer">
                  <div class="btn-container">
                    <button class="btn btn-success" @click="addGPCategory">
                      افزودن ویژگی مرجع
                    </button>
                  </div>
                </template>
              </fav-modal>
              <fav-confirm-modal
                ref="confirmForDelete"
                @onConfirm="deleteAttrItem"
                :title="itemName"
                confirmTitle="حذف"
                confirmDescription="از حذف این رکورد اطمینان دارید؟"
                confirmBtn="بله حذف کن"
                cancelBtn="انصراف"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :is-full-page="true"></loading>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gpAttr: null,
      tableTitle: [
        {
          title: "ردیف",
          name: "row",
        },
        {
          title: "نام ویژگی ",
          name: "unit-name",
        },
        {
          title: "توضیحات ",
          name: "unit-name",
        },
        {
          title: "نام دسته بندی ",
          name: "unit-name",
        },
        {
          title: "عملیات",
          name: null,
        },
      ],
      cetagory: [],
      gpCatSlug: "",
      gpCatName: "",
      category_id: null,
      itemName: "",
      itemForDelete: null,
      isLoading: false,
    };
  },
  created() {
    this.getGpAttr();
    this.getCategory();
  },
  methods: {
    async getGpAttr() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get("group_attribute");
      if (response.responseCode === 200) {
        this.isLoading = false;
        this.gpAttr = response.data;
      }
    },
    async getCategory() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get("category");
      if (response.responseCode === 200) {
        this.isLoading = false;
        response.data.forEach((item) => {
          this.cetagory.push({ text: item.name, value: item.id });
        });
      }
    },
    showModal(id, name) {
      this.itemForDelete = id;
      this.itemName = name;
      this.$refs.confirmForDelete.openModal();
    },
    async deleteAttrItem() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.delete(
        `group_attribute/${this.itemForDelete}`
      );
      if (response.responseCode === 200) {
        this.isLoading = false;
        this.$refs.confirmForDelete.closeModal();
        this.getGpAttr();
      }
    },
    openEditModal() {},
    openAddModal() {
      this.$refs.addModal.open();
    },
    getCat(value) {
      this.category_id = value.value;
    },
    async addGPCategory() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.post("group_attribute", {
        name: this.gpCatName,
        description: this.gpCatSlug,
        category_id: this.category_id,
      });
      if (response.responseCode === 200) {
        this.isLoading = false;
        this.$notify({
          group: "tc",
          type: "success",
          text: "ویژگی مرجع مورد نظر با موفقیت اضافه شد!",
        });
        this.$refs.addModal.close();
      }
    },
  },
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
</style>

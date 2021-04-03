<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div>
          <button class="btn btn-primary mb-2" @click="openAddModal">
            افزودن دسته بندی مرجع جدید
          </button>
        </div>
        <div class="row" id="basic-table">
          <div class="col-12">
            <div class="card">
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
                        <tr v-for="(item, index) in gpData" :key="item.id">
                          <td>
                            {{ index + 1 }}
                          </td>
                          <td>
                            {{ item.name }}
                          </td>

                          <td>
                            {{ item.slug }}
                          </td>

                          <td>
                            <button
                              class="btn btn-success"
                              v-if="item.status === 1"
                            >
                              فعال
                            </button>
                            <button
                              class="btn btn-danger"
                              v-if="item.status === 0"
                            >
                              غیرفعال
                            </button>
                          </td>
                          <td class="operation">
                            <router-link
                              :to="`/productGroupCategory/${item.id}`"
                              tag="span"
                              @click="goToCatList(item.id)"
                              ><i class="feather icon-layers"></i
                            ></router-link>
                            <span @click="showModal(item.id, item.name)"
                              ><i class="feather icon-trash-2"></i
                            ></span>
                            <span @click="openEditModal(item.id, item.name)"
                              ><i class="feather icon-edit"></i
                            ></span>
                          </td>
                        </tr>
                      </template>
                    </fav-table-view>
                  </div>
                </div>
                <fav-modal ref="addModal">
                  <template slot="mnx-header">
                    <h5 class="dark" v-if="isEdit">ویرایش دسته بندی</h5>
                    <h5 class="dark" v-else>دسته بندی جدید اضافه کنید</h5>
                  </template>
                  <template slot="mnx-body">
                    <fav-input
                      placeholder="نام دسته بندی مرجع"
                      v-model="gpCatName"
                    />
                    <fav-input
                      placeholder="نشانک دسته بندی مرجع"
                      v-model="gpCatSlug"
                    />
                  </template>
                  <template slot="mnx-footer">
                    <div class="btn-container">
                      <button
                        class="btn btn-warning"
                        @click="editGPCategory"
                        v-if="isEdit"
                      >
                        ویرایش دسته بندی مرجع
                      </button>
                      <button
                        class="btn btn-success"
                        @click="addGPCategory"
                        v-else
                      >
                        افزودن دسته بندی مرجع
                      </button>
                    </div>
                  </template>
                </fav-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fav-confirm-modal
      ref="confirmForDelete"
      @onConfirm="deleteProductItem"
      :title="itemName"
      confirmTitle="حذف"
      confirmDescription="از حذف این رکورد اطمینان دارید؟"
      confirmBtn="بله حذف کن"
      cancelBtn="انصراف"
    />
    <div class="vld-parent">
      <loading :active.sync="isLoading" :is-full-page="true"></loading>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableTitle: [
        {
          title: "ردیف",
          name: "row",
        },
        {
          title: "نام دسته بندی مرجع",
          name: "unit-name",
        },

        {
          title: "نشانک دسته بندی مرجع",
          name: "unit-name",
        },
        {
          title: "وضعیت",
          name: "unit-name",
        },

        {
          title: "عملیات",
          name: null,
        },
      ],
      gpData: null,
      gpCatName: "",
      gpCatSlug: "",
      gpCatUrl: "",
      gpCatUrlSelected: "",
      itemName: "",
      itemForDelet: null,
      isEdit: false,
      itemForEdit: null,
      isLoading: false,
    };
  },
  created() {
    this.getGPCategory();
  },
  methods: {
    async getGPCategory() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get("group_category");
      if (response.responseCode) {
        this.gpData = response.data;
        this.isLoading = false;
      }
    },
    openAddModal() {
      this.isEdit = false;
      this.$refs.addModal.open();
    },

    async addGPCategory() {
      let fd = new FormData();
      fd.append("name", this.gpCatName);
      fd.append("slug", this.gpCatSlug);
      const response = await this.$ApiServiceLayer.post("group_category", fd);
      this.$refs.addModal.close();
      this.getGPCategory();
    },
    showModal(id, name) {
      this.itemName = name;
      this.itemForDelet = id;
      this.$refs.confirmForDelete.openModal();
    },
    async deleteProductItem() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.delete(
        `group_category/${this.itemForDelet}`
      );
      if (response.responseCode === 200) {
        this.isLoading = false;
        this.$notify({
          group: "tc",
          type: "danger",
          text: "دسته بندی با موفقیت حذف شد شد!",
        });
        this.$refs.confirmForDelete.closeModal();
        this.getGPCategory();
      }
    },
    goToCatList(id) {},
    async getGPCatItem(id) {
      const response = await this.$ApiServiceLayer.get(`group_category/${id}`);
      if (response.responseCode === 200) {
        this.gpCatName = response.data.name;
        this.gpCatSlug = response.data.slug;
      }
    },
    openEditModal(id, name) {
      this.getGPCatItem(id);
      this.itemForEdit = id;
      this.isEdit = true;
      this.$refs.addModal.open();
    },
    async editGPCategory() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.post(
        `group_category/${this.itemForEdit}?_method=PUT`,
        { name: this.gpCatName, slug: this.gpCatSlug }
      );
      if (response.responseCode) {
        this.isLoading = false;
        this.$notify({
          group: "tc",
          type: "primary",
          text: "دسته بندی با موفقیت ویرایش شد!",
        });
        this.$refs.addModal.close();
        this.isEdit = false;
        this.getGPCategory();
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

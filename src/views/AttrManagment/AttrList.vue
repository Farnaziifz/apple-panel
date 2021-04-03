<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <button class="btn btn-primary mb-2" @click="openAddModal">
          افزودن ویژگی محصول جدید
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
                  <tr v-for="(item, index) in attribute" :key="item.id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.category }}
                    </td>
                    <td>
                      {{ item.group_attribute }}
                    </td>
                    <td class="operation">
                      <router-link
                        :to="`/addAttrOptiond/${item.id}`"
                        tag="span"
                        v-if="item.type === 2"
                        ><i class="feather icon-plus"></i
                      ></router-link>
                    </td>
                    <td class="operation">
                      <span @click="showModal(item.id, item.name)"
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
      <fav-modal ref="addModal">
        <template slot="mnx-header">
          <h5 class="dark">ویژگی جدید اضافه کنید</h5>
        </template>
        <template slot="mnx-body">
          <fav-input placeholder="نام ویژگی" v-model="attName" />
          <fav-dropdown
            palceholder="ویژگی مرجع"
            :items="gpAttr"
            @input="getAtt"
          />
          <fav-dropdown
            palceholder="نوع ویژگی"
            :items="type"
            @input="getType"
          />
        </template>
        <template slot="mnx-footer">
          <div class="btn-container">
            <button class="btn btn-success" @click="addAttr">
              افزودن ویژگی
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
    <div class="vld-parent">
      <loading :active.sync="isLoading" :is-full-page="true"></loading>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      attName: null,
      gpAttr: [],
      type: [{ value: 1, text: "ورودی" }, { value: 2, text: "دراپ داون" }],
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
          title: "نام دسته بندی ",
          name: "unit-name",
        },
        {
          title: "نام ویژگی مرجع ",
          name: "unit-name",
        },
        {
          title: "افزودن ایتم ",
          name: "unit-name",
        },
        {
          title: "عملیات",
          name: null,
        },
      ],
      attribute: null,
      isLoading: false,
      selectedGPAttr: null,
      selectType: null,
      itemName: "",
      itemForDelete: null,
    };
  },
  created() {
    this.getAttrList();
    this.getGpAttr();
  },

  methods: {
    async getAttrList() {
      this.isLoading = true;
      const response = await this.$ApiServiceLayer.get("attribute");
      if (response.responseCode === 200) {
        this.isLoading = false;
        this.attribute = response.data;
      }
    },
    async getGpAttr() {
      const response = await this.$ApiServiceLayer.get("group_attribute");
      if (response.responseCode === 200) {
        response.data.forEach((item) => {
          this.gpAttr.push({ text: item.name, value: item.id });
        });
      }
    },
    openAddModal() {
      this.$refs.addModal.open();
    },
    getAtt(value) {
      this.selectedGPAttr = value.value;
    },
    getType(value) {
      this.selectType = value.value;
    },
    showModal(id, name) {
      this.itemForDelete = id;
      this.itemName = name;
      this.$refs.confirmForDelete.openModal();
    },
    async deleteAttrItem() {
      const response = await this.$ApiServiceLayer.delete(
        `attribute/${this.itemForDelete}`
      );
      console.log(response);
      if (response.responseCode === 200) {
        this.getAttrList();
        this.$notify({
          group: "tc",
          type: "danger",
          text: "ویژگی مورد نظر با موفقیت حذف شد!",
        });
      }
    },
    async addAttr() {
      let fd = new FormData();
      fd.append("name", this.attName);
      fd.append("group_attribute_id", this.selectedGPAttr);
      fd.append("type", Number(this.selectType));
      const response = await this.$ApiServiceLayer.post("attribute", fd);
      if (response.responseCode === 200) {
        this.$refs.addModal.close();
        this.getAttrList();
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

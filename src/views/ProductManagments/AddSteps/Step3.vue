<template>
  <div class="step-3 container border rounded p-2">
    <h6>
      اضافه کردن ویژگی‌های محصول با دسته بندی "<span>{{ category }}</span
      >"
    </h6>
    <div class="form mt-4">
      <div class="row">
        <div
          class="col-lg-12 col-mg-12 col-sm-12"
          v-for="item in attrs"
          :key="item.id"
        >
          <h6 class="title">{{ item.name }}</h6>
          <div class="form-container mt-2">
            <div
              class="form-item d-flex"
              v-for="el in item.attributes"
              :key="el.id"
            >
              <fav-input
                type="text"
                :label="el.name"
                v-if="el.type === 1"
                class="inp-item"
                @change="getvalueInp"
              />
              <fav-attr-drp
                :title="el.name"
                v-if="el.type === 2"
                :items="el.options"
                @input="getSelectedItem"
                class="inp-item"
              />
              <button class="btn btn-primary" @click="addAtt(el.id)">
                افزودن ویژگی
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <h6 class="title">جدول ویژگی‌ها</h6>
          <fav-table-view>
            <template slot="TableTitle">
              <tr>
                <th v-for="(item, index) in tableTitle" :key="index">
                  <span v-if="item.title">{{ item.title }}</span>
                </th>
              </tr>
            </template>
            <template slot="TableBody">
              <tr v-for="(item, index) in attList" :key="item.attribute_id">
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  {{ item.attribute }}
                </td>
                <td>
                  {{ item.value }}
                </td>
                <td class="operation">
                  <span @click="showModal(item.attribute_id, item.value)"
                    ><i class="feather icon-trash-2"></i
                  ></span>
                </td>
              </tr>
            </template>
          </fav-table-view>
          <fav-confirm-modal
            ref="confirmForDelete"
            @onConfirm="deleteItem"
            :title="itemName"
            confirmTitle="حذف"
            confirmDescription="از حذف این رکورد اطمینان دارید؟"
            confirmBtn="بله حذف کن"
            cancelBtn="انصراف"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="btn-container">
            <button class="btn btn-info" @click="AddAndGo">
              ثبت ویژگی‌های محصول و مرحله بعد
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: null,
      category_id: null,
      attrs: null,
      valueInp: "",
      tableTitle: [
        {
          title: "ردیف",
          name: "row",
        },
        {
          title: "نام آیتم",
          name: "row",
        },
        {
          title: "مقدار",
          name: "row",
        },
        {
          title: "عملیات",
          name: "row",
        },
      ],
      attList: null,
      itemForDelete: null,
      itemName: null,
    };
  },
  created() {
    this.getCategory();
    this.getAllAttrAdded();
  },
  methods: {
    async getCategory() {
      const response = await this.$ApiServiceLayer.get(
        `product/${this.$route.params.pId}`
      );
      if (response.responseCode === 200) {
        this.category = response.data.category_name;
        this.category_id = response.data.category_id;
        this.getAttrWithCat();
      }
    },
    async getAttrWithCat() {
      const response = await this.$ApiServiceLayer.get(
        `get-attributes-product/${this.$route.params.pId}`
      );
      if (response.responseCode === 200) {
        this.attrs = response.data;
      }
    },
    getSelectedItem(value) {
      this.valueInp = value.id;
    },
    getvalueInp(e) {
      this.valueInp = e.target.value;
    },
    async addAtt(id) {
      let fd = new FormData();
      fd.append("product_id", this.$route.params.pId);
      fd.append("attribute_id", id);
      fd.append("value", this.valueInp);
      const response = await this.$ApiServiceLayer.post(
        "add-attribute-to-product",
        fd
      );

      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "success",
          text: "آیتم مورد نظر با موفقیت افزوده شد!",
        });
        this.getAllAttrAdded();
      }
    },
    async getAllAttrAdded() {
      const response = await this.$ApiServiceLayer.get(
        `get-attribute-values-with-product-id/${this.$route.params.pId}`
      );
      if (response.responseCode === 200) {
        this.attList = response.data;
      }
    },
    showModal(id, name) {
      this.$refs.confirmForDelete.openModal();
      this.itemForDelete = id;
      this.itemName = name;
    },
    async deleteItem() {
      let fd = new FormData();
      fd.append("product_id", this.$route.params.pId);
      fd.append("attribute_id", Number(this.itemForDelete));
      const response = await this.$ApiServiceLayer.post(
        "remove-attribute-from-product",
        fd
      );
      if (response.responseCode === 200) {
        this.$notify({
          group: "tc",
          type: "danger",
          text: "آیتم مورد نظر با موفقیت حذف شد!",
        });
        this.getAllAttrAdded();
      }
    },
    AddAndGo() {
      this.$emit("step", 4);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 10px;
}
.form-container {
  width: 100%;
  .form-item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .inp-item {
      width: 100%;
    }
    button {
      width: 200px;
      margin-right: 10px;
    }
  }
}

.operation {
  i {
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.btn-container {
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
}
</style>

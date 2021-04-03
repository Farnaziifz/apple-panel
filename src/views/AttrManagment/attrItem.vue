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
                <div class="col-lg-12 col-sm-12">
                  <fav-input placeholder="مقدار" v-model="value" />
                </div>
                <div class="col-lg-12 col-sm-12">
                  <div class="btn btn-primary" @click="addValue">افزودن</div>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-12">
                  <fav-table-view>
                    <template slot="TableTitle">
                      <tr>
                        <th v-for="(item, index) in tableTitle" :key="index">
                          <span v-if="item.title">{{ item.title }}</span>
                        </th>
                      </tr>
                    </template>
                    <template slot="TableBody">
                      <tr v-for="(item, index) in datas" :key="item.id">
                        <td>
                          {{ index + 1 }}
                        </td>
                        <td>
                          {{ item.attribute_option_value }}
                        </td>
                        <td v-if="item.price[0]">
                          {{ item.price[0].price }}
                        </td>
                        <td v-else>-</td>

                        <td v-if="item.price[0]">
                          <div class="btn btn-info">ویرایش قیمت</div>
                        </td>
                        <td v-else>
                          <div class="btn btn-primary">افزودن قیمت</div>
                        </td>
                        <td class="operation">
                          <span
                            @click="
                              showModal(item.id, item.attribute_option_value)
                            "
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
      </div>
    </div>
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
</template>

<script>
export default {
  data() {
    return {
      value: "",
      datas: null,
      tableTitle: [
        {
          title: "ردیف",
          name: "row",
        },
        {
          title: "مقدار ",
          name: "unit-name",
        },
        {
          title: "قیمت ",
          name: "unit-name",
        },
        {
          title: "عملیات قیمت ",
          name: "unit-name",
        },

        {
          title: "عملیات",
          name: null,
        },
      ],
      itemName: "",
      itemForDelete: null,
    };
  },
  created() {
    this.getValues();
  },
  methods: {
    async getValues() {
      const response = await this.$ApiServiceLayer.get(
        `attribute_option_with_attribute_id/${this.$route.params.id}`
      );
      if (response.responseCode === 200) {
        this.datas = response.data;
      }
    },
    async addValue() {
      const response = await this.$ApiServiceLayer.post("attribute_option", {
        attribute_id: this.$route.params.id,
        attribute_option_value: this.value,
      });
      if (response.responseCode === 200) {
        this.getValues();
        this.value = "";
      }
    },
    showModal(id, name) {
      this.itemForDelete = id;
      this.itemName = name;
      this.$refs.confirmForDelete.openModal();
    },
    async deleteAttrItem() {
      const response = await this.$ApiServiceLayer.delete(
        `attribute_option/${this.itemForDelete}`
      );
      if (response.responseCode === 200) {
        this.getValues();
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

<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <router-link to="/addProduct" tag="button" class="btn btn-primary mb-2">
          افزودن محصول جدید
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
                  <tr v-for="(item, index) in product" :key="item._id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>axxxx</td>
                    <td>{{ item.price | toPersianCurrency("تومان", 0) }}</td>
                    <td v-if="item.hasDiscount">{{ item.dicount }} درصد</td>
                    <td v-else>بدون تخفیف</td>
                    <td class="operation">
                      <span @click="showModal(item.id, item.name)"
                        ><i class="feather icon-trash-2"></i
                      ></span>
                      <span @click="openEditModal(item.id, item.name)"
                        ><i class="feather icon-edit"></i
                      ></span>
                      <router-link :to="`/subCategory/${item._id}`" tag="span"
                        ><i class="feather icon-list"></i
                      ></router-link>
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
          title: "نام محصول ",
          name: "unit-name"
        },
        {
          title: "عکس محصول ",
          name: "unit-name"
        },
        {
          title: "قیمت محصول ",
          name: "unit-name"
        },
        {
          title: "میزان تخفبف محصول ",
          name: "unit-name"
        },
        {
          title: "عملیات",
          name: null
        }
      ],
      product: null
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      const response = await this.$ApiServiceLayer.get("product");
      console.log(response);
      this.product = response;
    },
    showModal() {},
    openEditModal() {}
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
</style>

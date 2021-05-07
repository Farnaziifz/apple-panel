<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <router-link to="/add-daily" class="btn btn-primary mb-2">
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
                  <tr v-for="(item, index) in daily" :key="item._id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td><img :src="item.image" alt="" class="img" /></td>
                    <td>{{ item.price | toPersianCurrency("تومان", 0) }}</td>
                    <td @click="changeStatus(item.status, item._id)">
                      <span class="btn btn-success" v-if="item.status"
                        >فعال</span
                      >
                      <span class="btn btn-danger" v-else>غیر فعال</span>
                    </td>
                    <td class="operation">
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
          title: "وضعیت نمایش ",
          name: "unit-name"
        },
        {
          title: "عملیات",
          name: null
        }
      ],
      daily: null
    };
  },
  created() {
    this.getDaily();
  },
  methods: {
    async getDaily() {
      const response = await this.$ApiServiceLayer.get("daily");
      console.log(response);
      if (response.statusCode === 200) {
        this.daily = response.daily;
      }
    },
    async changeStatus(status, id) {
      console.log(status);
      let sts = false;
      if (status) {
        sts = false;
      } else {
        sts = true;
      }
      const response = await this.$ApiServiceLayer.put(`daily/update/${id}`, {
        status: sts
      });
      console.log(response);
      if (response.statusCode === 200) {
        this.getDaily();
        this.$notify({
          group: "tc",
          type: "infot",
          text: "وضعیت با موفقیت به روزرسانی شد!"
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
</style>

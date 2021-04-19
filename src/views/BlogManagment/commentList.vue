<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
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
                  <tr v-for="(item, index) in comment" :key="item._id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.username }}
                    </td>
                    <td>
                      {{ item.phone }}
                    </td>
                    <td class="operation">
                      <span @click="changeStatus(item._id, item.status)"
                        ><button
                          class="btn btn-danger"
                          v-if="item.status === false"
                        >
                          عدم نمایش
                        </button></span
                      >
                      <span @click="changeStatus(item._id, item.status)"
                        ><button
                          class="btn btn-success"
                          v-if="item.status === true"
                        >
                          نمایش
                        </button></span
                      >
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
          title: "نام ",
          name: "unit-name"
        },
        {
          title: "شماره تماس ",
          name: "unit-name"
        },
        {
          title: "عملیات",
          name: null
        }
      ],
      comment: null
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    async getComment() {
      const response = await this.$ApiServiceLayer.get(
        `blog-comment/comment/${this.$route.params.id}`
      );
      if (response.statusCode === 200) {
        this.comment = response.commnet;
      }
    },
    async changeStatus(id, status) {
      let sts = false;
      if (status === false) {
        sts = true;
      }
      const response = await this.$ApiServiceLayer.put(
        `blog-comment/update/${id}`,
        {
          status: sts
        }
      );
      if (response.statusCode === 200) {
        this.$notify({
          group: "tc",
          type: "success",
          text: "ایتم با موفقیت ویرایش شد!"
        });
        this.getComment();
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

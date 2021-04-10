<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-body">
        <div @click="openAddModal" class="btn btn-primary mb-2">
          افزودن اسلایدر جدید
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
                  <tr v-for="(item, index) in slider" :key="item._id">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      {{ item.title }}
                    </td>
                    <td>{{ item.description }}</td>
                    <td><img :src="item.image" alt="" class="image" /></td>
                    <td class="operation">
                      <span @click="showModal(item._id, item.title)"
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
    <fav-confirm-modal
      ref="confirmForDelete"
      @onConfirm="deleteSlider"
      :title="itemName"
      confirmTitle="حذف"
      confirmDescription="از حذف این رکورد اطمینان دارید؟"
      confirmBtn="بله حذف کن"
      cancelBtn="انصراف"
    />
    <fav-modal ref="addModal">
      <template slot="mnx-header">
        <h5 class="dark">اسلایدر جدید اضافه کنید</h5>
      </template>
      <template slot="mnx-body">
        <fav-input placeholder="تایتل اسلایدر" v-model="title" />
        <fav-input placeholder="توضیحات اسلایدر" v-model="desc" />
        <fav-file-upload label="تصویر اسلایدر" @input="getMainPic" />
      </template>
      <template slot="mnx-footer">
        <div class="btn-container">
          <button class="btn btn-success" @click="addSlider">
            افزودن اسلایدر
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
          title: "تایتل اسلایدر ",
          name: "unit-name"
        },
        {
          title: "توضیحات اسلایدر ",
          name: "unit-name"
        },
        {
          title: "عکس اسلایدر ",
          name: "unit-name"
        },

        {
          title: "عملیات",
          name: null
        }
      ],
      slider: null,
      itemName: null,
      itemForDelet: null,
      title: null,
      desc: null,
      imageUrl: null
    };
  },
  created() {
    this.getSlider();
  },
  methods: {
    async getSlider() {
      const response = await this.$ApiServiceLayer.get("home-slider");
      this.slider = response;
    },
    async deleteSlider() {
      const response = await this.$ApiServiceLayer.delete(
        `home-slider/delete/${this.itemForDelet}`
      );
      console.log(response);
      if (response.statusCode === 200) {
        this.$notify({
          group: "tc",
          type: "danger",
          text: "اسلایدر با موفقیت حذف شد شد!"
        });
        this.$refs.confirmForDelete.closeModal();
        this.getSlider();
      }
    },
    showModal(id, name) {
      this.itemName = name;
      this.itemForDelet = id;
      this.$refs.confirmForDelete.openModal();
    },
    openAddModal() {
      this.$refs.addModal.open();
    },
    async addSlider() {
      const response = await this.$ApiServiceLayer.post("home-slider/create", {
        title: this.title,
        description: this.desc,
        image: this.imageUrl
      });
      if (response.statusCode === 200) {
        this.$refs.addModal.close();
        this.getSlider();
        this.$notify({
          group: "tc",
          type: "success",
          text: "اسلایدر با موفقیت افوزده شد!"
        });
      }
    },
    async getMainPic(value) {
      let fd = new FormData();
      fd.append("image", value.files[0]);
      const response = await this.$ApiServiceLayer.post("upload", fd);
      if (response.filename) {
        this.$notify({
          group: "tc",
          type: "success",
          text: "تصویر با موفقیت بارگذاری شد!"
        });
        this.imageUrl = `http://api.appledailystore.com/upload/${response.filename}`;
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

<template>
  <fav-modal ref="confirmModal" :style="{ textAlign: 'center' }">
    <template slot="mnx-header">
      <div class="icon-container">
        <i class="feather icon-x" @click="cancel()"></i>
      </div>
      <div class="modal-confirm-title">{{ confirmTitle }}</div>
      <div v-if="title" class="modal-title">{{ title }}</div>
      <div class="modal-description">{{ confirmDescription }}</div>
    </template>
    <template slot="mnx-footer">
      <div class="buttons-container">
        <button @click="confirm()" class="btn btn btn-danger">
          {{ confirmBtn }}
        </button>
        <button @click="cancel()" class="btn btn btn-gray">
          {{ cancelBtn }}
        </button>
      </div>
    </template>
  </fav-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    confirmTitle: {
      type: String,
    },
    confirmBtn: {
      type: String,
    },
    cancelBtn: {
      type: String,
    },
    confirmDescription: {
      type: String,
      default: "آیا از انجام این عملیات اطمینان دارید؟",
    },
    mode: {
      default: "success",
      type: String,
      // mode can be success or danger
    },
  },
  data() {
    return {};
  },
  methods: {
    openModal() {
      this.$refs.confirmModal.open();
    },
    closeModal() {
      this.$refs.confirmModal.close();
    },
    confirm() {
      this.$emit("onConfirm");
      this.closeModal();
    },
    cancel() {
      this.$emit("onCancel");
      this.closeModal();
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.modal-confirm-title {
  font-weight: bold;
  font-size: 1.5rem;
  padding: 1.5rem 0;
  color: #e63233;
}

.modal-title {
  font-weight: bold;
  font-size: 1.15rem;
  padding: 0.5rem 0;
  color: #2c3e50;
}

.modal-description {
  padding-top: 10px;
}

.buttons-container {
  display: flex;
  justify-content: space-around;
  padding-top: 16px;

  .btn {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin: 0 1.5rem;
    font-size: 0.85rem;
  }

  .btn-gray {
    background-color: #6b6b6b;
    color: #fff;
  }
}

.icon-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 22px;
  cursor: pointer;
}
</style>

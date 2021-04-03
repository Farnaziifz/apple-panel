<template>
  <div class="content-header row">
    <div class="content-header-left col-md-9 col-12 mb-2">
      <div class="row breadcrumbs-top">
        <div class="col-12">
          <h2 class="content-header-title float-left mb-0">{{title}}</h2>
          <div class="breadcrumb-wrapper col-12">
            <slot name="right-content"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
      <div class="form-group breadcrum-right">
        <slot name="left-content"></slot>
      </div>
    </div>
  </div>
</template>
<!-- USAGE -->
<!-- <bmn-page-title title="sallam">
          <template v-slot:right-content>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li class="breadcrumb-item active">Table</li>
            </ol>
          </template>
          <template v-slot:left-content>
            <div class="dropdown">
              <button
                class="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="feather icon-settings"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">Chat</a>
                <a class="dropdown-item" href="#">Email</a>
                <a class="dropdown-item" href="#">Calendar</a>
              </div>
            </div>
          </template>
        </bmn-page-title> -->


<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style>
</style>
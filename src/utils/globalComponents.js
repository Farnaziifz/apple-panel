import Badge from "@/elements/Badge/Badge.vue";
import Button from "@/elements/Button/Button.vue";
import ButtonGroup from "@/elements/ButtonGroup/ButtonGroup.vue";
import Breadcrumbs from "@/elements/Breadcrumbs/Breadcrumbs.vue";
import Collapse from "@/elements/Collapse/Collapse.vue";
import Input from "@/elements/Input/Input.vue";
import FileUpload from "@/elements/FileUpload/FileUpload.vue";
import InputGroup from "@/elements/InputGroup/InputGroup.vue";
import Checkbox from "@/elements/Checkbox/Checkbox.vue";
import Radio from "@/elements/Radio/Radio.vue";
import Switch from "@/elements/Switch/Switch.vue";
import NumberInput from "@/elements/NumberInput/NumberInput.vue";
import Dropdown from "@/elements/Dropdown/Dropdown.vue";
import SearchDropdown from "@/elements/SearchDropdown/SearchDropdown.vue";
import Avatar from "@/elements/Avatar/Avatar.vue";
import Chip from "@/elements/Chip/Chip.vue";
import Divider from "@/elements/Divider/Divider.vue";
import Pagination from "@/elements/Pagination/Pagination.vue";
import TableView from "@/elements/TableView/TableView.vue";
import Tabs from "@/elements/Tabs/Tabs.vue";
import Card from "../elements/Card/Card.vue";
import CheckboxDropDown from "../elements/Dropdown/CheckboxDropDown.vue";
import MapView from "../elements/MapView/MapView.vue";
import Modal from "../elements/Modal/Modal.vue";
import ConfirmModal from "../elements/ConfirmModal/ConfirmModal.vue";
import SidebarDropDown from "../elements/SidebarDropdown/SidebarDropDown.vue";
import TextArea from "../elements/TextArea/TextArea.vue";
import Loading from "vue-loading-overlay";
import Customizer from "@/elements/Customizer/Customizer.vue";
import RoseBtn from "@/elements/Button/RoseButton/RoseButton.vue";
import BlueBtn from "../elements/Button/BlueButton/BlueButton.vue";
import PageTitle from "@/elements/PageTitle/PageTitle.vue";
import SortTable from "@/elements/SortTable/SortTable.vue";
import Combobox from "@/elements/Combobox/Combobox.vue";
import SearchInput from "@/elements/SearchInput/SearchInput.vue";
import velocity from "velocity-animate";
import Notifications from "vue-notification";
import DateTimePicker from "@/elements/DateTimePicker/DateTimePicker.vue";
import MultiInput from '@/elements/MultiInput/index.vue';
import AttrDropdown from '@/elements/Dropdown/attrDropdown.vue';
import vuePersianFilters from 'vue-persian-filters';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueCharts from "vue-chartjs";
import Chart from "@/elements/Chart/Chart.vue";
// import Echarts from "vue-echarts";
// import "echarts/lib/chart/line";
// import "echarts/lib/component/title";



const GlobalComponents = {
  // use packages
  install(Vue) {
    Vue.use(Notifications, { velocity });
    Vue.use( CKEditor );
    Vue.use(vuePersianFilters);
    Vue.use(VueAwesomeSwiper)
    Vue.use(VueCharts);
    Vue.component("fav-badge", Badge);
    Vue.component("fav-button", Button);
    Vue.component("fav-button-group", ButtonGroup);
    Vue.component("fav-breadcrumbs", Breadcrumbs);
    Vue.component("fav-collapse", Collapse);
    Vue.component("fav-input", Input);
    Vue.component("fav-file-upload", FileUpload);
    Vue.component("fav-input-group", InputGroup);
    Vue.component("fav-checkbox", Checkbox);
    Vue.component("fav-radio", Radio);
    Vue.component("fav-switch", Switch);
    Vue.component("fav-number-input", NumberInput);
    Vue.component("fav-dropdown", Dropdown);
    Vue.component("fav-search-dropdown", SearchDropdown);
    Vue.component("fav-avatar", Avatar);
    Vue.component("fav-chip", Chip);
    Vue.component("fav-divider", Divider);
    Vue.component("fav-pagination", Pagination);
    Vue.component("fav-table-view", TableView);
    Vue.component("fav-tabs", Tabs);
    Vue.component("fav-page-title", PageTitle);
    Vue.component("fav-card", Card);
    Vue.component("fav-checkbox-dropdown", CheckboxDropDown);
    Vue.component("fav-map-view", MapView);
    Vue.component("fav-modal", Modal);
    Vue.component("fav-confirm-modal", ConfirmModal);
    Vue.component("fav-sidebar-dropdown", SidebarDropDown);
    Vue.component("fav-text-area", TextArea);
    Vue.component("loading", Loading);
    Vue.component("customizer", Customizer);
    Vue.component("fav-rose-btn", RoseBtn);
    Vue.component("fav-blue-btn", BlueBtn);
    Vue.component("fav-combobox", Combobox);
    Vue.component("fav-sort-table", SortTable);
    Vue.component("fav-search-input", SearchInput);
    Vue.component("fav-date-time-picker", DateTimePicker);
    Vue.component('fav-multi-input', MultiInput);
    Vue.component('fav-attr-drp', AttrDropdown)
    // Vue.component("chart", Echarts);
    Vue.component("chart-js", Chart);
  },
};

export default GlobalComponents;

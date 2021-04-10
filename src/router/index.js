export const routes = [
  {
    path: "/",
    name: "",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "ورود",
    },
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard/Dashboard.vue"),
        meta: {
          title: "داشبرد",
        },
      },
      {
        path: '/productGroupCategory',
        name: 'product-gp-Category',
        component: () => import('@/views/ProductManagment/CategoryList.vue'),
        meta: {
          title: 'لیست دسته بندی‌های مرجع'
        }
      },
      {
        path: '/subCategory/:id',
        name: 'product-sub-Category',
        component: () => import('@/views/ProductManagment/SubCategory.vue'),
        meta: {
          title: 'لیست دسته بندی‌های محصول'
        }
      },
      {
        path: '/productList',
        name: 'product-list',
        component: () => import('@/views/ProductManagment/ProductList.vue'),
        meta: {
          title: 'لیست محصول'
        }
      },
      {
        path: '/addProduct',
        name: 'product-add',
        component: () => import('@/views/ProductManagment/AddProduct.vue'),
        meta: {
          title: 'افزودن محصول'
        }
      },
      {
        path: '/sliders',
        name: 'sliders',
        component: () => import('@/views/SiteManagment/Slider.vue'),
        meta: {
          title: 'لیست اسلایدرها'
        }
      },
    ],
  },

];

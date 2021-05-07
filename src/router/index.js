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
        path: "/intro",
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
      {
        path: '/tagList',
        name: 'tag-list',
        component: () => import('@/views/BlogManagment/TagList.vue'),
        meta: {
          title: 'مدیریت تگ‌های بلاگ'
        }
      },
      {
        path: '/blogList',
        name: 'blog-list',
        component: () => import('@/views/BlogManagment/BlogList.vue'),
        meta: {
          title: 'مدیریت بلاگ'
        }
      },
      {
        path: '/addBlog',
        name: 'blog-add',
        component: () => import('@/views/BlogManagment/AddBlog.vue'),
        meta: {
          title: 'افزودن بلاگ'
        }
      },
      {
        path: '/editBlog/:id',
        name: 'blog-edit',
        component: () => import('@/views/BlogManagment/EditBlog.vue'),
        meta: {
          title: 'ویرایش بلاگ'
        }
      },
      {
        path: '/commentBlog/:id',
        name: 'blog-comment',
        component: () => import('@/views/BlogManagment/commentList.vue'),
        meta: {
          title: 'کامنت‌های بلاگ'
        }
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('@/views/Contact/index.vue'),
        meta: {
          title: 'فرم تماس با ما'
        }
      },
      {
        path: '/blog-category',
        name: 'blog-category',
        component: () => import('@/views/BlogManagment/BlogCategoryList.vue'),
        meta: {
          title: 'دسته بندی بلاگ'
        }
      },
      {
        path: '/daily',
        name: 'daily',
        component: () => import('@/views/Daily/list.vue'),
        meta: {
          title: 'محصولات روزانه'
        }
      },
      {
        path: '/add-daily',
        name: 'add-daily',
        component: () => import('@/views/Daily/addDaily.vue'),
        meta: {
          title: 'افزودن محصول روزانه'
        }
      },
    ],
  },

];

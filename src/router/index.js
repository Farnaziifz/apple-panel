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
        path: "/unit-list",
        name: "unit-list",
        component: () => import("@/views/UnitsManagment/unitList.vue"),
        meta: {
          title: "لیست واحدها",
        },
      },
      {
        path: "/unit-edit/:id",
        name: "unit-edit",
        component: () => import("@/views/UnitsManagment/editUnit.vue"),
        meta: {
          title: "ویرایش واحد",
        },
      },
      {
        path: "/unit-add",
        name: "unit-add",
        component: () => import("@/views/UnitsManagment/addUnit.vue"),
        meta: {
          title: "افزودن واحد",
        },
      },
      {
        path: "/unit-single/:id",
        name: "unit-single",
        component: () => import("@/views/UnitsManagment/SingleUser.vue"),
        meta: {
          title: "اطلاعات واحد",
        },
      },
      {
        path: '/user-list',
        name: 'user-list',
        component: () => import('@/views/UserManagment/UserList.vue'),
        meta: {
          title: 'لیست کاربران'
        }
      },
      {
        path: '/user/:id',
        name: 'user-data',
        component: () => import('@/views/UserManagment/SingleUser.vue'),
        meta: {
          title: 'اطلاعات کاربر'
        }
      },
      {
        path: '/edit-user/:id',
        name: 'user-edit',
        component: () => import('@/views/UserManagment/EditUser.vue'),
        meta: {
          title: 'ویرایش کاربر'
        }
      },
      {
        path: '/orderList',
        name: 'order-edit',
        component: () => import('@/views/OrderManagment/OrderList.vue'),
        meta: {
          title: 'لیست سفارشات'
        }
      },
      {
         path: '/adminBlogList',
        name: 'admin-blog-list',
        component: () => import('@/views/BlogManagment/AdminBlogList.vue'),
        meta: {
          title: 'لیست مقالات مجموعه'
        }
      },
      {
        path: '/adminBlogSingle/:id',
       name: 'admin-blog-single',
       component: () => import('@/views/BlogManagment/AlmasBlogSingle.vue'),
       meta: {
         title: 'مقالات مجموعه'
       }
     },
      {
        path: '/addAdminBlog',
        name: 'admin-blog-add',
        component: () => import('@/views/BlogManagment/AddAdminBlog.vue'),
        meta: {
          title: 'افزودن مقاله مجموعه'
        }
      },
      {
        path: '/editAdminBlog/:id',
        name: 'admin-blog-Edit',
        component: () => import('@/views/BlogManagment/EditAlmasBlog.vue'),
        meta: {
          title: 'ویرایش مقاله مجموعه'
        }
      },
      {
       path: '/unitBlog',
       name: 'unit-blog',
       component: () => import('@/views/BlogManagment/UnitList.vue'),
       meta: {
         title: 'لیست واحدها'
       }
     },
     {
      path: '/unitBlogList/:id',
      name: 'unit-blog-list',
      component: () => import('@/views/BlogManagment/UnitBlogList.vue'),
      meta: {
        title: 'لیست مقاله واحدها'
      }
    },
    
     {
        path: '/productList',
        name: 'product-list',
        component: () => import('@/views/ProductManagments/ProductList.vue'),
        meta: {
          title: 'لیست محصولات'
        }
      },
      {
        path: '/addProduct/:step/:pId?',
        name: 'product-add',
        component: () => import('@/views/ProductManagments/AddProduct.vue'),
        meta: {
          title: 'افزودن محصول'
        }
      },
      {
        path: '/productGroupCategory',
        name: 'product-gp-Category',
        component: () => import('@/views/ProductCategoryManagment/GpCategoryList.vue'),
        meta: {
          title: 'لیست دسته بندی‌های مرجع'
        }
      },
      {
        path: '/productGroupCategory/:id',
        name: 'product-gp-Category',
        component: () => import('@/views/ProductCategoryManagment/CategoryList.vue'),
        meta: {
          title: 'لیست دسته بندی‌های محصول'
        }
      },
      {
        path: '/tagList',
        name: 'tag-list',
        component: () => import('@/views/Blog/tags/TagList.vue'),
        meta: {
          title: 'لیست تگ‌های بلاگ'
        }
      },
      {
        path: '/gpAttrList',
        name: 'gp-attr-list',
        component: () => import('@/views/AttrManagment/gpAttList.vue'),
        meta: {
          title: 'لیست ویژگی‌های مرجع'
        }
      },
      {
        path: '/AttrList',
        name: 'attr-list',
        component: () => import('@/views/AttrManagment/AttrList.vue'),
        meta: {
          title: 'لیست ویژگی‌های محصولات'
        }
      },
      {
        path: '/addAttrOptiond/:id',
        name: 'attr-options',
        component: () => import('@/views/AttrManagment/attrItem.vue'),
        meta: {
          title: 'اضافه کردن آیتم'
        }
      },
      {
        path: '/product/:id',
        name: 'product-single',
        component: () => import('@/views/ProductManagments/ProductSingle.vue'),
        meta: {
          title: 'محصول'
        }
      },
      {
        path: '/comments',
        name: 'comment-list',
        component: () => import('@/views/Comments/index.vue'),
        meta: {
          title: 'لیست نظرات'
        }
      },
      {
        path: '/sliders',
        name: 'slider-list',
        component: () => import('@/views/Settings/slider.vue'),
        meta: {
          title: 'مدیریت اسلایدر'
        }
      },
      {
        path: '/addSlider',
        name: 'slider-add',
        component: () => import('@/views/Settings/addSlider.vue'),
        meta: {
          title: 'افزودن اسلایدر'
        }
      },
      {
        path: '/editSlider/:id',
        name: 'slider-add',
        component: () => import('@/views/Settings/editSlider.vue'),
        meta: {
          title: 'ویرایش اسلایدر'
        }
      },
      {
        path: '/menuList',
        name: 'slider-add',
        component: () => import('@/views/Settings/menus.vue'),
        meta: {
          title: 'لیست منو'
        }
      },
      {
        path: '/pages',
        name: 'pages',
        component: () => import('@/views/Settings/pages.vue'),
        meta: {
          title: 'مدیریت'
        }
      },
      {
        path: '/siteSetting',
        name: 'pages',
        component: () => import('@/views/Settings/site.vue'),
        meta: {
          title: 'تظیمات سایت'
        }
      },
    ],
  },

];

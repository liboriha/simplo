import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import("./views/Dashboard.vue")
    },
    {
      path: '/customer-groups',
      name: 'customerGroups',
      component: () => import("./views/CustomerGroups.vue")
    },
    {
      path: '/customer-groups/:id',
      name: 'customerGroupsDetail',
      component: () => import("./views/CustomerGroupsDetail.vue")
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import("./views/Customers.vue")
    },
    {
      path: '/customers/:id',
      name: 'customersDetail',
      component: () => import("./views/CustomersDetail.vue")
    },
    {
      path: '*',
      redirect: '/dashboard',
    }
  ],
});

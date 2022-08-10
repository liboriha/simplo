import Vue from 'vue'
import Vuex from 'vuex'
import {CustomerService} from "./services/CustomerService";
import {CustomerGroupService} from "./services/CustomerGroupService";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        customers: [],
        customerGroups:  [],
    },

    mutations: {

        listCustomers: (state, customers) => {
            state.customers = customers;
        },
        addCustomer: (state, customer) => {
            let arrayCustomers = state.customers;
            arrayCustomers.push(customer);
            state.customers = arrayCustomers;
        },
        deleteCustomer: (state, id) => {
            let arrayCustomers = state.customers;
            state.customers = arrayCustomers.filter(arrayCustomer => arrayCustomer.id !== id);
        },
        updateCustomer: (state, customer) => {
            let arrayCustomers = state.customers;
            let mappedCustommers = arrayCustomers.map((obj) => customer.id === obj.id ? customer : obj);
            state.customers = mappedCustommers;
        },

        listCustomerGroups: (state, customerGroups) => {
            state.customerGroups = customerGroups;
        },
        addCustomerGroup: (state, customerGroup) => {
            let arrayCustomerGroups = state.customerGroups;
            arrayCustomerGroups.push(customerGroup);
            state.customerGroups = arrayCustomerGroups;
        },
        deleteCustomerGroup: (state, id) => {
            let arrayCustomerGroups = state.customerGroups;
            state.customerGroups = arrayCustomerGroups.filter(arrayCustomerGroup => arrayCustomerGroup.id !== id);
        },
        updateCustomerGroup: (state, customerGroup) => {
            let arrayCustomerGroups = state.customerGroups;
            let mappedCustomerGroups = arrayCustomerGroups.map((obj) => customerGroup.id === obj.id ? customerGroup : obj);
            state.customerGroups = mappedCustomerGroups;
        },
    },

    actions: {
        getCustomers(){
            CustomerService.listCustomers().then( response => {
                this.commit('listCustomers', response);
            }, error => {
                console.log(error)
            });
        },
        getCustomerGroups(){
            CustomerGroupService.listCustomerGroups().then(response => {
                this.commit('listCustomerGroups', response);
            }, error => {
                console.log(error)
            });
        }
    },

    getters: {
        customers: (state) => {
            return state.customers
        },
        customerGroups: (state) => {
            return state.customerGroups
        },
    }
})

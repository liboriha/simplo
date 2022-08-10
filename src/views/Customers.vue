<template>
  <v-container>
    <div>
      <h1>
        Customers
      </h1>
      <v-btn
          color="primary"
        @click="addCustomerDialogOpen"
      >
        Add new customer
      </v-btn>
    </div>
    <v-data-table
        :headers="headers"
        :items="customers"
        item-key="name"
        class="elevation-1"
        :search="search"
    >
      <template v-slot:top>
        <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
        ></v-text-field>
      </template>
      <template  v-slot:item="{item}">
       <tr>
         <td>{{item.id}}</td>
         <td>{{item.forename}}</td>
         <td>{{item.surname}}</td>
         <td>{{item.email}}</td>
         <td>
           <span>
             {{customerGroups.filter(customerGroup => customerGroup.customers && customerGroup.customers.includes(item.id)).length}}
           </span>
         </td>
         <td>
           <v-btn @click="$router.push({name:'customersDetail', params: {id: item.id}})">
             Detail
           </v-btn>
         </td>
       </tr>
      </template>
    </v-data-table>


    <v-dialog
        v-model="dialogAdd"
        persistent
        max-width="290"
    >

      <v-card>
        <v-form
            ref="formAddCustomer"
            v-model="validAdd"
            lazy-validation
        >
        <v-card-title class="text-h5">
          Add Customer
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="Forename *"
            v-model="customer.forename"
              required
              :rules="rules.forename"
          />
          <v-text-field
              label="Surname *"
              v-model="customer.surname"
              required
              :rules="rules.surname"
          />
          <v-text-field
              label="E-mail *"
              v-model="customer.email"
              required
              :rules="rules.email"
          />
        </v-card-text>
        <v-card-actions>

          <v-btn
              color="secondary"
              text
              @click="addCustomerDialogClose"
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              @click="addCustomer"
          >
            Add
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

  </v-container>


</template>

<script>

import { mapGetters } from 'vuex';
import {CustomerService} from "../services/CustomerService";
import { Model } from '@vuex-orm/core'

class Customer extends Model {
  static entity = 'customers'
  static fields () {
    return {
      forename: this.attr(''),
      surname: this.attr(''),
      email: this.attr('')
    }
  }
}
export default {
  name: 'Customers',

  components: {
  
  },

  data: () => ({
    search: '',
    headers: [
      {
        text: 'ID',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Forename',
        sortable: true,
        value: 'forename'
      },
      {
        text: 'Surname',
        sortable: true,
        value: 'surname'
      },
      {
        text: 'E-mail',
        sortable: true,
        value: 'email'
      },

      {
        text: 'Groups count',
        sortable: true,
        value: 'groups'
      },
      {
        text: '',
        sortable: false,
        value: 'controls'
      }
    ],
    customer: {},
    dialogAdd: false,
    validAdd: false,
    rules: {
      forename: [
        v => !!v || 'Forename is required',
      ],
      surname: [
        v => !!v || 'Surname is required',
      ],
      email: [
        v => !!v || 'E-mail is required',
        v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
      ],
    }
  }),
  computed:{
    ...mapGetters([
        'customers',
        'customerGroups'
    ]),
  },
  mounted(){

  },
  methods: {
    addCustomerDialogOpen(){
      this.customer = new Customer();
      this.dialogAdd = true;
    },
    addCustomerDialogClose(){
      this.dialogAdd = false;
    },
    addCustomer(){


      if(!this.$refs.formAddCustomer.validate()) {
        return;
      }
      CustomerService.createCustomer(this.customer).then((response =>{
        this.addCustomerDialogClose();
        this.$store.commit('addCustomer',response)
      }));
    },

  }
};
</script>

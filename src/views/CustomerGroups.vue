<template>
  <v-container>
    <div>
      <h1>
        Customer Groups
      </h1>
      <v-btn
          color="primary"
          @click="addCustomerGroupDialogOpen"
      >
        Add new customer group
      </v-btn>
    </div>
    <v-data-table
        :headers="headers"
        :items="customerGroups"
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
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
          <td>{{item.customers ? item.customers.length : 0}}</td>
          <td>
            <v-btn @click="$router.push({name:'customerGroupsDetail', params: {id: item.id}})">
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
            ref="formAddCustomerGroup"
            v-model="validAdd"
            lazy-validation
        >
          <v-card-title class="text-h5">
            Add Customer group
          </v-card-title>
          <v-card-text>
            <v-text-field
                label="Name *"
                v-model="customerGroup.name"
                :rules="rules.name"
            />
            <v-text-field
                label="Description"
                v-model="customerGroup.description"
            />

          </v-card-text>
          <v-card-actions>

            <v-btn
                color="secondary"
                text
                @click="addCustomerGroupDialogClose"
            >
              Close
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                @click="addCustomerGroup"
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
import {CustomerGroupService} from "../services/CustomerGroupService";
import { Model } from '@vuex-orm/core'

class CustomerGroup extends Model {
  static entity = 'customerGroups'
  static fields () {
    return {
      name: this.attr(''),
      description: this.attr(''),
      customers: this.attr([])
    }
  }
}
export default {
  name: 'CustomerGroups',

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
        text: 'Name',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Description',
        sortable: true,
        value: 'description'
      },
      {
        text: 'Customers count',
        sortable: true,
        value: 'customers'
      },
      {
        text: '',
        sortable: false,
        value: 'controls'
      }
    ],
    customerGroup: {
      name: '',
      description: '',
    },
    dialogAdd: false,
    validAdd: false,
    rules: {
      name: [
        v => !!v || 'Name is required',
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
    addCustomerGroupDialogOpen(){
      this.customerGroup = new CustomerGroup();
      this.dialogAdd = true;
    },
    addCustomerGroupDialogClose(){
      this.dialogAdd = false;
    },
    addCustomerGroup(){

      if(!this.$refs.formAddCustomerGroup.validate()) {
        return;
      }
      CustomerGroupService.createCustomerGroup(this.customerGroup).then((response =>{
        this.addCustomerGroupDialogClose();
        this.$store.commit('addCustomerGroup',response)
      }));
    },

  }
};
</script>

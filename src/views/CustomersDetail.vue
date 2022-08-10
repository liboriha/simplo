<template>
  <v-container>
    <div >
      <h1>
        Customer Detail
      </h1>
      <v-btn
          color="primary"
          @click="$router.back()">
        Back
      </v-btn>
      <br><br>
      <v-form
          ref="formUpdateCustomer"
          v-model="validUpdate"
          lazy-validation
      >
      <v-text-field
          label="ID"
          v-model="customer.id"
          required
          disabled
      />
      <v-text-field
          label="Forename *"
          v-model="customer.forename"
          required
          :rules="rules.forename"
          :disabled="!edit"
      />
      <v-text-field
          label="Surname *"
          v-model="customer.surname"
          required
          :rules="rules.surname"
          :disabled="!edit"
      />
      <v-text-field
          label="E-mail *"
          v-model="customer.email"
          required
          :rules="rules.email"
          :disabled="!edit"
      />
      </v-form>
      <div>
        <v-btn
            v-if="!edit"
            @click="editCustomer()">
          Edit
        </v-btn>
        <v-btn
            v-if="edit"
            color="primary"
            @click="updateCustomer()">
          Save
        </v-btn>

        <v-btn
            color="error"
            @click="deleteCustomerDialogOpen()">
          Delete
        </v-btn>
      </div>

      <div class="customer-groups">
        <h2>Customer groups where {{customer.forename}} belongs</h2>
        <div class="customer-group-card" v-for="(customerGroup, index) in customerGroupsAffected" :key="'customer-group-'+index">
          <div class="customer-group-card__title">
            <h3>{{customerGroup.name}}</h3>
          </div>
          <div class="customer-group-card__actions">
            <v-btn
                @click="$router.push({name: 'customerGroupsDetail', params: {id: customerGroup.id}})"
            >
              Show group
            </v-btn>
          </div>
        </div>
        <div v-if="customerGroupsAffected.length === 0">
          <p>This customer doesnt belong to any group.</p>
          <v-btn
              @click="$router.push({name: 'customerGroups'})"
              color="primary"
          >
            Add to group
          </v-btn>
        </div>
        <div v-else>
          <v-btn
              @click="$router.push({name: 'customerGroups'})"
              color="primary"
          >
            Add to next group
          </v-btn>
        </div>
      </div>
    </div>


    <v-dialog
        v-model="dialogDelete"
        persistent
        max-width="290"
    >

      <v-card>
        <v-card-title class="text-h5">
          Delete customer
        </v-card-title>
        <v-card-text>
          Are you sure, you want to delete customer {{customer.forename}}&nbsp;{{customer.surname}}
        </v-card-text>
        <v-card-actions>

          <v-btn
              color="secondary"
              text
              @click="deleteCustomerDialogClose"
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="error"
              @click="deleteCustomer(customer.id)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import {CustomerService} from "../services/CustomerService";
import {mapGetters} from "vuex";
import {CustomerGroupService} from "../services/CustomerGroupService";

export default {
  name: 'CustomersDetail',

  components: {
  
  },

  data: () => ({
    edit: false,
    customer: {},
    dialogDelete: false,
    dialogUpdate: false,
    dialogAdd: false,
    validUpdate: false,
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
  created(){
    this.readCustomer();
  },
  computed:{
    ...mapGetters([
      'customers',
      'customerGroups'
    ]),
    customerGroupsAffected(){
      return this.customerGroups.filter(customerGroup => customerGroup.customers && customerGroup.customers.includes(this.customer.id))
    }
  },
  methods: {
    editCustomer(){
      this.edit = true;
    },
    readCustomer(){
      CustomerService.readCustomer(this.$route.params.id).then((response => {
        this.customer = response;
      })).catch((error => {
        console.log(error)
        this.$router.push({name: 'customers'})
      }))
    },


    updateCustomer(){
      if(!this.$refs.formUpdateCustomer.validate()) {
        return;
      }
      CustomerService.updateCustomer(this.customer.id, this.customer).then((response =>{
        this.$store.commit('updateCustomer', response)
        this.edit = false;
        this.flashMessage.show({
          status: 'info',
          title: 'Update customer',
          message: 'Customer was sucessfully saved'
        });
      }));
    },
    deleteCustomerDialogOpen(){
      this.dialogDelete = true;
    },
    deleteCustomerDialogClose(){
      this.dialogDelete = false;
    },

    deleteCustomer(id){


      CustomerService.deleteCustomer(id).then(() =>{

        this.deleteCustomerDialogClose();
        this.$router.push({name: 'customers'})
        this.$store.commit('deleteCustomer',id)

        /*
          this should be done on backend side but we don`t have one, so it`s done here just for clean api/db.json
          it basically removes customer id from customer groups where this customer belongs
        */
       this.customerGroupsAffected.forEach(customerGroupAffected => {
          let customerGroupFixed = customerGroupAffected;
          customerGroupFixed.customers = customerGroupFixed.customers.filter(customerId => customerId !== id);
          CustomerGroupService.updateCustomerGroup(customerGroupAffected.id, customerGroupFixed);
        });

      });
    }
  }
};
</script>

<template>
  <v-container>
    <div >
      <h1>
        Customer Group Detail
      </h1>
      <v-btn
          color="primary"
          @click="$router.back()">
        Back
      </v-btn>
      <br><br>
      <v-form
          ref="formUpdateCustomerGroup"
          v-model="validUpdate"
          lazy-validation
      >
        <v-text-field
            label="ID"
            v-model="customerGroup.id"
            required
            disabled
        />
        <v-text-field
            label="Name *"
            v-model="customerGroup.name"
            required
            :rules="rules.name"
            :disabled="!edit"
        />
        <v-text-field
            label="Description"
            v-model="customerGroup.description"
            :disabled="!edit"
        />

        <br>
        <p v-if="customerGroup.customers.length === 0">
          There are not any customers in this group, press edit and add some.
        </p>

        <v-autocomplete
            v-model="customerGroup.customers"
            :items="customers"
            dashed
            dense
            chips
            small-chips
            label="Customers"
            :item-text="getFullName"
            item-value="id"
            multiple
            :disabled="!edit"
        ></v-autocomplete>
      </v-form>
      <div>

        <v-btn
            v-if="!edit"
            @click="editCustomerGroup()">
          Edit
        </v-btn>
        <v-btn
            v-if="edit"
            color="primary"
            @click="updateCustomerGroup()">
          Save
        </v-btn>

        <v-btn
            color="error"
            @click="deleteCustomerGroupDialogOpen()">
          Delete
        </v-btn>
      </div>


    </div>


    <v-dialog
        v-model="dialogDelete"
        persistent
        max-width="290"
    >

      <v-card>
        <v-card-title class="text-h5">
          Delete customer group
        </v-card-title>
        <v-card-text>
          Are you sure, you want to delete customer group {{customerGroup.name}}
        </v-card-text>
        <v-card-actions>

          <v-btn
              color="secondary"
              text
              @click="deleteCustomerGroupDialogClose"
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="error"
              @click="deleteCustomerGroup(customerGroup.id)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import {CustomerGroupService} from "../services/CustomerGroupService";
import {mapGetters} from "vuex";

export default {
  name: 'CustomerGroupsDetail',

  components: {

  },

  data: () => ({
    edit: false,
    customerGroup: {},
    dialogDelete: false,
    dialogUpdate: false,
    dialogAdd: false,
    validUpdate: false,
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
  created(){
    this.readCustomerGroup();
  },
  methods: {
    getFullName(item) {
      return `${item.forename} ${item.surname}`;
    },
    editCustomerGroup(){
      this.edit = true;
    },
    readCustomerGroup(){
      CustomerGroupService.readCustomerGroup(this.$route.params.id).then((response => {
        this.customerGroup = response;
      })).catch((error => {
        console.log(error)
        this.$router.push({name: 'customerGroups'})
      }))
    },


    updateCustomerGroup(){
      if(!this.$refs.formUpdateCustomerGroup.validate()) {
        return;
      }
      CustomerGroupService.updateCustomerGroup(this.customerGroup.id, this.customerGroup).then((response =>{
        this.$store.commit('updateCustomerGroup', response)
        this.edit = false;
        this.flashMessage.show({
          status: 'info',
          title: 'Update customer group',
          message: 'Customer group was sucessfully saved'
        });
      }));
    },
    deleteCustomerGroupDialogOpen(){
      this.dialogDelete = true;
    },
    deleteCustomerGroupDialogClose(){
      this.dialogDelete = false;
    },

    deleteCustomerGroup(id){

      CustomerGroupService.deleteCustomerGroup(id).then(() =>{
        this.deleteCustomerGroupDialogClose();
        this.$router.push({name: 'customerGroups'})
        this.$store.commit('deleteCustomerGroup',id)
      });
    }
  }
};
</script>

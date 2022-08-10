<template>
  <v-container>
    <div class="dashboard">
      <h1>
        Welcome to Simplo app.
      </h1>
      <p>
        We help you to manage your groups for your customers in just a few clicks.
      </p>

      <router-link :to="{name: 'customers'}">
        See my customers
      </router-link>
    </div>
  </v-container>
</template>

<script>


export default {
  name: 'Dashboard',

  components: {
  
  },

  data: () => ({
    //
  }),
};
</script>

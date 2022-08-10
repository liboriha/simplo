<template>
  <v-app>
    <v-app-bar
        app
        color="#24014c"
        light
    >
      <div class="d-flex align-center width-100 justify-center">
        <v-btn
            v-if="$route.name !== 'dashboard'"
            @click="activateMenu()">
          MENU
        </v-btn>
        <v-spacer
            v-if="$route.name !== 'dashboard'"
        ></v-spacer>
        <v-img
            alt="Simplo Logo"
            class="shrink logo"
            contain
            src="/logo_light.svg"
            transition="scale-transition"
            width="120"
            @click="$router.push({name: 'dashboard'})"
        />

      </div>
    </v-app-bar>
    <v-navigation-drawer
        v-model="menuActive"
        absolute
        light
    >
      <v-list
          dense
          nav
          class="py-0"
      >


        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="{name:item.name}"
        >

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
    <FlashMessage :position="'right bottom'"></FlashMessage>
  </v-app>
</template>

<script>


export default {

  name: 'App',

  components: {

  },

  data: () => ({
    menuActive: false,
    items: [
      {
        title: 'Customers',
        icon: 'mdi-account',
        name: 'customers'
      },
      {
        title: 'Customer groups',
        icon: 'mdi-account-multiple-plus',
        name: 'customerGroups'
      }
    ]
  }),
  mounted(){
    this.$store.dispatch('getCustomerGroups')
    this.$store.dispatch('getCustomers')
  },
  methods: {
    activateMenu(){
      this.menuActive = !this.menuActive;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/style.scss";
</style>



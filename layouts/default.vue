<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          dense
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="false" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: 'Home',
          to: '/',
        },

        {
          title: 'Legal Considerations',
          to: '/legal-considerations',
        },
        {
          title: 'Size Up the Scene',
          to: '/size-up-the-scene',
        },
        {
          title: 'Primary Assessment',
          to: '/primary-assessment',
        },
        {
          title: 'Secondary Assessment',
          to: '/secondary-assessment',
        },

        {
          title: 'Sources',
          to: '/sources',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Wilderness First Response Resources',
    }
  },
}
</script>
<style>
.container {
  padding: 40px;
}
</style>

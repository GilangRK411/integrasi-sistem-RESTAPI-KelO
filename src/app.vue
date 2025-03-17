<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './views/components/navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
import Vue from 'vue';
import Router from 'vue-router';

const routerOptions = [
  { path: '/', component: 'Login', name: 'Landing' },
  { path: '/chat', component: 'ChatRoom', name: 'ChatRoom' }

];

const routes = routerOptions.map(route => {
  return {
    ...route,
    // eslint-disable-next-line
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
});

export default router;

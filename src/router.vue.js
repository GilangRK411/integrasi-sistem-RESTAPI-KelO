import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './views/landingpage.vue';
import FacilityPage from './views/facility.vue';
import LoginPage from './views/login.vue';
import RegisterPage from './views/register.vue';
import RulesPage from './views/rules.vue';
import FoodDashboard from './views/admin/admin.dashbord.vue';
import FoodAdd from './views/admin/admin.food.add.vue';
import axios from 'axios';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
  },
  {
    path: '/facility',
    name: 'facility',
    component: FacilityPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/menupage',
    name: 'menupage',
    component: LandingPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/rules',
    name: 'rules',
    component: RulesPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: FoodDashboard,
    meta: { requiresAuth: true},
  },
  {
    path: '/add',
    name: 'add',
    component: FoodAdd,
    meta: { requiresAuth: true},
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); 

    if (!token) {
      next('/login');
    } else {
      try {
        const response = await axios.get('http://localhost:5050/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          if (to.matched.some(record => record.meta.requiresAdmin)) {
            if (role === 'admin') {5
              next();
            } else {
              next('/user');
            }
          } else {
            next();
          }
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        next('/login');
      }
    }
  } else {
    next();
  }
});


export default router;

import Vue from 'vue'
import VueRouter from 'vue-router'

//实现懒加载 lazyload
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

//1.安装插件
Vue.use(VueRouter)


//在这里面配置映射关系
const routes = [
    //重定向
    {
        path:'',
        redirect:'/home'
    },
    {
      //路径的名字
      path: '/home',
      // 指定的组件
      component:Home
    },
    {
      path: '/category',
      component:Category
    },
    {
      path: '/cart',
      component:Cart
    },
    {
      path: '/profile',
      component:Profile
    },
    {
      path: '/detail/:iid',
      component:Detail
    }


]
//2.创建router

const router = new VueRouter({
    routes,
    //url模式
    mode: 'history'
})

export default router
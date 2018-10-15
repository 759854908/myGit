import Login from './views/LoginView'
import Home from './views/Home.vue'
import Table from './views/nav1/Table.vue'
import user from './views/nav1/user.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
  {
    path: '/',
    component: Home,
    name: '网关信息',
    iconCls: 'el-icon-message',
    children: [
      { path: '/table', component: Table, name: '信息修改' },
      { path: '/user', component: user, name: '信息展示以及查询' },
    ]
  }
];

export default routes;

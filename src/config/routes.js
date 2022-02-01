import LayoutAdmin from '../components/layout/LayoutAdmin'
import LayoutLog from '../components/layout/LayoutLog'
import Register from '../components/auth/register'
import Login from '../components/auth/login'

import Dashboard from '../components/dashboard'
//Category
import Category from '../components/category'
import CreateCategory from '../components/category/create'
import EditCategory from '../components/category/edit'
// //Provider
import ProductProvider from '../components/provider'
import CreateProvider from '../components/provider/create'
import EditProvider from '../components/provider/edit'
// //Product
import Product from '../components/product'
import EditProduct from '../components/product/edit'

import Purchase from '../components/purchase'
import CreatePurchase from '../components/purchase/create'
import ShowPurchase from '../components/purchase/show'


import Order from '../components/order'
import CreateOrder from '../components/order/create'
import ShowOrder from '../components/order/show'

const routesAdmin = [
        {
            path: "/admin",
            layout: LayoutAdmin,
            component: Dashboard,
        },
        {
            path:"/admin/category",
            layout: LayoutAdmin,
            component: Category,
        },
        {
            path:"/admin/category/create",
            layout: LayoutAdmin,
            component: CreateCategory,
        },
        {
            path:"/admin/category/edit/:id",
            layout: LayoutAdmin,
            component: EditCategory,
        },
        {
            path:"/admin/provider",
            layout: LayoutAdmin,
            component: ProductProvider,
        },
        {
            path:"/admin/provider/create",
            layout: LayoutAdmin,
            component: CreateProvider,
        },
        {
            path:"/admin/provider/edit/:id",
            layout: LayoutAdmin,
            component: EditProvider,
        },
        {
            path:"/admin/product",
            layout: LayoutAdmin,
            component: Product,
        },
        {
            path:"/admin/product/edit/:id",
            layout: LayoutAdmin,
            component: EditProduct,
        },
        {
            path:"/admin/purchase",
            layout: LayoutAdmin,
            component: Purchase,
        },
        {
            path:"/admin/purchase/create",
            layout: LayoutAdmin,
            component: CreatePurchase,
        },
        {
            path:"/admin/purchase/show/:id",
            layout: LayoutAdmin,
            component: ShowPurchase,
        },
        {
            path:"/admin/order",
            layout: LayoutAdmin,
            component: Order,
        },
        {
            path:"/admin/order/create",
            layout: LayoutAdmin,
            component: CreateOrder,
        },
        {
            path:"/admin/order/show/:id",
            layout: LayoutAdmin,
            component: ShowOrder,
        },


    ]

const routesClient = [

    {
        path: "/login",
        layout: LayoutLog,
        component: Login,
    },
    {
        path: "/register",
        layout: LayoutLog,
        component: Register,
    },
]

const routes = [...routesAdmin, ...routesClient]


export default routes
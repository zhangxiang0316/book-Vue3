import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: "/",
        name: 'layout',
        component: () => import('@/views/layout/Layout'),
        redirect: '/book',
        children: [
            {
                path: "book",
                name: 'book',
                component: () => import('@/views/book/Book'),
                meta: {
                    index: 1
                }
            },
            {
                path: "audio",
                name: 'audio',
                component: () => import('@/views/audio/Audio'),
                meta: {
                    index: 1
                }
            },
            {
                path: "mine",
                name: 'mine',
                component: () => import('@/views/mine/Mine'),
                meta: {
                    index: 1
                }
            }
        ]
    },
    {
        path: "/search",
        name: 'search',
        component: () => import('@/views/book/Search'),
        meta: {
            index: 2
        }
    },
    {
        path: "/menuList",
        name: 'MenuList',
        component: () => import('@/views/book/MenuList'),
        meta: {
            index: 3
        }
    },
    {
        path: "/bookDetail",
        name: 'BookDetail',
        component: () => import('@/views/book/BookDetail'),
        meta: {
            index: 4
        }
    },
    {
        path: "/bookFrom",
        name: 'BookFrom',
        component: () => import('@/views/book/BookFrom'),
        meta: {
            index: 4
        }
    }

]

// 路由器
const router = createRouter({
    history: createWebHistory(), // HTML5模式
    routes,
});

export default router;

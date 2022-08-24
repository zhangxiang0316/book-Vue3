import {createRouter, createWebHistory} from 'vue-router'

const routes =[
    {
        path: "/",
        name: 'layout',
        component: ()=>import('@/views/layout/Layout'),
        redirect: '/book',
        children:[
            {
                path: "book",
                name: 'book',
                component: ()=>import('@/views/book/Book'),
            },
            {
                path: "audio",
                name: 'audio',
                component: ()=>import('@/views/audio/Audio'),
            },
            {
                path: "mine",
                name: 'mine',
                component: ()=>import('@/views/mine/Mine'),
            }
        ]
    },
    {
        path: "/search",
        name: 'search',
        component: ()=>import('@/views/book/Search'),
    }

]

// 路由器
const router = createRouter({
    history: createWebHistory(), // HTML5模式
    routes,
});

export default router;

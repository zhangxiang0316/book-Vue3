import {defineStore} from "pinia"

export const useBookStore = defineStore({
    id: "book", // id是唯一的，如果有多个文件，ID不能重复
    state: () => {
        return {
            bookFormList: [],
            bookDetail: {},
            bookHistory: []
        }
    },
    getters: {},
    actions: {
        setBookFromList(data) {
            this.bookFormList = data
        },
        setBookDetail(data) {
            this.bookDetail = data
        },
        setBookHistory(data) {
            this.bookHistory = data
        }
    },
    // 开启数据缓存，在 strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 localStorage
    // 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化，如：paths: ['userinfo'] 替换key的位置
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'book',
                storage: localStorage,
            },
        ],
    },
})
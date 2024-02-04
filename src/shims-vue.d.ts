/* eslint-disable */
// 默认情况下 是不认识.vue文件的，
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any
declare module '*.json'

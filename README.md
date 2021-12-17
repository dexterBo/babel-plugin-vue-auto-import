# 根据模板中标签自动导入vue组件

使用:
```
npm i -D babel-plugin-vue-import-by-tag
```

该工具需要配合`vue-template-label-loader`使用

使用:
```
plugin: [
  ['babel-plugin-vue-import-by-tag'， {
    excludeTags: ['HelloWord', 'App'], // 需要忽略的标签
    exclude: ['**/App.vue'], // 需要忽略的路径
    lib(tag) {
      // 如果某个标签需要自动导入，请返回导入路径, 不需要则返回null
    },
    style() {
      // 如果某个标签需要自动样式文件，请返回导入路径，无则返回null
    }
  }]
]
```


准备妥当后，可以将一个vue文件：
```vue
<template>
  <div>
    <el-button>按钮</el-button>
  </div>
</template>

<script>
  export default {
    created() {
    },
  };
</script>
```
在编译后转换成下面类似代码：
```
<template>
  <div>
    <el-button>按钮</el-button>
  </div>
</template>

<script>
  import ElButton from 'element-ui/lib/form-item';

  export default {
    components: {
      ElButton,
    },
    created() {
    },
  };
</script>
```

这样既可以在开发时体验到组件[全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)的开发体验，又能避免全局导入带来的首屏过大问题。

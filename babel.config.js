module.exports = {
  plugins: [
    // babel-plugin-import：当从element-plus导入组件的时候，自动导入对应的css
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}

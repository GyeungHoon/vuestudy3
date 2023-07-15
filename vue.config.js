module.exports = {
  pwa: {
    name: 'vuesta',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    workboxOptions: {
      exclude: [/\.map$/, /manifest\.json$/, 'index.html']
    }
  }
}
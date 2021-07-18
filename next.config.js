const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  trailingSlash: true,
  images: {
    imageSizes: [18, 36, 54, 24, 48, 72, 96, 144],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }]
      },
    ]
  }
})

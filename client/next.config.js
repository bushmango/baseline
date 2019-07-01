// next.config.js
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const useCssModules = true
const TsConfigPathsPlugin = require('awesome-typescript-loader')
  .TsConfigPathsPlugin

const stage = process.env.STAGE || 'default'
console.log('stage', stage)
// console.log(process.env)
// const isProd = process.env.NODE_ENV === 'production'
// const path = require('path')

module.exports = (phase, { defaultConfig }) => {
  let config = withTypescript(
    withSass({
      webpack (config, options) {
        // Do not run type checking twice:
        if (options.isServer) {
          config.plugins.push(new ForkTsCheckerWebpackPlugin())
        }
        // Typescript paths
        // config.resolve.alias = {
        //   ...config.resolve.alias,
        //   '@pages': path.resolve(__dirname, 'pages'),
        //   '@imports': path.resolve(__dirname, 'imports'),
        //   '@state': path.resolve(__dirname, 'state'),
        //   '@components': path.resolve(__dirname, 'components')
        // }
        config.resolve.plugins = [
          ...(config.resolve.plugins || []),
          new TsConfigPathsPlugin()
        ]

        // Allow additional include files
        // config.module.rules.forEach(({ use, include, test }, i) => {
        //   const isBabelLoader = use && use.loader === 'next-babel-loader'
        //   // const isTSFile = test.toString() === '/\\.(ts|tsx)$/'
        //   // const isJSFile = test.toString() === '/\\.(js|jsx)$/'
        //   if (isBabelLoader) {
        //     // && (isTSFile || isJSFile)) {
        //     delete config.module.rules[i].include
        //   }
        // })

        return config
      },
      cssModules: useCssModules,
      cssLoaderOptions: {
        camelCase: true,
        namedExport: true,
        importLoaders: 1,
        localIdentName:
          phase === PHASE_DEVELOPMENT_SERVER
            ? '[name]_[local]_[hash:base64:5]'
            : '[hash:base64]'
      }
    })
  )

  console.log('config', JSON.stringify(config, null, 2))

  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
  })

  config = withBundleAnalyzer(config)

  supportSymlinkedFilesInNextBabelLoader(config)

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    config.assetPrefix = undefined
    config.env = {
      STATIC_PREFIX: '/static/'
    }
    return config
  } else {
    config.assetPrefix = 'https://s3.amazonaws.com/s3.baseline.stevebushman.com'
    config.env = {
      STATIC_PREFIX:
        'https://s3.amazonaws.com/s3.baseline.stevebushman.com/static/'
    }

    return config
  }
}

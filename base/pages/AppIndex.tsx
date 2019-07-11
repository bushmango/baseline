import { IndexPage } from '@common/IndexPage'
import { Layout } from '@pages/layout'

import { routes } from 'src-config/routes'

export const NoMatch = () => {
  return (
    <Layout>
      <div>404</div>
    </Layout>
  )
}

export const AppIndex = (props: {
  isServer?: boolean
  originalUrl?: string
}) => {
  return (
    <IndexPage
      NoMatch={NoMatch}
      routes={routes}
      isServer={props.isServer}
      originalUrl={props.originalUrl}
    />
  )
}
AppIndex.getInitialProps = async ({ req }) => {
  return {
    originalUrl: req ? req.originalUrl : window.location.href,
    isServer: req ? true : false,
  }
}
export default AppIndex

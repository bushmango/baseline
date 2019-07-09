import React from 'react'

import styles from './AboutPage.scss'
import { Layout } from 'src-ui/shared/Layout'

export function About(props: { data: any }) {
  return (
    <Layout>
      <AboutPage />
    </Layout>
  )
}

export const AboutPage = () => {
  return (
    <div>
      <h1>About 1</h1>
      About 1
    </div>
  )
}

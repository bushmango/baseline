import React from 'react'

import Layout from '@components/shared/Layout'
import styles from './AboutPage.scss'

function About(props: { data: any }) {
  return (
    <Layout title='about'>
      <AboutPage />
    </Layout>
  )
}

const AboutPage = () => {
  return (
    <div>
      <h1>About baseline</h1>
      Baseline
    </div>
  )
}

export { AboutPage, About }

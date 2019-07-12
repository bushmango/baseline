import React from 'react'

import styles from './AboutPage.scss'
import { Layout } from '@pages/layout/Layout'

export function Keyword(props: { children: React.ReactNode }) {
  return <div className={styles.keyword}>{props.children}</div>
}

export function AboutPage(props: { data: any }) {
  return (
    <Layout>
      <h1>About baseline</h1>
      <h2>baseline project to get started</h2>
      <Keyword>NextJS</Keyword>
      <Keyword>React</Keyword>
    </Layout>
  )
}

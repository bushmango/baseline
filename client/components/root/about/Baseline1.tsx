import React from 'react'

import styles from './AboutPage.scss'
import { Layout } from '@components/shared/Layout'

export function Baseline1(props: { data: any }) {
  return (
    <Layout>
      <Baseline1Page />
    </Layout>
  )
}

export const Baseline1Page = () => {
  return (
    <div>
      <h1>Baseline 1</h1>
      Baseline 1
    </div>
  )
}

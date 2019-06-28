import React from 'react'

import styles from './AboutPage.scss'
import { Layout } from '@components/shared/Layout'

export function Baseline2(props: { data: any }) {
  return (
    <Layout>
      <Baseline2Page />
    </Layout>
  )
}

export const Baseline2Page = () => {
  return (
    <div>
      <h1>Baseline 2</h1>
      Baseline 2
    </div>
  )
}

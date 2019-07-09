import React from 'react'

import styles from '../about/AboutPage.scss'
import { Layout } from 'src-ui/shared/Layout'
// import { Button } from '@components/button/Button'

import { Button2 } from '@common/components/button/Button2'

export function Baseline1(props: { data: any }) {
  return (
    <Layout>
      <Baseline1Page />
      <Button2>A test button</Button2>
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

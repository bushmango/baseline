import React from 'react'

import styles from './AboutPage.scss'
import { Layout } from '@components/shared/Layout'

const Image = (props: { src: string }) => {
  let src = props.src

  if (src.startsWith('/static/')) {
    src = src.replace('/static/', process.env.STATIC_PREFIX)
  }

  return <img src={src} style={{ maxHeight: '200px' }} />
}

export function Baseline2(props: { data: any }) {
  return (
    <Layout>
      <Baseline2Page />
      {process.env.STATIC_PREFIX}
      <Image src='/static/images/caffeine-coffee-cup-374780.jpg' />
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

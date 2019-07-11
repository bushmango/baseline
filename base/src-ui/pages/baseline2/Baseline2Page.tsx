import React from 'react'

import { Layout } from '@pages/layout/Layout'

const Image = (props: { src: string }) => {
  let src = props.src

  if (src.startsWith('/static/')) {
    src = src.replace('/static/', process.env.STATIC_PREFIX)
  }

  return <img src={src} style={{ maxHeight: '200px' }} />
}

export function Baseline2Page(props: { data: any }) {
  return (
    <Layout>
      <h1>Baseline 2</h1>
      Baseline 2{process.env.STATIC_PREFIX}
      <Image src='/static/images/caffeine-coffee-cup-374780.jpg' />
    </Layout>
  )
}

import React from 'react'

import { Layout } from '@pages/layout/Layout'
// import { Button } from '@components/button/Button'

import { Button2 } from '@common/components/button/Button2'

export function Baseline1Page(props: { data: any }) {
  // const state = sosExample

  return (
    <Layout>
      <h1>Baseline 1</h1>
      Baseline 1<Button2>A test button</Button2>
      Current count is:
      <Button2>Add</Button2>
      <Button2>Reduce</Button2>
    </Layout>
  )
}

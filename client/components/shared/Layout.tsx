import React from 'react'

import Router from 'next/router'
import Link from 'next/link'

export const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <a href='/baseline1'>Baseline 1</a> |{' '}
        <a href='/baseline2'>Baseline 2</a>
      </div>
      <div>
        <a href='/baseline1' onClick={() => Router.push('/baseline1?hi')}>
          Baseline 1
        </a>
        |
        <a href='/baseline2' onClick={() => Router.push('/baseline2?ho')}>
          Baseline 2
        </a>
      </div>
      <div>
        <Link href='/baseline1'>
          <a>b1</a>
        </Link>{' '}
        |
        <Link href='/baseline2'>
          <a>b2</a>
        </Link>{' '}
      </div>

      {props.children}
    </div>
  )
}

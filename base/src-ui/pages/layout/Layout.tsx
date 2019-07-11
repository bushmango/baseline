import React from 'react'

import Router from 'next/router'
import Link from 'next/link'

export const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <div>
        <a href='/baseline-1'>Baseline 1</a> |{' '}
        <a href='/baseline-2'>Baseline 2</a>
      </div> */}
      <div>
        <div onClick={() => Router.push('/baseline-1?hi')}>
          Baseline 1 Router
        </div>
        |
        <div onClick={() => Router.push('/baseline-2?ho')}>
          Baseline 2 Router
        </div>
      </div>
      <div>
        <Link href='/baseline-1'>
          <a>Baseline 1 Link</a>
        </Link>
        |
        <Link href='/baseline-2'>
          <a>Baseline 2 Link</a>
        </Link>
      </div>

      {props.children}
    </div>
  )
}

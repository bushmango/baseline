import React from 'react'

export const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <a href='/baseline1'>Baseline 1</a> | <a href='/baseline2'>Baseline 2</a>
      {props.children}
    </div>
  )
}

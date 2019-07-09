import React from 'react'

import styles from './Button2.scss'

export const Button2 = (props: { children: React.ReactNode }) => {
  return (
    <div className={styles.button}>
      This is an example button 2222 {props.children}
    </div>
  )
}

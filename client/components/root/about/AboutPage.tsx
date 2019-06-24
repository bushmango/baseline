import React from 'react'

import styles from './AboutPage.scss'

function About(props: { data: any }) {
  return <AboutPage />
}

const AboutPage = () => {
  return (
    <div>
      <h1>About baseline</h1>
      Baseline
    </div>
  )
}

export { AboutPage, About }

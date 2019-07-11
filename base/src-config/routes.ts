import { Baseline1Page } from '@pages/baseline1'
import { Baseline2Page } from '@pages/baseline2'
import { AboutPage } from '@pages/about'

export const routes = [
  {
    path: '/baseline-1',
    component: Baseline1Page,
  },
  {
    path: '/baseline-2',
    component: Baseline2Page,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/',
    component: AboutPage,
  },
]

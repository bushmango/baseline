import {Layout} from './../../components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Count = (props: {initial: string}) => {

  const router = useRouter()

  return <Layout>
    <Head> <title>Count {router.query.count_id}</title></Head>
    <p>Count page asd [{router.query.count_id}] Next.js initial|{props.initial}</p>
  </Layout>
};

Count.getInitialProps = async function() {
  return {
    initial: '1234'
  }
}

export default Count;
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import Image from 'next/image'

const ProfilePic = () => {
  <Image
    src="/images/profile.jpg"
    layout="fill"
    // sizes={50}
    //height={144} 
    //width={144} 
    alt="Måns and Vera"
  />
}

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
    </Layout>
  )
}
import { history } from 'umi'
import React, { useEffect } from 'react'

const IndexPage: React.FC = () => {
  useEffect(() => {
    history.replace('/dashboard')
  }, [])
  return <></>
}

export default IndexPage

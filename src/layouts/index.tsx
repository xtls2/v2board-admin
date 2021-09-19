import './style.less'
import type { FC } from 'react'
import type { IRouteComponentProps } from 'umi'
import {
  title,
  version,
  sidebarTheme,
  headerTheme,
  colorTheme,
  isNoLaooutPath,
  isStandAlone,
  isProduction,
  envFile,
} from '@/default'
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import classNames from 'classnames/bind'
import { useTitle, useExternal } from 'ahooks'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

const LayoutPage: FC<IRouteComponentProps> = (props) => {
  const [sideOpen, setSideOpen] = useState(false)
  const { children, location } = props

  const containerClassNames = classNames(
    'sidebar-o',
    'side-scroll',
    'page-header-fixed',
    'page-footer-fixed',
    'main-content-boxed',
    'side-trans-enabled',
    {
      'sidebar-o-xs': sideOpen,
      'page-header-dark': headerTheme === 'dark',
      'page-sidebar-dark': sidebarTheme === 'dark',
    },
  )

  let themePath: string
  let envPath: string = ''
  if (isStandAlone) {
    themePath = `./theme/${colorTheme}.css`
  } else {
    themePath = `/assets/admin/theme/${colorTheme}.css`
  }

  if (isProduction && isStandAlone) {
    envPath = `./${envFile}`
  }

  useExternal(envPath, { async: false })
  useExternal(themePath, { async: false })

  useTitle(title)
  if (isNoLaooutPath(location.pathname)) {
    return <>{children}</>
  }

  const sideOpenHandler = () => {
    setSideOpen(true)
  }

  const sideCloseHandler = () => {
    setSideOpen(false)
  }

  return (
    <>
      <ConfigProvider locale={zhCN}>
        <div id="page-container" className={containerClassNames}>
          <div
            className="v2board-nav-mask"
            onClick={sideCloseHandler}
            style={{ display: sideOpen ? 'block' : 'none' }}
          >
            {''}
          </div>

          <Sidebar onSideClose={sideCloseHandler} />

          <Header onSideOpen={sideOpenHandler} />

          <main id="main-container">{children}</main>

          <Footer name={title} version={version} />
        </div>
      </ConfigProvider>
    </>
  )
}

export default LayoutPage

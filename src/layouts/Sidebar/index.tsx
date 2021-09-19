import './style.less'
import type { FC } from 'react'
import { Link } from 'umi'
import Menu from './Menu'
import { title } from '@/default'
import { useRef } from 'react'

export interface sidebarProps {
  onSideClose: () => void
}

const Sidebar: FC<sidebarProps> = (props) => {
  const { onSideClose } = props
  const navRef = useRef<HTMLElement>(null)

  return (
    <>
      <nav id="sidebar" ref={navRef}>
        <div className="smini-hidden bg-header-dark">
          <div className="content-header justify-content-lg-center bg-white-10">
            <Link className="font-size-lg text-white" to="/">
              <span className="text-white-75">{title}</span>
            </Link>
            <div className="d-lg-none">
              <Link
                className="text-white ml-2"
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  onSideClose()
                }}
              >
                <i className="fa fa-times-circle" />
              </Link>
            </div>
          </div>
        </div>
        <Menu />
      </nav>
    </>
  )
}

export default Sidebar

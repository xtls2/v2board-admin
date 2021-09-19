import './style.less'
import type { FC } from 'react'
import { Space } from 'antd'
import { useModel } from 'umi'

export interface FooterProps {
  name: string
  version?: string
  year?: string
}

const Footer: FC<FooterProps> = (props) => {
  const { name, version, year } = props
  const { yearCopy } = useModel('useCommonModel')
  const renderContent = () => {
    return (
      <div className="col-sm-6 order-sm-1 text-center text-sm-left">
        {name}
        {version}©<span data-toggle="year-copy">{year || yearCopy().toString()}</span>
      </div>
    )
  }

  return (
    <>
      <footer id="page-footer" className="bg-body-dark">
        <div className="content py-0">
          <div className="row font-size-sm">
            <div className="col-sm-6 order-sm-2 mb-1 mb-sm-0 text-center text-sm-right">
              <Space>
                <i className="fa fa-heart text-danger" />
                <a
                  className="font-w600"
                  href="https://github.com/xflash-panda/v2board-admin"
                  target="_blank"
                >
                  xflash-panda
                </a>
              </Space>
            </div>
            {renderContent()}
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

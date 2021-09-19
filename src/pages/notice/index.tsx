import type { FC } from 'react'
import { useIntl } from 'umi'
import { Button } from 'antd'
import { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import List from './_List'
import { notices } from '@/services'
import ModalNotice from './_Modal'

const NoticePage: FC = () => {
  const intl = useIntl()
  const [adminNotices, setAdminNotices] = useState<API.Admin.NoticeItem[]>()
  const [listUpdateStatus, setListUpdateStatus] = useState(false)
  const [modalNoticeVisible, setModalNoticeVisible] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (adminNotices !== undefined && listUpdateStatus === false) {
        return
      }
      const noticesResult = await notices()
      if (noticesResult === undefined) {
        return
      }
      setAdminNotices(noticesResult.data)
      setListUpdateStatus(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateStatus])

  return (
    <>
      <div className="p-0 p-lg-4">
        <div className="d-flex justify-content-between align-items-center" />
        <div className="block block-rounded block-bordered ">
          <div className="bg-white">
            <div className="p-3">
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  setModalNoticeVisible(true)
                }}
              >
                <PlusOutlined style={{ verticalAlign: '0.05rem' }} />
                <span>{intl.formatMessage({ id: 'module.notice.add_btn' })}</span>
              </Button>
            </div>
          </div>

          <List
            onDropSuccess={() => {
              setListUpdateStatus(true)
            }}
            onEditSuccess={() => {
              setListUpdateStatus(true)
            }}
            dataSource={adminNotices as []}
          />
        </div>
      </div>
      <ModalNotice
        visible={modalNoticeVisible}
        onCancel={() => {
          setModalNoticeVisible(false)
        }}
        onSubmitSuccess={() => {
          setListUpdateStatus(true)
          setModalNoticeVisible(false)
        }}
      />
    </>
  )
}
export default NoticePage

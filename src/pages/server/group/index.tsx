import type { FC } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useIntl } from 'umi'
import { groups } from '@/services'
import { useEffect, useState } from 'react'
import List from './_List'
import ModalGroup from '@/components/Modal/group'

const ServerGroupPage: FC = () => {
  const intl = useIntl()
  const [adminGroups, setAdminGroups] = useState<API.Admin.GroupItem[]>()
  const [listUpdateStatus, setListUpdateStatus] = useState(false)
  const [modalGroupVisible, setModalGroupVisible] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (adminGroups !== undefined && listUpdateStatus === false) {
        return
      }
      const groupsResult = await groups()
      if (groupsResult === undefined) {
        return
      }
      setAdminGroups(groupsResult.data)
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
                  setModalGroupVisible(true)
                }}
              >
                <PlusOutlined style={{ verticalAlign: '0.05rem' }} />
                <span>{intl.formatMessage({ id: 'module.server.group.add_btn' })}</span>
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
            dataSource={adminGroups as []}
          />
        </div>
      </div>
      <ModalGroup
        visible={modalGroupVisible}
        onCancel={() => {
          setModalGroupVisible(false)
        }}
        onSubmitSuccess={() => {
          setListUpdateStatus(true)
          setModalGroupVisible(false)
        }}
      />
    </>
  )
}
export default ServerGroupPage

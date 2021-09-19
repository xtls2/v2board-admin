import type { FC } from 'react'
import { useIntl } from 'umi'
import { Button, message } from 'antd'
import { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import List from './_List'
import lodash from 'lodash'
import { knowledges, knowledgeSort } from '@/services'
import DrawerKnowledge from './_Drawer'

const KnowledgePage: FC = () => {
  const intl = useIntl()
  const [adminKnowledges, setAdminKnowledges] = useState<API.Admin.KnowledgeItem[]>()
  const [listUpdateStatus, setListUpdateStatus] = useState(false)
  const [sortStatus, setSortStatus] = useState(false)
  const [drawerKnowledgeVisible, setDrawerKnowledgeVisible] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (adminKnowledges !== undefined && listUpdateStatus === false) {
        return
      }
      const knowledgesResult = await knowledges()
      if (knowledgesResult === undefined) {
        return
      }
      setAdminKnowledges(knowledgesResult.data)
      setListUpdateStatus(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateStatus])

  const saveSortHandler = async () => {
    const sortIds: number[] = []
    lodash.forEach(adminKnowledges, (nodeItem, index) => {
      sortIds[index] = nodeItem.id
    })

    const knowledgeSortResult = await knowledgeSort({ knowledge_ids: sortIds })
    if (knowledgeSortResult === undefined) {
      return
    }
    message.success(intl.formatMessage({ id: 'module.knowledge.save_sort.message.success' }))
    setSortStatus(false)
  }

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
                  setDrawerKnowledgeVisible(true)
                }}
              >
                <PlusOutlined style={{ verticalAlign: '0.05rem' }} />
                <span>{intl.formatMessage({ id: 'module.knowledge.add_btn' })}</span>
              </Button>
              {sortStatus && (
                <Button type="primary" className="float-right" onClick={saveSortHandler}>
                  <span>{intl.formatMessage({ id: 'module.knowledge.save_sort_btn' })}</span>
                </Button>
              )}
            </div>
          </div>
          <List
            dataSource={adminKnowledges as []}
            onEditItemSuccess={() => {
              setListUpdateStatus(true)
            }}
            onDropItemSuccess={() => {
              setListUpdateStatus(true)
            }}
            onSort={(data: API.Admin.KnowledgeItem[]) => {
              setAdminKnowledges(data)
              setSortStatus(true)
            }}
          />
        </div>
      </div>
      <DrawerKnowledge
        onClose={() => {
          setDrawerKnowledgeVisible(false)
        }}
        visible={drawerKnowledgeVisible}
        onSubmitSuccess={() => {
          setDrawerKnowledgeVisible(false)
          setListUpdateStatus(true)
        }}
      />
    </>
  )
}
export default KnowledgePage

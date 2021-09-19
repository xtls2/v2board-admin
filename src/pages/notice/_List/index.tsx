import type { FC } from 'react'
import { Table, Divider, message } from 'antd'
import { useIntl, Link } from 'umi'
import React, { useState } from 'react'
import moment from 'moment'
import { noticeDrop } from '@/services'
import ModalNotice from '../_Modal'

const { Column } = Table

export interface listProps {
  dataSource: API.Admin.NoticeItem[]
  onDropSuccess: () => void
  onEditSuccess: () => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, onDropSuccess, onEditSuccess } = props
  const [modalNoticeVisible, setModalNoticeVisible] = useState(false)
  const [editNotice, setEditNotice] = useState<API.Admin.NoticeItem>()
  const intl = useIntl()

  const dropHandler = async (id: number) => {
    const noticeDropResult = await noticeDrop({ id })
    if (noticeDropResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({ id: 'module.notice.list.column.action.drop.message.success' }),
    )
    onDropSuccess()
  }

  return (
    <>
      <Table
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
        loading={dataSource === undefined}
      >
        <Column
          title={intl.formatMessage({ id: 'module.notice.list.column.id' })}
          dataIndex="id"
          key="id"
        />
        <Column
          title={intl.formatMessage({ id: 'module.notice.list.column.title' })}
          dataIndex="title"
          key="title"
        />
        <Column
          title={intl.formatMessage({ id: 'module.notice.list.column.created_at' })}
          dataIndex="created_at"
          key="created_at"
          align="center"
          render={(created_at: number) => {
            return moment.unix(created_at).format('YYYY/MM/DD HH:MM')
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.notice.list.column.action' })}
          key="action"
          render={(text, record: API.Admin.NoticeItem) => (
            <>
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  setEditNotice(record)
                  setModalNoticeVisible(true)
                }}
              >
                {intl.formatMessage({ id: 'module.notice.list.column.action.edit' })}
              </Link>
              <Divider type="vertical" />
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  dropHandler(record.id)
                }}
              >
                {intl.formatMessage({ id: 'module.notice.list.column.action.drop' })}
              </Link>
            </>
          )}
          align="right"
        />
      </Table>
      {editNotice !== undefined && (
        <ModalNotice
          onCancel={() => {
            setModalNoticeVisible(false)
          }}
          onSubmitSuccess={() => {
            setModalNoticeVisible(false)
            onEditSuccess()
          }}
          visible={modalNoticeVisible}
          defaultNotice={editNotice}
          key={editNotice.id}
        />
      )}
    </>
  )
}

export default List

import type { FC } from 'react'
import { Table, Divider, message } from 'antd'
import { useIntl, Link } from 'umi'
import React, { useState } from 'react'
import { groupDrop } from '@/services'
import ModalGroup from '@/components/Modal/group'

const { Column } = Table

export interface listProps {
  dataSource: API.Admin.GroupItem[]
  onDropSuccess: () => void
  onEditSuccess: () => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, onDropSuccess, onEditSuccess } = props
  const [modalGroupVisible, setModalGroupVisible] = useState(false)
  const [editGroup, setEditGroup] = useState<API.Admin.GroupItem>()
  const intl = useIntl()

  const dropHandler = async (id: number) => {
    const groupDropResult = await groupDrop({ id })
    if (groupDropResult === undefined) {
      return
    }

    message.success(
      intl.formatMessage({ id: 'module.server.group.payment.list.message.edit_success' }),
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
          title={intl.formatMessage({ id: 'module.server.group.list.column.id' })}
          dataIndex="id"
          key="id"
        />
        <Column
          title={intl.formatMessage({ id: 'module.server.group.list.column.name' })}
          dataIndex="name"
          key="name"
        />
        <Column
          title={intl.formatMessage({ id: 'module.server.group.list.column.action' })}
          key="action"
          render={(text, record: API.Admin.GroupItem) => (
            <>
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  setEditGroup(record)
                  setModalGroupVisible(true)
                }}
              >
                {intl.formatMessage({ id: 'module.server.group.list.column.action.edit' })}
              </Link>
              <Divider type="vertical" />
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  dropHandler(record.id)
                }}
              >
                {intl.formatMessage({ id: 'module.server.group.list.column.action.drop' })}
              </Link>
            </>
          )}
          align="right"
        />
      </Table>
      {editGroup !== undefined && (
        <ModalGroup
          onCancel={() => {
            setModalGroupVisible(false)
          }}
          onSubmitSuccess={() => {
            setModalGroupVisible(false)
            onEditSuccess()
          }}
          visible={modalGroupVisible}
          defaultGroup={editGroup}
          key={editGroup.id}
        />
      )}
    </>
  )
}

export default List

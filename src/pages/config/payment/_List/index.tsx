import type { FC } from 'react'
import { Table, Divider, Switch, Tooltip, message, Space } from 'antd'
import { useIntl, Link } from 'umi'
import React, { useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { paymentDrop, paymentSave } from '@/services'
import ModalEdit from '../_Modal/edit'

const { Column } = Table

export interface listProps {
  dataSource: API.Admin.PaymentItem[]
  onDropSuccess: () => void
  onEditSuccess: () => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, onDropSuccess, onEditSuccess } = props
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editPayment, setEditPayment] = useState<API.Admin.PaymentItem>()
  const intl = useIntl()

  const showEditModal = (paymentItem: API.Admin.PaymentItem) => {
    setEditPayment(paymentItem)
    setEditModalVisible(true)
  }

  const editModalCancelHandler = () => {
    setEditModalVisible(false)
  }

  const editModalSuccessHandler = () => {
    setEditModalVisible(false)
    onEditSuccess()
  }

  const enableChangeHandler = async (checked: boolean, id: number) => {
    await paymentSave({ id, enable: checked ? 1 : 0 })
  }

  const dropHandler = async (id: number) => {
    const paymentDropResult = await paymentDrop({ id })
    if (paymentDropResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({ id: 'module.config.payment.list.column.action.drop.message.success' }),
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
          title={intl.formatMessage({ id: 'module.config.payment.list.column.id' })}
          dataIndex="id"
          key="id"
        />

        <Column
          title={intl.formatMessage({ id: 'module.config.payment.list.column.enable' })}
          dataIndex="enable"
          key="enable"
          render={(enable: number, record: API.Admin.PaymentItem) => (
            <>
              <Switch
                defaultChecked={Boolean(enable).valueOf()}
                onChange={(value: boolean, e: Event) => {
                  e.preventDefault()
                  enableChangeHandler(value, record.id)
                }}
                size="small"
              />
            </>
          )}
        />
        <Column
          title={intl.formatMessage({ id: 'module.config.payment.list.column.name' })}
          dataIndex="name"
          key="name"
        />
        <Column
          title={intl.formatMessage({ id: 'module.config.payment.list.column.payment' })}
          dataIndex="payment"
          key="payment"
        />
        <Column
          title={
            <>
              <Space>
                {intl.formatMessage({ id: 'module.config.payment.list.column.notify_url' })}
                <Tooltip
                  title={intl.formatMessage({
                    id: 'module.config.payment.list.column.notify_url.tip',
                  })}
                >
                  <QuestionCircleOutlined style={{ verticalAlign: '0.1rem' }} />
                </Tooltip>
              </Space>
            </>
          }
          dataIndex="notify_url"
          key="notify_url"
        />
        <Column
          title={intl.formatMessage({ id: 'module.config.payment.list.column.action' })}
          key="action"
          render={(text, record: API.Admin.PaymentItem) => (
            <>
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  showEditModal(record)
                }}
              >
                {intl.formatMessage({ id: 'module.config.payment.list.column.action.edit' })}
              </Link>
              <Divider type="vertical" />
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  dropHandler(record.id)
                }}
              >
                {intl.formatMessage({ id: 'module.config.payment.list.column.action.drop' })}
              </Link>
            </>
          )}
          align="right"
        />
      </Table>
      {editPayment && (
        <ModalEdit
          payment={editPayment}
          visible={editModalVisible}
          onCancel={editModalCancelHandler}
          onEditSuccess={editModalSuccessHandler}
          key={editPayment.id}
        />
      )}
    </>
  )
}

export default List

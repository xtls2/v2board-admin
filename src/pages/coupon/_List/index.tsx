import type { FC } from 'react'
import type { TablePaginationConfig } from 'antd/lib/table/interface'
import { Table, Tag, Divider, message } from 'antd'
import { useIntl, Link } from 'umi'
import { useState } from 'react'
import moment from 'moment'
import { couponDrop } from '@/services'
import ModalCoupon from '../_Modal'

const { Column } = Table

export interface listProps {
  dataSource: API.Admin.CouponItem[]
  total: number
  pageSize: number
  current: number
  plans: API.Admin.PlanItem[]
  onChange: (current: number, pageSize: number) => void
  onDropSuccess: () => void
  onEditSuccess: () => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, total, pageSize, current, plans, onChange, onDropSuccess, onEditSuccess } =
    props
  const intl = useIntl()
  const [editCoupon, setEditCoupon] = useState<API.Admin.CouponItem>()
  const [modalCouponVisible, setModalCouponVisible] = useState(false)

  const pagenationProps: TablePaginationConfig = {
    pageSize,
    showQuickJumper: false,
    showLessItems: false,
    showSizeChanger: true,
    total,
    size: 'small',
    current,
    pageSizeOptions: ['10', '50', '100', '150'],
  }

  const tableChangeHandler = (pagenation: TablePaginationConfig) => {
    onChange(pagenation.current as number, pagenation.pageSize as number)
  }

  const dropHandler = async (id: number) => {
    const couponDropResult = await couponDrop({ id })
    if (couponDropResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({ id: 'module.coupon.list.column.action.drop.message.success' }),
    )
    onDropSuccess()
  }

  return (
    <>
      <Table
        dataSource={dataSource}
        pagination={pagenationProps}
        rowKey="id"
        scroll={{ x: true }}
        onChange={tableChangeHandler}
        loading={dataSource === undefined}
      >
        <Column
          title={intl.formatMessage({ id: 'module.coupon.list.column.id' })}
          dataIndex="id"
          key="id"
        />
        <Column
          title={intl.formatMessage({ id: 'module.coupon.list.column.name' })}
          dataIndex="name"
          key="name"
        />
        <Column
          title={intl.formatMessage({ id: 'module.coupon.list.column.type' })}
          dataIndex="type"
          key="type"
          render={(type: number) => {
            return type === 1
              ? intl.formatMessage({ id: 'module.coupon.list.column.type.amount' })
              : intl.formatMessage({ id: 'module.coupon.list.column.type.proportion' })
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.coupon.list.column.code' })}
          dataIndex="code"
          key="code"
          render={(code: string) => {
            return <Tag>{code}</Tag>
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.coupon.list.column.limit_use' })}
          dataIndex="limit_use"
          key="limit_use"
          render={(limitUse: number | null) => {
            return limitUse === null
              ? intl.formatMessage({ id: 'module.coupon.list.column.limit_use.infinite' })
              : limitUse
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.coupon.list.column.valid_period' })}
          dataIndex="valid_period"
          key="valid_period"
          render={(valid: string, record: API.Admin.CouponItem) => {
            return `${moment.unix(record.started_at).format('YYYY/MM/DD HH:MM')} ~ ${moment
              .unix(record.ended_at)
              .format('YYYY/MM/DD HH:MM')} `
          }}
          align="left"
        />
        <Column
          title={intl.formatMessage({ id: 'module.coupon.list.column.action' })}
          dataIndex="action"
          key="action"
          align="right"
          render={(action: string, record: API.Admin.CouponItem) => {
            return (
              <>
                <Link
                  to=""
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setEditCoupon(record)
                    setModalCouponVisible(true)
                  }}
                >
                  {intl.formatMessage({ id: 'module.coupon.list.column.action.edit' })}
                </Link>
                <Divider type="vertical" />
                <Link
                  to=""
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    dropHandler(record.id)
                  }}
                >
                  {intl.formatMessage({ id: 'module.coupon.list.column.action.drop' })}
                </Link>
              </>
            )
          }}
        />
      </Table>
      {editCoupon && (
        <ModalCoupon
          defaultCoupon={editCoupon}
          plans={plans}
          visible={modalCouponVisible}
          onCancel={() => {
            setModalCouponVisible(false)
          }}
          onSubmitSuccess={() => {
            setModalCouponVisible(false)
            onEditSuccess()
          }}
          key={editCoupon.id}
        />
      )}
    </>
  )
}
export default List

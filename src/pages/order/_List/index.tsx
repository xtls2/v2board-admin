import type { FC } from 'react'
import type { TablePaginationConfig } from 'antd/lib/table/interface'
import { Table, Tag, message, Menu, Space, Tooltip, Badge, Dropdown } from 'antd'
import { useIntl, Link } from 'umi'
import { useState } from 'react'
import moment from 'moment'
import { QuestionCircleOutlined, CaretDownOutlined } from '@ant-design/icons'
import lodash from 'lodash'
import { currencyFormatter } from '@/default'
import { orderPaid, orderCancel, orderUpdate } from '@/services'
import ModalDetail from '../_Modal/detail'

const { Column } = Table
export interface changeValues {
  pageSize: number
  pageCurrent: number
  filter?: API.Admin.UserFilterItem[]
}

export interface listProps {
  dataSource: API.Admin.OrderItem[]
  total: number
  pageSize: number
  current: number
  plans: API.Admin.PlanItem[]
  onChange: (values: changeValues) => void
  onEditSuccess: () => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, total, pageSize, current, plans, onChange, onEditSuccess } = props
  const [modalDetailVisible, setModalDetailVisible] = useState(false)
  const [detailOrder, setDetailOrder] = useState<API.Admin.OrderItem>()
  const intl = useIntl()

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
    const changes = {
      pageCurrent: pagenation.current as number,
      pageSize: pagenation.pageSize as number,
    }
    onChange(changes)
  }

  const unpaidMenu = (tradeNo: string) => (
    <Menu>
      <Menu.Item>
        <Link
          to=""
          onClick={async (e: React.MouseEvent) => {
            e.preventDefault()
            const orderPaidResult = await orderPaid({ trade_no: tradeNo })
            if (orderPaidResult === undefined) {
              return
            }
            message.success(
              intl.formatMessage({
                id: 'module.order.list.column.status.unpaid.mark.message.success',
              }),
            )
            onEditSuccess()
          }}
        >
          {intl.formatMessage({ id: 'module.order.list.column.status.unpaid.mark.pending' })}
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to=""
          onClick={async (e: React.MouseEvent) => {
            e.preventDefault()
            const orderCancelResult = await orderCancel({ trade_no: tradeNo })
            if (orderCancelResult === undefined) {
              return
            }
            message.success(
              intl.formatMessage({
                id: 'module.order.list.column.status.unpaid.mark.message.success',
              }),
            )
            onEditSuccess()
          }}
        >
          {intl.formatMessage({ id: 'module.order.list.column.status.unpaid.mark.cancelled' })}
        </Link>
      </Menu.Item>
    </Menu>
  )

  const commissionUpdateHandler = async (tradeNo: string, commissionStatus: number) => {
    const orderUpdateResult = await orderUpdate({
      trade_no: tradeNo,
      commission_status: commissionStatus,
    })
    if (orderUpdateResult === undefined) {
      return
    }

    message.success(
      intl.formatMessage({
        id: 'module.order.list.column.commission_status.new.mark.message.success',
      }),
    )
    onEditSuccess()
  }

  const commissonMenu = (tradeNo: string) => (
    <Menu>
      <Menu.Item>
        <Link
          to=""
          onClick={async (e: React.MouseEvent) => {
            e.preventDefault()
            commissionUpdateHandler(tradeNo, 1)
          }}
        >
          {intl.formatMessage({ id: 'module.order.list.column.commission_status.new.mark.valid' })}
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to=""
          onClick={async (e: React.MouseEvent) => {
            e.preventDefault()
            commissionUpdateHandler(tradeNo, 3)
          }}
        >
          {intl.formatMessage({
            id: 'module.order.list.column.commission_status.new.mark.invalid',
          })}
        </Link>
      </Menu.Item>
    </Menu>
  )

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
          title={intl.formatMessage({ id: 'module.order.list.column.trade_no' })}
          dataIndex="trade_no"
          key="trade_no"
          render={(tradeNo: string, record: API.Admin.OrderItem) => {
            return (
              <Link
                to=""
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  setDetailOrder(record)
                  setModalDetailVisible(true)
                }}
              >
                {`${tradeNo.substring(0, 3)}...${tradeNo.substring(
                  tradeNo.length - 3,
                  tradeNo.length,
                )}`}
              </Link>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.order.list.column.type' })}
          dataIndex="type"
          key="type"
          render={(type: number) => {
            return (
              <>
                {type === 1 &&
                  intl.formatMessage({ id: 'module.order.list.column.type.new_order' })}
                {type === 2 && intl.formatMessage({ id: 'module.order.list.column.type.renew' })}
                {type === 3 && intl.formatMessage({ id: 'module.order.list.column.type.upgrade' })}
                {type === 4 &&
                  intl.formatMessage({ id: 'module.order.list.column.type.reset_price' })}
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.order.list.column.plan_id' })}
          dataIndex="plan_id"
          key="plan_id"
          render={(planId: number) => {
            const plan = planId > 0 ? lodash.find(plans, { id: planId }) : undefined
            return plan !== undefined ? plan.name : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.order.list.column.cycle' })}
          dataIndex="cycle"
          key="cycle"
          render={(cycle: string) => {
            return (
              <>
                {cycle === 'month_price' && (
                  <Tag>
                    {intl.formatMessage({ id: 'module.order.list.column.cycle.month_price' })}
                  </Tag>
                )}
                {cycle === 'quarter_price' && (
                  <Tag>
                    {intl.formatMessage({ id: 'module.order.list.column.cycle.month_price' })}
                  </Tag>
                )}
                {cycle === 'half_year_price' && (
                  <Tag>
                    {intl.formatMessage({ id: 'module.order.list.column.cycle.half_year_price' })}
                  </Tag>
                )}
                {cycle === 'year_price' && (
                  <Tag>
                    {intl.formatMessage({ id: 'module.order.list.column.cycle.year_price' })}
                  </Tag>
                )}
                {cycle === 'two_year_price' && (
                  <Tag>
                    {intl.formatMessage({ id: 'module.order.list.column.cycle.two_year_price' })}
                  </Tag>
                )}
                {cycle === 'three_year_price' && (
                  <Tag>
                    {intl.formatMessage({ id: 'module.order.list.column.cycle.three_year_price' })}
                  </Tag>
                )}
                {cycle === 'onetime_price' && (
                  <Tag>
                    {intl.formatMessage({ id: 'module.order.list.column.cycle.onetime_price' })}
                  </Tag>
                )}
                {cycle === 'reset_price' && (
                  <Tag>
                    {intl.formatMessage({ id: 'module.order.list.column.cycle.reset_price' })}
                  </Tag>
                )}
              </>
            )
          }}
        />

        <Column
          title={intl.formatMessage({ id: 'module.order.list.column.total_amount' })}
          dataIndex="total_amount"
          key="total_amount"
          render={(totalAmount: number) => {
            return currencyFormatter.format(totalAmount / 100)
          }}
        />

        <Column
          title={
            <Space>
              {intl.formatMessage({ id: 'module.order.list.column.status' })}
              <Tooltip title={intl.formatMessage({ id: 'module.order.list.column.status.tip' })}>
                <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
              </Tooltip>
            </Space>
          }
          dataIndex="status"
          key="status"
          render={(status: number, record: API.Admin.OrderItem) => {
            return (
              <>
                <Space>
                  {status === 0 && (
                    <Space>
                      <Badge status="error" />
                      {intl.formatMessage({ id: 'module.order.list.column.status.unpaid' })}
                      <Dropdown
                        overlay={unpaidMenu(record.trade_no)}
                        placement="bottomLeft"
                        trigger={['click']}
                      >
                        <Link
                          to=""
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault()
                          }}
                        >
                          {intl.formatMessage({
                            id: 'module.order.list.column.status.unpaid.mark',
                          })}
                          <CaretDownOutlined style={{ verticalAlign: '0.05rem' }} />
                        </Link>
                      </Dropdown>
                    </Space>
                  )}
                  {status === 1 && (
                    <Space>
                      <Badge status="processing" />
                      {intl.formatMessage({ id: 'module.order.list.column.status.pending' })}
                    </Space>
                  )}
                  {status === 2 && (
                    <Space>
                      <Badge status="default" />
                      {intl.formatMessage({ id: 'module.order.list.column.status.cancelled' })}
                    </Space>
                  )}
                  {status === 3 && (
                    <Space>
                      <Badge status="success" />
                      {intl.formatMessage({ id: 'module.order.list.column.status.completed' })}
                    </Space>
                  )}
                  {status === 4 && (
                    <Space>
                      <Badge status="warning" />
                      {intl.formatMessage({ id: 'module.order.list.column.status.discountd' })}
                    </Space>
                  )}
                </Space>
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.order.list.column.commission_balance' })}
          key="commission_balance"
          dataIndex="commission_balance"
          render={(commissionBalance: number) => {
            return currencyFormatter.format(commissionBalance / 100)
          }}
        />
        <Column
          title={
            <Space>
              {intl.formatMessage({ id: 'module.order.list.column.commission_status' })}
              <Tooltip
                title={intl.formatMessage({ id: 'module.order.list.column.commission_status.tip' })}
              >
                <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
              </Tooltip>
            </Space>
          }
          dataIndex="commission_status"
          key="commission_status"
          render={(commissionStatus: number, record: API.Admin.OrderItem) => {
            const validStatus =
              record.invite_user_id && record.commission_balance && [1, 3].includes(record.status)
            return (
              <>
                {!validStatus && '-'}
                {validStatus === true && commissionStatus === 0 && (
                  <Space>
                    <Badge status="default" />
                    {intl.formatMessage({ id: 'module.order.list.column.commission_status.new' })}
                    <Dropdown
                      overlay={commissonMenu(record.trade_no)}
                      placement="bottomLeft"
                      trigger={['click']}
                    >
                      <Link
                        to=""
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault()
                        }}
                      >
                        {intl.formatMessage({
                          id: 'module.order.list.column.commission_status.new.mark',
                        })}
                        <CaretDownOutlined style={{ verticalAlign: '0.05rem' }} />
                      </Link>
                    </Dropdown>
                  </Space>
                )}
                {validStatus === true && commissionStatus === 1 && (
                  <Space>
                    <Badge status="processing" />
                    {intl.formatMessage({
                      id: 'module.order.list.column.commission_status.pending',
                    })}
                  </Space>
                )}
                {validStatus === true && commissionStatus === 2 && (
                  <Space>
                    <Badge status="success" />
                    {intl.formatMessage({ id: 'module.order.list.column.commission_status.valid' })}
                  </Space>
                )}
                {validStatus === true && commissionStatus === 3 && (
                  <Space>
                    <Badge status="error" />
                    {intl.formatMessage({
                      id: 'module.order.list.column.commission_status.invalid',
                    })}
                  </Space>
                )}
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.order.list.column.created_at' })}
          dataIndex="created_at"
          key="created_at"
          render={(createdAt: number) => {
            return moment.unix(createdAt).format('YYYY/MM/DD HH:MM')
          }}
          align="right"
        />
      </Table>
      {detailOrder !== undefined && (
        <ModalDetail
          onCancel={() => {
            setModalDetailVisible(false)
          }}
          visible={modalDetailVisible}
          defaultOrder={detailOrder}
          key={detailOrder.id}
          plans={plans}
        />
      )}
    </>
  )
}
export default List

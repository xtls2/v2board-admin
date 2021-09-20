import type { FC } from 'react'
import { useIntl, Link } from 'umi'
import { useState, useEffect } from 'react'
import { Modal, Row, Col, Divider } from 'antd'
import { userInfo } from '@/services/admin'
import lodash from 'lodash'
import moment from 'moment'
import { currencyFormatter } from '@/default'

export interface modalDetailProps {
  visible: boolean
  onCancel: () => void
  defaultOrder: API.Admin.OrderItem
  plans: API.Admin.PlanItem[]
}

const ModalDetail: FC<modalDetailProps> = (props) => {
  const { visible, onCancel, defaultOrder, plans } = props
  const [adminUser, setAdminUser] = useState<API.User.InfoItem>()
  const intl = useIntl()

  useEffect(() => {
    ;(async () => {
      const userInfoResult = await userInfo({ id: defaultOrder.user_id })
      if (userInfoResult === undefined) {
        return
      }
      setAdminUser(userInfoResult.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'module.order.modal.detail.title' })}
        visible={visible}
        footer={false}
        destroyOnClose={true}
        onCancel={onCancel}
      >
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.email' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            <Link
              to={{
                pathname: '/user',
                state: { filter: [{ key: 'email', condition: '=', value: adminUser?.email }] },
              }}
            >
              {adminUser?.email}
            </Link>
          </Col>
        </Row>
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.trade_no' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {defaultOrder.trade_no}
          </Col>
        </Row>
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.cycle' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {defaultOrder.cycle === 'month_price' &&
              intl.formatMessage({ id: 'module.order.modal.detail.cycle.month_price' })}
            {defaultOrder.cycle === 'quarter_price' &&
              intl.formatMessage({ id: 'module.order.modal.detail.cycle.quarter_price' })}
            {defaultOrder.cycle === 'half_year_price' &&
              intl.formatMessage({ id: 'module.order.modal.detail.cycle.half_year_price' })}
            {defaultOrder.cycle === 'year_price' &&
              intl.formatMessage({ id: 'module.order.modal.detail.cycle.year_price' })}
            {defaultOrder.cycle === 'two_year_price' &&
              intl.formatMessage({ id: 'module.order.modal.detail.cycle.two_year_price' })}
            {defaultOrder.cycle === 'three_year_price' &&
              intl.formatMessage({ id: 'module.order.modal.detail.cycle.three_year_price' })}
            {defaultOrder.cycle === 'onetime_price' &&
              intl.formatMessage({ id: 'module.order.modal.detail.cycle.onetime_price' })}
            {defaultOrder.cycle === 'reset_price' &&
              intl.formatMessage({ id: 'module.order.modal.detail.cycle.reset_price' })}
          </Col>
        </Row>
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.status' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {defaultOrder.status === 0 &&
              intl.formatMessage({ id: 'module.order.modal.detail.status.unpaid' })}
            {defaultOrder.status === 1 &&
              intl.formatMessage({ id: 'module.order.modal.detail.status.pending' })}
            {defaultOrder.status === 2 &&
              intl.formatMessage({ id: 'module.order.modal.detail.status.cancelled' })}

            {defaultOrder.status === 3 &&
              intl.formatMessage({ id: 'module.order.modal.detail.status.completed' })}

            {defaultOrder.status === 4 &&
              intl.formatMessage({ id: 'module.order.modal.detail.status.discountd' })}
          </Col>
        </Row>
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.plan_id' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {lodash.find(plans, { id: defaultOrder.plan_id })?.name}
          </Col>
        </Row>
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.callback_no' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {defaultOrder.callback_no ?? '-'}
          </Col>
        </Row>
        <Divider />
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.total_amount' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {currencyFormatter.format((defaultOrder.total_amount as number) / 100)}
          </Col>
        </Row>
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.balance_amount' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {currencyFormatter.format((defaultOrder.balance_amount as number) / 100)}
          </Col>
        </Row>
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.discount_amount' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {currencyFormatter.format((defaultOrder.discount_amount as number) / 100)}
          </Col>
        </Row>
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.refund_amount' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {currencyFormatter.format((defaultOrder.refund_amount as number) / 100)}
          </Col>
        </Row>
        <Divider />
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.created_at' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {moment.unix(defaultOrder.created_at).format('YYYY-MM-DD HH:MM')}
          </Col>
        </Row>
        <Row style={{ margin: '-8px -8px 10px' }}>
          <Col span="6" style={{ padding: '8px' }}>
            {intl.formatMessage({ id: 'module.order.modal.detail.updated_at' })}
          </Col>
          <Col span="18" style={{ padding: '8px' }}>
            {moment.unix(defaultOrder.updated_at).format('YYYY-MM-DD HH:MM')}
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default ModalDetail

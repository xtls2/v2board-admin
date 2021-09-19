import type { FC, ChangeEvent } from 'react'
import { useIntl } from 'umi'
import { Modal, Input, message, Select } from 'antd'
import { orderAssign } from '@/services'
import { useState } from 'react'

const { Option } = Select

export interface modalAssignOrderProps {
  visible: boolean
  onCancel: () => void
  onSubmitSuccess: () => void
  defaultUser?: API.Admin.UserItem & API.User.InfoItem
  plans: API.Admin.PlanItem[]
}

const ModalAssignOrder: FC<modalAssignOrderProps> = (props) => {
  const { visible, onCancel, onSubmitSuccess, defaultUser, plans } = props
  const [cycle, setCycle] = useState('')
  const [email, setEmail] = useState(defaultUser?.email as string)
  const [totalAmount, setTotalAmount] = useState(0)
  const [planID, setPlanID] = useState<number>(0)
  const [destroy, setDestroy] = useState(false)
  const intl = useIntl()

  const submitHandler = async () => {
    const orderAssignResult = await orderAssign({
      email,
      cycle,
      total_amount: totalAmount,
      plan_id: planID,
    })

    if (orderAssignResult === undefined) {
      return
    }

    message.success(intl.formatMessage({ id: 'common.modal.assign_order.message.success' }))
    setDestroy(true)
    onSubmitSuccess()
  }
  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'common.modal.assign_order.modal.title' })}
        visible={visible}
        onOk={submitHandler}
        onCancel={onCancel}
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'common.modal.assign_order.email' })}</label>
          <Input
            defaultValue={email}
            disabled={defaultUser !== undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'common.modal.assign_order.plan_id' })}</label>
          <Select
            placeholder={intl.formatMessage({
              id: 'common.modal.assign_order.plan_id.placeholder',
            })}
            className="w-100"
            onChange={(value: number) => {
              setPlanID(value)
            }}
          >
            {plans.map((item: API.Admin.PlanItem) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'common.modal.assign_order.cycle' })}</label>
          <Select
            placeholder={intl.formatMessage({
              id: 'common.modal.assign_order.cycle.placeholder',
            })}
            className="w-100"
            onChange={(value: string) => {
              setCycle(value)
            }}
          >
            <Option key="month_price" value="month_price">
              {intl.formatMessage({
                id: 'common.modal.assign_order.cycle.option.month_price',
              })}
            </Option>
            <Option key="quarter_price" value="quarter_price">
              {intl.formatMessage({
                id: 'common.modal.assign_order.cycle.option.quarter_price',
              })}
            </Option>
            <Option key="half_year_price" value="half_year_price">
              {intl.formatMessage({
                id: 'common.modal.assign_order.cycle.option.half_year_price',
              })}
            </Option>
            <Option key="year_price" value="year_price">
              {intl.formatMessage({
                id: 'common.modal.assign_order.cycle.option.year_price',
              })}
            </Option>
            <Option key="two_year_price" value="two_year_price">
              {intl.formatMessage({
                id: 'common.modal.assign_order.cycle.option.two_year_price',
              })}
            </Option>
            <Option key="three_year_price" value="three_year_price">
              {intl.formatMessage({
                id: 'common.modal.assign_order.cycle.option.three_year_price',
              })}
            </Option>
            <Option key="onetime_price" value="onetime_price">
              {intl.formatMessage({
                id: 'common.modal.assign_order.cycle.option.onetime_price',
              })}
            </Option>
            <Option key="reset_price" value="reset_price">
              {intl.formatMessage({
                id: 'common.modal.assign_order.cycle.option.reset_price',
              })}
            </Option>
          </Select>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'common.modal.assign_order.total_amount' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'common.modal.assign_order.total_amount.placeholder',
            })}
            addonAfter="￥"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTotalAmount(Number(e.target.value).valueOf() * 100)
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export default ModalAssignOrder

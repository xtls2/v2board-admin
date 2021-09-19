import type { FC, ChangeEvent } from 'react'
import { useIntl } from 'umi'
import { Modal, Input, message, Select, DatePicker } from 'antd'
import { couponGenerate } from '@/services'
import { useState } from 'react'
import type { Moment } from 'moment'
import type { RangeValue } from 'rc-picker/lib/interface.d'
import moment from 'moment'

const { RangePicker } = DatePicker
const { Option } = Select

export interface modalCouponProps {
  visible: boolean
  onCancel: () => void
  onSubmitSuccess: () => void
  defaultCoupon?: API.Admin.CouponItem
  plans: API.Admin.PlanItem[]
}

const ModalCoupon: FC<modalCouponProps> = (props) => {
  const { visible, onCancel, onSubmitSuccess, defaultCoupon, plans } = props
  const [destroy, setDestroy] = useState(false)
  const [name, setName] = useState<string>(defaultCoupon?.name as string)
  const [code, setCode] = useState<string>(defaultCoupon?.code as string)
  const [startedAt, setStartedAt] = useState<number>(defaultCoupon?.started_at as number)
  const [endedAt, setEndedAt] = useState<number>(defaultCoupon?.ended_at as number)
  const [type, setType] = useState<number>(defaultCoupon?.type ?? 1)
  const [value, setValue] = useState<number>(defaultCoupon?.value as number)
  const [limitUse, setLimitUse] = useState<number | null>(defaultCoupon?.limit_use ?? null)
  const [limitUseWithUser, setLimitUseWithUser] = useState<number | null>(
    defaultCoupon?.limit_use_with_user ?? null,
  )
  const [limitPlanIds, setLimitPlanIds] = useState<number[] | null>(
    defaultCoupon?.limit_plan_ids ?? null,
  )
  const [generateCount, setGenerateCount] = useState<number | null>()
  const intl = useIntl()

  const saveHandler = async () => {
    const generateParams = {
      id: defaultCoupon?.id,
      name,
      code,
      started_at: startedAt,
      ended_at: endedAt,
      type,
      value,
      limit_use: limitUse,
      limit_use_with_user: limitUseWithUser,
      limit_plan_ids: limitPlanIds,
      generate_count: generateCount,
    }

    couponGenerate(generateParams).then((data: API.Admin.CouponGenerateResult) => {
      if (data === undefined) {
        return
      }
      if (typeof data === 'string') {
        const blobData = data as Blob
        const binaryData = []
        binaryData.push(blobData)
        const downloadLink = document.createElement('a')
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'text/csv' }))
        downloadLink.setAttribute(
          'download',
          `coupons-generated-${moment().format('YYYY-MM-DD HH:MM:SS')}`,
        )
        document.body.appendChild(downloadLink)
        downloadLink.click()
        downloadLink.remove()
      }
      const successMsgID = defaultCoupon
        ? 'module.coupon.message.edit_success'
        : 'module.coupon.message.create_success'
      message.success(intl.formatMessage({ id: successMsgID }))
      setDestroy(true)
      onSubmitSuccess()
    })
  }
  return (
    <>
      <Modal
        title={
          defaultCoupon
            ? intl.formatMessage({ id: 'module.coupon.modal.edit_title' })
            : intl.formatMessage({ id: 'module.coupon.modal.create_title' })
        }
        visible={visible}
        onOk={saveHandler}
        onCancel={onCancel}
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.coupon.modal.name' })}</label>
          <Input
            placeholder={intl.formatMessage({ id: 'module.coupon.modal.name.placeholder' })}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value)
            }}
            defaultValue={name}
          />
        </div>
        {!generateCount && (
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.coupon.modal.code' })}</label>
            <Input
              placeholder={intl.formatMessage({ id: 'module.coupon.modal.code.placeholder' })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCode(e.target.value)
              }}
              defaultValue={code}
            />
          </div>
        )}
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.coupon.modal.type_value' })}</label>
          <Input.Group compact>
            <Select
              defaultValue={type}
              className="w-25"
              onChange={(typeValue: number) => {
                setType(typeValue)
              }}
            >
              <Option value={1}>
                {intl.formatMessage({ id: 'module.coupon.modal.type.option.amount' })}
              </Option>
              <Option value={2}>
                {intl.formatMessage({ id: 'module.coupon.modal.type.option.proportion' })}
              </Option>
            </Select>
            <Input
              placeholder={intl.formatMessage({ id: 'module.coupon.modal.value.placeholder' })}
              className="w-75"
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue(parseInt(e.target.value, 10))
              }}
              defaultValue={value}
            />
          </Input.Group>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.coupon.modal.valid_period' })}</label>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={(dates: RangeValue<Moment>) => {
              if (dates !== null) {
                setStartedAt(dates[0]?.unix() as number)
                setEndedAt(dates[1]?.unix() as number)
              }
            }}
            className="w-100"
            defaultValue={
              defaultCoupon !== undefined
                ? [
                    moment.unix(Number(defaultCoupon?.started_at)),
                    moment.unix(Number(defaultCoupon?.ended_at)),
                  ]
                : undefined
            }
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.coupon.modal.limit_use' })}</label>
          <Input
            placeholder={intl.formatMessage({ id: 'module.coupon.modal.limit_use.placeholder' })}
            type="number"
            defaultValue={limitUse !== null ? limitUse : undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value) {
                setLimitUse(parseInt(e.target.value, 10))
              } else {
                setLimitUse(null)
              }
            }}
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.coupon.modal.limit_use_with_user' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.coupon.modal.limit_use_with_user.placeholder',
            })}
            defaultValue={limitUseWithUser !== null ? limitUseWithUser : undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value) {
                setLimitUseWithUser(parseInt(e.target.value, 10))
              } else {
                setLimitUseWithUser(null)
              }
            }}
            type="number"
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.coupon.modal.limit_plan_ids' })}</label>
          <Select
            mode="multiple"
            placeholder={intl.formatMessage({
              id: 'module.coupon.modal.limit_plan_ids.placeholder',
            })}
            className="w-100"
            defaultValue={limitPlanIds !== null ? limitPlanIds : undefined}
            onChange={(values: number[]) => {
              if (values.length > 0) {
                setLimitPlanIds(values)
              } else {
                setLimitPlanIds(null)
              }
            }}
          >
            {plans.map((item: API.Admin.PlanItem) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </div>

        {defaultCoupon === undefined && (
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.coupon.modal.generate_count' })}</label>
            <Input
              placeholder={intl.formatMessage({
                id: 'module.coupon.modal.generate_count.placeholder',
              })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value) {
                  setGenerateCount(parseInt(e.target.value, 10))
                } else {
                  setGenerateCount(null)
                }
              }}
              type="number"
            />
          </div>
        )}
      </Modal>
    </>
  )
}

export default ModalCoupon

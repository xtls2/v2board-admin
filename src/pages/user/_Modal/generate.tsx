import type { FC, ChangeEvent } from 'react'
import { useIntl } from 'umi'
import { Modal, Input, message, Select, DatePicker } from 'antd'
import { userGenerate } from '@/services'
import { useState } from 'react'
import type { Moment } from 'moment'
import moment from 'moment'

const { Option } = Select

export interface modalGenerateProps {
  visible: boolean
  plans: API.Admin.PlanItem[]
  onCancel: () => void
  onSubmitSuccess: () => void
}

const ModalGenerate: FC<modalGenerateProps> = (props) => {
  const { visible, onCancel, plans, onSubmitSuccess } = props
  const [destroy, setDestroy] = useState(false)
  const [password, setPassword] = useState('')
  const [emailPrefix, setEmailPrefix] = useState('')
  const [emailSuffix, setEmailSuffix] = useState('')
  const [expiredAt, setExpiredAt] = useState(0)
  const [planID, setPlanID] = useState(0)
  const [generateCount, setGenerateCount] = useState(0)
  const intl = useIntl()

  const submitHandler = async () => {
    const generateParams = {
      password,
      plan_id: planID,
      email_suffix: emailSuffix,
      email_prefix: emailPrefix,
      expired_at: expiredAt,
      generate_count: generateCount,
    }
    userGenerate(generateParams).then((data: API.Admin.UserGenerateResult) => {
      if (data === undefined) {
        return Promise.reject()
      }
      if (typeof data === 'string') {
        const blobData = data as Blob
        const binaryData = []
        binaryData.push(blobData)
        const downloadLink = document.createElement('a')
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'text/csv' }))
        downloadLink.setAttribute(
          'download',
          `users-generated-${moment().format('YYYY-MM-DD HH:MM:SS')}`,
        )
        document.body.appendChild(downloadLink)
        downloadLink.click()
        downloadLink.remove()
      }
      message.success(intl.formatMessage({ id: 'module.user.action.generate.message.success' }))
      setDestroy(true)
      setGenerateCount(0)
      onSubmitSuccess()
      return Promise.resolve()
    })
  }
  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'module.user.action.generate.title' })}
        visible={visible}
        onOk={submitHandler}
        onCancel={onCancel}
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.action.generate.email' })}</label>
          <Input.Group compact>
            <Input
              placeholder={intl.formatMessage({
                id: 'module.user.action.generate.email.prefix.placeholder',
              })}
              type="text"
              style={generateCount === 0 ? { width: '45%' } : { width: '45%', display: 'none ' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmailPrefix(e.target.value)
              }}
            />
            <Input placeholder="@" disabled className="text-center" style={{ width: '10%' }} />
            <Input
              placeholder={intl.formatMessage({
                id: 'module.user.action.generate.email.suffix.placeholder',
              })}
              type="text"
              style={{ width: '45%' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmailSuffix(e.target.value)
              }}
            />
          </Input.Group>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.action.generate.password' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.user.action.generate.password.placeholder',
            })}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.action.generate.expired_at' })}</label>
          <DatePicker
            placeholder={intl.formatMessage({
              id: 'module.user.action.generate.expired_at.placeholder',
            })}
            className="w-100"
            onChange={(value: Moment | null) => {
              if (value !== null) {
                setExpiredAt(value.unix())
              }
            }}
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.action.generate.plan_id' })}</label>
          <Select
            className="w-100"
            defaultValue={0}
            onChange={(value: number) => {
              setPlanID(value)
            }}
          >
            <Option value={0} key={0}>
              {intl.formatMessage({ id: 'module.user.action.generate.plan_id.option.none' })}
            </Option>
            {plans.map((planItem) => {
              return (
                <Option key={planItem.id} value={planItem.id}>
                  {planItem.name}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.action.generate.count' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.user.action.generate.count.placeholder',
            })}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setGenerateCount(Number(e.target.value).valueOf())
            }}
            type="number"
          />
        </div>
      </Modal>
    </>
  )
}

export default ModalGenerate

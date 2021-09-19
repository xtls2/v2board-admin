import type { FC, ChangeEvent } from 'react'
import { useIntl } from 'umi'
import { Modal, Input, message, Select } from 'antd'
import { userSendMail } from '@/services'
import { useState, useEffect } from 'react'

const { Option } = Select
const { TextArea } = Input

export interface modalSendMailProps {
  visible: boolean
  onCancel: () => void
  onSubmitSuccess: () => void
  filter?: API.Admin.UserFilterItem[]
}

const ModalSendMail: FC<modalSendMailProps> = (props) => {
  const { visible, filter, onCancel, onSubmitSuccess } = props
  const [addressee, setAddressee] = useState(0)
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [destroy, setDestroy] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    if (filter !== undefined) {
      setAddressee(1)
    }
  }, [filter])

  const submitHandler = async () => {
    const sendMailResult = await userSendMail({ filter, subject, content })
    if (sendMailResult === undefined) {
      return
    }
    message.success(intl.formatMessage({ id: 'module.user.action.send_email.message.success' }))
    setDestroy(true)
    onSubmitSuccess()
  }
  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'module.user.action.send_email.modal.title' })}
        visible={visible}
        onOk={submitHandler}
        onCancel={onCancel}
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.action.send_email.addressee' })}</label>
          <Select defaultValue={addressee} disabled={true} className="w-100">
            <Option value={0}>
              {intl.formatMessage({ id: 'module.user.action.send_email.addressee.option.all' })}
            </Option>
            <Option value={1}>
              {intl.formatMessage({ id: 'module.user.action.send_email.addressee.option.filter' })}
            </Option>
          </Select>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.action.send_email.subject' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.user.action.send_email.subject.placeholder',
            })}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSubject(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.action.send_email.content' })}</label>
          <TextArea
            rows={12}
            placeholder={intl.formatMessage({
              id: 'module.user.action.send_email.content.placeholder',
            })}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setContent(e.target.value)
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export default ModalSendMail

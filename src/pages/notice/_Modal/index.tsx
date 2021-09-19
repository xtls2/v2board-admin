import type { FC, ChangeEvent } from 'react'
import { useIntl } from 'umi'
import { Modal, Input, message } from 'antd'
import { noticeSave } from '@/services'
import { useRef, useState, useEffect } from 'react'

const { TextArea } = Input

export interface modalNoticeProps {
  visible: boolean
  onCancel: () => void
  onSubmitSuccess: () => void
  defaultNotice?: API.Admin.NoticeItem
}

const ModalNotice: FC<modalNoticeProps> = (props) => {
  const { visible, onCancel, onSubmitSuccess, defaultNotice } = props
  const titleRef = useRef<Input>(null)
  const imgUrlRef = useRef<Input>(null)
  const [content, setContent] = useState('')
  const [destroy, setDestroy] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    if (defaultNotice?.content !== undefined) {
      setContent(defaultNotice?.content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveHandler = async () => {
    const title = titleRef.current?.input.value as string
    const imgUrl = imgUrlRef.current?.input.value as string

    const noticeSaveResult = await noticeSave({
      id: defaultNotice?.id,
      title,
      content,
      img_url: imgUrl,
    })
    if (noticeSaveResult === undefined) {
      return
    }
    const successMsgID = defaultNotice
      ? 'module.notice.modal.notice.message.edit_success'
      : 'module.notice.modal.notice.message.add_success'
    message.success(intl.formatMessage({ id: successMsgID }))
    setDestroy(true)
    onSubmitSuccess()
  }
  return (
    <>
      <Modal
        title={
          defaultNotice
            ? intl.formatMessage({ id: 'module.notice.modal.notice.edit_title' })
            : intl.formatMessage({ id: 'module.notice.modal.notice.create_title' })
        }
        visible={visible}
        onOk={saveHandler}
        onCancel={onCancel}
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.notice.modal.notice.title' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.notice.modal.notice.title.placeholder',
            })}
            ref={titleRef}
            defaultValue={defaultNotice?.title}
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.notice.modal.notice.content' })}</label>
          <TextArea
            rows={12}
            placeholder={intl.formatMessage({
              id: 'module.notice.modal.notice.content.placeholder',
            })}
            defaultValue={defaultNotice?.content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setContent(e.target.value)
            }}
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.notice.modal.notice.img_url' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.notice.modal.notice.img_url.placeholder',
            })}
            ref={imgUrlRef}
            defaultValue={defaultNotice?.img_url}
          />
        </div>
      </Modal>
    </>
  )
}

export default ModalNotice

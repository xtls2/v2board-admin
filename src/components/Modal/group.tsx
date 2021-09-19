import type { FC } from 'react'
import { useIntl } from 'umi'
import { Modal, Input, message } from 'antd'
import { groupSave } from '@/services'
import { useRef, useState } from 'react'

export interface modalGroupProps {
  visible: boolean
  onCancel: () => void
  onSubmitSuccess: () => void
  defaultGroup?: API.Admin.GroupItem
}

const ModalGroup: FC<modalGroupProps> = (props) => {
  const { visible, onCancel, onSubmitSuccess, defaultGroup } = props
  const nameRef = useRef<Input>(null)
  const [destroy, setDestroy] = useState(false)
  const intl = useIntl()

  const saveHandler = async () => {
    const name = nameRef.current?.input.value as string
    const groupSaveResult = await groupSave({ id: defaultGroup?.id, name })
    if (groupSaveResult === undefined) {
      return
    }
    const successMsgID = defaultGroup
      ? 'common.modal.group.message.edit_success'
      : 'common.modal.group.message.create_success'
    message.success(intl.formatMessage({ id: successMsgID }))
    setDestroy(true)
    onSubmitSuccess()
  }
  return (
    <>
      <Modal
        title={
          defaultGroup
            ? intl.formatMessage({ id: 'common.modal.group.edit_title' })
            : intl.formatMessage({ id: 'common.modal.group.create_title' })
        }
        visible={visible}
        onOk={saveHandler}
        onCancel={onCancel}
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'common.modal.group.name' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'common.modal.group.name.placeholder',
            })}
            ref={nameRef}
            defaultValue={defaultGroup?.name}
          />
        </div>
      </Modal>
    </>
  )
}

export default ModalGroup

import type { FC } from 'react'
import { Modal, Input, Select, message } from 'antd'
import { useIntl } from 'umi'
import React, { useState, useEffect, useRef } from 'react'
import { paymentMethods, paymentForm, paymentSave } from '@/services'

const { Option } = Select

export interface modalAddProps {
  visible: boolean
  onCancel: () => void
  onAddSuccess: () => void
}

const ModalAdd: FC<modalAddProps> = (props) => {
  const { visible, onCancel, onAddSuccess } = props
  const [adminPaymentMethods, setAdminPaymentMethods] = useState<string[]>([])
  const [tempConfig, setTempConfig] = useState<Record<string, string>>({})
  const [currentPayment, setCurrentPayment] = useState('')
  const [adminPaymentForm, setAdminPaymentForm] = useState<
    Record<string, API.Admin.PaymentFormItem>
  >({})
  const nameRef = useRef<Input>(null)
  const intl = useIntl()

  const fetchPaymentForm = async (paymemtMethod: string) => {
    const paymentFormResult = await paymentForm({ payment: paymemtMethod })
    if (paymentFormResult === undefined) {
      return
    }
    setAdminPaymentForm(paymentFormResult.data)
  }

  useEffect(() => {
    ;(async () => {
      const paymentMethodsResult = await paymentMethods()
      if (paymentMethodsResult === undefined) {
        return
      }
      setAdminPaymentMethods(paymentMethodsResult.data)
    })()
  }, [])

  const addHandler = async () => {
    const newPayment = {
      config: tempConfig,
      name: nameRef.current?.input.value as string,
      payment: currentPayment,
    }
    const paymentSaveResult = await paymentSave(newPayment)
    if (paymentSaveResult === undefined) {
      return
    }
    message.success(intl.formatMessage({ id: 'module.config.payment.list.add.message.success' }))
    setCurrentPayment('')
    setAdminPaymentForm({})
    onAddSuccess()
  }

  const paymentChangeHandler = (value: string) => {
    fetchPaymentForm(value)
    setCurrentPayment(value)
  }

  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'module.config.payment.list.add.modal.title' })}
        visible={visible}
        onOk={addHandler}
        onCancel={onCancel}
        destroyOnClose={true}
      >
        <div>
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.config.payment.list.modal.name' })}</label>
            <Input
              placeholder={intl.formatMessage({
                id: 'module.config.payment.list.modal.name.placeholder',
              })}
              type="text"
              ref={nameRef}
            />
          </div>
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.config.payment.list.modal.payment' })}</label>
            <div>
              <Select
                className="w-100"
                placeholder={intl.formatMessage({
                  id: 'module.config.payment.list.modal.payment.placeholder',
                })}
                onChange={paymentChangeHandler}
              >
                {adminPaymentMethods.map((paymentItem) => {
                  return (
                    <Option value={paymentItem} key={paymentItem}>
                      {paymentItem}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </div>

          {Object.keys(adminPaymentForm).map((name: string) => {
            return (
              <div className="form-group" key={name}>
                <label>{adminPaymentForm[name].label}</label>
                {adminPaymentForm[name].type === 'input' && (
                  <Input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault()
                      setTempConfig((prevTempConfig) => {
                        const newConfig = prevTempConfig
                        newConfig[name] = e.target.value
                        return newConfig
                      })
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

export default ModalAdd

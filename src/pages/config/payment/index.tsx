import type { FC } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useIntl } from 'umi'
import List from './_List'
import { useState, useEffect } from 'react'
import { payments } from '@/services'
import ModalAdd from './_Modal/add'

const ConfigPaymentPage: FC = () => {
  const [listUpdateStatus, setListUpdateStatus] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false)

  const [adminPayments, setAdminPayments] = useState<API.Admin.PaymentItem[]>()

  const dropSuccessHandler = () => {
    setListUpdateStatus(true)
  }

  const editSuccessHandler = () => {
    setListUpdateStatus(true)
  }

  const showAddModal = () => {
    setAddModalVisible(true)
  }

  const addModalCancelHandler = () => {
    setAddModalVisible(false)
  }

  const addModalSuccessHandler = () => {
    setAddModalVisible(false)
    setListUpdateStatus(true)
  }

  useEffect(() => {
    ;(async () => {
      if (adminPayments !== undefined && listUpdateStatus === false) {
        return
      }

      const paymentsResult = await payments()
      if (paymentsResult === undefined) {
        return
      }
      setAdminPayments(paymentsResult.data)
      setListUpdateStatus(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateStatus])

  const intl = useIntl()
  return (
    <>
      <div className="p-0 p-lg-4">
        <div className="d-flex justify-content-between align-items-center" />
        <div className="block block-rounded block-bordered ">
          <div className="bg-white">
            <div className="p-3">
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  showAddModal()
                }}
              >
                <PlusOutlined style={{ verticalAlign: '0.05rem' }} />
                <span>{intl.formatMessage({ id: 'module.config.payment.add_btn' })}</span>
              </Button>
            </div>
          </div>
          <List
            onDropSuccess={dropSuccessHandler}
            onEditSuccess={editSuccessHandler}
            dataSource={adminPayments as []}
          />
        </div>
      </div>
      <ModalAdd
        visible={addModalVisible}
        onCancel={addModalCancelHandler}
        onAddSuccess={addModalSuccessHandler}
      />
    </>
  )
}

export default ConfigPaymentPage

import type { FC } from 'react'
import { useIntl, useModel } from 'umi'
import { useState, useEffect } from 'react'
import { plans, planSort } from '@/services'
import { Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useMount } from 'ahooks'
import List from './_List'
import lodash from 'lodash'
import ModalPlan from './_Modal'

const PlanPage: FC = () => {
  const intl = useIntl()
  const [adminPlans, setAdminPlans] = useState<API.Admin.PlanItem[]>()
  const [listUpdateStatus, setListUpdateStatus] = useState(false)
  const [sortStatus, setSortStatus] = useState(false)
  const [modalPlanVisible, setModalPlanVisible] = useState(false)
  const { initGroupsState } = useModel('useGroupModel')

  useMount(() => {
    initGroupsState()
  })

  useEffect(() => {
    ;(async () => {
      if (adminPlans !== undefined && listUpdateStatus === false) {
        return
      }
      const adminPlansResult = await plans()
      if (adminPlansResult === undefined) {
        return
      }
      setAdminPlans(adminPlansResult.data)
      setListUpdateStatus(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateStatus])

  const saveSortHandler = async () => {
    const sortIds: number[] = []
    lodash.forEach(adminPlans, (nodeItem, index) => {
      sortIds[index] = nodeItem.id
    })
    const planSortResult = await planSort({ plan_ids: sortIds })
    if (planSortResult === undefined) {
      return
    }
    message.success(intl.formatMessage({ id: 'module.plan.save_sort.message.success' }))
    setSortStatus(false)
  }

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
                  setModalPlanVisible(true)
                }}
              >
                <PlusOutlined style={{ verticalAlign: '0.05rem' }} />
                <span>{intl.formatMessage({ id: 'module.plan.add_btn' })}</span>
              </Button>
              {sortStatus && (
                <Button type="primary" className="float-right" onClick={saveSortHandler}>
                  <span>{intl.formatMessage({ id: 'module.plan.save_sort_btn' })}</span>
                </Button>
              )}
            </div>
          </div>
          {/* {adminPlans !== undefined && ( */}
          <List
            dataSource={adminPlans as API.Admin.PlanItem[]}
            onEditItemSuccess={() => {
              setListUpdateStatus(true)
            }}
            onDropItemSuccess={() => {
              setListUpdateStatus(true)
            }}
            onSort={(data: API.Admin.PlanItem[]) => {
              setAdminPlans(data)
              setSortStatus(true)
            }}
          />
          {/* )} */}
        </div>
      </div>

      <ModalPlan
        visible={modalPlanVisible}
        onCancel={() => {
          setModalPlanVisible(false)
        }}
        onSubmitSuccess={() => {
          setListUpdateStatus(true)
          setModalPlanVisible(false)
        }}
      />
    </>
  )
}
export default PlanPage

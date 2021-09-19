import type { FC, ChangeEvent } from 'react'
import { useIntl, Link, useModel } from 'umi'
import { Modal, Input, message, Divider, Space, Tooltip, Row, Col, Select } from 'antd'
import { planSave } from '@/services'
import { useRef, useState, useEffect } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import ModalGroup from '@/components/Modal/group'

const { TextArea } = Input
const { Option } = Select

export interface modalPlanProps {
  visible: boolean
  onCancel: () => void
  onSubmitSuccess: () => void
  defaultPlan?: API.Admin.PlanItem
}

const ModalPlan: FC<modalPlanProps> = (props) => {
  const { visible, onCancel, onSubmitSuccess, defaultPlan } = props
  const { groupsState, refresh } = useModel('useGroupModel')
  const [modalGroupVisible, setModalGroupVisible] = useState(false)
  const [destroy, setDestroy] = useState(false)
  const [content, setContent] = useState('')
  const [groupID, setGroupID] = useState<number | undefined>(undefined)
  const nameRef = useRef<Input>(null)
  const monthPriceRef = useRef<Input>(null)
  const quarterPriceRef = useRef<Input>(null)
  const halfYearPriceRef = useRef<Input>(null)
  const yearPriceRef = useRef<Input>(null)
  const twoYearPriceRef = useRef<Input>(null)
  const threeYearPriceRef = useRef<Input>(null)
  const onetimePriceRef = useRef<Input>(null)
  const resetPriceRef = useRef<Input>(null)
  const transferEnableRef = useRef<Input>(null)
  const intl = useIntl()

  useEffect(() => {
    if (defaultPlan?.group_id !== undefined) {
      setGroupID(defaultPlan.group_id)
    }

    if (defaultPlan?.content !== undefined) {
      setContent(defaultPlan.content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveHandler = async () => {
    const saveParams = {
      id: defaultPlan?.id,
      content,
      transfer_enable: transferEnableRef.current?.input.value,
      name: nameRef.current?.input.value,
      group_id: groupID,
      month_price: monthPriceRef.current?.input.value,
      quarter_price: quarterPriceRef.current?.input.value,
      half_year_price: halfYearPriceRef.current?.input.value,
      year_price: yearPriceRef.current?.input.value,
      two_year_price: twoYearPriceRef.current?.input.value,
      three_year_price: threeYearPriceRef.current?.input.value,
      onetime_price: onetimePriceRef.current?.input.value,
      reset_price: resetPriceRef.current?.input.value,
    }

    const planSaveResult = await planSave(saveParams)
    if (planSaveResult === undefined) {
      return
    }
    const successMsgID = defaultPlan
      ? 'module.plan.modal.message.edit_success'
      : 'module.plan.modal.message.create_success'
    message.success(intl.formatMessage({ id: successMsgID }))
    setDestroy(true)
    onSubmitSuccess()
  }
  return (
    <>
      <Modal
        title={
          defaultPlan
            ? intl.formatMessage({ id: 'module.plan.modal.edit_title' })
            : intl.formatMessage({ id: 'module.plan.modal.create_title' })
        }
        visible={visible}
        onOk={saveHandler}
        onCancel={onCancel}
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.plan.modal.name' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.plan.modal.name.placeholder',
            })}
            ref={nameRef}
            defaultValue={defaultPlan?.name}
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.plan.modal.content' })}</label>
          <TextArea
            rows={4}
            placeholder={intl.formatMessage({ id: 'module.plan.modal.content.placeholder' })}
            defaultValue={defaultPlan?.content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setContent(e.target.value)
            }}
          />
        </div>
        <Divider style={{ backgroundColor: 'unset' }}>
          <Space>
            {intl.formatMessage({ id: 'module.plan.modal.setting_price' })}
            <Tooltip
              title={intl.formatMessage({ id: 'module.plan.modal.setting_price.placeholder' })}
            >
              <QuestionCircleOutlined style={{ verticalAlign: '0.1rem' }} />
            </Tooltip>
          </Space>
        </Divider>
        <Row>
          <Col span={4} className="pl-1 pr-1">
            <div className="form-group">
              <label>{intl.formatMessage({ id: 'module.plan.modal.month_price' })}</label>
              <Input ref={monthPriceRef} defaultValue={defaultPlan?.month_price as number} />
            </div>
          </Col>
          <Col span={4} className="pl-1 pr-1">
            <div className="form-group">
              <label>{intl.formatMessage({ id: 'module.plan.modal.quarter_price' })}</label>
              <Input ref={quarterPriceRef} defaultValue={defaultPlan?.quarter_price as number} />
            </div>
          </Col>
          <Col span={4} className="pl-1 pr-1">
            <div className="form-group">
              <label>{intl.formatMessage({ id: 'module.plan.modal.half_year_price' })}</label>
              <Input ref={halfYearPriceRef} defaultValue={defaultPlan?.half_year_price as number} />
            </div>
          </Col>
          <Col span={4} className="pl-1 pr-1">
            <div className="form-group">
              <label>{intl.formatMessage({ id: 'module.plan.modal.year_price' })}</label>
              <Input ref={yearPriceRef} defaultValue={defaultPlan?.year_price as number} />
            </div>
          </Col>
          <Col span={4} className="pl-1 pr-1">
            <div className="form-group">
              <label>{intl.formatMessage({ id: 'module.plan.modal.two_year_price' })}</label>
              <Input ref={twoYearPriceRef} defaultValue={defaultPlan?.two_year_price as number} />
            </div>
          </Col>
          <Col span={4} className="pl-1 pr-1">
            <div className="form-group">
              <label>{intl.formatMessage({ id: 'module.plan.modal.three_year_price' })}</label>
              <Input
                ref={threeYearPriceRef}
                defaultValue={defaultPlan?.three_year_price as number}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="pl-1 pr-1">
            <div className="form-group">
              <label>{intl.formatMessage({ id: 'module.plan.modal.onetime_price' })}</label>
              <Input ref={onetimePriceRef} defaultValue={defaultPlan?.onetime_price as number} />
            </div>
          </Col>
          <Col span={12} className="pl-1 pr-1">
            <div className="form-group">
              <label>{intl.formatMessage({ id: 'module.plan.modal.reset_price' })}</label>
              <Input ref={resetPriceRef} defaultValue={defaultPlan?.reset_price as number} />
            </div>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: 'unset' }} />
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.plan.modal.transfer_enable' })}</label>
          <Input
            addonAfter={<>GB</>}
            defaultValue={defaultPlan?.transfer_enable}
            placeholder={intl.formatMessage({
              id: 'module.plan.modal.transfer_enable.placeholder',
            })}
            ref={transferEnableRef}
          />
        </div>
        <div className="form-group">
          <label>
            <Space>
              {intl.formatMessage({ id: 'module.plan.modal.group_id' })}
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  setModalGroupVisible(true)
                }}
              >
                {intl.formatMessage({ id: 'module.plan.modal.group_id.btn' })}
              </Link>
            </Space>
          </label>
          <Select
            className="w-100"
            placeholder={intl.formatMessage({
              id: 'module.plan.modal.group_id.placeholder',
            })}
            onChange={(value: number) => {
              setGroupID(value)
            }}
            defaultValue={defaultPlan?.group_id}
          >
            {groupsState &&
              groupsState.map((groupItem) => {
                return (
                  <Option key={groupItem.id} value={groupItem.id}>
                    {groupItem.name}
                  </Option>
                )
              })}
          </Select>
        </div>
        <ModalGroup
          visible={modalGroupVisible}
          onCancel={() => {
            setModalGroupVisible(false)
          }}
          onSubmitSuccess={() => {
            refresh()
            setModalGroupVisible(false)
          }}
        />
      </Modal>
    </>
  )
}

export default ModalPlan

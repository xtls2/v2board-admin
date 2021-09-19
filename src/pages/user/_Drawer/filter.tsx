import type { FC, ChangeEvent } from 'react'
import { Drawer, Button, Divider, Input, Space, Select, DatePicker } from 'antd'
import { useIntl } from 'umi'
import { DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import type { Moment } from 'moment'

const { Option } = Select

export interface draweFilterProps {
  onClose: () => void
  onChange: (data: API.Admin.UserFilterItem[] | undefined) => void
  plans: API.Admin.PlanItem[]
  visible: boolean
}

type filterItem = API.Admin.UserFilterItem & { index: number }

const DrawerFilter: FC<draweFilterProps> = (props) => {
  const { onClose, visible, onChange, plans } = props
  const [filterData, setFilterData] = useState<filterItem[]>([])
  const intl = useIntl()
  const renderElements = () => (
    <>
      {filterData.map((item: filterItem) => (
        <div key={item.index}>
          <div className="row">
            <Divider style={{ backgroundColor: 'unset' }}>
              <Space>
                {`${intl.formatMessage({ id: 'module.user.action.filter.name' })}(${item.index})`}
                <DeleteOutlined
                  style={{ color: '#FF4D4F', verticalAlign: '0.05rem' }}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setFilterData((prevFilterData) => {
                      const settings = prevFilterData.filter(
                        (setting) => setting.index !== item.index,
                      )
                      return settings
                    })
                  }}
                />
              </Space>
            </Divider>
          </div>
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.user.action.filter.filed_name' })}</label>
            <Select
              defaultValue="email"
              className="w-100"
              onChange={(value) => {
                const newFilterData = filterData.map((sourceItem: filterItem) => {
                  const newItem = sourceItem
                  if (sourceItem.index === item.index) {
                    newItem.key = value
                  }
                  if (['email, remarks'].includes(newItem.key) === false) {
                    newItem.condition = '='
                  }
                  if (item.key === 'expired_at') {
                    newItem.condition = '>='
                  }
                  return newItem
                })
                setFilterData(newFilterData)
              }}
            >
              <Option value="email">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.email' })}
              </Option>
              <Option value="id">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.id' })}
              </Option>
              <Option value="plan_id">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.plan_id' })}
              </Option>
              <Option value="transfer_enable">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.transfer_enable' })}
              </Option>
              <Option value="d">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.d' })}
              </Option>
              <Option value="expired_at">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.expired_at' })}
              </Option>
              <Option value="uuid">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.uuid' })}
              </Option>
              <Option value="token">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.token' })}
              </Option>
              <Option value="banned">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.banned' })}
              </Option>
              <Option value="invite_by_email">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.invite_by_email' })}
              </Option>
              <Option value="invite_user_id">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.invite_user_id' })}
              </Option>
              <Option value="remarks">
                {intl.formatMessage({ id: 'module.user.action.filter.filed_name.remarks' })}
              </Option>
            </Select>
          </div>
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.user.action.filter.condition' })}</label>
            {['email', 'remarks'].includes(item.key) && (
              <Select
                defaultValue="like"
                className="w-100"
                onChange={(value: string) => {
                  const newFilterData = filterData.map((sourceItem: filterItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.condition = value
                    }
                    return newItem
                  })
                  setFilterData(newFilterData)
                }}
              >
                <Option value="like">
                  {intl.formatMessage({ id: 'module.user.action.filter.condition.like' })}
                </Option>
              </Select>
            )}
            {['id', 'transfer_enable', 'd', 'expired_at'].includes(item.key) && (
              <Select
                defaultValue={item.key !== 'expired_at' ? '=' : '>='}
                className="w-100"
                onChange={(value: string) => {
                  const newFilterData = filterData.map((sourceItem: filterItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.condition = value
                    }
                    return newItem
                  })
                  setFilterData(newFilterData)
                }}
              >
                {item.key !== 'expired_at' && <Option value="=">=</Option>}
                <Option value=">=">&gt;=</Option>
                <Option value=">">&gt;</Option>
                <Option value="<">&lt;</Option>
                <Option value="<=">&lt;=</Option>
              </Select>
            )}
            {['plan_id', 'invite_by_email', 'invite_user_id', 'banned', 'uuid', 'token'].includes(
              item.key,
            ) && (
              <Select
                value="="
                defaultValue="="
                className="w-100"
                onChange={(value: string) => {
                  const newFilterData = filterData.map((sourceItem: filterItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.condition = value
                    }
                    return newItem
                  })
                  setFilterData(newFilterData)
                }}
              >
                <Option value=">=">=</Option>
              </Select>
            )}
          </div>
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.user.action.filter.value' })}</label>
            {['plan_id', 'expired_at', 'banned'].includes(item.key) === false && (
              <Input
                placeholder={intl.formatMessage({
                  id: 'module.user.action.filter.value.placeholder',
                })}
                defaultValue={item.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newFilterData = filterData.map((sourceItem: filterItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.value = e.target.value
                    }
                    return newItem
                  })
                  setFilterData(newFilterData)
                }}
              />
            )}
            {item.key === 'plan_id' && (
              <Select
                placeholder={intl.formatMessage({
                  id: 'module.user.action.filter.value.select_placeholder',
                })}
                className="w-100"
                onChange={(value: string) => {
                  const newFilterData = filterData.map((sourceItem: filterItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.value = value
                    }
                    return newItem
                  })
                  setFilterData(newFilterData)
                }}
              >
                {plans.map((planItem: API.Admin.PlanItem) => {
                  return (
                    <Option value={planItem.id} key={planItem.id}>
                      {planItem.name}
                    </Option>
                  )
                })}
              </Select>
            )}
            {item.key === 'banned' && (
              <Select
                placeholder={intl.formatMessage({
                  id: 'module.user.action.filter.value.select_placeholder',
                })}
                className="w-100"
                onChange={(value: string) => {
                  const newFilterData = filterData.map((sourceItem: filterItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.value = value
                    }
                    return newItem
                  })
                  setFilterData(newFilterData)
                }}
              >
                <Option value={0} key={0}>
                  {intl.formatMessage({
                    id: 'module.user.action.filter.value.option.normal',
                  })}
                </Option>
                <Option value={1} key={1}>
                  {intl.formatMessage({
                    id: 'module.user.action.filter.value.option.banned',
                  })}
                </Option>
              </Select>
            )}

            {item.key === 'expired_at' && (
              <DatePicker
                placeholder={intl.formatMessage({
                  id: 'module.user.action.filter.value.date_placeholder',
                })}
                className="w-100"
                onChange={(moment: Moment | null) => {
                  if (moment !== null) {
                    const newFilterData = filterData.map((sourceItem: filterItem) => {
                      const newItem = sourceItem
                      if (sourceItem.index === item.index) {
                        newItem.value = moment.unix().toString()
                      }
                      return newItem
                    })
                    setFilterData(newFilterData)
                  }
                }}
              />
            )}
          </div>
        </div>
      ))}
    </>
  )

  return (
    <>
      <Drawer
        title={intl.formatMessage({ id: 'module.user.action.filter.drawer.title' })}
        placement="right"
        visible={visible}
        width="500"
        onClose={onClose}
        footer={
          <>
            <div className="float-left">
              <Button
                type="primary"
                color="danger"
                onClick={(e: React.MouseEvent) => {
                  setFilterData([])
                  onChange(undefined)
                  e.preventDefault()
                }}
                danger
                disabled={filterData.length === 0}
              >
                <span>
                  {intl.formatMessage({ id: 'module.user.action.filter.drawer.reset_btn' })}
                </span>
              </Button>
            </div>
            <div className="float-right">
              <Button type="default" className="mx-lg-2" onClick={onClose}>
                <span>
                  {intl.formatMessage({ id: 'module.user.action.filter.drawer.cancel_btn' })}
                </span>
              </Button>
              <Button
                type="primary"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  const changeFilterData = filterData
                    .filter((data) => data.value.length !== 0)
                    .map(({ index, ...others }) => others)
                  onChange(changeFilterData)
                }}
                disabled={filterData.length === 0}
              >
                <span>{intl.formatMessage({ id: 'module.user.action.filter.drawer.ok_btn' })}</span>
              </Button>
            </div>
          </>
        }
      >
        <div className="form-group">
          {renderElements()}
          <div>
            <Button
              className="w-100"
              type="primary"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                const newFilterItem = {
                  key: 'email',
                  condition: 'like',
                  value: '',
                  index: filterData.length + 1,
                }
                setFilterData([...filterData, newFilterItem])
              }}
            >
              <span>{intl.formatMessage({ id: 'module.user.action.filter.add_btn' })}</span>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerFilter

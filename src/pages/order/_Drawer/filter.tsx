import type { FC, ChangeEvent } from 'react'
import { Drawer, Button, Divider, Input, Space, Select } from 'antd'
import { useIntl } from 'umi'
import { DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Option } = Select

export interface draweFilterProps {
  onClose: () => void
  onChange: (data: API.Admin.OrderFilterItem[] | undefined) => void
  visible: boolean
}

type filterItem = API.Admin.OrderFilterItem & { index: number }

const DrawerFilter: FC<draweFilterProps> = (props) => {
  const { onClose, visible, onChange } = props
  const [filterData, setFilterData] = useState<filterItem[]>([])
  const intl = useIntl()
  const renderElements = () => (
    <>
      {filterData.map((item: filterItem) => (
        <div key={item.index}>
          <div className="row">
            <Divider style={{ backgroundColor: 'unset' }}>
              <Space>
                {`${intl.formatMessage({ id: 'module.order.action.filter.name' })}(${item.index})`}
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
            <label>{intl.formatMessage({ id: 'module.order.action.filter.filed_name' })}</label>
            <Select
              defaultValue="trade_no"
              className="w-100"
              onChange={(value: string) => {
                const newFilterData = filterData.map((sourceItem: filterItem) => {
                  const newItem = sourceItem
                  if (sourceItem.index === item.index) {
                    newItem.key = value
                  }
                  if (['trade_no'].includes(newItem.key) === false) {
                    newItem.condition = '='
                  }
                  return newItem
                })
                setFilterData(newFilterData)
              }}
            >
              <Option value="trade_no">
                {intl.formatMessage({ id: 'module.order.action.filter.filed_name.trade_no' })}
              </Option>
              <Option value="status">
                {intl.formatMessage({ id: 'module.order.action.filter.filed_name.status' })}
              </Option>
              <Option value="commission_status">
                {intl.formatMessage({
                  id: 'module.order.action.filter.filed_name.commission_status',
                })}
              </Option>
              <Option value="user_id">
                {intl.formatMessage({ id: 'module.order.action.filter.filed_name.user_id' })}
              </Option>
              <Option value="invite_user_id">
                {intl.formatMessage({ id: 'module.order.action.filter.filed_name.invite_user_id' })}
              </Option>
            </Select>
          </div>
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.order.action.filter.condition' })}</label>

            {item.key === 'trade_no' && (
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
                <Option value="like">模糊</Option>
                <Option value="=">=</Option>
              </Select>
            )}

            {['user_id', 'status', 'commission_status'].includes(item.key) && (
              <Select
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
                <Option value="=">=</Option>
              </Select>
            )}

            {item.key === 'invite_user_id' && (
              <Select
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
                <Option value="=">=</Option>
                <Option value="!=">!=</Option>
              </Select>
            )}
          </div>
          <div className="form-group">
            <label>{intl.formatMessage({ id: 'module.order.action.filter.value' })}</label>
            {['user_id', 'trade_no', 'invite_user_id'].includes(item.key) === true && (
              <Input
                placeholder={intl.formatMessage({
                  id: 'module.order.action.filter.value.placeholder',
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

            {item.key === 'status' && (
              <Select
                placeholder={intl.formatMessage({
                  id: 'module.order.action.filter.value.select_placeholder',
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
                    id: 'module.order.action.filter.value.status.option.unpaid',
                  })}
                </Option>
                <Option value={1} key={1}>
                  {intl.formatMessage({
                    id: 'module.order.action.filter.value.status.option.pending',
                  })}
                </Option>
                <Option value={2} key={2}>
                  {intl.formatMessage({
                    id: 'module.order.action.filter.value.status.option.cancelled',
                  })}
                </Option>
                <Option value={3} key={3}>
                  {intl.formatMessage({
                    id: 'module.order.action.filter.value.status.option.completed',
                  })}
                </Option>
              </Select>
            )}

            {item.key === 'commission_status' && (
              <Select
                placeholder={intl.formatMessage({
                  id: 'module.order.action.filter.value.select_placeholder',
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
                    id: 'module.order.action.filter.value.commission_status.option.new',
                  })}
                </Option>
                <Option value={1} key={1}>
                  {intl.formatMessage({
                    id: 'module.order.action.filter.value.commission_status.option.pending',
                  })}
                </Option>
                <Option value={2} key={2}>
                  {intl.formatMessage({
                    id: 'module.order.action.filter.value.commission_status.option.valid',
                  })}
                </Option>
                <Option value={3} key={3}>
                  {intl.formatMessage({
                    id: 'module.order.action.filter.value.commission_status.option.invalid',
                  })}
                </Option>
              </Select>
            )}
          </div>
        </div>
      ))}
    </>
  )

  return (
    <>
      <Drawer
        title={intl.formatMessage({ id: 'module.order.action.filter.drawer.title' })}
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
                  {intl.formatMessage({ id: 'module.order.action.filter.drawer.reset_btn' })}
                </span>
              </Button>
            </div>
            <div className="float-right">
              <Button type="default" className="mx-lg-2" onClick={onClose}>
                <span>
                  {intl.formatMessage({ id: 'module.order.action.filter.drawer.cancel_btn' })}
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
                <span>
                  {intl.formatMessage({ id: 'module.order.action.filter.drawer.ok_btn' })}
                </span>
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
                  key: 'trade_no',
                  condition: 'like',
                  value: '',
                  index: filterData.length + 1,
                }
                setFilterData([...filterData, newFilterItem])
              }}
            >
              <span>{intl.formatMessage({ id: 'module.order.action.filter.add_btn' })}</span>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerFilter

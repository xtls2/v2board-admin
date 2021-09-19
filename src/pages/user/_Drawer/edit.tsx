import type { FC, ChangeEvent } from 'react'
import { useIntl } from 'umi'
import { Drawer, Input, Select, Button, message, DatePicker, Space, Tooltip, Switch } from 'antd'
import { useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import type { Moment } from 'moment'
import moment from 'moment'
import { userUpdate } from '@/services'

const { Option } = Select
const { TextArea } = Input

export interface drawerEditProps {
  onClose: () => void
  visible: boolean
  onSubmitSuccess: () => void
  defaultUser: API.Admin.UserItem & API.User.InfoItem
  plans: API.Admin.PlanItem[]
}

const DrawerEdit: FC<drawerEditProps> = (props) => {
  const intl = useIntl()
  const { onClose, visible, onSubmitSuccess, plans, defaultUser } = props
  const [email, setEmail] = useState<string>(defaultUser.email)
  const [inviteUserID, setInviteUserID] = useState<number | null>(defaultUser.invite_user_id)
  const [password, setPassword] = useState<string | null>(null)
  const [balance, setBalance] = useState<number>(defaultUser.balance)
  const [commissionBalance, setCommissionBalnce] = useState<number>(defaultUser.commission_balance)
  const [u, setU] = useState<number>(defaultUser.u)
  const [d, setD] = useState<number>(defaultUser.d)
  const [transferEnable, setTransferEnable] = useState<number>(defaultUser.transfer_enable)
  const [expiredAt, setExpiredAt] = useState<number | null>(defaultUser.expired_at)
  const [planID, setPlanID] = useState<number | null>(defaultUser.plan_id)
  const [banned, setBanned] = useState<number>(defaultUser.banned)
  const [commissionType, setCommissionType] = useState<number>(defaultUser.commission_type)
  const [commissionRate, setCommissionRate] = useState<number | null>(defaultUser.commission_rate)
  const [discount, setDiscount] = useState<number | null>(defaultUser.discount)
  const [isAdmin, setIsAdmin] = useState<number>(defaultUser.is_admin)
  const [isStaff, setIsStaff] = useState<number>(defaultUser.is_staff)
  const [remarks, setRemarks] = useState<string | null>(defaultUser.remarks)
  const [destroy, setDestroy] = useState(false)

  const submitHandler = async () => {
    // console.log(tags, groupIds)

    const updateParams = {
      id: defaultUser.id,
      email,
      invite_user_id: inviteUserID,
      password,
      balance,
      commission_balance: commissionBalance,
      u,
      d,
      transfer_enable: transferEnable,
      expired_at: expiredAt,
      plan_id: planID,
      discount,
      remarks,
      commission_type: commissionType,
      commission_rate: commissionRate,
      is_admin: isAdmin,
      is_staff: isStaff,
      banned,
    }
    const userUpdateResult = await userUpdate(updateParams)
    if (userUpdateResult === undefined) {
      return
    }

    setDestroy(true)
    message.success(intl.formatMessage({ id: 'module.user.drawer.edit.message.success' }))
    onSubmitSuccess()
  }

  return (
    <>
      <Drawer
        title={intl.formatMessage({ id: 'module.user.drawer.edit.title' })}
        placement="right"
        onClose={onClose}
        visible={visible}
        width="500"
        footer={
          <div className="float-right">
            <Button type="default" className="mx-lg-2" onClick={onClose}>
              <span>{intl.formatMessage({ id: 'module.user.drawer.edit.cancel_btn' })}</span>
            </Button>
            <Button type="primary" onClick={submitHandler}>
              <span>{intl.formatMessage({ id: 'module.user.drawer.edit.ok_btn' })}</span>
            </Button>
          </div>
        }
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.email' })}</label>
          <Input
            placeholder={intl.formatMessage({ id: 'module.user.drawer.edit.email.placeholder' })}
            defaultValue={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.invite_user_id' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.user.drawer.edit.invite_user_id.placeholder',
            })}
            defaultValue={!inviteUserID ? undefined : inviteUserID}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value) {
                setInviteUserID(parseInt(e.target.value, 10))
              } else {
                setInviteUserID(null)
              }
            }}
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.password' })}</label>
          <Input
            placeholder={intl.formatMessage({ id: 'module.user.drawer.edit.password.placeholder' })}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value) {
                setPassword(e.target.value)
              } else {
                setPassword(null)
              }
            }}
          />
        </div>
        <div className="row">
          <div className="form-group col-md-6 col-xs-12">
            <label>{intl.formatMessage({ id: 'module.user.drawer.edit.balance' })}</label>
            <Input
              placeholder={intl.formatMessage({
                id: 'module.user.drawer.edit.balance.placeholder',
              })}
              addonAfter="￥"
              defaultValue={(balance / 100).toFixed(2)}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setBalance(Number(e.target.value).valueOf() * 100)
              }}
            />
          </div>
          <div className="form-group col-md-6 col-xs-12">
            <label>
              {intl.formatMessage({ id: 'module.user.drawer.edit.commission_balance' })}
            </label>
            <Input
              placeholder={intl.formatMessage({
                id: 'module.user.drawer.edit.commission_balance.placeholder',
              })}
              addonAfter="￥"
              defaultValue={(commissionBalance / 100).toFixed(2)}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCommissionBalnce(Number(e.target.value).valueOf() * 100)
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6 col-xs-12">
            <label>{intl.formatMessage({ id: 'module.user.drawer.edit.u' })}</label>
            <Input
              placeholder={intl.formatMessage({
                id: 'module.user.drawer.edit.u.placeholder',
              })}
              addonAfter="GB"
              defaultValue={(u / (1024 * 1024 * 1024)).toFixed(2)}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setU(Math.round(Number(e.target.value).valueOf() * (1024 * 1024 * 1024)))
              }}
            />
          </div>
          <div className="form-group col-md-6 col-xs-12">
            <label>{intl.formatMessage({ id: 'module.user.drawer.edit.d' })}</label>
            <Input
              placeholder={intl.formatMessage({
                id: 'module.user.drawer.edit.d.placeholder',
              })}
              addonAfter="GB"
              defaultValue={(d / (1024 * 1024 * 1024)).toFixed(2)}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setD(Math.round(Number(e.target.value).valueOf() * (1024 * 1024 * 1024)))
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.transfer_enable' })}</label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.user.drawer.edit.transfer_enable.placeholder',
            })}
            addonAfter="GB"
            defaultValue={(transferEnable / (1024 * 1024 * 1024)).toFixed(2)}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTransferEnable(Math.round(Number(e.target.value).valueOf() * (1024 * 1024 * 1024)))
            }}
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.expired_at' })}</label>
          <DatePicker
            placeholder={intl.formatMessage({
              id: 'module.user.drawer.edit.expired_at.placeholder',
            })}
            className="w-100"
            defaultValue={expiredAt ? moment(expiredAt) : undefined}
            onChange={(value: Moment | null) => {
              if (value !== null) {
                setExpiredAt(value.unix())
              }
            }}
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.plan_id' })}</label>
          <Select
            className="w-100"
            defaultValue={planID !== null ? planID : 0}
            onChange={(value: number) => {
              if (value > 0) {
                setPlanID(value)
              } else {
                setPlanID(null)
              }
            }}
          >
            <Option key={0} value={0}>
              {intl.formatMessage({ id: 'module.user.drawer.edit.plan_id.option.none' })}
            </Option>
            {plans.map((item: API.Admin.PlanItem) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.banned' })}</label>
          <Select
            className="w-100"
            defaultValue={banned}
            onChange={(value: number) => {
              setBanned(value)
            }}
          >
            <Option value={0} key={0}>
              {intl.formatMessage({ id: 'module.user.drawer.edit.banned.option.off' })}
            </Option>

            <Option value={1} key={1}>
              {intl.formatMessage({ id: 'module.user.drawer.edit.banned.option.on' })}
            </Option>
          </Select>
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.commission_type' })}</label>
          <Select
            className="w-100"
            defaultValue={commissionType}
            onChange={(value: number) => {
              setCommissionType(value)
            }}
          >
            <Option key={0} value={0}>
              {intl.formatMessage({ id: 'module.user.drawer.edit.commission_type.option.system' })}
            </Option>
            <Option key={1} value={1}>
              {intl.formatMessage({ id: 'module.user.drawer.edit.commission_type.option.cycle' })}
            </Option>
            <Option key={2} value={2}>
              {intl.formatMessage({ id: 'module.user.drawer.edit.commission_type.option.onetime' })}
            </Option>
          </Select>
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.commission_rate' })}</label>
          <Input
            type="number"
            addonAfter="%"
            placeholder={intl.formatMessage({
              id: 'module.user.drawer.edit.commission_rate.placeholder',
            })}
            defaultValue={commissionRate !== null ? commissionRate : undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value) {
                setCommissionRate(parseInt(e.target.value, 10))
              } else {
                setCommissionRate(null)
              }
            }}
          />
        </div>

        <div className="form-group">
          <label>
            <Space>
              {intl.formatMessage({ id: 'module.user.drawer.edit.discount' })}
              <Tooltip title={intl.formatMessage({ id: 'module.user.drawer.edit.discount.tip' })}>
                <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
              </Tooltip>
            </Space>
          </label>
          <Input
            type="number"
            addonAfter="%"
            placeholder={intl.formatMessage({ id: 'module.user.drawer.edit.discount.placeholder' })}
            defaultValue={discount !== null ? discount : undefined}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value) {
                setDiscount(parseInt(e.target.value, 10))
              } else {
                setDiscount(null)
              }
            }}
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.is_admin' })}</label>
          <div>
            <Switch
              defaultChecked={isAdmin === 1}
              onChange={(checked: boolean) => {
                setIsAdmin(checked ? 1 : 0)
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.is_staff' })}</label>
          <div>
            <Switch
              defaultChecked={isStaff === 1}
              onChange={(checked: boolean) => {
                setIsStaff(checked ? 1 : 0)
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.user.drawer.edit.remarks' })}</label>
          <TextArea
            placeholder={intl.formatMessage({ id: 'module.user.drawer.edit.remarks.placeholder' })}
            defaultValue={remarks as string}
            rows={4}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              if (e.target.value) {
                setRemarks(e.target.value)
              } else {
                setRemarks(null)
              }
            }}
          />
        </div>
      </Drawer>
    </>
  )
}

export default DrawerEdit

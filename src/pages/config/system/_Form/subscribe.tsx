import type { FC } from 'react'
import { useIntl } from 'umi'
import { Switch } from 'antd'
import { useRef } from 'react'
import { useDebounceFn } from 'ahooks'

export interface formSubscribeProps {
  planChangeEnable: boolean
  resetTrafficMethod: number
  surplusEnable: boolean
  newOrderEventID: number
  renewOrderEventID: number
  changeOrderEventID: number
  onChange: (data: Record<string, any>) => void
}

const FormSubscribe: FC<Partial<formSubscribeProps>> = (props) => {
  const {
    planChangeEnable,
    resetTrafficMethod,
    surplusEnable,
    newOrderEventID,
    renewOrderEventID,
    changeOrderEventID,
    onChange,
  } = props

  const planChangeEnableRef = useRef<HTMLButtonElement>(null)
  const resetTrafficMethodRef = useRef<HTMLSelectElement>(null)
  const surplusEnableRef = useRef<HTMLButtonElement>(null)
  const newOrderEventIDRef = useRef<HTMLSelectElement>(null)
  const renewOrderEventIDRef = useRef<HTMLSelectElement>(null)
  const changeOrderEventIDRef = useRef<HTMLSelectElement>(null)

  const intl = useIntl()

  const { run } = useDebounceFn(
    () => {
      const data: Record<string, any> = {
        plan_change_enable: planChangeEnableRef.current?.ariaChecked === 'true' ? 1 : 0,
        reset_traffic_method: Number(resetTrafficMethodRef.current?.value).valueOf(),
        surplus_enable: surplusEnableRef.current?.ariaChecked === 'true' ? 1 : 0,
        new_order_event_id: Number(newOrderEventIDRef.current?.value).valueOf(),
        renew_order_event_id: Number(renewOrderEventIDRef.current?.value).valueOf(),
        change_order_event_id: Number(changeOrderEventIDRef.current?.value).valueOf(),
      }

      onChange?.(data)
    },
    { wait: 1000 },
  )

  const changeHandler = run

  return (
    <>
      <div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.plan_change_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.plan_change_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={planChangeEnable}
              onChange={changeHandler}
              ref={planChangeEnableRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.reset_traffic_method' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.subscribe.reset_traffic_method.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <select
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.subscribe.reset_traffic_method.placeholder',
              })}
              defaultValue={resetTrafficMethod}
              onChange={changeHandler}
              ref={resetTrafficMethodRef}
            >
              <option value={0}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.reset_traffic_method.option.first_day',
                })}
              </option>
              <option value={1}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.reset_traffic_method.option.order_date',
                })}
              </option>
            </select>
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.surplus_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.surplus_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={surplusEnable}
              onChange={changeHandler}
              ref={surplusEnableRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.new_order_event_id' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.new_order_event_id.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <select
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.subscribe.new_order_event_id.placeholder',
              })}
              defaultValue={newOrderEventID}
              onChange={changeHandler}
              ref={newOrderEventIDRef}
            >
              <option value={0}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.new_order_event_id.option.do_nothing',
                })}
              </option>
              <option value={1}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.new_order_event_id.option.reset_traffic',
                })}
              </option>
            </select>
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.renew_order_event_id' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.subscribe.renew_order_event_id.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <select
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.subscribe.renew_order_event_id.placeholder',
              })}
              defaultValue={renewOrderEventID}
              onChange={changeHandler}
              ref={renewOrderEventIDRef}
            >
              <option value={0}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.renew_order_event_id.option.do_nothing',
                })}
              </option>
              <option value={1}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.renew_order_event_id.option.reset_traffic',
                })}
              </option>
            </select>
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.subscribe.renew_order_event_id' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.subscribe.renew_order_event_id.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <select
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.subscribe.renew_order_event_id.placeholder',
              })}
              defaultValue={changeOrderEventID}
              onChange={changeHandler}
              ref={changeOrderEventIDRef}
            >
              <option value={0}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.change_order_event_id.option.do_nothing',
                })}
              </option>
              <option value={1}>
                {intl.formatMessage({
                  id: 'module.config.system.subscribe.change_order_event_id.option.reset_traffic',
                })}
              </option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormSubscribe

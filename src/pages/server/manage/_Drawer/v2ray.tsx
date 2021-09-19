import type { FC } from 'react'
import { useIntl, Link, useModel } from 'umi'
import { Drawer, Input, Select, Space, Button, message, Tooltip } from 'antd'
import { useState, useRef, useEffect } from 'react'
import ModalGroup from '@/components/Modal/group'
import { V2rayNodeSave } from '@/services'
import { QuestionCircleOutlined, ReadOutlined } from '@ant-design/icons'
import DrawerTLS from './tls'
import DrawerNetwork from './network'
import DrawerRule from './rule'
import DrawerDNSRule from './dnsrule'

const { Option } = Select

export interface drawerV2rayProps {
  onClose: () => void
  visible: boolean
  parentNodes: API.Admin.NodeItem[]
  onSubmitSuccess: () => void
  node?: API.Admin.NodeItem
}

const DrawerV2ray: FC<drawerV2rayProps> = (props) => {
  const intl = useIntl()
  const { onClose, visible, parentNodes, onSubmitSuccess, node } = props
  const { groupsState, refresh } = useModel('useGroupModel')
  const [modalGroupVisible, setModalGroupVisible] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [groupIds, setGroupIds] = useState<number[]>([])
  const [tls, setTLS] = useState<number>(0)
  const [network, setNetwork] = useState<string>('tcp')
  const [parentID, setParentID] = useState<number>(0)
  const [drawerTLSVisible, setDrawerTLSVisible] = useState<boolean>(false)
  const [drawerNetworkVisible, setDrawerNetworkVisible] = useState<boolean>(false)
  const [drawerRuleVisible, setDrawerRuleVisible] = useState<boolean>(false)
  const [drawerDNSRuleVisible, setDrawerDNSRuleVisible] = useState<boolean>(false)
  const [tlsSettings, setTLSSettings] = useState<API.Admin.V2rayTlsSettings | undefined>(undefined)
  const [networkSettings, setNetworkSettings] = useState<any | undefined>(undefined)
  const [ruleSettings, setRuleSettings] = useState<API.Admin.V2rayRuleSettings | undefined>(
    undefined,
  )
  const [dnsSettings, setDNSSettings] = useState<API.Admin.V2rayDnsSettingItem[] | undefined>(
    undefined,
  )
  const [destroy, setDestroy] = useState(false)

  const nameRef = useRef<Input>(null)
  const rateRef = useRef<Input>(null)
  const hostRef = useRef<Input>(null)
  const portRef = useRef<Input>(null)
  const serverPortRef = useRef<Input>(null)
  const serverNameRef = useRef<Input>(null)
  const alterIDRef = useRef<Input>(null)

  useEffect(() => {
    if (node?.tags) {
      setTags(node?.tags)
    }

    if (node?.group_id) {
      setGroupIds(node?.group_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const modalGroupCancelHandler = () => {
    setModalGroupVisible(false)
  }

  const modalGroupSubmitSuccessHandler = () => {
    refresh()
    setModalGroupVisible(false)
  }

  const drawerTLSCloseHandler = (settings: API.Admin.V2rayTlsSettings) => {
    setTLSSettings(settings)
    setDrawerTLSVisible(false)
  }

  const drawerNetworkCloseHandler = (settings: any) => {
    if (Object.keys(settings).length > 0) {
      setNetworkSettings(settings)
    }
    setDrawerNetworkVisible(false)
  }

  const drawerRuleCloseHandler = (settings: API.Admin.V2rayRuleSettings) => {
    if (Object.keys(settings).length > 0) {
      setRuleSettings(settings)
    }
    setDrawerRuleVisible(false)
  }

  const drawerDNSRuleCloseHandler = (settings: API.Admin.V2rayDnsSettingItem[]) => {
    if (settings.length > 0) {
      setDNSSettings(settings)
    }
    setDrawerDNSRuleVisible(false)
  }

  const submitHandler = async () => {
    const saveParams = {
      id: node?.id,
      name: nameRef.current?.input.value,
      rate: rateRef.current?.input.value,
      host: hostRef.current?.input.value,
      port: portRef.current?.input.value,
      server_port: serverPortRef.current?.input.value,
      alter_id: Number(alterIDRef.current?.input.value).valueOf(),
      parent_id: parentID,
      tags,
      tls,
      network,
      group_id: groupIds,
      server_name: serverNameRef.current?.input.value,
      tlsSettings,
      networkSettings,
      ruleSettings,
      dnsSettings,
    }

    const v2rayNodeSaveResult = await V2rayNodeSave(saveParams)
    if (v2rayNodeSaveResult === undefined) {
      return
    }
    setDestroy(true)
    const successMsgID = node?.id
      ? 'module.server.manage.message.edit_success'
      : 'module.server.manage.message.create_success'
    message.success(intl.formatMessage({ id: successMsgID }))
    onSubmitSuccess()
  }
  return (
    <>
      <Drawer
        title={
          node
            ? intl.formatMessage({ id: 'module.server.manage.drawer.edit_title' })
            : intl.formatMessage({ id: 'module.server.manage.drawer.add_title' })
        }
        placement="right"
        onClose={onClose}
        visible={visible}
        destroyOnClose={destroy}
        width="500"
        footer={
          <div className="float-right">
            <Button type="default" className="mx-lg-2">
              <span>{intl.formatMessage({ id: 'module.server.manage.drawer.cancel_btn' })}</span>
            </Button>
            <Button type="primary" onClick={submitHandler}>
              <span>{intl.formatMessage({ id: 'module.server.manage.drawer.ok_btn' })}</span>
            </Button>
          </div>
        }
      >
        <div className="row">
          <div className="form-group col-8">
            <label>{intl.formatMessage({ id: 'module.server.manage.name' })}</label>
            <Input
              placeholder={intl.formatMessage({ id: 'module.server.manage.name.placeholder' })}
              type="text"
              ref={nameRef}
              defaultValue={node?.name}
            />
          </div>
          <div className="form-group col-4">
            <label>{intl.formatMessage({ id: 'module.server.manage.rate' })}</label>
            <Input addonAfter={'x'} defaultValue={node?.rate ?? 1} ref={rateRef} />
          </div>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.server.manage.tags' })}</label>
          <Select
            mode="tags"
            className="w-100"
            placeholder={intl.formatMessage({ id: 'module.server.manage.tags.placeholder' })}
            onChange={(value: string[]) => {
              setTags(value)
            }}
            defaultValue={node?.tags}
          />
        </div>
        <div className="form-group">
          <label>
            <Space>
              {intl.formatMessage({ id: 'module.server.manage.group_id' })}
              <Link
                to=""
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  setModalGroupVisible(true)
                }}
              >
                {intl.formatMessage({ id: 'module.server.manage.group_id.btn' })}
              </Link>
            </Space>
          </label>
          <Select
            mode="multiple"
            className="w-100"
            placeholder={intl.formatMessage({
              id: 'module.server.manage.group_id.placeholder',
            })}
            onChange={(value: number[]) => {
              setGroupIds(value)
            }}
            defaultValue={node?.group_id}
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
        <div className="row">
          <div className="form-group col-md-8 col-xs-12">
            <label>{intl.formatMessage({ id: 'module.server.manage.host' })}</label>
            <Input
              placeholder={intl.formatMessage({ id: 'module.server.manage.host.placeholder' })}
              ref={hostRef}
              defaultValue={node?.host}
            />
          </div>
          <div className="form-group col-md-4 col-xs-12">
            <label>
              <Space>
                {intl.formatMessage({ id: 'module.server.manage.v2ray.tls' })}
                <Tooltip title={intl.formatMessage({ id: 'module.server.manage.v2ray.tls.tip' })}>
                  <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
                </Tooltip>
                <Link
                  to=""
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setDrawerTLSVisible(true)
                  }}
                >
                  {intl.formatMessage({ id: 'module.server.manage.v2ray.tls.edit_btn' })}
                </Link>
              </Space>
            </label>
            <Select
              defaultValue={node?.tls ?? 0}
              className="w-100"
              onChange={(value: number) => {
                setTLS(value)
              }}
            >
              <Option value={0}>
                {intl.formatMessage({
                  id: 'module.server.manage.v2ray.tls.option.off',
                })}
              </Option>
              <Option value={1}>
                {intl.formatMessage({
                  id: 'module.server.manage.v2ray.tls.option.on',
                })}
              </Option>
            </Select>
            <DrawerTLS
              visible={drawerTLSVisible}
              onClose={drawerTLSCloseHandler}
              defaultSettings={node?.tls_settings}
              key={node?.id}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6 col-xs-12">
            <label>{intl.formatMessage({ id: 'module.server.manage.port' })}</label>
            <Input
              placeholder={intl.formatMessage({ id: 'module.server.manage.port.placeholder' })}
              type="text"
              className="ant-input"
              ref={portRef}
              defaultValue={node?.port}
            />
          </div>
          <div className="form-group col-md-6 col-xs-12">
            <label>{intl.formatMessage({ id: 'module.server.manage.server_port' })}</label>
            <Input
              placeholder={intl.formatMessage({
                id: 'module.server.manage.v2ray.server_port.placeholder',
              })}
              type="text"
              className="ant-input"
              ref={serverPortRef}
              defaultValue={node?.server_port}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-4 col-xs-12">
            <label>AlterID</label>
            <Input type="number" ref={alterIDRef} min={0} max={65535} defaultValue={1} />
          </div>
          <div className="form-group col-md-8 col-xs-12">
            <label>
              <Space>
                {intl.formatMessage({ id: 'module.server.manage.v2ray.network' })}
                <Link
                  to=""
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setDrawerNetworkVisible(true)
                  }}
                >
                  {intl.formatMessage({ id: 'module.server.manage.v2ray.network.edit_btn' })}
                </Link>
              </Space>
            </label>
            <Select
              className="w-100"
              placeholder={intl.formatMessage({
                id: 'module.server.manage.v2ray.network.placeholder',
              })}
              onChange={(value: string) => {
                setNetwork(value)
              }}
              defaultValue={node?.network}
            >
              <Option value="tcp">TCP</Option>
              <Option value="ws">WebSocket</Option>
              <Option value="grpc">gRpc</Option>
            </Select>
            <DrawerNetwork
              visible={drawerNetworkVisible}
              onClose={drawerNetworkCloseHandler}
              defaultSettings={node?.network_settings}
              key={node?.id}
            />
          </div>
        </div>
        <div className="form-group">
          <label>
            <Space>
              {intl.formatMessage({
                id: 'module.server.manage.parent_id',
              })}
              <a target="_blank" href="https://docs.v2board.com/use/node.html#父节点与子节点关系">
                <ReadOutlined style={{ verticalAlign: '0.05rem' }} />
              </a>
            </Space>
          </label>

          <Select
            className="w-100"
            placeholder={intl.formatMessage({
              id: 'module.server.manage.parent_id.placeholder',
            })}
            defaultValue={node?.parent_id ?? 0}
            onChange={(value: number) => {
              setParentID(value)
            }}
          >
            <Option key={0} value={0}>
              {intl.formatMessage({
                id: 'module.server.manage.parent_id.option.default',
              })}
            </Option>
            {parentNodes &&
              parentNodes.map((nodeItem: API.Admin.NodeItem) => {
                return (
                  <Option key={nodeItem.id} value={nodeItem.id}>
                    {nodeItem.name}
                  </Option>
                )
              })}
          </Select>
        </div>
        <div className="form-group">
          <label>
            <Space>
              {intl.formatMessage({
                id: 'module.server.manage.v2ray.rule_settings',
              })}
              <Tooltip
                title={intl.formatMessage({
                  id: 'module.server.manage.v2ray.rule_settings.tip',
                })}
              >
                <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
              </Tooltip>
            </Space>
          </label>
          <div>
            <Button
              type="primary"
              className="w-100"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                setDrawerRuleVisible(true)
              }}
            >
              <span>
                {intl.formatMessage({
                  id: 'module.server.manage.v2ray.rule_settings.edit_btn',
                })}
              </span>
            </Button>
          </div>
          <DrawerRule
            visible={drawerRuleVisible}
            onClose={drawerRuleCloseHandler}
            defaultSettings={node?.rule_settings}
            key={node?.id}
          />
        </div>
        <div className="form-group">
          <label>
            <Space>{intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings' })}</Space>
          </label>
          <div>
            <Button
              type="primary"
              className="w-100"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                setDrawerDNSRuleVisible(true)
              }}
            >
              <span>
                {intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.edit_btn' })}
              </span>
            </Button>
          </div>
          <DrawerDNSRule
            visible={drawerDNSRuleVisible}
            onClose={drawerDNSRuleCloseHandler}
            defaultSettings={node?.dns_settings}
          />
        </div>
      </Drawer>
      <ModalGroup
        visible={modalGroupVisible}
        onCancel={modalGroupCancelHandler}
        onSubmitSuccess={modalGroupSubmitSuccessHandler}
      />
    </>
  )
}

export default DrawerV2ray

import type { FC } from 'react'
import { useIntl, Link, useModel } from 'umi'
import { Drawer, Input, Select, Space, Button, message } from 'antd'
import { useState, useRef, useEffect } from 'react'
import ModalGroup from '@/components/Modal/group'
import { trojanNodeSave } from '@/services'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { ReadOutlined } from '@ant-design/icons'

const { Option } = Select

export interface drawerTrojanProps {
  onClose: () => void
  visible: boolean
  parentNodes: API.Admin.NodeItem[]
  onSubmitSuccess: () => void
  node?: API.Admin.NodeItem
}

const DrawerTrojan: FC<drawerTrojanProps> = (props) => {
  const intl = useIntl()
  const { onClose, visible, parentNodes, onSubmitSuccess, node } = props
  const { groupsState, refresh } = useModel('useGroupModel')
  const [modalGroupVisible, setModalGroupVisible] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [groupIds, setGroupIds] = useState<number[]>([])
  const [allowInsecure, setAllowInsecure] = useState<number>(0)
  const [parentID, setParentID] = useState<number>(0)
  const nameRef = useRef<Input>(null)
  const rateRef = useRef<Input>(null)
  const hostRef = useRef<Input>(null)
  const portRef = useRef<Input>(null)
  const serverPortRef = useRef<Input>(null)
  const serverNameRef = useRef<Input>(null)
  const [destroy, setDestroy] = useState(false)

  useEffect(() => {
    if (node?.tags !== undefined) {
      setTags(node?.tags)
    }

    if (node?.group_id !== undefined) {
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

  const submitHandler = async () => {
    const saveParams = {
      id: node?.id,
      name: nameRef.current?.input.value,
      rate: rateRef.current?.input.value,
      host: hostRef.current?.input.value,
      port: portRef.current?.input.value,
      server_port: serverPortRef.current?.input.value,
      tags,
      group_id: groupIds,
      parent_id: parentID,
      allow_insecure: allowInsecure,
      server_name: serverNameRef.current?.input.value,
    }

    const trojanNodeSaveResult = await trojanNodeSave(saveParams)
    if (trojanNodeSaveResult === undefined) {
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
        width="500"
        destroyOnClose={destroy}
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
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.server.manage.host' })}</label>
          <Input
            placeholder={intl.formatMessage({ id: 'module.server.manage.host.placeholder' })}
            ref={hostRef}
            defaultValue={node?.host}
          />
        </div>
        <div className="row">
          <div className="form-group col-md-4 col-xs-12">
            <label>{intl.formatMessage({ id: 'module.server.manage.port' })}</label>
            <Input
              placeholder={intl.formatMessage({ id: 'module.server.manage.port.placeholder' })}
              type="number"
              ref={portRef}
              defaultValue={node?.port}
            />
          </div>
          <div className="form-group col-md-4 col-xs-12">
            <label>{intl.formatMessage({ id: 'module.server.manage.server_port' })}</label>
            <Input
              placeholder={intl.formatMessage({
                id: 'module.server.manage.server_port.placeholder',
              })}
              type="number"
              ref={serverPortRef}
              defaultValue={node?.server_port}
            />
          </div>
          <div className="form-group col-md-4 col-xs-12">
            <label>
              <Space>
                {intl.formatMessage({ id: 'module.server.manage.trojan.allow_insecure' })}
                <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
              </Space>
            </label>
            <Select
              defaultValue={node?.allow_insecure ?? 0}
              className="w-100"
              onChange={(value: number) => {
                setAllowInsecure(value)
              }}
            >
              <Option value={0}>
                {intl.formatMessage({
                  id: 'module.server.manage.trojan.allow_insecure.option.off',
                })}
              </Option>
              <Option value={1}>
                {intl.formatMessage({
                  id: 'module.server.manage.trojan.allow_insecure.option.on',
                })}
              </Option>
            </Select>
          </div>
        </div>

        <div className="form-group">
          <label>
            {intl.formatMessage({
              id: 'module.server.manage.trojan.server_name',
            })}
          </label>
          <Input
            placeholder={intl.formatMessage({
              id: 'module.server.manage.trojan.server_name.placeholder',
            })}
            className="w-100"
            ref={serverNameRef}
            defaultValue={node?.server_name}
          />
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
      </Drawer>
      <ModalGroup
        visible={modalGroupVisible}
        onCancel={modalGroupCancelHandler}
        onSubmitSuccess={modalGroupSubmitSuccessHandler}
      />
    </>
  )
}

export default DrawerTrojan

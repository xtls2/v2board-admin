import type { FC, ChangeEvent } from 'react'
import { useIntl } from 'umi'
import { Drawer, Input, Select, Button, message } from 'antd'
import { useState } from 'react'
import { knowledgeSave } from '@/services'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

const { Option } = Select
const mdParser = new MarkdownIt({ html: true })

export interface drawerKnowledgeProps {
  onClose: () => void
  visible: boolean
  onSubmitSuccess: () => void
  defaultKnowledge?: API.Admin.KnowledgeItem
}

const DrawerKnowledge: FC<drawerKnowledgeProps> = (props) => {
  const intl = useIntl()
  const { onClose, visible, onSubmitSuccess, defaultKnowledge } = props
  const [body, setBody] = useState<string>(defaultKnowledge?.body as string)
  const [title, setTitle] = useState<string>(defaultKnowledge?.title as string)
  const [category, setCategory] = useState<string>(defaultKnowledge?.category as string)
  const [language, setLanguage] = useState<string>(defaultKnowledge?.language as string)
  const [destroy, setDestroy] = useState(false)

  const submitHandler = async () => {
    // console.log(tags, groupIds)
    const saveParams = {
      id: defaultKnowledge?.id,
      title,
      body,
      category,
      language,
    }

    const knowledgeSaveResult = await knowledgeSave(saveParams)
    if (knowledgeSaveResult === undefined) {
      return
    }

    setDestroy(true)
    const successMsgID = defaultKnowledge?.id
      ? 'module.knowledge.message.edit_success'
      : 'module.knowledge.message.create_success'
    message.success(intl.formatMessage({ id: successMsgID }))
    onSubmitSuccess()
  }

  return (
    <>
      <Drawer
        title={
          defaultKnowledge
            ? intl.formatMessage({ id: 'module.knowledge.drawer.edit_title' })
            : intl.formatMessage({ id: 'module.knowledge.drawer.add_title' })
        }
        placement="right"
        onClose={onClose}
        visible={visible}
        width={'80%'}
        footer={
          <div className="float-right">
            <Button type="default" className="mx-lg-2">
              <span>{intl.formatMessage({ id: 'module.knowledge.drawer.cancel_btn' })}</span>
            </Button>
            <Button type="primary" onClick={submitHandler}>
              <span>{intl.formatMessage({ id: 'module.knowledge.drawer.ok_btn' })}</span>
            </Button>
          </div>
        }
        destroyOnClose={destroy}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.knowledge.title' })}</label>
          <Input
            placeholder={intl.formatMessage({ id: 'module.knowledge.title.placeholder' })}
            className="w-100"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value)
            }}
            defaultValue={defaultKnowledge?.title}
          />
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.knowledge.category' })}</label>
          <Input
            placeholder={intl.formatMessage({ id: 'module.knowledge.category.placeholder' })}
            className="w-100"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCategory(e.target.value)
            }}
            defaultValue={defaultKnowledge?.category}
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.knowledge.language' })}</label>
          <Select
            className="w-100"
            placeholder={intl.formatMessage({ id: 'module.knowledge.language.placeholder' })}
            defaultValue={defaultKnowledge?.language}
            onChange={(value: string) => {
              setLanguage(value)
            }}
          >
            <Option value="zh-CN" key="zh-CN">
              {intl.formatMessage({ id: 'module.knowledge.language.option.chinese' })}
            </Option>
            <Option value="en-US" key="en-US">
              {intl.formatMessage({ id: 'module.knowledge.language.option.english' })}
            </Option>
          </Select>
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'module.knowledge.body' })}</label>
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }: { text: string }) => {
              setBody(text)
            }}
            defaultValue={defaultKnowledge?.body}
          />
        </div>
      </Drawer>
    </>
  )
}

export default DrawerKnowledge

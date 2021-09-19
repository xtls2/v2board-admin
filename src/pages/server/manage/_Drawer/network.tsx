import './style.less'
import type { FC } from 'react'
import { useState } from 'react'
import { Drawer } from 'antd'
import { useIntl } from 'umi'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'

export interface drawerProps {
  onClose: (data: any) => void
  visible: boolean
  defaultSettings?: any
}

const DrawerNetwork: FC<drawerProps> = (props) => {
  const { onClose, visible, defaultSettings } = props
  const [editorValue, setEditorValue] = useState('')
  const intl = useIntl()
  const editorChangeHandler = (value: string) => {
    setEditorValue(value)
  }
  return (
    <>
      <Drawer
        title={intl.formatMessage({
          id: 'module.server.manage.v2ray.network_settings.drawer.title',
        })}
        placement="right"
        onClose={() => {
          try {
            const networkSettings = JSON.parse(editorValue)
            onClose(networkSettings)
          } catch (e) {
            onClose({})
          }
        }}
        visible={visible}
        width="500"
      >
        <div id="v2ray-protocol">
          <div className="form-group">
            <AceEditor
              placeholder={intl.formatMessage({
                id: 'module.server.manage.v2ray.network_settings.editor.placeholder',
              })}
              defaultValue={defaultSettings && JSON.stringify(defaultSettings, null, 2)}
              mode="json"
              theme="github"
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              onChange={editorChangeHandler}
              name="json-editor"
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
                useWorker: false,
              }}
            />
          </div>
        </div>
        ,
      </Drawer>
    </>
  )
}

export default DrawerNetwork

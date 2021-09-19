import type { FC } from 'react'
import { useState } from 'react'
import { Link, history, useModel, useIntl } from 'umi'
import { user } from '@/services'
import { loginPath } from '@/default'
import { Dropdown, Menu } from 'antd'

const DropDownUser: FC = () => {
  const [visible, setVisible] = useState(false)
  const { initialState, setInitialState } = useModel('@@initialState')
  const intl = useIntl()

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag)
  }

  const checkoutHandle: React.MouseEventHandler<HTMLAnchorElement> = async (
    e: React.MouseEvent,
  ) => {
    e.preventDefault()
    await user.logout()
    setInitialState((s) => ({ ...s, currentUser: undefined }))
    history.replace(loginPath)
  }

  const menu = () => (
    <>
      <Menu
        style={{
          boxShadow: '0 .25rem 2rem rgba(0,0,0,.08)',
          borderColor: '#ebebeb',
        }}
      >
        <Menu.Item key="0" icon={<i className="far fa-fw fa-arrow-alt-circle-left mr-1"> </i>}>
          <Link to="#" onClick={checkoutHandle} style={{ fontSize: '1rem' }}>
            {intl.formatMessage({ id: 'common.logout' })}
          </Link>
        </Menu.Item>
      </Menu>
    </>
  )

  return (
    <>
      <Dropdown
        overlay={menu}
        placement="bottomLeft"
        onVisibleChange={handleVisibleChange}
        visible={visible}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
          }}
        >
          <i className="far fa fa-user-circle"> </i>
          <span className="d-none d-lg-inline ml-1">
            {initialState?.currentUser?.data?.email as string}
          </span>
          <i className="fa fa-fw fa-angle-down ml-1"> </i>
        </button>
      </Dropdown>
    </>
  )
}

export default DropDownUser

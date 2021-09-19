import type { FC } from 'react'
import { useEffect } from 'react'
import MenuItem from './MenuItem'
import { useModel, history, useIntl } from 'umi'
import { apiHost } from '@/default'

const Menu: FC = () => {
  const { menus, menuIndex, setMenuIndex } = useModel('useMenuModel')
  const intl = useIntl()

  useEffect(() => {
    const topPath = history.location.pathname
    if (topPath === '') {
      return
    }
    const curMenuIndex = menus.getIndex(topPath)
    if (curMenuIndex === undefined) {
      return
    }
    if (curMenuIndex !== menuIndex) {
      setMenuIndex(curMenuIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname])

  return (
    <>
      <div className="content-side content-side-full">
        <ul className="nav-main">
          <MenuItem
            url={menus.getPath('0')}
            name={menus.getName('0')}
            index="0"
            icon={menus.getIcon('0')}
          />
          <li className="nav-main-heading">{intl.formatMessage({ id: 'module.group.setting' })}</li>

          <MenuItem
            url={menus.getPath('1')}
            name={menus.getName('1')}
            index="1"
            icon={menus.getIcon('1')}
          />
          <MenuItem
            url={menus.getPath('2')}
            name={menus.getName('2')}
            index="2"
            icon={menus.getIcon('2')}
          />
          <li className="nav-main-heading">{intl.formatMessage({ id: 'module.group.server' })}</li>

          <MenuItem
            url={menus.getPath('3')}
            name={menus.getName('3')}
            index="3"
            icon={menus.getIcon('3')}
          />
          <MenuItem
            url={menus.getPath('4')}
            name={menus.getName('4')}
            index="4"
            icon={menus.getIcon('4')}
          />
          <li className="nav-main-heading">{intl.formatMessage({ id: 'module.group.billing' })}</li>

          <MenuItem
            url={menus.getPath('5')}
            name={menus.getName('5')}
            index="5"
            icon={menus.getIcon('5')}
          />
          <MenuItem
            url={menus.getPath('6')}
            name={menus.getName('6')}
            index="6"
            icon={menus.getIcon('6')}
          />
          <MenuItem
            url={menus.getPath('7')}
            name={menus.getName('7')}
            index="7"
            icon={menus.getIcon('7')}
          />
          <li className="nav-main-heading">{intl.formatMessage({ id: 'module.group.user' })}</li>
          <MenuItem
            url={menus.getPath('8')}
            name={menus.getName('8')}
            index="8"
            icon={menus.getIcon('8')}
          />
          <MenuItem
            url={menus.getPath('9')}
            name={menus.getName('9')}
            index="9"
            icon={menus.getIcon('9')}
          />
          <MenuItem
            url={menus.getPath('10')}
            name={menus.getName('10')}
            index="10"
            icon={menus.getIcon('10')}
          />
          <MenuItem
            url={menus.getPath('11')}
            name={menus.getName('11')}
            index="11"
            icon={menus.getIcon('11')}
          />
          <li className="nav-main-heading">{intl.formatMessage({ id: 'module.group.index' })}</li>
          <li className="nav-main-item">
            <a className="nav-main-link " href={`${apiHost}/monitor`} target="_blank">
              <i className="nav-main-link-icon si si-bar-chart" />
              <span className="nav-main-link-name">
                {intl.formatMessage({ id: 'module.monitor_queue' })}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
export default Menu

import type { FC } from 'react'
import classNames from 'classnames/bind'
import { Link, useModel } from 'umi'

export interface MenuItemProps {
  index: string
  name: string
  icon: string
  url: string
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { index, name, icon, url } = props
  const { menuIndex } = useModel('useMenuModel')
  const iconClassName = classNames('nav-main-link-icon', 'si', `si-${icon}`)
  const linkClassName: string = classNames('nav-main-link', {
    active: index === menuIndex,
  })

  return (
    <>
      <li className="nav-main-item">
        {index === menuIndex && (
          <Link
            className={linkClassName}
            to=""
            onClick={(e: React.MouseEvent) => e.preventDefault()}
          >
            <i className={iconClassName}> </i>
            <span className="nav-main-link-name">{name}</span>
          </Link>
        )}
        {index !== menuIndex && (
          <Link className={linkClassName} to={url}>
            <i className={iconClassName}> </i>
            <span className="nav-main-link-name">{name}</span>
          </Link>
        )}
      </li>
    </>
  )
}
export default MenuItem

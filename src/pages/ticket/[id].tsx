import type { FC } from 'react'
import type { IRouteComponentProps } from 'umi'
import { history, useIntl } from 'umi'
import { message } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { useDebounceFn, useUnmount, useInterval } from 'ahooks'
import { ticketReply, ticket } from '@/services'
import { userInfo } from '@/services/admin'
import { notFoundPath } from '@/default'
import classNames from 'classnames/bind'
import moment from 'moment'

const TicketDetailPage: FC<IRouteComponentProps> = (props) => {
  const { match } = props
  const [adminTicket, setAdminTicket] = useState<API.Admin.TicketUnionItem>()
  const [adminUser, setAdminUser] = useState<API.User.InfoItem>()
  const [bodyHeight, setBodyHeight] = useState(document.body.offsetHeight - 150)
  const checkDelay: number = 5000
  const [checkInterval, setCheckIntelVal] = useState<number | null>(checkDelay)
  const messageInputRef = useRef<HTMLInputElement>(null)
  const { id } = match.params as { id: number }
  const intl = useIntl()

  const messageClassNames = (isMe: boolean): string => {
    return classNames(
      'd-inline-block',
      'font-w600',
      'bg-body-light',
      'border-3x',
      'px-3',
      'py-2',
      'mb-2',
      'shadow-sm',
      'mw-100',
      'text-left',
      'rounded-right',
      {
        'border-right': isMe,
        'border-primary': isMe,
        'border-success': isMe === false,
        'border-left': isMe === false,
        animated: isMe === false,
        fadeIn: isMe === false,
        'text-success': isMe === false,
      },
    )
  }

  const divMessageClassNames = (isMe: boolean): string => {
    return classNames({
      'ml-4': isMe,
      'text-right': isMe,
      'mr-4': isMe === false,
    })
  }
  const divTimeClassNames = (isMe: boolean): string => {
    return classNames('font-size-sm', 'font-italic', 'text-muted', 'my-2', {
      'text-right': isMe,
    })
  }

  const replyHandler = async () => {
    const curMessage = messageInputRef.current?.value as string
    const ticketId = adminTicket?.id as number
    if (curMessage !== '' && ticketId > 0) {
      const ticketReplyResult = await ticketReply({ id: ticketId, message: curMessage })
      if (ticketReplyResult === undefined) {
        return
      }
      message.success(intl.formatMessage({ id: 'common.message.request_success' }))
    }
  }

  const ticketFetch = async () => {
    const ticketResult = await ticket({ id })
    if (ticketResult === undefined) {
      history.replace(notFoundPath)
      return
    }
    setAdminTicket(ticketResult.data)
    if (ticketResult.data.status === 1) {
      setCheckIntelVal(null)
    }
  }

  useInterval(ticketFetch, checkInterval, { immediate: true })

  useUnmount(() => {
    setCheckIntelVal(null)
  })

  const updateSizeFunc = useDebounceFn(
    () => {
      const height = document.body.offsetHeight - 150
      setBodyHeight(height)
    },
    {
      wait: 1000,
    },
  )

  useEffect(() => {
    window.addEventListener('resize', () => {
      updateSizeFunc.run()
    })
    return () => {
      window.removeEventListener('resize', () => {
        updateSizeFunc.run()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async () => {
      if (adminTicket?.id === undefined) {
        return
      }
      const userInfoResult = await userInfo({ id: adminTicket.user_id })
      if (userInfoResult === undefined) {
        return
      }
      setAdminUser(userInfoResult.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminTicket?.user_id])

  return (
    <>
      <div id="root">
        <div>
          <div className="block-content block-content-full bg-primary">
            <p className="font-size-lg font-w600 text-white mt-0 mb-0">
              {adminTicket?.id}#{adminTicket?.subject}
            </p>
            <p className="text-white-75 mb-0">
              <span>
                {intl.formatMessage({ id: 'module.ticket.detail.user' })}：{adminUser?.email}
              </span>
            </p>
          </div>
          <div
            className="js-chat-messages block-content block-content-full text-wrap-break-word overflow-y-auto"
            style={{ height: bodyHeight }}
          >
            {adminTicket?.message.map((messageItem: API.Admin.TicketMessageItem) => {
              return (
                <div key={messageItem.id}>
                  <div className={divTimeClassNames(messageItem.is_me)}>
                    {moment.unix(Number(messageItem.created_at)).format('YYYY-MM-DD HH:MM')}
                  </div>
                  <div className={divMessageClassNames(messageItem.is_me)}>
                    <div className={messageClassNames(messageItem.is_me)}>
                      {messageItem.message}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="js-chat-form block-content p-2 bg-body-dark">
            <input
              type="text"
              ref={messageInputRef}
              className="js-chat-input form-control form-control-alt"
              placeholder={intl.formatMessage({ id: 'module.ticket.detail.enter_message' })}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                  replyHandler()
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketDetailPage

import type { FC } from 'react'
import type { TablePaginationConfig } from 'antd'
import { message } from 'antd'
import { Table, Badge, Divider } from 'antd'
import { useIntl, Link } from 'umi'
import React from 'react'
import { ticketClose } from '@/services'
import moment from 'moment'

const { Column } = Table

export interface listProps {
  dataSource: API.Admin.TicketItem[]
  total: number
  pageSize: number
  current: number
  onPageChange: (current: number) => void
  onCloseSuccess: () => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, total, pageSize, current, onPageChange, onCloseSuccess } = props
  const intl = useIntl()

  const pageChangeHandler = (pagenation: TablePaginationConfig) => {
    const currentPage = pagenation.current as number
    onPageChange(currentPage)
  }

  const pagenationProps: TablePaginationConfig = {
    pageSize,
    showQuickJumper: false,
    showLessItems: false,
    showSizeChanger: false,
    showTitle: false,
    total,
    size: 'small',
    current,
  }

  const viewHandler = (id: number) => {
    const idUrl = `${window.location.origin}/#/ticket/${id}`
    const awidth = 800
    const aheight = 600
    const atop = 0
    const aleft = 0
    const param0 = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0'
    const params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${param0}`
    window.open(idUrl, '', params)
  }

  const closeHandler = (id: number) => {
    const tickerCloseResult = ticketClose({ id })
    if (tickerCloseResult === undefined) {
      return
    }
    message.success(intl.formatMessage({ id: 'module.ticket.message.close_success' }))
    onCloseSuccess()
  }

  return (
    <>
      <Table
        dataSource={dataSource}
        pagination={pagenationProps}
        rowKey="id"
        scroll={{ x: true }}
        onChange={pageChangeHandler}
        loading={dataSource === undefined}
      >
        <Column
          title={intl.formatMessage({ id: 'module.ticket.list.column.id' })}
          dataIndex="id"
          key="id"
        />
        <Column
          title={intl.formatMessage({ id: 'module.ticket.list.column.subject' })}
          dataIndex="subject"
          key="subject"
        />
        <Column
          title={intl.formatMessage({ id: 'module.ticket.list.column.level' })}
          dataIndex="level"
          key="level"
          render={(level: number) => {
            return (
              <>
                {level === 2 && intl.formatMessage({ id: 'module.ticket.list.column.level.high' })}
                {level === 1 &&
                  intl.formatMessage({ id: 'module.ticket.list.column.level.medium' })}
                {level === 0 && intl.formatMessage({ id: 'module.ticket.list.column.level.low' })}
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.ticket.list.column.reply_status' })}
          dataIndex="reply_status"
          key="reply_status"
          render={(status) => {
            return (
              <>
                {status === 0 && (
                  <>
                    <Badge status="processing" />
                    {intl.formatMessage({ id: 'module.ticket.list.column.reply_status.replied' })}
                  </>
                )}
                {status === 1 && (
                  <>
                    <Badge status="error" />
                    {intl.formatMessage({
                      id: 'module.ticket.list.column.reply_status.to_be_replied',
                    })}
                  </>
                )}
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.ticket.list.column.created_at' })}
          dataIndex="created_at"
          key="created_at"
          render={(created_at: number) => {
            return moment.unix(created_at).format('YYYY-MM-DD HH:MM')
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.ticket.list.column.updated_at' })}
          dataIndex="created_at"
          key="created_at"
          render={(created_at: number) => {
            return moment.unix(created_at).format('YYYY-MM-DD HH:MM')
          }}
        />

        <Column
          title={intl.formatMessage({ id: 'module.ticket.list.column.action' })}
          dataIndex="action"
          render={(text: any, record: API.Admin.TicketItem) => {
            return (
              <>
                <Link
                  to=""
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    viewHandler(record.id)
                  }}
                >
                  {intl.formatMessage({ id: 'module.ticket.list.column.action.view' })}
                </Link>
                <Divider type="vertical" />
                <Link
                  to=""
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    closeHandler(record.id)
                  }}
                  disabled={record.status === 1}
                >
                  {intl.formatMessage({ id: 'module.ticket.list.column.action.close' })}
                </Link>
              </>
            )
          }}
          align="right"
        />
      </Table>
    </>
  )
}

export default List

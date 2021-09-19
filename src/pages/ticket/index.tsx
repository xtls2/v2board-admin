import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Radio } from 'antd'
import { useIntl } from 'umi'
import type { RadioChangeEvent } from 'antd'
import { tickets } from '@/services'
import List from './_List'

const TicketPage: FC = () => {
  const intl = useIntl()
  const [status, setStatus] = useState(0)
  const [listUpdateStatus, setListUpdateStatus] = useState(false)
  const [adminTickets, setAdminTickets] = useState<API.Admin.TicketItem[]>()
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 10
  useEffect(() => {
    ;(async () => {
      if (adminTickets !== undefined && listUpdateStatus === false) {
        return
      }
      const ticketsResult = await tickets({ pageSize, current, status })
      if (ticketsResult === undefined) {
        return
      }
      setTotal(ticketsResult.total)
      setAdminTickets(ticketsResult.data)
      setListUpdateStatus(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateStatus])
  return (
    <>
      <div className="p-0 p-lg-4">
        <div className="d-flex justify-content-between align-items-center" />
        <div className="block block-rounded block-bordered ">
          <div className="bg-white">
            <div className="p-3">
              <Radio.Group
                onChange={(e: RadioChangeEvent) => {
                  setStatus(e.target.value)
                  setCurrent(1)
                  setListUpdateStatus(true)
                }}
                defaultValue={status}
              >
                <Radio.Button value={0}>
                  {intl.formatMessage({ id: 'module.ticket.status.on' })}
                </Radio.Button>
                <Radio.Button value={1}>
                  {intl.formatMessage({ id: 'module.ticket.status.off' })}
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <List
            dataSource={adminTickets as []}
            total={total}
            pageSize={pageSize}
            current={current}
            onPageChange={(pageCurrent: number) => {
              setCurrent(pageCurrent)
              setListUpdateStatus(true)
            }}
            onCloseSuccess={() => {
              window.location.reload()
            }}
          />
        </div>
      </div>
    </>
  )
}

export default TicketPage

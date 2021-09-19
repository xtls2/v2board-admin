import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Line } from '@ant-design/charts'
import type { LineConfig } from '@ant-design/charts'
import { orderStat } from '@/services'

const OrderChart: FC = () => {
  const [adminOrderStat, setAdminOrderStat] = useState<API.Admin.OrderStatItem[]>([])
  useEffect(() => {
    ;(async () => {
      const orderStatResult = await orderStat()
      if (orderStatResult === undefined) {
        return
      }
      setAdminOrderStat(orderStatResult.data)
    })()
  }, [])

  const config: LineConfig = {
    data: adminOrderStat,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    legend: {
      layout: 'horizontal',
      position: 'top-right',
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  }
  return <Line {...config} />
}
export default OrderChart

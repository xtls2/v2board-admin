import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Bar } from '@ant-design/charts'
import type { BarConfig } from '@ant-design/charts'
import { serverLastRank } from '@/services'

const ServerRankChart: FC = () => {
  const [adminSeverRank, setAdminSeverRank] = useState<API.Admin.ServerLastRankItem[]>([])

  useEffect(() => {
    ;(async () => {
      const serverLastRankResult = await serverLastRank()
      if (serverLastRank === undefined) {
        return
      }
      setAdminSeverRank(serverLastRankResult.data)
    })()
  }, [])
  const config: BarConfig = {
    data: adminSeverRank,
    xField: 'total',
    yField: 'server_name',
    seriesField: 'server_name',
    legend: {
      layout: 'horizontal',
      position: 'top-left',
    },
  }
  return <Bar {...config} />
}

export default ServerRankChart

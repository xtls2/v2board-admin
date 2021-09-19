import type { FC } from 'react'
import MonitorStats from './_MonitorStats'
import Nav from './_Nav'
import Overriew from './_Overview'
import ServerRank from './_ServerRank'

const dashboardPage: FC = () => {
  return (
    <>
      <div className="p-0 p-lg-4">
        <MonitorStats />
        <Nav />
        <div className="row no-gutters">
          <Overriew />
        </div>
        <div className="row no-gutters mt-xl-3">
          <ServerRank />
        </div>
      </div>
    </>
  )
}

export default dashboardPage

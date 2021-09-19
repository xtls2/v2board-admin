import type { FC } from 'react'

const Loading: FC = () => (
  <>
    <div className="content content-full">
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </>
)

export default Loading

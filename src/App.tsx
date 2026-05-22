import { useQuery } from '@tanstack/react-query'

import { fetchObjects } from './shared/api/fetchObjects'

import { Map } from './widgets/map/Map'

export default function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['objects'],
    queryFn: fetchObjects,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Map data={data} />
    </div>
  )
}
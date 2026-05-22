import { load } from '@loaders.gl/core'
import { GeoPackageLoader } from '@loaders.gl/geopackage'

export const loadGpkg = async (file: File) => {
  const data = await load(file, GeoPackageLoader)

  return data
}
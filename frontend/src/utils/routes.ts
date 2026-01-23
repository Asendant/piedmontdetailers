import type { PackageType } from '../types'

export const getServiceRoute = (packageType: PackageType): string => {
  const routeMap: Record<PackageType, string> = {
    'Interior Package': '/services/interior-package',
    'Exterior Package': '/services/exterior-package',
    'Full Wash Package': '/services/full-wash-package',
  }
  return routeMap[packageType]
}

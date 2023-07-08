const mapping: Record<string, string> = {
  businesses: 'business',
  'gps-data': 'gps_data',
  'gps-devices': 'gps_device',
  servers: 'server',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

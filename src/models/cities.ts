export function filterUniqueValues(value, index, self) {
  return self.indexOf(value) === index;
}

export const buildRootClassName = (pathname: string): string => {
  return !pathname || pathname === '/' ? 'weather-app' : 'weather-app weather-by-city'
};

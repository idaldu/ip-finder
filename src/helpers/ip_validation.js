export function validateIPAddress(value) {
  const result = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(
    value
  );

  return result;
}

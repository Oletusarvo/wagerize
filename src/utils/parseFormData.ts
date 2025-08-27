export function parseFormData(payload: FormData) {
  const parsed: Record<string, unknown> = {};
  for (const [key, val] of payload) {
    let value: any;
    try {
      value = JSON.parse(val.toString());
    } catch {
      value = val.toString();
    }
    parsed[key] = value;
  }
  return parsed;
}

export function createFormData(record: Record<string, unknown>) {
  const fd = new FormData();
  for (const [key, val] of Object.entries(record)) {
    fd.set(key, typeof val === 'string' ? val : JSON.stringify(val));
  }
  return fd;
}

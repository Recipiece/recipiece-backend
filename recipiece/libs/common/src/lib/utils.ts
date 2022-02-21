export function nou(entity: any): boolean {
  return entity === null || entity === undefined;
}

export function utcNow(): number {
  return new Date().getUTCMilliseconds();
}

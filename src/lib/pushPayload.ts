export interface PushPayload {
  title: string;
  body: string;
  url: string;
}

export function createPushPayload(data: PushPayload): string {
  return JSON.stringify(data);
}
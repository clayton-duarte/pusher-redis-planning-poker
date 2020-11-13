export function createRoomId(): string {
  return Math.random().toString(16).slice(2);
}

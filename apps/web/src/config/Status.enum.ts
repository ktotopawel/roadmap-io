const StatusEnum = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
} as const;

export type StatusKeys = keyof typeof StatusEnum;

export default StatusEnum;

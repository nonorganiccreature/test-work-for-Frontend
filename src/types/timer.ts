export interface Timer {
  id: number;
  timeLeft: number;
  expireCallback: () => void;
}

export interface DeletionTimer extends Timer {}

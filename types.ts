
export interface BingoState {
  drawnNumbers: number[];
  availableNumbers: number[];
  intervalSeconds: number;
  isPlaying: boolean;
  currentNumber: number | null;
}

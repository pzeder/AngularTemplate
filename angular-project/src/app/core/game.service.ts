import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  board = signal(this.getEmptyBoard());
  currentPlayer = signal<'X' | 'O'>('X');

  gameOver = computed(
    () =>
      this.winner() !== '' ||
      !this.board()
        .map((r) => r.some((x) => x === ''))
        .some((x) => x),
  );

  winner: Signal<'X' | 'O' | ''> = computed(() => {
    const board = this.board();
    const rowWinners: ('X' | 'O' | '')[] = [
      this.getWinnerFromRow(board[0]),
      this.getWinnerFromRow(board[1]),
      this.getWinnerFromRow(board[2]),
      this.getWinnerFromRow(board.map((r) => r[0])),
      this.getWinnerFromRow(board.map((r) => r[1])),
      this.getWinnerFromRow(board.map((r) => r[2])),
      this.getWinnerFromRow([board[0][0], board[1][1], board[2][2]]),
      this.getWinnerFromRow([board[0][2], board[1][1], board[2][0]]),
    ];
    return rowWinners.filter((w) => w !== '')[0] ?? '';
  });

  tryPlay(row: number, column: number) {
    const board = this.board();
    if (board[row][column] !== '') {
      return;
    }

    board[row][column] = this.currentPlayer();
    this.board.set([...board]);
    const nextPlayer = this.currentPlayer() === 'X' ? 'O' : 'X';
    this.currentPlayer.set(nextPlayer);
  }

  reset() {
    this.board.set(this.getEmptyBoard());
    this.currentPlayer.set('X');
  }

  private getWinnerFromRow(row: ('X' | 'O' | '')[]) {
    return row.every((c) => c === row[0]) ? row[0] : '';
  }

  private getEmptyBoard(): ('X' | 'O' | '')[][] {
    return [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }
}

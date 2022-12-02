// Advent of Code - Day 2 - Part One

export enum Opponent {
  Rock,
  Paper,
  Scissors,
}

 export const OpponentMap: Record<string, Opponent> = { A: Opponent.Rock, B: Opponent.Paper, C: Opponent.Scissors };

export enum You {
  Rock,
  Paper,
  Scissors,
}

export const YouMap: Record<string, You> = { X: You.Rock, Y: You.Paper, Z: You.Scissors };

export const YouScoreMap: Record<You, number> = { [You.Rock]: 1, [You.Paper]: 2, [You.Scissors]: 3 };

export enum GameState {
  Lose,
  Draw,
  Win,
}

export const GameStateScoreMap: Record<GameState, number> = { [GameState.Lose]: 0, [GameState.Draw]: 3, [GameState.Win]: 6 };

export const GameStateMap: Record<string, GameState> = {
  [`${Opponent.Rock}, ${You.Rock}`]: GameState.Draw,
  [`${Opponent.Rock}, ${You.Paper}`]: GameState.Win,
  [`${Opponent.Rock}, ${You.Scissors}`]: GameState.Lose,
  [`${Opponent.Paper}, ${You.Paper}`]: GameState.Draw,
  [`${Opponent.Paper}, ${You.Scissors}`]: GameState.Win,
  [`${Opponent.Paper}, ${You.Rock}`]: GameState.Lose,
  [`${Opponent.Scissors}, ${You.Scissors}`]: GameState.Draw,
  [`${Opponent.Scissors}, ${You.Rock}`]: GameState.Win,
  [`${Opponent.Scissors}, ${You.Paper}`]: GameState.Lose,
}

export function part1(input: string): number {
  return input.split('\n').filter(Boolean).map((game) => {
    const [opp, you] = game.split(' ');
    return [GameStateMap[`${OpponentMap[opp]}, ${YouMap[you]}`], YouMap[you]];
  }).map(([gameState, you]) => GameStateScoreMap[gameState] + YouScoreMap[you]).reduce((a, b) => a + b, 0);
}

// Advent of Code - Day 2 - Part Two

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

export const YouScoreMap: Record<You, number> = { [You.Rock]: 1, [You.Paper]: 2, [You.Scissors]: 3 };

export enum GameState {
  Lose,
  Draw,
  Win,
}

export const GameStateStringMap: Record<string, GameState> = { X: GameState.Lose, Y: GameState.Draw, Z: GameState.Win };

export const GameStateScoreMap: Record<GameState, number> = { [GameState.Lose]: 0, [GameState.Draw]: 3, [GameState.Win]: 6 };

export const GameStateMap: Record<GameState, Record<Opponent, You>> = {
  [GameState.Win]: { [Opponent.Paper]: You.Scissors, [Opponent.Rock]: You.Paper, [Opponent.Scissors]: You.Rock },
  [GameState.Lose]: { [Opponent.Paper]: You.Rock, [Opponent.Rock]: You.Scissors, [Opponent.Scissors]: You.Paper },
  [GameState.Draw]: { [Opponent.Paper]: You.Paper, [Opponent.Rock]: You.Rock, [Opponent.Scissors]: You.Scissors },
};

export function part2(input: string): number {
  return input
    .split('\n')
    .filter(Boolean)
    .map(game => {
      const [opp, gs] = game.split(' ');
      const gameState = GameStateStringMap[gs];
      return [gameState, GameStateMap[gameState][OpponentMap[opp]]];
    })
    .map(([gameState, you]) => GameStateScoreMap[gameState] + YouScoreMap[you])
    .reduce((a, b) => a + b, 0);
}

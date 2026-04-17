import * as migration_20260417_000748_initial from './20260417_000748_initial';

export const migrations = [
  {
    up: migration_20260417_000748_initial.up,
    down: migration_20260417_000748_initial.down,
    name: '20260417_000748_initial'
  },
];

import * as migration_20260417_000748_initial from './20260417_000748_initial';
import * as migration_20260418_043655_sold_out_rename from './20260418_043655_sold_out_rename';

export const migrations = [
  {
    up: migration_20260417_000748_initial.up,
    down: migration_20260417_000748_initial.down,
    name: '20260417_000748_initial',
  },
  {
    up: migration_20260418_043655_sold_out_rename.up,
    down: migration_20260418_043655_sold_out_rename.down,
    name: '20260418_043655_sold_out_rename'
  },
];

import * as migration_20260309_132324 from './20260309_132324';

export const migrations = [
  {
    up: migration_20260309_132324.up,
    down: migration_20260309_132324.down,
    name: '20260309_132324'
  },
];

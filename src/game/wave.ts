import { EnemyType } from './enemy.js';

const NEXT_WAVE_DELAY = 5;

export enum WaveState {
  Running, // Executing phases, spawning enemies
  Waiting, // All phases complete, waiting for all enemies to be cleared
  Resetting, // Delay before next wave begins
}

type SpawnCallback = (type: EnemyType) => void;

/**
 * A spawner handles creating instances of a single enemy type at a given interval.
 */
class Spawner {
  enemyType: EnemyType;
  interval: number;
  elapsed = 0;

  onSpawn: SpawnCallback;

  constructor(enemyType: EnemyType, interval: number, onSpawn: SpawnCallback) {
    this.enemyType = enemyType;
    this.interval = interval;
    this.onSpawn = onSpawn;
  }

  reset(): void {
    this.elapsed = 0;
  }

  update(): void {
    this.elapsed += (deltaTime/1000);

    while (this.elapsed >= this.interval) {
      this.elapsed -= this.interval;

      this.onSpawn(this.enemyType);
    }
  }
}

/**
 * A phase is a group of spawners, which operate continuously for the phase's period.
 */
class Phase {
  spawnerList: Spawner[];

  period: number;
  elapsed = 0;

  constructor(period: number, spawnerList: Spawner[]) {
    this.period = period;
    this.spawnerList = spawnerList;
  }

  reset(): void {
    this.elapsed = 0;
    this.spawnerList.forEach(spawner => spawner.reset());
  }

  update(): boolean {
    this.elapsed += (deltaTime/1000);

    if (this.elapsed >= this.period) return false;

    this.spawnerList.forEach(spawner => spawner.update());

    return true;
  }
}

/**
 * A wave is a series of phases, after which there is a short break, then the wave increases power and repeats.
 */
export default class Wave {
  phaseList: Phase[];
  currentPhase = 0;

  power = 0;

  state = WaveState.Running;
  nextWaveTimer = 0;

  constructor(onSpawn: SpawnCallback) {
    this.phaseList = [
      new Phase(15, [
        new Spawner(EnemyType.A, 4, onSpawn),
      ]),
      new Phase(20, [
        new Spawner(EnemyType.A, 4, onSpawn),
        new Spawner(EnemyType.B, 2.5, onSpawn),
      ]),
      new Phase(30, [
        new Spawner(EnemyType.A, 4, onSpawn),
        new Spawner(EnemyType.C, 1.5, onSpawn),
      ]),
      new Phase(30, [
        new Spawner(EnemyType.A, 6, onSpawn),
        new Spawner(EnemyType.B, 3, onSpawn),
        new Spawner(EnemyType.C, 2, onSpawn),
      ]),
      new Phase(30, [
        new Spawner(EnemyType.A, 4, onSpawn),
        new Spawner(EnemyType.B, 3, onSpawn),
        new Spawner(EnemyType.D, 5, onSpawn),
      ]),
      new Phase(30, [
        new Spawner(EnemyType.A, 4, onSpawn),
        new Spawner(EnemyType.B, 3, onSpawn),
        new Spawner(EnemyType.C, 2, onSpawn),
        new Spawner(EnemyType.D, 5, onSpawn),
        new Spawner(EnemyType.E, 25, onSpawn),
      ]),
    ];
    this.reset();
  }

  reset(): void {
    this.state = WaveState.Running;
    this.currentPhase = 0;
    this.phaseList.forEach(phase => phase.reset());
  }

  startNextWave(): void {
    this.state = WaveState.Resetting;
    this.nextWaveTimer = 0;
  }

  update(): void {
    switch (this.state) {
      case WaveState.Running: {
        if (!this.phaseList[this.currentPhase].update()) {
          ++this.currentPhase;

          if (this.currentPhase === this.phaseList.length) {
            this.state = WaveState.Waiting;
          }
        }
        break;
      }
      case WaveState.Resetting: {
        this.nextWaveTimer += (deltaTime/1000);

        if (this.nextWaveTimer >= NEXT_WAVE_DELAY) {
          ++this.power;
          this.reset();
        }
        break;
      }
    }
  }
}

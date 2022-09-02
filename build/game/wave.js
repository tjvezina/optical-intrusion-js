import { EnemyType } from './enemy.js';
const NEXT_WAVE_DELAY = 5;
export var WaveState;
(function (WaveState) {
    WaveState[WaveState["Running"] = 0] = "Running";
    WaveState[WaveState["Waiting"] = 1] = "Waiting";
    WaveState[WaveState["Resetting"] = 2] = "Resetting";
})(WaveState || (WaveState = {}));
class Spawner {
    constructor(enemyType, interval, onSpawn) {
        this.elapsed = 0;
        this.enemyType = enemyType;
        this.interval = interval;
        this.onSpawn = onSpawn;
    }
    reset() {
        this.elapsed = 0;
    }
    update() {
        this.elapsed += (deltaTime / 1000);
        while (this.elapsed >= this.interval) {
            this.elapsed -= this.interval;
            this.onSpawn(this.enemyType);
        }
    }
}
class Phase {
    constructor(period, spawnerList) {
        this.elapsed = 0;
        this.period = period;
        this.spawnerList = spawnerList;
    }
    reset() {
        this.elapsed = 0;
        this.spawnerList.forEach(spawner => spawner.reset());
    }
    update() {
        this.elapsed += (deltaTime / 1000);
        if (this.elapsed >= this.period)
            return false;
        this.spawnerList.forEach(spawner => spawner.update());
        return true;
    }
}
export default class Wave {
    constructor(onSpawn) {
        this.currentPhase = 0;
        this.power = 0;
        this.state = WaveState.Running;
        this.nextWaveTimer = 0;
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
    reset() {
        this.state = WaveState.Running;
        this.currentPhase = 0;
        this.phaseList.forEach(phase => phase.reset());
    }
    startNextWave() {
        this.state = WaveState.Resetting;
        this.nextWaveTimer = 0;
    }
    update() {
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
                this.nextWaveTimer += (deltaTime / 1000);
                if (this.nextWaveTimer >= NEXT_WAVE_DELAY) {
                    ++this.power;
                    this.reset();
                }
                break;
            }
        }
    }
}
//# sourceMappingURL=wave.js.map
/* Tiny synthesized game sounds via WebAudio. No audio files, no
   licensing. Nothing plays unless the user turns sound on.      */

type Kind = 'click' | 'unlock' | 'on' | 'wrong' | 'complete' | 'notify'

class Sfx {
  enabled = false
  private ctx: AudioContext | null = null

  private ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || (window as any).webkitAudioContext
      if (AC) this.ctx = new AC()
    }
    return this.ctx
  }

  play(kind: Kind) {
    if (!this.enabled) return
    const ctx = this.ensure()
    if (!ctx) return
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    const t = ctx.currentTime
    const notes: Array<[number, number, OscillatorType, number]> =
      kind === 'unlock'
        ? [
            [523, 0, 'square', 0.1],
            [659, 0.09, 'square', 0.1],
            [784, 0.18, 'square', 0.16],
          ]
        : kind === 'complete'
          ? [
              [392, 0, 'square', 0.1],
              [523, 0.1, 'square', 0.1],
              [659, 0.2, 'square', 0.1],
              [784, 0.3, 'square', 0.22],
            ]
          : kind === 'wrong'
            ? [
                [220, 0, 'sawtooth', 0.12],
                [174, 0.1, 'sawtooth', 0.16],
              ]
            : kind === 'on'
              ? [[196, 0, 'sawtooth', 0.18]]
              : kind === 'notify'
                ? [
                    [880, 0, 'sine', 0.08],
                    [1174, 0.08, 'sine', 0.12],
                  ]
                : [[660, 0, 'square', 0.05]]

    notes.forEach(([freq, delay, type, dur]) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = type
      o.frequency.value = freq
      g.gain.setValueAtTime(0.055, t + delay)
      g.gain.exponentialRampToValueAtTime(0.0001, t + delay + dur)
      o.connect(g)
      g.connect(ctx.destination)
      o.start(t + delay)
      o.stop(t + delay + dur + 0.02)
    })
  }
}

export const sfx = new Sfx()

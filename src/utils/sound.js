// Web Audio API context
let audioCtx = null

export const playThock = () => {
  if (typeof window === 'undefined') return

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }

  // Resume context if suspended (browser auto-play policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }

  const t = audioCtx.currentTime

  // Oscillator for the deep body of the thock
  const osc = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()
  
  osc.type = 'sine'
  
  // Frequency envelope: quick drop
  osc.frequency.setValueAtTime(120, t)
  osc.frequency.exponentialRampToValueAtTime(40, t + 0.05)
  
  // Amplitude envelope: quick decay
  gainNode.gain.setValueAtTime(0, t)
  gainNode.gain.linearRampToValueAtTime(0.5, t + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.1)

  osc.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  
  osc.start(t)
  osc.stop(t + 0.1)

  // Add a tiny noise burst for the sharp click texture
  const bufferSize = audioCtx.sampleRate * 0.05 // 50ms
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }
  
  const noiseSource = audioCtx.createBufferSource()
  noiseSource.buffer = buffer
  
  // Filter for the noise to make it dull/thocky
  const filter = audioCtx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1000
  
  const noiseGain = audioCtx.createGain()
  noiseGain.gain.setValueAtTime(0, t)
  noiseGain.gain.linearRampToValueAtTime(0.1, t + 0.005)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05)
  
  noiseSource.connect(filter)
  filter.connect(noiseGain)
  noiseGain.connect(audioCtx.destination)
  
  noiseSource.start(t)
}

// Global click listener to attach the sound to specific tags
export const initClickSounds = () => {
  if (typeof window === 'undefined') return

  const soundElements = ['a', 'button']

  const handleGlobalClick = (e) => {
    // Check if clicked element or its parent is a button or anchor
    const target = e.target.closest(soundElements.join(', ') + ', .clickable')
    if (target) {
      playThock()
    }
  }

  document.addEventListener('mousedown', handleGlobalClick)

  return () => {
    document.removeEventListener('mousedown', handleGlobalClick)
  }
}

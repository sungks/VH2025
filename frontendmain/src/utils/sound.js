export function playSound(src, volume = 0.5) {
  const audio = new Audio(src);
  audio.volume = volume
  audio.play().catch(e => console.warn("Sound error:", e));
}

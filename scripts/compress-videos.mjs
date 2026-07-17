// One-off utility: compress the gallery videos for web delivery.
// - caps height at 720p (no upscaling of smaller clips)
// - H.264 CRF 28, faststart for progressive playback
// - normalizes loudness so clips aren't jarringly loud
// Outputs to _compressed/ next to the originals; originals are left untouched
// until we explicitly swap them in.
import ffmpegStatic from 'ffmpeg-static'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'

const ffmpeg = ffmpegStatic
const dir = 'public/images/gallery/videos'
const outDir = `${dir}/_compressed`
fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mp4'))
for (const f of files) {
  const input = `${dir}/${f}`
  const output = `${outDir}/${f}`
  console.log(`\nCompressing ${f} ...`)
  execFileSync(
    ffmpeg,
    [
      '-i', input,
      '-vf', "scale=-2:'min(720,ih)'",
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '28',
      '-pix_fmt', 'yuv420p',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11',
      '-movflags', '+faststart',
      '-y', output,
    ],
    { stdio: ['ignore', 'ignore', 'inherit'] }
  )
  const before = fs.statSync(input).size / 1048576
  const after = fs.statSync(output).size / 1048576
  console.log(`  ${before.toFixed(0)}MB -> ${after.toFixed(1)}MB`)
}
console.log('\nDone.')

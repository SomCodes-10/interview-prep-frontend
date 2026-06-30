import React, { useState, useEffect, useRef } from 'react'
import '../style/witty-loader.scss'

// ── Category-specific jokes & headings ───────────────────────────────────────
const LOADER_CONFIG = {
  dashboard: {
    heading: 'Loading your',
    gradientWord: 'dashboard',
    eta: '⏱ Fetching your latest data...',
    lines: [
      "Waking up the database servers... they stayed up late watching Reels. 🛌",
      "Fetching your progress. Don't worry, your secrets are safe with our AI... mostly. 🤫",
      "Counting all those interview reports you've aced... impressive stack! 📚",
      "Dusting off your dashboard widgets... they missed you! ✨",
      "Syncing your achievements across the multiverse... almost there! 🌌",
      "Loading personalized insights... our AI is doing extra reps today. 💪",
    ],
  },
  interview: {
    heading: 'Crafting your personalized',
    gradientWord: 'career blueprint',
    eta: '⏱ This usually takes ~30 seconds',
    lines: [
      "Assembling a tough but fair AI interviewer... translating 'Tell me about yourself' into 5 languages. 🤖",
      "Calibrating the behavioral analysis matrix. Sit straight! 📐",
      "Our AI models are experiencing unusually high traffic... they're working overtime, grab a coffee! ☕",
      "Teaching the AI to read between the lines of your resume... it's a quick learner! 📄",
      "Comparing your skills against 10,000+ job profiles... this is the fun part! 🎯",
      "Almost there — the AI is double-checking its homework before submitting... 📝",
    ],
  },
  report: {
    heading: 'Generating your',
    gradientWord: 'performance analysis',
    eta: '⏱ Crunching the numbers...',
    lines: [
      "Crunching your performance metrics... making sure you look like a tech lead. 📈",
      "Injecting extra corporate buzzwords into your analysis... please wait! 🚀",
      "Cross-referencing your answers with 500+ winning interview strategies... 🧪",
      "Our AI is writing your performance summary... in a very flattering font. ✍️",
      "Analyzing behavioral patterns... don't worry, we won't share with your manager. 🤐",
      "Polishing every data point until it sparkles... almost done! 💎",
    ],
  },
  resume: {
    heading: 'Polishing your resume to',
    gradientWord: 'absolute perfection',
    eta: '📄 Your PDF will download automatically',
    lines: [
      "Formatting your path to success... fixing margins so HR doesn't lose their mind. 🤞",
      "Hiding the fact that you binge-watched a whole season instead of upskilling... processing...",
      "Adding extra corporate buzzwords to impress the recruiters... please wait! 📈",
      "Our servers are currently heavy lifting your achievements. Grab a sip of water! 💧",
      "Aligning your bullet points to pixel-perfection... almost done! ✨",
      "Sprinkling some ✨ magic dust ✨ on your work experience section...",
    ],
  },
}

const TIMEOUT_MS = 60000

// ── Component ────────────────────────────────────────────────────────────────
/**
 * @param {Object} props
 * @param {'dashboard'|'interview'|'report'|'resume'} props.type - Category of loader
 * @param {boolean} props.loading - Whether the loader is active
 * @param {Function} [props.onTimeout] - Called when 60s timeout fires
 * @param {Function} [props.onRetry] - Called when user clicks "Try Again"
 * @param {'fullscreen'|'overlay'} [props.variant] - 'fullscreen' replaces page, 'overlay' floats on top
 */
const WittyLoader = ({ type = 'dashboard', loading, onTimeout, onRetry, variant = 'fullscreen' }) => {
  const config = LOADER_CONFIG[type] || LOADER_CONFIG.dashboard
  const [subtitleIdx, setSubtitleIdx] = useState(0)
  const [isTimeout, setIsTimeout] = useState(false)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)

  // Cycle subtitles while loading
  useEffect(() => {
    if (!loading) {
      setIsTimeout(false)
      return
    }

    setSubtitleIdx(0)

    intervalRef.current = setInterval(() => {
      setSubtitleIdx(prev => (prev + 1) % config.lines.length)
    }, 4000)

    // Start 60s timeout
    timeoutRef.current = setTimeout(() => {
      setIsTimeout(true)
      if (onTimeout) onTimeout()
    }, TIMEOUT_MS)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [loading])

  const handleRetry = () => {
    setIsTimeout(false)
    if (onRetry) onRetry()
  }

  if (!loading && !isTimeout) return null

  const wrapperClass = variant === 'overlay' ? 'wl-overlay' : 'wl-fullscreen'

  // ── Timeout state ──
  if (isTimeout) {
    return (
      <div className={wrapperClass}>
        <div className='wl-card wl-card--timeout'>
          <span className='wl-timeout-icon'>🌋</span>
          <h1 className='wl-heading'>
            Oops! Our AI servers are <span className='wl-gradient'>heavily overloaded</span> right now.
          </h1>
          <p className='wl-subtitle'>
            Please try again after a few moments. We're scaling up to handle the demand!
          </p>
          <button className='wl-retry-btn' onClick={handleRetry}>↻ Try Again</button>
        </div>
      </div>
    )
  }

  // ── Loading state ──
  return (
    <div className={wrapperClass}>
      <div className='wl-card'>
        {/* Spinner */}
        <div className='wl-spinner'>
          <div className='wl-spinner__ring' />
          <span className='wl-spinner__icon'>✦</span>
        </div>

        {/* Heading */}
        <h1 className='wl-heading'>
          {config.heading} <span className='wl-gradient'>{config.gradientWord}</span>...
        </h1>

        {/* Progress bar */}
        <div className='wl-progress'>
          <div className='wl-progress__bar' />
        </div>

        {/* Cycling subtitle */}
        <p className='wl-subtitle' key={subtitleIdx}>
          {config.lines[subtitleIdx]}
        </p>

        {/* ETA */}
        <span className='wl-eta'>{config.eta}</span>
      </div>
    </div>
  )
}

export default WittyLoader

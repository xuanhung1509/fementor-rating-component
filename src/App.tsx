import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import useMeasure from 'react-use-measure'
import iconStar from './assets/icon-star.svg'
import illustrationThankYou from './assets/illustration-thank-you.svg'
import notificationSound from './assets/notification-sound.mp3'
import { useLocalStorage } from './hooks/useLocalStorage'
import { classnames, sleep } from './utils'

const audio = new Audio(notificationSound)

const Spinner = () => (
  <svg
    className="h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

const ResizablePanel = ({ children }: { children: React.ReactNode }) => {
  const [ref, { height }] = useMeasure()

  return (
    <AnimatePresence>
      <motion.div
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: height || 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
      >
        <div ref={ref}>{children}</div>
      </motion.div>
    </AnimatePresence>
  )
}

const PreSelectContent = ({
  onSubmit,
}: {
  onSubmit: (rating: number) => void
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [rating, setRating] = useState(0)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsProcessing(true)
    await onSubmit(rating)
    setIsProcessing(false)
    audio.play()
  }

  return (
    <form className="flex flex-col items-start gap-6" onSubmit={handleSubmit}>
      <div className="rounded-full bg-slate-600 p-3">
        <img src={iconStar} alt="star" width={17} height={16} />
      </div>
      <div>
        <h2 className="text-2xl">How did we do?</h2>
        <p className="font-sm mt-2 text-slate-300">
          Please let us know how we did with your support request. All feedback
          is appreciated to help us improve our offering!
        </p>
      </div>
      <ul className="mx-auto mt-2 grid w-full grid-cols-5 gap-4 px-2">
        {[...Array(5).keys()].map((n) => (
          <div
            key={n}
            className="relative h-10 w-10 overflow-hidden rounded-full bg-white sm:h-12 sm:w-12"
          >
            <input
              type="radio"
              name="rating"
              id={String(n + 1)}
              className="peer pointer-events-none absolute inset-0 opacity-0"
              checked={n + 1 === rating}
              value={n + 1}
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <label
              htmlFor={String(n + 1)}
              className="absolute inset-0 flex cursor-pointer items-center justify-center text-black transition-colors peer-checked:bg-slate-500 peer-checked:text-white peer-hover:bg-orange-500 peer-hover:text-white"
            >
              {n + 1}
            </label>
          </div>
        ))}
      </ul>
      <button
        className={classnames(
          'w-full rounded-full bg-orange-500 px-6 py-3 uppercase text-white transition-colors',
          !isProcessing && 'hover:bg-white hover:text-orange-500'
        )}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner />
            <small>Processing...</small>
          </div>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  )
}

const PostSelectContent = ({ rating }: { rating: number }) => (
  <div className="flex flex-col items-center gap-6">
    <img
      src={illustrationThankYou}
      alt="thank you illustration"
      width={162}
      height={108}
    />
    <p className="rounded-full bg-slate-600 px-4 py-2 text-sm text-orange-500">
      You selected {rating} of 5
    </p>
    <div className="text-center">
      <h2 className="text-2xl">Thank you!</h2>
      <p className="font-sm mt-2 text-slate-400">
        We appreciate you taking the time to give a rating. If you ever need
        more support, don’t hesitate to get in touch!
      </p>
    </div>
  </div>
)

const RatingCard = () => {
  const [rating, setRating] = useLocalStorage('rating', 0)
  const hasUserRated = rating > 0

  const onSubmit = async (internalRating: number) => {
    await sleep(1000)
    setRating(internalRating)
  }

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800 px-8 py-12 text-white shadow-lg">
      <ResizablePanel>
        {hasUserRated ? (
          <PostSelectContent rating={rating} />
        ) : (
          <PreSelectContent onSubmit={onSubmit} />
        )}
      </ResizablePanel>
    </div>
  )
}

const App = () => {
  return (
    <div className="mx-auto my-8 max-w-sm px-4">
      <RatingCard />
    </div>
  )
}

export default App

import { useState } from 'react'
import iconStar from './assets/icon-star.svg'
import illustrationThankYou from './assets/illustration-thank-you.svg'
import { useLocalStorage } from './hooks/useLocalStorage'

const PreSelectContent = ({ submit }: { submit: (rating: number) => void }) => {
  const [rating, setRating] = useState(0)

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="rounded-full bg-slate-600 p-3">
        <img src={iconStar} alt="star" />
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
        className="w-full rounded-full bg-orange-500 px-6 py-3 uppercase text-white transition-colors hover:bg-white hover:text-orange-500"
        onClick={() => {
          if (rating > 0) {
            submit(rating)
          }
        }}
      >
        Submit
      </button>
    </div>
  )
}

const PostSelectContent = ({ rating }: { rating: number }) => (
  <div className="flex flex-col items-center gap-6">
    <img src={illustrationThankYou} alt="thank you illustration" />
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

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800 px-8 py-12 text-white shadow-lg">
      {hasUserRated ? (
        <PostSelectContent rating={rating} />
      ) : (
        <PreSelectContent submit={setRating} />
      )}
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

import iconStar from './assets/icon-star.svg'

const RatingCard = () => {
  return (
    <div className="rounded-2xl bg-slate-700 px-8 py-6 text-white shadow-lg">
      <div className="flex flex-col items-start gap-6">
        <div className="rounded-full bg-slate-600 p-3">
          <img src={iconStar} alt="star" />
        </div>
        <div>
          <h2 className="text-2xl">How did we do?</h2>
          <p className="font-sm mt-2 text-slate-300">
            Please let us know how we did with your support request. All
            feedback is appreciated to help us improve our offering!
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
        <button className="w-full rounded-full bg-orange-500 px-6 py-3 uppercase text-white transition-colors hover:bg-white hover:text-orange-500">
          Submit
        </button>
      </div>
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

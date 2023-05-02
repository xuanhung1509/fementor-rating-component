import { RatingCard } from './components/RatingCard'

const App = () => {
  return (
    <div className="h-screen w-full bg-slate-900">
      <div className="flex min-h-[75vh] items-center justify-center">
        <div className="mx-auto max-w-sm px-4 py-8">
          <RatingCard />
        </div>
      </div>
    </div>
  )
}

export default App

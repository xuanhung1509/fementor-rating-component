import { AnimatePresence, motion } from 'framer-motion'
import useMeasure from 'react-use-measure'

export const ResizablePanel = ({ children }: { children: React.ReactNode }) => {
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

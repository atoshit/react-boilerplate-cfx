import { motion } from 'framer-motion'

export default function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="space-y-4">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">Card A</div>
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">Card B</div>
      </div>
    </motion.div>
  )
}


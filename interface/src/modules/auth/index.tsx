import { motion } from 'framer-motion'

export default function Auth() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="space-y-4">
      <div className="text-lg font-semibold">Auth</div>
      <div className="space-y-2">
        <input className="w-full rounded-md bg-slate-700 text-white px-3 py-2 outline-none" placeholder="Username" />
        <input type="password" className="w-full rounded-md bg-slate-700 text-white px-3 py-2 outline-none" placeholder="Password" />
        <button className="px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-500 transition">Login</button>
      </div>
    </motion.div>
  )
}


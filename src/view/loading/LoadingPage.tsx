import { AnimatePresence, motion } from 'framer-motion'
import '../../styles/loading/LoadingPage.css'

export default function LoadingPage() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="loading-page col-12 d-flex justify-content-center align-items-center flex-column">
                <div className='loading-icon col-10' />

            </motion.div>
        </AnimatePresence>



    )
}
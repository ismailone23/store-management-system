import { motion } from 'framer-motion'
export default function Template() {
    return (
        <motion.div transition={{ ease: "easeIn" }}>
            <div className='w-full absolute top-0 left-0 h-1 bg-blue-500' />
        </motion.div>
    )
}

'use client'

import { motion, useScroll, useSpring } from "framer-motion";

function ProgressBar() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 80,
		damping: 30,
		restDelta: 0.001
	});

	// TODO zindex
	return (
		<motion.div className="fixed top-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-300 via-purple-300 to-green-300 transform origin-left z-[99999] shadow-sm;
}" style={{ scaleX }} />
	)
}

export default ProgressBar
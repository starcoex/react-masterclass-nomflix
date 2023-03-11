import { motion, useCycle } from 'framer-motion'
import React, { useRef } from 'react'
import styled from 'styled-components'
import useDimensions from "use-react-dimensions";



const BackGround = styled(motion.div)`
background-color:white;
color:white;
`
const IconStyles = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex: 40px 0;
  margin-right: 20px;
`
const TextStyles = styled.div`
  border-radius: 5px;
  width: 200px;
  height: 20px;
  flex: 1;
`
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
}
const ulVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};
const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export default function Account() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : " closed"}
      // custom={height}
      ref={containerRef}
    >
      <BackGround variants={sidebar}></BackGround>
      <motion.ul variants={ulVariants}>{
        itemIds.map((i) => (<motion.li
          variants={liVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconStyles className="icon-placeholder" style={{ border: `2px solid ${itemIds[i]}` }} />
          <TextStyles className="text-placeholder" style={{ border: `2px solid ${itemIds[i]}` }} />
        </motion.li>
        ))
      }</motion.ul>
    </motion.nav>
  )
}
const itemIds = [0, 1, 2, 3, 4];
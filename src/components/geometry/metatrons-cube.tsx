import { motion } from "motion/react";

const CIRCLES = {
  center: "M 262.5 241.5 A 47 47 0 1 1  168.5,241.5 A 47 47 0 1 1  262.5 241.5 z",
  secondRingTop: "M 262.5 147.5 A 47 47 0 1 1  168.5,147.5 A 47 47 0 1 1  262.5 147.5 z",
  secondRingTopLeft: "M 180.5 194.5 A 47 47 0 1 1  86.5,194.5 A 47 47 0 1 1  180.5 194.5 z",
  secondRingBottomLeft: "M 180.5 288.5 A 47 47 0 1 1  86.5,288.5 A 47 47 0 1 1  180.5 288.5 z",
  secondRingBottom: "M 262.5 335.5 A 47 47 0 1 1  168.5,335.5 A 47 47 0 1 1  262.5 335.5 z",
  secondRingBottomRight: "M 344.5 288.5 A 47 47 0 1 1  250.5,288.5 A 47 47 0 1 1  344.5 288.5 z",
  secondRingTopRight: "M 344.5 194.5 A 47 47 0 1 1  250.5,194.5 A 47 47 0 1 1  344.5 194.5 z",
  outerRingTop: "M 262.5 53.5 A 47 47 0 1 1  168.5,53.5 A 47 47 0 1 1  262.5 53.5 z",
  outerRingTopLeft: "M 98.5 147.5 A 47 47 0 1 1  4.5,147.5 A 47 47 0 1 1  98.5 147.5 z",
  outerRingBottomLeft: "M 98.5 335.5 A 47 47 0 1 1  4.5,335.5 A 47 47 0 1 1  98.5 335.5 z",
  outerRingBottom: "M 262.5 429.5 A 47 47 0 1 1  168.5,429.5 A 47 47 0 1 1  262.5 429.5 z",
  outerRingBottomRight: "M 426.5 335.5 A 47 47 0 1 1  332.5,335.5 A 47 47 0 1 1  426.5 335.5 z",
  outerRingTopRight: "M 426.5 147.5 A 47 47 0 1 1  332.5,147.5 A 47 47 0 1 1  426.5 147.5 z",
};


export function MetatronsCube() {
  const renderCircles = () => Object.entries(CIRCLES).map(([key, d], index) => (
    <motion.path
      key={key}
      stroke="var(--amber-a10)"
      d={d}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: .250, delay: index * .075 }
      }}
      style={{ fill:"none" }}
      id={`${key}-circle`}
    />
  ));

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      className="MetatronsCube"
      id="svg2"
      viewBox="0 0 435 482"
    >
    <motion.g id="layer1">
      <motion.g id="circles">
        {renderCircles()}
      </motion.g>
      <motion.g id="lines">
        <motion.path
          stroke="var(--amber-a10)"
          d="M 215.5,53.5 L 379.5,147.5 L 379.5,335.5 L 215.5,429.5 L 51.5,335.5 L 51.5,147.5 L 215.5,53.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="outer-hexagon-outline"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 215.5,53.5 L 51.5,335.5 L 379.5,335.5 L 215.5,53.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="outer-upward-triangle"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 51.5,147.5 L 215.5,429.5 L 379.5,147.5 L 51.5,147.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="outer-downward-triangle"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 215.5,147.5 L 133.5,194.5 L 133.5,288.5 L 215.5,335.5 L 297.5,288.5 L 297.5,194.5 L 215.5,147.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="inner-hexagon-outline"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 51.5,147.5 L 379.5,335.5"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="diagonal-left"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 51.5,335.5 L 379.5,147.5"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="diagonal-right"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 215.5,53.5 L 215.5,429.5"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="vertical-line"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 133.5,288.5 L 215.5,53.5 L 297.5,288.5 L 133.5,288.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="path2894"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 215.5,429.5 L 133.5,194.5 L 297.5,194.5 L 215.5,429.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="path2896"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 51.5,335.5 L 215.5,147.5 L 297.5,288.5 L 51.5,335.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="path2904"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 379.5,335.5 L 215.5,147.5 L 133.5,288.5 L 379.5,335.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="path2906"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 379.5,147.5 L 133.5,194.5 L 215.5,335.5 L 379.5,147.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="path2908"
        />
        <motion.path
          stroke="var(--amber-a10)"
          d="M 51.5,147.5 L 215.5,335.5 L 297.5,194.5 L 51.5,147.5 z "
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
            transition: { duration: 2.22, delay: 1 }
          }}
          style={{ fill:"none" }}
          id="path2910"
        />
      </motion.g>
    </motion.g>
  </motion.svg>
  );
}

export default MetatronsCube;

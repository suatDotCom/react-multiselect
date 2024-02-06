import React, { FC } from "react";
import styles from "./skeleton.module.css";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width: number | string;
  height: number | string;
}

const Skeleton: FC<SkeletonProps> = ({ width, height, style, children }) => {
  return (
    <div className={styles.skeleton} style={{ ...style, width, height }}>
      {children}
    </div>
  );
};

export default Skeleton;

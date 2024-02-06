import React from "react";
import Skeleton from "../../skeleton/skeleton";

const MultiSelectItemLoading = () => {
  return (
    <div className="d-flex flex-row gap-1 items-center">
      <Skeleton width={35} height={25} />
      <Skeleton width={70} height={50} style={{borderRadius: 5}}/>
      <div className="d-flex flex-col w-full gap-1">
        <Skeleton width={200} height={10} />
        <Skeleton width={100} height={10} />
      </div>
    </div>
  );
};

export default MultiSelectItemLoading;

"use client";

import dynamic from "next/dynamic";

const FacilitiesMap = dynamic(
  () => import("./facilitiesMapClient"),
  { ssr: false }
);

export default FacilitiesMap;

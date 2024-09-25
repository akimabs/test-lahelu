import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { memo } from "react";
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
    <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

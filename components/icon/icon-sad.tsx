import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
import { memo } from "react";
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01" />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

import * as React from "react";
import Svg, { SvgProps, Path, Circle, Rect } from "react-native-svg";
import { memo } from "react";
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
    <Path d="M18 22H4a2 2 0 0 1-2-2V6" />
    <Path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" />
    <Circle cx={12} cy={8} r={2} />
    <Rect width={16} height={16} x={6} y={2} rx={2} />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

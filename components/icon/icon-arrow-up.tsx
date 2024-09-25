import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { memo } from "react";
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
    <Path d="M9 18v-6H5l7-7 7 7h-4v6H9z" />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;

import { VictoryLabel, VictoryPortal } from "victory";

function CustomLabel(props) {
  return (
    <VictoryPortal>
      <VictoryLabel
        {...props}
        labelPlacement="vertical"
        verticalAnchor="middle"
        textAnchor="middle"
        backgroundStyle={{ fill: "#7f63efcc", opacity: 0.9 }}
        backgroundPadding={4}
        style={{
          fill: "#fff",
          fontFamily: "'Helvetica Neue', 'Helvetica', sans-serif",
          fontSize: 10,
        }}
      />
    </VictoryPortal>
  );
}

export default CustomLabel;

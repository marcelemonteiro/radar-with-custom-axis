import { VictoryLabel } from "victory";

function CustomAxisLabel(props) {
  return (
    <VictoryLabel
      {...props}
      textAnchor={(datum) => {
        if (datum.x > 240 && datum.x <= 250) return "middle";
        if (datum.x > 250) return "start";
        return "end";
      }}
      verticalAnchor="start"
      style={{
        fontFamily: "'Helvetica Neue', 'Helvetica', sans-serif",
        fontSize: 9.5,
      }}
      dy={-5}
    />
  );
}

export default CustomAxisLabel;

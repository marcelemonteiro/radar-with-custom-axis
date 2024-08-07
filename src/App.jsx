import { useEffect, useState } from "react";
import { VictoryChart, VictoryPolarAxis, VictoryArea } from "victory";
import CustomLabel from "./CustomLabel";
import { radarData } from "./transformMock";
import CustomAxisLabel from "./CustomAxisLabel";

const ALL_CATEGORIES = Object.keys(radarData);

function App() {
  const [categories, setCategories] = useState(Object.keys(radarData));
  const [userData, setUserData] = useState(null);
  const [comparativeData, setComparativeData] = useState(null);

  useEffect(() => {
    const uData = generateUserData(ALL_CATEGORIES, radarData);
    setUserData(uData);

    const cData = generateCompData(ALL_CATEGORIES, radarData);
    setComparativeData(cData);
  }, []);

  function generateUserData(categories, rawData) {
    return categories.map((cat) => ({
      x: cat,
      y: rawData[cat].percentage * 100,
      label: rawData[cat].number,
    }));
  }

  function generateCompData(categories, rawData) {
    return categories.map((cat) => {
      const { average, maxValue } = rawData[cat];
      return { x: cat, y: 100 * (average / (maxValue || 1)) };
    });
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "60vw",
          height: "75vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {categories.length < 3 && (
          <p style={{ padding: 50 }}>
            Por favor, selecione ao menos 3 categorias ao lado para criar o
            radar.{" "}
          </p>
        )}
        {categories.length > 2 && userData && (
          <VictoryChart width={500} polar>
            {categories.map((d) => {
              return (
                <VictoryPolarAxis
                  dependentAxis
                  key={d}
                  label={d}
                  labelPlacement="vertical"
                  axisLabelComponent={<CustomAxisLabel />}
                  style={{
                    tickLabels: { fill: "none" },
                    axisLabel: {
                      padding: 15,
                    },

                    axis: { stroke: "none" },

                    grid: {
                      stroke: "grey",
                      strokeWidth: 0.25,
                      opacity: 0.1,
                      strokeDasharray: "10, 5",
                    },
                  }}
                  axisValue={d}
                  // domainPadding={10}
                />
              );
            })}

            <VictoryPolarAxis
              labelPlacement="parallel"
              tickFormat={() => ""}
              style={{
                axis: { stroke: "none" },
                grid: {
                  stroke: "grey",
                  opacity: 0.9,
                },
              }}
            />

            <VictoryArea
              data={userData.filter((data) => categories.includes(data.x))}
              style={{
                data: {
                  fill: "#7f63efaa",
                  stroke: "#7f63ef",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                },
                labels: {
                  fill: "none",
                },
              }}
            />

            {/* Gráfico responsável apenas por renderizar as labels do gráfico da média (roxo) */}
            <VictoryArea
              data={userData
                .filter((data) => categories.includes(data.x))
                .map(({ y, x, label }) => ({ y: y * 0.85, x, label }))}
              labelComponent={<CustomLabel />}
              style={{
                data: {
                  fill: "transparent",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                },
              }}
            />

            <VictoryArea
              data={comparativeData.filter((data) =>
                categories.includes(data.x)
              )}
              style={{
                data: {
                  fill: "#c43a31aa",
                  stroke: "#c43a31",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                },
              }}
              animate={{ duration: 2000, onLoad: { duration: 100 } }}
            />
          </VictoryChart>
        )}
      </div>

      <div>
        <p>Customizar categorias: </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newCat = [];
            ALL_CATEGORIES.forEach((cat) => {
              const element = e.target.elements[cat];
              if (element.checked) {
                newCat.push(element.value);
              }
            });

            if (newCat.length < 3) {
              return alert("Selecione pelo menos 3 eixos.");
            }

            return setCategories(newCat);
          }}
        >
          {ALL_CATEGORIES.map((cat) => (
            <div key={cat}>
              <input
                id={cat}
                type="checkbox"
                defaultChecked={categories.includes(cat)}
                value={cat}
                onChange={(e) => {
                  console.log(e.target);

                  if (e.target.checked) {
                    setCategories((prev) => [...prev, e.target.value]);
                  } else {
                    const filter = categories.filter(
                      (cat) => cat != e.target.value
                    );
                    setCategories(filter);
                  }
                }}
              />
              {cat}{" "}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
  VictoryArea,
} from "victory";
import { data1, compdata1, data2, compdata2, data3, compdata3 } from "./data";

const ALL_CATEGORIES = ["cat", "dog", "bird", "frog", "fish", "cow"];

function App() {
  const [currentData, setCurrentData] = useState(data1);
  const [comparativeData, setComparativeData] = useState(compdata1);
  const [selectedItem, setSelectedItem] = useState("data1");
  // ou um radar padrão, já com categorias
  const [categories, setCategories] = useState(["cat", "dog", "bird"]);
  // ou não exibe o radar e solicita as categorias
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (selectedItem === "data1") {
      setCurrentData(data1);
      setComparativeData(compdata1);
    }

    if (selectedItem === "data2") {
      setCurrentData(data2);
      setComparativeData(compdata2);
    }

    if (selectedItem === "data3") {
      setCurrentData(data3);
      setComparativeData(compdata3);
    }
  }, [selectedItem]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ height: "70vh" }}>
        {categories.length == 0 && (
          <p>
            Por favor, selecione ao menos 3 categorias ao lado para criar o
            radar.{" "}
          </p>
        )}
        {categories.length > 0 && (
          <VictoryChart polar theme={VictoryTheme.material}>
            {categories.map((d) => {
              return (
                <VictoryPolarAxis
                  dependentAxis
                  key={d}
                  label={d}
                  labelPlacement="perpendicular"
                  style={{ tickLabels: { fill: "none" } }}
                  axisValue={d}
                />
              );
            })}
            <VictoryArea
              data={currentData.filter((data) => categories.includes(data.x))}
              style={{
                data: {
                  fill: "#7f63efcc",
                  stroke: "#7f63ef",
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
                  fill: "#c43a3199",
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
        <label htmlFor="options" style={{ marginRight: "1rem" }}>
          Selecione um item:
        </label>
        <select
          id="options"
          name="options"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="data1">data1</option>
          <option value="data2">data2</option>
          <option value="data3">data3</option>
        </select>

        <p>Você selecionou: {selectedItem}</p>

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
              />
              {cat}{" "}
            </div>
          ))}
          <button style={{ marginTop: "1rem" }}>Atualizar</button>
        </form>
      </div>
    </div>
  );
}

export default App;

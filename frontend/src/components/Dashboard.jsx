import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/items") // sua rota FastAPI, ex: GET /items
      .then((res) => setData(res.data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  return (
    <div>
      <h2>Dados da API</h2>
      <table border="1" cellPadding="5" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "2rem" }}>Visualização</h2>
      <Chart data={data} />
    </div>
  );
}

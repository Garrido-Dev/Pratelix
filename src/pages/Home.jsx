import useStock from "../hooks/useStock";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

// Registrar todos os elementos necessários para múltiplos tipos de gráficos
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const { items } = useStock();

  // --- 1. CÁLCULO DAS MÉTRICAS GLOBAIS ---
  const totalProdutosDiferentes = items.length;
  const totalItensFisicos = items.reduce((acc, item) => acc + Number(item.quantity), 0);
  const valorTotalEstoque = items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0);

  // --- 2. CONFIGURAÇÃO DOS DADOS DOS GRÁFICOS ---
  const itemNames = items.map((item) => item.name);

  // Gráfico 1: Quantidade por Item (Barras)
  const qtdData = {
    labels: itemNames,
    datasets: [
      {
        label: "Qtd em Estoque",
        data: items.map((item) => item.quantity),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderRadius: 4,
      },
    ],
  };

  // Gráfico 2: Valor Unitário por Item (Linha)
  const precoData = {
    labels: itemNames,
    datasets: [
      {
        label: "Preço Unitário (R$)",
        data: items.map((item) => item.price),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Gráfico 3: Valor Total da Mercadoria por Item (Rosca)
  const totalMercadoriaData = {
    labels: itemNames,
    datasets: [
      {
        label: "Total Acumulado (R$)",
        data: items.map((item) => item.quantity * item.price),
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(201, 203, 207, 0.7)",
        ],
      },
    ],
  };

  // Opções compartilhadas para deixar os gráficos compactos e responsivos
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false, // Permite controlar a altura pelo CSS do container
    plugins: {
      legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } },
    },
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f8f9fa", fontFamily: "'Segoe UI', Roboto, sans-serif", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "24px", color: "#212529", fontWeight: "600" }}>Dashboard de Inventário</h1>

      {/* --- SEÇÃO 1: CARDS INDICADORES --- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", border: "1px solid #e9ecef" }}>
          <span style={{ fontSize: "14px", color: "#6c757d", fontWeight: "500", textTransform: "uppercase" }}>Produtos Cadastrados</span>
          <h2 style={{ fontSize: "28px", margin: "8px 0 0 0", color: "#212529" }}>{totalProdutosDiferentes}</h2>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", border: "1px solid #e9ecef" }}>
          <span style={{ fontSize: "14px", color: "#6c757d", fontWeight: "500", textTransform: "uppercase" }}>Quantidade Total</span>
          <h2 style={{ fontSize: "28px", margin: "8px 0 0 0", color: "#212529" }}>{totalItensFisicos} unidades</h2>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", border: "1px solid #e9ecef" }}>
          <span style={{ fontSize: "14px", color: "#6c757d", fontWeight: "500", textTransform: "uppercase" }}>Patrimônio Líquido</span>
          <h2 style={{ fontSize: "28px", margin: "8px 0 0 0", color: "#198754" }}>R$ {valorTotalEstoque.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</h2>
        </div>

      </div>

      {/* --- SEÇÃO 2: GRID DE GRÁFICOS MENORES --- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px" }}>
        
        {/* Card Gráfico 1 */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", border: "1px solid #e9ecef" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#495057" }}>Volumetria (Quantidade por Item)</h3>
          <div style={{ height: "220px" }}>
            <Bar data={qtdData} options={commonOptions} />
          </div>
        </div>

        {/* Card Gráfico 2 */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", border: "1px solid #e9ecef" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#495057" }}>Preço Unitário por Produto</h3>
          <div style={{ height: "220px" }}>
            <Line data={precoData} options={commonOptions} />
          </div>
        </div>

        {/* Card Gráfico 3 */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", border: "1px solid #e9ecef" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#495057" }}>Distribuição do Valor de Mercadoria</h3>
          <div style={{ height: "220px" }}>
            <Doughnut data={totalMercadoriaData} options={commonOptions} />
          </div>
        </div>

      </div>
    </div>
  );
}

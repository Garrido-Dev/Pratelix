import { useState } from "react";
import useStock from "../hooks/useStock";
import { CATEGORIES } from "../entities/StockItem";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const { items } = useStock();
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // --- FILTRAGEM DOS ITENS ---
  const filteredItems = items.filter((item) => {
    if (selectedCategory === "Todas") return true;
    return item.category === selectedCategory;
  });

  // --- CÁLCULO DAS MÉTRICAS GLOBAIS ---
  const totalProdutosDiferentes = filteredItems.length;
  const totalItensFisicos = filteredItems.reduce((acc, item) => acc + Number(item.quantity), 0);
  const valorTotalEstoque = filteredItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0);

  // --- CÁLCULO DO VALOR TOTAL POR CATEGORIA ---
  const valoresPorCategoria = CATEGORIES.reduce((acc, cat) => {
    const totalDaCategoria = items
      .filter((item) => item.category === cat)
      .reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price)), 0);
    
    acc[cat] = totalDaCategoria;
    return acc;
  }, {});

  // --- CONFIGURAÇÃO DOS DADOS DOS GRÁFICOS ---
  const itemNames = filteredItems.map((item) => item.name);

  const qtdData = {
    labels: itemNames,
    datasets: [
      {
        label: "Qtd em Estoque",
        data: filteredItems.map((item) => item.quantity),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  const precoData = {
    labels: itemNames,
    datasets: [
      {
        label: "Preço Unitário (R$)",
        data: filteredItems.map((item) => item.price),
        backgroundColor: "rgba(255, 159, 64, 0.7)",
      },
    ],
  };

  const categoriaFinanceiroData = {
    labels: CATEGORIES,
    datasets: [
      {
        label: "Total por Categoria (R$)",
        data: CATEGORIES.map((cat) => valoresPorCategoria[cat]),
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } },
    },
  };

  return (
    // 1. Removido o 'fluid' para conter o conteúdo no centro em telas grandes
    // 2. Adicionado 'mx-auto' e uma largura máxima de segurança para telas UltraWide
    <Container className="py-5 bg-light min-vh-100 mx-auto" style={{ maxWidth: "1300px" }}>
      
      {/* Cabeçalho com Alinhamento */}
      <Row className="mb-5 align-items-center border-bottom pb-4">
        <Col xs={12} md={7}>
          <h1 className="text-dark fw-bold m-0" style={{ letterSpacing: "-0.5px" }}>Dashboard de Inventário</h1>
          <p className="text-muted m-0 mt-1">Acompanhe as métricas globais e o status do seu estoque.</p>
        </Col>
        <Col xs={12} md={5} className="mt-3 mt-md-0 d-flex justify-content-md-end">
          <Form.Group className="d-flex align-items-center bg-white p-2 px-3 rounded-pill shadow-sm border" style={{ minWidth: "290px" }}>
            <Form.Label className="me-2 mb-0 fw-semibold text-secondary text-nowrap small text-uppercase">Filtrar:</Form.Label>
            <Form.Select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border-0 bg-transparent fw-bold text-primary p-0 m-0 style-select"
              style={{ focusOutline: "none", boxShadow: "none", cursor: "pointer" }}
            >
              <option value="Todas">Todas as Categorias</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* --- SEÇÃO 1: CARDS INDICADORES GERAIS --- */}
      <Row className="g-4 mb-5">
        <Col xs={12} sm={4}>
          <Card className="border-0 shadow-sm p-4 bg-body rounded-4 transition-card" style={{ borderLeft: "5px solid #0d6efd" }}>
            <Card.Subtitle className="text-uppercase text-muted fw-bold small mb-2" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>Produtos ({selectedCategory})</Card.Subtitle>
            <Card.Title className="fs-1 fw-bold text-dark mb-0">{totalProdutosDiferentes}</Card.Title>
          </Card>
        </Col>

        <Col xs={12} sm={4}>
          <Card className="border-0 shadow-sm p-4 bg-body rounded-4 transition-card" style={{ borderLeft: "5px solid #6c757d" }}>
            <Card.Subtitle className="text-uppercase text-muted fw-bold small mb-2" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>Quantidade ({selectedCategory})</Card.Subtitle>
            <Card.Title className="fs-1 fw-bold text-dark mb-0">{totalItensFisicos} <span className="fs-5 text-muted fw-normal">unidades</span></Card.Title>
          </Card>
        </Col>

        <Col xs={12} sm={4}>
          <Card className="border-0 shadow-sm p-4 bg-body rounded-4 transition-card" style={{ borderLeft: "5px solid #198754" }}>
            <Card.Subtitle className="text-uppercase text-muted fw-bold small mb-2" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>Valor em Estoque ({selectedCategory})</Card.Subtitle>
            <Card.Title className="fs-1 fw-bold text-success mb-0">
              R$ {valorTotalEstoque.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </Card.Title>
          </Card>
        </Col>
      </Row>

      {/* --- SEÇÃO 2: GRID DE GRÁFICOS --- */}
      <Row className="g-4">
        {/* Gráfico 1 */}
        <Col xs={12} md={6} lg={4}>
          <Card className="border-0 shadow-sm p-4 bg-body rounded-4">
            <Card.Title className="fs-6 text-dark mb-4 fw-bold text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Quantidades por Item</Card.Title>
            <div style={{ height: "240px" }}>
              <Bar data={qtdData} options={commonOptions} />
            </div>
          </Card>
        </Col>

        {/* Gráfico 2 */}
        <Col xs={12} md={6} lg={4}>
          <Card className="border-0 shadow-sm p-4 bg-body rounded-4">
            <Card.Title className="fs-6 text-dark mb-4 fw-bold text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Preço Unitário por Produto</Card.Title>
            <div style={{ height: "240px" }}>
              <Bar data={precoData} options={commonOptions} />
            </div>
          </Card>
        </Col>

        {/* Gráfico 3 */}
        <Col xs={12} md={6} lg={4}>
          <Card className="border-0 shadow-sm p-4 bg-body rounded-4">
            <Card.Title className="fs-6 text-dark mb-4 fw-bold text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Valor Acumulado por Categoria</Card.Title>
            <div style={{ height: "240px" }}>
              <Doughnut data={categoriaFinanceiroData} options={commonOptions} />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

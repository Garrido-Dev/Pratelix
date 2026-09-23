import { useState } from "react";
import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";
import { CATEGORIES } from "../entities/StockItem";
import { Container, Row, Col, Card, Form, Table, Badge } from "react-bootstrap";
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

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "Todas") return true;
    return item.category === selectedCategory;
  });

  const recentItems = [...filteredItems].slice(-5).reverse();
  const lowStockItems = filteredItems.filter((item) => Number(item.quantity) < 10);

  const totalProdutosDiferentes = filteredItems.length;
  const totalItensFisicos = filteredItems.reduce((acc, item) => acc + Number(item.quantity), 0);
  const valorTotalEstoque = filteredItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0);

  const valoresPorCategoria = CATEGORIES.reduce((acc, cat) => {
    const totalDaCategoria = items
      .filter((item) => item.category === cat)
      .reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price)), 0);
    
    acc[cat] = totalDaCategoria;
    return acc;
  }, {});

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
    <div className="bg-light min-vh-100 w-100">
      <Container className="py-5" style={{ maxWidth: "1280px" }}>
        
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

        <Row className="g-4 mb-5">
          <Col xs={12} md={6} lg={4}>
            <Card className="border-0 shadow-sm p-4 bg-body rounded-4">
              <Card.Title className="fs-6 text-dark mb-4 fw-bold text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Quantidades por Item</Card.Title>
              <div style={{ height: "240px" }}>
                <Bar data={qtdData} options={commonOptions} />
              </div>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card className="border-0 shadow-sm p-4 bg-body rounded-4">
              <Card.Title className="fs-6 text-dark mb-4 fw-bold text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Preço Unitário por Produto</Card.Title>
              <div style={{ height: "240px" }}>
                <Bar data={precoData} options={commonOptions} />
              </div>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card className="border-0 shadow-sm p-4 bg-body rounded-4">
              <Card.Title className="fs-6 text-dark mb-4 fw-bold text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Valor Acumulado por Categoria</Card.Title>
              <div style={{ height: "240px" }}>
                <Doughnut data={categoriaFinanceiroData} options={commonOptions} />
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col xs={12} lg={6}>
            <Card className="border-0 shadow-sm p-4 bg-body rounded-4 h-100">
              <Card.Title className="fs-6 text-dark mb-3 fw-bold text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
                Itens Recentes
              </Card.Title>
              <div className="table-responsive">
                <Table hover align="middle" className="m-0 border-0">
                  <thead>
                    <tr>
                      <th className="border-0 text-muted small text-uppercase">Nome</th>
                      <th className="border-0 text-muted small text-uppercase text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentItems.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="text-center text-muted py-3">Nenhum item recente.</td>
                      </tr>
                    ) : (
                      recentItems.map((item) => (
                        <tr key={item.id}>
                          <td className="fw-semibold text-secondary">{item.name}</td>
                          <td className="text-center">
                            <Link to={`/items/${item.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                              Ver
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>

          <Col xs={12} lg={6}>
            <Card className="border-0 shadow-sm p-4 bg-body rounded-4 h-100">
              <Card.Title className="fs-6 text-dark mb-3 fw-bold text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
                Itens Acabando (&lt; 10 unid.)
              </Card.Title>
              <div className="table-responsive">
                <Table hover align="middle" className="m-0 border-0">
                  <thead>
                    <tr>
                      <th className="border-0 text-muted small text-uppercase">Nome</th>
                      <th className="border-0 text-muted small text-uppercase text-center">Qtd</th>
                      <th className="border-0 text-muted small text-uppercase text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center text-muted py-3">Nenhum item com estoque baixo.</td>
                      </tr>
                    ) : (
                      lowStockItems.map((item) => (
                        <tr key={item.id}>
                          <td className="fw-semibold text-secondary">{item.name}</td>
                          <td className="text-center">
                            <Badge bg="danger" pill>{item.quantity} unid.</Badge>
                          </td>
                          <td className="text-center">
                            <Link to={`/items/${item.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                              Ver
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
}
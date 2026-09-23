import { Link, useParams } from "react-router-dom";
import useStock from "/src/hooks/useStock.js";
import DeleteButton from '/src/components/DeleteButton.jsx';
import { Container, Card, Row, Col, Badge } from "react-bootstrap";

export default function ShowItems() {
  const { getItem } = useStock();
  const { id } = useParams();
  const item = getItem(id);

  if (!item) {
    return (
      <Container className="text-center py-5">
        <h2 className="text-danger fw-bold">Item não encontrado!</h2>
        <Link to="/items" className="btn btn-primary mt-3">Voltar para os Itens</Link>
      </Container>
    );
  }

  // Tratamento seguro para formatação de valores e datas
  const precoFormatado = Number(item.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  const dataCriacao = item.createdAt instanceof Date ? item.createdAt.toLocaleDateString("pt-BR") : new Date(item.createdAt).toLocaleDateString("pt-BR");
  const dataAtualizacao = item.updatedAt instanceof Date ? item.updatedAt.toLocaleDateString("pt-BR") : new Date(item.updatedAt).toLocaleDateString("pt-BR");

  return (
    <Container className="py-4">
      {/* Botão de Voltar */}
      <Link to="/items" className="btn btn-link text-decoration-none p-0 mb-3 text-secondaryfw-semibold">
        ← Voltar para a lista
      </Link>

      <Card className="border-0 shadow-sm p-4 bg-body rounded-3">
        {/* Cabeçalho do Card */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center border-bottom pb-3 mb-4">
          <div className="mb-3 mb-sm-0">
            <h2 className="fw-bold text-dark m-0 d-inline-block me-2">{item.name}</h2>
            <Badge bg-primary className="align-middle px-2.5 py-1.5 fs-7">{item.category}</Badge>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/items/${item.id}/update`} className="btn btn-outline-secondary px-3 fw-semibold">
              Editar
            </Link>
            <DeleteButton itemId={item.id} itemName={item.name} />
          </div>
        </div>

        {/* Linha de Indicadores rápidos */}
        <Row className="g-3 mb-4">
          <Col xs={12} sm={6}>
            <div className="bg-light p-3 rounded-3 border">
              <span className="text-muted small fw-semibold text-uppercase d-block mb-1">Quantidade em Estoque</span>
              <span className="fs-3 fw-bold text-dark">{item.quantity}</span> <span className="text-muted">unidades</span>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="bg-light p-3 rounded-3 border">
              <span className="text-muted small fw-semibold text-uppercase d-block mb-1">Preço Unitário</span>
              <span className="fs-3 fw-bold text-success">R$ {precoFormatado}</span>
            </div>
          </Col>
        </Row>

        {/* Bloco de Descrição */}
        <div className="mb-4">
          <h5 className="text-secondary fw-semibold small text-uppercase mb-2">Descrição do Produto</h5>
          <p className="text-dark bg-light p-3 rounded-3 border-start border-primary border-3 m-0" style={{ whiteSpace: "pre-line" }}>
            {item.description || "Nenhuma descrição informada para este item."}
          </p>
        </div>

        {/* Datas no Rodapé */}
        <div className="d-flex flex-column flex-sm-row justify-content-between text-muted border-top pt-3 fs-7">
          <p className="mb-1 mb-sm-0">
            <span className="fw-semibold">Cadastrado em:</span> {dataCriacao}
          </p>
          <p className="mb-0">
            <span className="fw-semibold">Última atualização:</span> {dataAtualizacao}
          </p>
        </div>
      </Card>
    </Container>
  );
}

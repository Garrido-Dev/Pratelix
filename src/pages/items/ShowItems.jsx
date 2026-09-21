import { Link, useParams } from "react-router-dom"
import useStock from "/src/hooks/useStock.js"
import DeleteButton from '/src/components/DeleteButton.jsx'
import styles from './ShowItem.module.css'

export default function ShowItems() {
  const { getItem } = useStock()
  const { id } = useParams()

  const item = getItem(id)

  if (!item) {
    return <h2>Item não encontrado!</h2>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{item.name}</h2>
        <div className={styles.actions}>
          <Link to={`/items/${item.id}/update`} className={styles.btnEdit}>
            Atualizar
          </Link>
          <DeleteButton itemId={item.id} itemName={item.name} />
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          Categoria: {item.category}
        </div>
        <div className={styles.statCard}>
          Quantidade em estoque: {item.quantity}
        </div>
        <div className={styles.statCard}>
          Preço: R$ {item.price}
        </div>
      </div>
        Descrição: 
      <p className={styles.description}>{item.description}</p>

      <div className={styles.datesRow}>
        <p>Cadastrado em: {item.createdAt.toDateString()}</p>
        <p>Atualizado em: {item.updatedAt.toDateString()}</p>
      </div>
    </div>
  )
}
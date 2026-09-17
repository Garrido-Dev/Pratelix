import { Link } from 'react-router-dom'
import useStock from '../hooks/useStock'
import styles from './ItemsTable.module.css'

export default function ItemsTable() {
  const { items } = useStock()

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Em Estoque</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity} unid.</td>
              <td>{item.category}</td>
              <td>
                <div className={styles.actions}>
                  <Link to={`/items/${item.id}`} className={styles.btnView}>
                    Ver
                  </Link>
                  <Link to={`/items/${item.id}/update`} className={styles.btnEdit}>
                    Atualizar
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
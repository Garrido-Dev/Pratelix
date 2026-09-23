import { useState } from 'react'
import { Link } from 'react-router-dom'
import useStock from '../hooks/useStock'
import styles from './ItemsTable.module.css'
import DeleteButton from './DeleteButton'

export default function ItemsTable() {
  const { items } = useStock()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const categories = [...new Set(items.map((item) => item.category))]


  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === '' || item.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className={styles.tableContainer}>
  
      <div className={styles.filterBar}>
        <input
          type="text"
          placeholder="Buscar produto pelo nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.categorySelect}
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredItems.length === 0 ? (
        <p className={styles.emptyMessage}>Nenhum item encontrado.</p>
      ) : (
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
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td data-label="ID">{item.id}</td>
                <td data-label="Nome">{item.name}</td>
                <td data-label="Em Estoque">{item.quantity} unid.</td>
                <td data-label="Categoria">{item.category}</td>
                <td data-label="Ações">
                  <div className={styles.actions}>
                    <Link to={`/items/${item.id}`} className={styles.btnView}>
                      Ver
                    </Link>
                    <Link to={`/items/${item.id}/update`} className={styles.btnEdit}>
                      Atualizar
                    </Link>
                    <DeleteButton itemName={item.name} itemId={item.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
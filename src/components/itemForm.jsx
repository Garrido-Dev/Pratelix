import { useRef, useState } from "react"
import styles from "./ItemForm.module.css"
import StockItem, { CATEGORIES } from '../entities/StockItem.js'
import useStock from "../hooks/useStock.js"


export default function ItemForm({ itemToUpdate }) {
  const defaultItem = {
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category: ""
  }

  const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem)
  const {addItem} = useStock()
  const inputRef = useRef(null)

  const handleChange = (ev) => {
    const { name, value } = ev.target

    setItem(currentState => ({
      ...currentState,
      [name]: value
    }))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    try{
      const validItem = new StockItem(item)
      addItem(validItem)
      setItem(defaultItem)
      alert("item cadastrado com sucesso!")
      inputRef.current.focus()
    }catch(err){
      console.log(err.messager)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            ref={inputRef}
            value={item.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            min={0}
            step={1}
            value={item.quantity}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min={0.00}
            step={0.01}
            value={item.price}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            required
            value={item.category}
            onChange={handleChange}
          >
            <option disabled value="">Selecione uma categoria...</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
          value={item.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" className={styles.btnSubmit}>
        {itemToUpdate ? "Atualizar" : "Salvar"}
      </button>
    </form>
  )
}
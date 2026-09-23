import useStock from '../hooks/useStock'
import styles from './DeleteButton.module.css'
import { useNavigate } from 'react-router-dom'

export default function DeleteButton({itemName, itemId}) {

    const {deleteItem} = useStock()
    const navigate = useNavigate()

    const handleDelete = ()=>{
    if(confirm(`Tem certeza que deseja excluir o item ${itemName}?`)){
        deleteItem(itemId)
        navigate("/items")
    }
}

  return (
    <button 
    type="button" 
    className={styles.btnDelete} 
    onClick={handleDelete}>
      Excluir
    </button>
  )
}
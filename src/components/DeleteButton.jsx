import useStock from '../hooks/useStock'
import styles from './DeleteButton.module.css'


export default function DeleteButton({itemName, itemId}) {

    const {deleteItem} = useStock()


    const handleDelete = ()=>{
    if(confirm(`Tem certeza que deseja excluir o item ${itemName}?`)){
        deleteItem(itemId)
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
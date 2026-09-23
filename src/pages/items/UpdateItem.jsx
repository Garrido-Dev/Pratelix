import { useParams } from 'react-router-dom'
import useStock from '../../hooks/useStock'
import ItemForm from '/src/components/ItemForm.jsx'

export default function UpdateItem(){
    const {getItem} = useStock()
    const {id} = useParams()
    const item = getItem(id)

    return(
        <>
        <h2>Atualizar Item</h2>
            <ItemForm key={item.id}
             itemToUpdate={item}
            />
        </>
    )
}
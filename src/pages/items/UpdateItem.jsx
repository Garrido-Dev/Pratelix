import { useParams } from "react-router-dom"
import ItemForm from "../../components/itemForm"
import useStock from "../../hooks/useStock.js"

export default function UpdateItem() {
    const { id } = useParams()
    const { getItem } = useStock()
    const itemToUpdate = getItem(id)

    if (!itemToUpdate) {
        return <h2>Item não encontrado!</h2>
    }

    return <ItemForm key={itemToUpdate.id} itemToUpdate={itemToUpdate} />
}

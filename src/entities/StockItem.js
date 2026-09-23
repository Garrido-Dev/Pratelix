export const CATEGORIES = [
  "Jogos",
  "Livros",
  "Brinquedos",
  "Acessórios"
]

export default class StockItem {
    constructor ({name, description, quantity, price, category}){
        this.id = Math.floor(Math.random()*10000000)
        this.name = name
        this.description = description
        this.quantity = +quantity
        this.price = +price
        this.category = category
        this.createdAt = createdAt ? new Date(createdAt) : new Date()
        this.updatedAt = updatedAt ? new Date(updatedAt) : new Date()
        this.#validate()
    }

    #validate(){
        const validName = typeof this.name === "string"
        const validDescription = typeof this.description === "string"
        const validQuantity = typeof this.quantity === "number" && Number.isInteger(this.quantity)
        const validPrice = typeof this.price === "number"
        const ValidCategory = CATEGORIES.includes(this.category)

        if(
            !(
                validName &&
                validDescription &&
                validQuantity &&
                validPrice &&
                ValidCategory
            )

        ){
            throw new Error("Invalid item!")

        }
    }
}
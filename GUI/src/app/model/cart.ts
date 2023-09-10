export class Cart{
    private id: String
    private quantity: String

    public getId(): String {
        return this.id;
    }

    public setId(id: String): void {
        this.id = id;
    }

    public getQuantity(): String {
        return this.quantity;
    }

    public setQuantity(quantity: String): void {
        this.quantity = quantity;
    }

}
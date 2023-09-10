export class Book{
    private id: any;
    private name: string;
    private description: string
    private genre: string;
    private stockcount: string
    private price: string
    private author: string
    private publisher: string
    private tags: string
    private image: string
    private imagepath: string


    public getId(): any {
        return this.id;
    }

    public setId(id: any): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getGenre(): string {
        return this.genre;
    }

    public setGenre(genre: string): void {
        this.genre = genre;
    }

    public getStockcount(): string {
        return this.stockcount;
    }

    public setStockcount(stockcount: string): void {
        this.stockcount = stockcount;
    }

    public getPrice(): string {
        return this.price;
    }

    public setPrice(price: string): void {
        this.price = price;
    }

    public getAuthor(): string {
        return this.author;
    }

    public setAuthor(author: string): void {
        this.author = author;
    }

    public getPublisher(): string {
        return this.publisher;
    }

    public setPublisher(publisher: string): void {
        this.publisher = publisher;
    }

    public getTags(): string {
        return this.tags;
    }

    public setTags(tags: string): void {
        this.tags = tags;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public getImagepath(): string {
        return this.imagepath;
    }

    public setImagepath(imagepath: string): void {
        this.imagepath = imagepath;
    }



}
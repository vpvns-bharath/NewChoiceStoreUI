export class Product
{
  public ProdId:string;
  public Title:string;
  public Category:string;
  public Price:string;
  public Description:string;
  public Discount:string;
  public Rating:string;
  public Stock:string;
  public Image:string;
  public Type:string;

  constructor(prodId:string,title:string,category:string,price:string,description:string,discount:string,
    rating:string,stock:string,image:string,type:string){
      this.ProdId=prodId;
      this.Title=title;
      this.Category=category;
      this.Price=price;
      this.Description=description;
      this.Discount=discount;
      this.Rating=rating;
      this.Stock=stock;
      this.Image=image;
      this.Type=type;
  }

}

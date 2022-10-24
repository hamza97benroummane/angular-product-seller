export class Purchase {
    id: number | undefined;
    userId: number | undefined;
    productId: number | undefined;
    price: number | undefined;
    purchaseTime: Date = new Date();
  
    constructor(userId?: number, productId?: number, price?: number) {
      this.userId = userId;
      this.productId = productId;
      this.price = price;
    }
  }
  
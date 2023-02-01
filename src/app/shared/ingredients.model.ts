export class Ingredient {
  static push() {
    throw new Error('Method not implemented.');
  }
    public name: string ;
    public amount: number ;
  push: any; 

    constructor(name: string , amount : number){
        this.name = name ;
        this.amount = amount ;
    } 
    }
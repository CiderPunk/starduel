import { IGame, IClient } from "../interfaces";

export abstract class Game implements IGame{

  public constructor (protected owner:IClient){ }

  public abstract draw(): void
  public abstract update(dt: number): void 


  
}

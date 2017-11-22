import { Game } from "./game";
import { IGame, IClient } from "../interfaces";
import { Ship } from "../ents/ship";
export class DuelGame extends Game implements IGame{
  public constructor(owner:IClient){
    super(owner);

    Ship.load(owner.resman)


  }

  
  public draw(): void {
    throw new Error("Method not implemented.");
  }
  public update(dt: number): void {
    throw new Error("Method not implemented.");
  }





}
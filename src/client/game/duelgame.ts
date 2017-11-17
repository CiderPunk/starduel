import { Game } from "./game";
import { IGame } from "../interfaces";
export class DuelGame extends Game implements IGame{


  
  public draw(): void {
    throw new Error("Method not implemented.");
  }
  public update(dt: number): void {
    throw new Error("Method not implemented.");
  }





}
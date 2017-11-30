import { Game } from "./game";
import { IGame, IClient } from "../interfaces";
import { Ship } from "../ents/ship";
import { Star } from "../ents/star";
import { Player } from "../ents/player";
export class DuelGame extends Game implements IGame{
  
  
  player:Player
  

  public ready(): void {
    this.player = new Player(this)

  }



  public constructor(owner:IClient){
    super(owner);
    owner.load(Ship.loader())
    owner.load(Star.loader())
  }

  public update(dt: number): void {
   // throw new Error("Method not implemented.");
  }





}
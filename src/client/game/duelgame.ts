import { Game } from "./game";
import { IGame, IClient } from "../interfaces";
import { Ship } from "../ents/ship";
import { Star } from "../ents/star";
import { Player } from "../ents/player";
export class DuelGame extends Game implements IGame{
  
  
  player:Player
  star:Star  

  public ready(): void {
    this.player = new Player(this, 200,200)
    this.star  = new Star(this, 100, 1)

  }



  public constructor(owner:IClient){
    super(owner);
    owner.load(Ship.loader())
    owner.load(Star.loader())
  }

  public update(dt: number): void {
    this.player.update(dt)
    this.star.update(dt)

  }





}
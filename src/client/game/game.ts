import { IGame, IClient } from "../interfaces";
import { Transform } from "stream";

export abstract class Game implements IGame{
  public readonly stage:PIXI.Container

  public constructor (protected owner:IClient){ 
    this.stage = new PIXI.Container()
  }
  /**
   * draws the game screen
   */
  public draw():void{
    this.owner.renderer.render(this.stage)
  }
  /**
   * a game tick
   * @param dt time since last tick
   */
  public abstract update(dt: number): void 
  /**
   * Called when all resources are loaded
   */
  public abstract ready():void

  
}

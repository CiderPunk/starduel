import { IGame } from "../interfaces";
import { V2 } from "../math/v2";

export abstract class PhysicsObj{
  protected readonly  owner:IGame
  public readonly pos = new V2(0,0)
  public readonly vel = new V2(0,0)

  public constructor (owner:IGame){
    this.owner = owner
  }


  public update(dt:number){
    this.pos.addScale(this.vel, dt)
  }
}
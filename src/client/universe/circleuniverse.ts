import { IUniverse, IDuelGame, IPhysicsEntity } from "../interfaces";
import { PhysicsObj } from "../ents/physicsobj";

export abstract class CircleUniverse implements IUniverse{

  shape:PIXI.Graphics
  protected radius2:number

  public constructor(protected owner:IDuelGame, protected radius:number){
    this.shape = new PIXI.Graphics()
    this.shape.lineStyle(1, 0xfffffff, 0.4)
    this.shape.drawCircle(0,0,radius)
    owner.stage.addChild(this.shape)
    this.radius2 = this.radius * this.radius
  }

  public abstract testBounds(ent:IPhysicsEntity):void

}



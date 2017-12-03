import { PhysicsObj } from "./physicsobj";
import {  ILoader, IGame, IShip, IDuelGame, IWeapon } from "../interfaces";
import { V2 } from "../math/v2";

export namespace ShipConstants{
  export const DefaultMass = 50
  export const TurnRate = 5
  export const ThrustForce = 1000

}


export abstract class Ship extends PhysicsObj implements IShip{

  protected weapon:IWeapon
  protected static tex:PIXI.Texture
  protected readonly sprite:PIXI.Sprite
  protected dir:number
  
  public readonly accel = new V2(0,0)
  /**
   * Normalized vector of facing
   */
  //public readonly facing = new V2(0,0)
 
  public static loader():ILoader {
    return{
      preload: (loader)=>{
        loader.add("ship10","/assets/gfx/ships/1.png")
      },
      postload: (loader)=>{
        this.tex = loader.resources["ship10"].texture
      }
    }
  }

  public constructor(owner:IDuelGame,x:number = 0, y:number = 0){
    super(owner, ShipConstants.DefaultMass)
    this.sprite = new PIXI.Sprite(Ship.tex)
    this.sprite.anchor.set(0.5,0.5)
    this.sprite.scale.x = 0.5
    this.sprite.scale.y = 0.5
    this.owner.stage.addChild(this.sprite)
    this.pos.set(x,y)
    this.dir = 0
  }

  public update(dt:number){
    //this.facing.setAngle(this.dir, 1)
    this.sprite.rotation = this.dir
    this.sprite.position.set(this.pos.x, this.pos.y)
    this.calculateGravity()
    super.update(dt)


  } 



}
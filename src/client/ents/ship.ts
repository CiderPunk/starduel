import { PhysicsObj } from "./physicsobj"
import {  ILoader, IGame, IShip, IDuelGame, IWeapon, ISpritePosition } from "../interfaces"
import { V2 } from "../math/v2"
import  "../extensions"

export namespace ShipConstants{
  export const DefaultRadius =18
  export const DefaultMass = 50
  export const TurnRate = 5
  export const ThrustForce = 1000
  export const Scale = 0.3
  export const TrailLength = 20
  export const TrailRate = 0.05
}

export abstract class Ship extends PhysicsObj implements IShip{

  protected weapon:IWeapon
  protected static tex:PIXI.Texture
  protected readonly sprite:PIXI.Sprite
  protected readonly trail:Array<PIXI.Sprite>
  protected trailHead:number = 0
  protected dir:number
  private debugShape:PIXI.Graphics
  private trailTimer = 0

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
    super(owner, ShipConstants.DefaultMass, ShipConstants.DefaultRadius)
    //trail
    this.trail = new Array<PIXI.Sprite>()
    let alpha = 0.5
    for(let i = 0; i < ShipConstants.TrailLength; i++){
      let trailItem = new PIXI.Sprite(Ship.tex)
      trailItem.anchor.set(0.5,0.5)
      trailItem.scale.y = trailItem.scale.x = ShipConstants.Scale
      trailItem.alpha = (alpha *= 0.8)
      this.owner.background.addChild(trailItem)
      this.trail.push(trailItem)
  
    }
    this.trail = this.trail.reverse()
    //main image
    this.sprite = new PIXI.Sprite(Ship.tex)
    this.sprite.anchor.set(0.5,0.5)
    this.sprite.scale.y = this.sprite.scale.x = ShipConstants.Scale
    this.owner.foreground.addChild(this.sprite)
    //debug shape
    this.debugShape = new PIXI.Graphics()
    this.debugShape.lineStyle(1, 0xfffffff, 0.4)
    this.debugShape.drawCircle(0,0,this.radius)
    this.owner.decoration.addChild(this.debugShape)
    this.pos.set(x,y)
    this.dir = 0
  }

  
  public update(dt:number){

    this.trailTimer += dt
    if (this.trailTimer > ShipConstants.TrailRate){
      this.trailTimer -=  ShipConstants.TrailRate
      //update trail
      let tail = this.trail[ShipConstants.TrailLength-1]
      tail.position.setV2(this.pos)
      tail.rotation = this.dir
      this.trail.reduce((prev, cur)=>{
        if (prev != null){
          prev.position.set( cur.position.x, cur.position.y)
          prev.rotation = cur.rotation
        }
        return cur
      }, null)
    }



    this.calculateGravity()
    super.update(dt)

    this.sprite.rotation = this.dir
    this.sprite.position.setV2(this.pos)
    this.debugShape.position.setV2(this.pos)

  } 



}
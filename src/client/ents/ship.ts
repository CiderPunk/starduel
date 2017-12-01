import { PhysicsObj } from "./physicsobj";
import {  ILoader, IGame } from "../interfaces";
export abstract class Ship extends PhysicsObj{

  protected static tex:PIXI.Texture
  protected readonly sprite:PIXI.Sprite
  public dir:number
 
  public static loader():ILoader {
    return{
      preload: (loader)=>{
        loader.add("ship10","/assets/gfx/ships/10.png")
      },
      postload: (loader)=>{
        this.tex = loader.resources["ship10"].texture
      }
    }
  }

  public constructor(owner:IGame,x:number = 0, y:number = 0){
    super(owner)
    this.sprite = new PIXI.Sprite(Ship.tex)
    this.sprite.scale.x = 0.5
    this.sprite.scale.y = 0.5
    this.sprite.anchor.set(0.5,0.5)
    this.sprite.x = 200
    this.sprite.y = 200
    this.owner.stage.addChild(this.sprite)
    this.pos.set(x,y)
    this.dir = 0
  }

  public update(dt:number){
    super.update(dt)
    this.sprite.position.set(this.pos.x, this.pos.y)
  } 



}
import { PhysicsObj } from "./physicsobj";
import {  ILoader, IGame } from "../interfaces";
export abstract class Ship extends PhysicsObj{

  protected static tex:PIXI.Texture
  protected readonly sprite:PIXI.Sprite
 
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

  public constructor(owner:IGame){
    super(owner)
    this.sprite = new PIXI.Sprite(Ship.tex)
    
    this.owner.stage.addChild(this.sprite)
    this.sprite.x = 200
    this.sprite.y = 200

  }

  public draw():void{



  }


  



}
import { PhysicsObj } from "./physicsobj";
import { ILoader, IGame } from "../interfaces";

export class Star extends PhysicsObj{
  
  shape:PIXI.Graphics;

  public static loader():ILoader {
    return{
      preload: (loader)=>{
      //  loader.add("ship10","/assets/gfx/ships/10.png")
      },
      postload: (loader)=>{
      //  this.tex = loader.resources["ship10"].texture
      }
    }
  }


  public constructor(owner:IGame, private radius:number, density:number){
    super(owner)
    this.shape = new PIXI.Graphics()
    this.shape.beginFill(0xfffffff)
    this.shape.drawCircle(0,0,radius)
    owner.stage.addChild(this.shape)

  }  



  public update(dt:number){
    super.update(dt)
    this.shape.position.set(this.pos.x, this.pos.y)
  }
}
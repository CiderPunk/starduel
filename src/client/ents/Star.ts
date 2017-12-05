import { PhysicsObj } from "./physicsobj";
import { ILoader, IGame, IDuelGame } from "../interfaces";import { V2 } from "../math/v2";


export class Star extends PhysicsObj{
  
  shape:PIXI.Graphics

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


  public constructor(owner:IDuelGame, radius:number, mass:number, start:V2, velocity:V2){
    //super(owner, density * 4/3 * (Math.PI * (radius ^ 3)))
    super(owner, mass, radius)
    this.shape = new PIXI.Graphics()
    this.shape.beginFill(0xfffffff)
    this.shape.drawCircle(0,0,radius)
    owner.stage.addChild(this.shape)
    this.pos.setV2(start)
    this.vel.setV2(velocity)
  }  



  public update(dt:number){
    this.calculateGravity()
    super.update(dt)
    this.shape.position.set(this.pos.x, this.pos.y)
  }
}
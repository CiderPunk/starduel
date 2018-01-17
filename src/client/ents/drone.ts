import { Ship } from "./ship"
import {  ILoader, IGame, IShip, IDuelGame, IWeapon, ISpritePosition } from "../interfaces"
import { V2 } from "../math/v2"
import  "../extensions"

export class Drone extends Ship{

  static tex:PIXI.Texture
  public static loader():ILoader {
    return{
      preload: (loader)=>{
        loader.add("ship10","/assets/gfx/ships/1b.png")
      },
      postload: (loader)=>{
        this.tex = loader.resources["ship10"].texture
      }
    }
  }

  public constructor(owner:IDuelGame,x:number, y:number, rot:number, vel:V2){
    super(owner,x,y, 0, vel, Drone.tex)
  }

   
  public update(dt:number){
    super.update(dt)
    this.dir = this.vel.getAngle() + 0.5 * Math.PI
  }
    
}
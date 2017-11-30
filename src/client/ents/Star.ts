import { PhysicsObj } from "./physicsobj";
import { ILoader, IGame } from "../interfaces";

export class Star extends PhysicsObj{
  
public constructor(owner:IGame){
  super(owner)
}
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

}
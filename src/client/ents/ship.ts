import { PhysicsObj } from "./physicsobj";
import { IResMan } from "../interfaces";
export class Ship extends PhysicsObj{

  static tex:PIXI.Texture

  public static load(loader:IResMan){
    loader.AddResources(["/assets/gfx/ships/10.png"], (res:PIXI.loaders.Resource)=>{
      this.tex = res["/assets/gfx/ships/10.png"].Texture
    });
  }

  



}
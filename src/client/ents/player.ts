import { Ship, ShipConstants } from "./ship"
import { IGame, IDuelGame, IWeapon, ILoader } from "../interfaces"
import { Command, ControlMan} from "../controlman"
import { Utils } from "../math/utils";
import { V2 } from "../math/v2";

namespace PlayerControls{
  
  export const PlayerLeft =  new Command("P1_TURN_LEFT","LEFT",37)
  export const PlayerRight = new Command("P1_TURN_RIGHT","RIGHT",39)
  export const PlayerThrust = new Command("P1_THRUST","THRUST", 38) 
  export const PlayerShoot = new Command("P1_SHOOT","SHOOT",32)
  export const PlayerCycle = new Command("P1_CYCLE","CYCLE",40)
  ControlMan.registerCommands([ PlayerLeft, PlayerRight, PlayerThrust, PlayerShoot, PlayerCycle]);
}

export class Player extends Ship{
  
  static tex:PIXI.Texture
 
  public static loader():ILoader {
    return{
      preload: (loader)=>{
        loader.add("ship1","/assets/gfx/ships/4.png")
      },
      postload: (loader)=>{
        this.tex = loader.resources["ship1"].texture
      }
    }
  }



  protected turn:number  = 0
  protected thrust:number = 0
  protected shoot = false
  protected timeToShoot = 0


  public constructor(owner:IDuelGame,x:number, y:number, vel:V2){
    super(owner,x,y,0, vel, Player.tex)
    //setup controls
    PlayerControls.PlayerThrust.Subscribe((active, name) =>{ this.thrust = active ? 1 : 0 })
    PlayerControls.PlayerLeft.Subscribe((active, name) =>{ 
      this.turn += active ? -1 : 1
      this.turn = Utils.unitize(this.turn)
     })
    PlayerControls.PlayerRight.Subscribe((active, name) =>{ 
      this.turn += active ? 1 : -1 
      this.turn = Utils.unitize(this.turn)
    })
    PlayerControls.PlayerShoot.Subscribe((active)=> {})
  }

  public update(dt:number){
    this.dir += dt * this.turn * ShipConstants.TurnRate
    this.force.setAngle(this.dir,  this.thrust * ShipConstants.ThrustForce)

    super.update(dt)


  } 


  

}
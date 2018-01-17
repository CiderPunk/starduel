import { IGame, IEntity, IPhysicsEntity, IDuelGame } from "../interfaces";
import { V2 } from "../math/v2";
import { Constants } from "../constants"

export abstract class PhysicsObj implements IPhysicsEntity{



  public static readonly attractionThreshold = 0.0001
  public readonly radius:number
  public readonly radius2:number
  public readonly mass: number
  protected readonly  owner:IDuelGame
  public readonly pos = new V2(0,0)
  public readonly vel = new V2(0,0)
  protected readonly force = new V2(0,0)


  public static skipCount = 0
  public static total = 0

  public constructor (owner:IDuelGame, mass:number, rad:number){
    this.owner = owner
    this.mass = mass
    this.radius = rad
    this.radius2 = rad * rad
  }

  public update(dt:number){
    this.vel.addScale(this.force, (1/this.mass) * dt)
    this.force.reset() // reset forces
    this.pos.addScale(this.vel, dt)
  }

  public abstract prepDraw():void

  static readonly dist:V2 = new V2(0,0);

  protected calculateGravity(){
    this.owner.largeBodies.map((other)=>{
      if (other!= this){
        PhysicsObj.dist.setV2(this.pos).sub(other.pos)
        let len2 = PhysicsObj.dist.len2()
        let attraction = Constants.GravityConstant *( (this.mass * other.mass) / len2)

        PhysicsObj.total++
        if (attraction > PhysicsObj.attractionThreshold){
          this.force.addScale(PhysicsObj.dist.norm(), -attraction)
        }
        else{
          PhysicsObj.skipCount++
        }
      }
    })
  }

}
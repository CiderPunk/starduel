import { CircleUniverse } from "./circleuniverse";
import { IPhysicsEntity, IDuelGame } from "../interfaces";
import { V2 } from "../math/v2";

export class BounceUniverse extends CircleUniverse{


  public constructor(protected owner:IDuelGame, protected radius:number, protected bounceDamping =  0.8){
    super(owner, radius)
  }


  private static temp = new V2(0,0)

  public testBounds(ent:IPhysicsEntity) {

    let dist = this.radius - ent.radius
    if (ent.pos.len2() + ent.radius2 > dist * dist){
      //we have a collision...maybe
      BounceUniverse.temp.setV2(ent.pos).norm()
      ent.pos.setV2(BounceUniverse.temp).scale(this.radius - ent.radius - 1)
      ent.vel.reflect(BounceUniverse.temp).scale(this.bounceDamping)
    }
  }

  
}



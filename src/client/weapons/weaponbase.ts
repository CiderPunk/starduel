import { IWeapon, IShip } from "../interfaces";

export abstract class WeaponBase implements IWeapon{
  
  protected timeToFire:number = 0
  protected cooldown = 20

  abstract fire(owner:IShip):void

  public update(dt:number, owner: IShip, firing: boolean) {
    this.timeToFire -= dt
    if (firing && this.timeToFire < 0 ){
      this.fire(owner)
      this.timeToFire += this.cooldown
    }
    
  }
}
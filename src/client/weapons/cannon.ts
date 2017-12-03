import { WeaponBase } from "./weaponbase";
import { IShip } from "../interfaces";

export class Cannon extends WeaponBase{
  fire(owner: IShip): void {
    throw new Error("Method not implemented.");
  }

}
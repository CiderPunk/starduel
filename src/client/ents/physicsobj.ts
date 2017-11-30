import { IGame } from "../interfaces";

export abstract class PhysicsObj{
  protected readonly  owner:IGame
  public constructor (owner:IGame){
    this.owner = owner

  }
}
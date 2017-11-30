import { Ship } from "./ship";
import { IGame } from "../interfaces";

export class Player extends Ship{

  public constructor(owner:IGame){
    super(owner)
  }



}
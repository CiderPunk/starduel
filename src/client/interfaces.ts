import { V2 } from "./math/v2";




export interface IGame{
  stage:PIXI.Container
  draw():void
  update(dt:number):void
  ready():void
}

export interface IDuelGame extends IGame{
  largeBodies:Array<IPhysicsEntity>
  ships:Array<IShip>
}

export interface IClient{

  renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer
  load(loader:ILoader):void
}

export type LoadCallback = (loader:PIXI.loaders.Loader)=>void

export interface ILoader{
  preload:(loader:PIXI.loaders.Loader)=>void;
  postload:(loader:PIXI.loaders.Loader)=>void;
}

export interface IEntity{
  update(dt:number):void
  pos:V2
  vel:V2
}

export interface IPhysicsEntity extends IEntity{
  mass:number
}

export interface IShip extends IPhysicsEntity{
 // facing:V2
}

export interface IWeapon{
  update(dt:number, owner:IShip, firing:boolean):void
}
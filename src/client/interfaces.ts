


export interface IGame{
  stage:PIXI.Container
  draw():void
  update(dt:number):void
  ready():void
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
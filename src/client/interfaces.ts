


export interface IGame{
  draw():void
  update(dt:number):void
}

export interface IClient{
  resman:IResMan;
  stage:PIXI.Container
  renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer
  //loader:PIXI.loaders.Loader
}


export type LoadCallback = (res:PIXI.loaders.Resource)=>void

export interface IResMan{
  isLoading:boolean
  AddResources(files:string[], callback:LoadCallback):void
  Load(cb:LoadCallback):void
}
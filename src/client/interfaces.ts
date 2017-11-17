export interface IGame{
  draw():void
  update(dt:number):void
}

export interface IClient{
  stage:PIXI.Container
  renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer
  loader:PIXI.loaders.Loader
}
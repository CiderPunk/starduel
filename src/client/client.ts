import * as PIXI from "pixi.js"
import { Common } from "../common/common"
import { IGame, IClient,  ILoader } from "./interfaces"
import { DuelGame } from "./game/duelgame"
import { ControlMan } from "./controlman"

export class Client implements IClient{

  public readonly renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer
  public readonly loader:PIXI.loaders.Loader
   game:IGame
  protected postLoad = new Array<(loader:PIXI.loaders.Loader)=>void>();

  public tickTime:number = 0
  public lastFrameTime:number = 0
  public readonly targetTickTime = 1000 / 120; //120 ticks per second..
  public tickCount = 0

  public constructor(){
    ControlMan.init();
    this.renderer = PIXI.autoDetectRenderer(1024,768)
    document.getElementById("content").appendChild(this.renderer.view)
    this.loader = new PIXI.loaders.Loader()
    this.game = new DuelGame(this)
    this.loader.load((loader:PIXI.loaders.Loader)=>{
      this.postLoad.forEach(postloader => {
        postloader(loader)
      })
      this.game.ready()
    })
    window.requestAnimationFrame((t:number)=>{ this.update(t) })
  
  }

  public load(loader:ILoader):void{
    loader.preload(this.loader);
    this.postLoad.push(loader.postload);
  }

  protected update(time:number):void{
    window.requestAnimationFrame((t:number)=>{ this.update(t) })
    if(this.loader.loading) return
    let delta = time - this.lastFrameTime
    this.lastFrameTime  = time
    if (delta > 500){
      //reset timers
      this.tickTime = time
      console.log("frames missed: " + delta) 
    }

    this.game.draw()

    while(this.tickTime < time){
      this.game.update(this.targetTickTime / 1000)   
      this.tickTime += this.targetTickTime
      this.tickCount++
    }

  }
}
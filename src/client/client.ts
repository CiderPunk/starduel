import * as PIXI from "pixi.js"
import { Common } from "../common/common"
import { IGame, IClient, IResMan } from "./interfaces";
import { DuelGame } from "./game/duelgame";
import { ResMan } from "./resman";

export class Client implements IClient{

  public readonly stage:PIXI.Container
  public readonly renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer
  public readonly loader:PIXI.loaders.Loader
  public readonly resman:IResMan
  game:IGame

  public tickTime:number = 0
  public lastFrameTime:number = 0
  public readonly targetTickTime = 1000 / 120; //120 ticks per second..
  public tickCount = 0

  public constructor(){
    this.resman = new ResMan()
    this.stage = new PIXI.Container()
    this.renderer = PIXI.autoDetectRenderer(800,600)
    document.getElementById("content").appendChild(this.renderer.view)
    this.renderer.render(this.stage)
    this.loader = new PIXI.loaders.Loader()
    this.game = new DuelGame(this)
    window.requestAnimationFrame(this.update);
  }

  protected update(time:number){
    window.requestAnimationFrame(this.update);

    if(this.loader.loading) return

    let delta = time - this.lastFrameTime
    this.lastFrameTime  = time
    if (delta > 500){
      //reset timers
      this.tickTime = time
      console.log("frames missed: " + delta) 
    }

    this.game.draw();

    while(this.tickTime < time){
      this.game.update(this.targetTickTime);   
      this.tickTime += this.targetTickTime;
      this.tickCount++;
    }

  }
}
import { Common } from "../common/common"
import * as PIXI from "pixi.js"

export class Client{
  stage:PIXI.Container
  renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer
  
  constructor(){
    this.stage = new PIXI.Container()
    this.renderer = PIXI.autoDetectRenderer(800,600)
    document.getElementById("content").appendChild(this.renderer.view)
    this.renderer.render(this.stage)
  }
/*
  preload():void{
    this.game.load.image("logo", "/assets/gfx/ships/1.png")
  }
  create():void{
    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo")
    this.logo.anchor.setTo(0.5,0.5)
  }
  update():void{
    

  }
  */
}
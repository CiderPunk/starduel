import * as phaser from "phaser-ce" 
import { Common } from "../common/common"

export class Client{
  game: Phaser.Game
  logo: Phaser.Sprite;

  constructor(){
    this.game = new Phaser.Game(800,600, Phaser.WEBGL, "content", { preload: this.preload, create: this.create, update: this.update })
  }

  preload():void{
    this.game.load.image("logo", "/assets/gfx/ships/1.png")
  }
  create():void{
    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo")
    this.logo.anchor.setTo(0.5,0.5)
  }
  update():void{
    

  }
}
import { Game } from "./game"
import { IGame, IClient, IShip, IDuelGame, IUniverse } from "../interfaces"
import { Ship } from "../ents/ship"
import { Star } from "../ents/star"
import { Player } from "../ents/player"
import { PhysicsObj } from "../ents/physicsobj"
import { V2 } from "../math/v2"
import { Bounds } from "../math/bounds"
import "../extensions"
import { BounceUniverse } from "../universe/bounceuniverse";
import { Drone } from "../ents/drone";
export class DuelGame extends Game implements IDuelGame{

  player:Player
  public readonly largeBodies = new Array<PhysicsObj>()
  public readonly ships = new Array<IShip>()
  public readonly projectiles = new Array<IShip>()
  public readonly universe:IUniverse
  private bounds = new Bounds();

  public readonly foreground:PIXI.Container
  public readonly background:PIXI.Container
  public readonly decoration:PIXI.Container

  public ready(): void {
    //setup play area
    this.player = new Player(this, 400,0, new V2(0,100))
   //new Star(this, 100, 1, new V2(0,0), new V2(0,0))
   /* binary system
    this.largeBodies.push( new Star(this, 50,3000000, new V2(200,0), new V2(0,50)))
    this.largeBodies.push( new Star(this, 50,3000000, new V2(-200,0), new V2(0,-50)))
    */

  this.largeBodies.push( new Star(this, 50,5000000, new V2(0,0), new V2(0,0)))
  // this.largeBodies.push( new Star(this, 20,500000, new V2(500,0), new V2(0,60)))
  //  this.largeBodies.push( new Star(this, 5,10000, new V2(550,0), new V2(0,130)))

    this.ships.push(this.player)

    let loc = new V2(0,0)
    let vel = new V2(0,0)
    for (let i = 0; i < 50; i++){
      let dist = (Math.random() * 200) + 600
      let r = Math.random() * Math.PI * 2
      loc.setAngle(r,1)
      vel.setV2(loc).rotateCW().scale((80  + Math.random() * 50) * (Math.random() <0.5 ? -1 : 1))
      loc.scale(dist)

      let drone = new Drone(this, loc.x, loc.y,0,vel)
      this.ships.push(drone)
    }
  }



  public constructor(owner:IClient){
    super(owner);
    owner.load(Player.loader())
    owner.load(Drone.loader())

    this.universe = new BounceUniverse(this, 1000)

    this.decoration = new PIXI.Container()
    this.foreground = new PIXI.Container()
    this.background = new PIXI.Container()
    this.stage.addChild(this.background)
    this.stage.addChild(this.foreground)
    this.stage.addChild(this.decoration)

  }

  public update(dt: number): void {

    this.largeBodies.map((body) => { 
      body.update(dt)
      this.universe.testBounds(body)
    })
    this.ships.map((ship) => { 
      ship.update(dt)
      this.universe.testBounds(ship)
    })

  }


  public draw():void{
    this.bounds.reset()
    this.largeBodies.map((body) => { 
      body.prepDraw()
      this.bounds.extend(body.pos)
    })
    this.ships.map((ship) => { 
      ship.prepDraw()
      this.bounds.extend(ship.pos)
    })

    this.bounds.pad(100)
    this.stage.position.set(this.owner.renderer.width / 2, this.owner.renderer.height / 2 )
    let size = this.bounds.getSize()
    let desiredAspect = this.owner.renderer.width / this.owner.renderer.height
    let scale = size.x / size.y > desiredAspect ? this.owner.renderer.width / size.x : this.owner.renderer.height / size.y
    this.stage.scale.set(scale, scale)
    this.stage.pivot.setV2(this.bounds.getCenter())
    super.draw()
  }





}
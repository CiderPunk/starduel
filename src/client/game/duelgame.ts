import { Game } from "./game";
import { IGame, IClient, IShip, IDuelGame } from "../interfaces";
import { Ship } from "../ents/ship";
import { Star } from "../ents/star";
import { Player } from "../ents/player";
import { PhysicsObj } from "../ents/physicsobj";
import { V2 } from "../math/v2";
import { Bounds } from "../math/bounds";
export class DuelGame extends Game implements IDuelGame{

  player:Player
  public readonly largeBodies = new Array<PhysicsObj>()
  public readonly ships = new Array<IShip>()
  public readonly projectiles = new Array<IShip>()

  private bounds = new Bounds();


  public ready(): void {
    //setup play area
    this.player = new Player(this, 400,0)
   //new Star(this, 100, 1, new V2(0,0), new V2(0,0))
    this.largeBodies.push( new Star(this, 50,500000, new V2(200,0), new V2(0,20)))
    this.largeBodies.push( new Star(this, 50,500000, new V2(-200,0), new V2(0,-20)))
    this.ships.push(this.player)
  }



  public constructor(owner:IClient){
    super(owner);
    owner.load(Ship.loader())
    owner.load(Star.loader())
   
    this.stage.position.set( this.owner.renderer.width / 2, this.owner.renderer.height / 2)
    this.stage.scale.set( 0.5,0.5)
  }

  public update(dt: number): void {
    this.bounds.reset()
    this.largeBodies.map((body) => { 
      body.update(dt)
      this.bounds.extend(body.pos)
    })
    this.ships.map((ship) => { 
      ship.update(dt)
      this.bounds.extend(ship.pos)
    })

  }





}
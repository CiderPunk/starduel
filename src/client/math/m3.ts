import {V2} from "./v2"

export class M3{

  public readonly values = new Float32Array(9)

  private static scratch = new Float32Array(9)
  
  private static temp = new Float32Array(9)

  private static readonly identity:Float32Array = new Float32Array([
    1,0,0,
    0,1,0,
    0,0,1
  ]);

  public constructor(copy?:M3){
    this.copyFrom(copy ? copy.values : M3.identity)
  }
/**
 * resets matrix to identity
 */
  public reset(){
    this.copyFrom(M3.identity)
  }
/**
 * sets matrix to rotation 
 * @param rad radians
 */
  public setRotate(rad:number){
    this.genRotate(rad, this.values)
  }
/**
 * resets matrix to translation 
 * @param dX translation in X
 * @param dY translation in Y
 */
  public setTranslate(dX:number, dY:number):M3{
    this.genTranslate(dX,dY, this.values)
    return this
  }

  public setTranslateV(v:V2):M3{
    this.genTranslate(v.x,v.y, this.values)
    return this
  }

  public setProjection(width:number, height:number):M3{
    this.genProjection(width, height, this.values)
    return this
  }

/**
 * resets matrix to scale
 * @param sX X scale
 * @param sY Y scale
 */
  public setScale(sX:number, sY:number){
   this.genScale(sX,sY, this.values)
  }
/**
 * scales existing matrix
 * @param sX X scale
 * @param sY Y scale
 */
  public scale(sX:number,sY:number){
    this.multiply(this.genScale(sX,sY, M3.temp));
  }
/**
 * rotates matrix
 * @param rad radians
 */
  public rotate(rad:number) {
    this.multiply(this.genRotate(rad, M3.temp))
  }
/**
 * translates matrix
 * @param dX x 
 * @param dY y
 */
  public translate(dX:number, dY:number){
    this.multiply(this.genTranslate(dX,dY, M3.temp))
  }


  private genProjection(width:number, height:number, arr:Float32Array){
    arr[0] = 2/width
    arr[1] = 0
    arr[2] = 0 
    arr[3] = 0
    arr[4] = -2/height
    arr[5] = 0
    arr[6] = -1
    arr[7] = 1
    arr[8] = 1
    return arr
  }



  private genScale(sX:number,sY:number, arr:Float32Array):Float32Array{
    arr[0] = sX
    arr[1] = 0
    arr[2] = 0 
    arr[3] = 0
    arr[4] = sY
    arr[5] = 0
    arr[6] = 0
    arr[7] = 0
    arr[8] = 1
    return arr
  }

  private genTranslate(dX:number, dY:number, arr:Float32Array):Float32Array{
    arr[0] = 1
    arr[1] = 0
    arr[2] = 0 
    arr[3] = 0
    arr[4] = 1
    arr[5] = 0
    arr[6] = dX
    arr[7] = dY
    arr[8] = 1
    return arr
  }
  
  private genRotate(rad:number, arr:Float32Array):Float32Array{
    var c = Math.cos(rad)
    var s = Math.sin(rad)
    arr[0] = c
    arr[1] = -s
    arr[2] = 0 
    arr[3] = s
    arr[4] = c
    arr[5] = 0
    arr[6] = 0
    arr[7] = 0
    arr[8] = 1
    return arr
  }

  private copyFrom(t:Float32Array){
    for (let i =0; i< 9; i++)
      this.values[i] = t[i]
  }

  public multiplyM3(m:M3){
    this.multiply(m.values)
  }

  public multiply(m:Float32Array){
     M3.scratch[0] = this.values[0] * m[0] + this.values[1] * m[3] + this.values[2] * m[6]
     M3.scratch[1] = this.values[0] * m[1] + this.values[1] * m[4] + this.values[2] * m[7]
     M3.scratch[2] = this.values[0] * m[3] + this.values[1] * m[5] + this.values[2] * m[8]
     M3.scratch[3] = this.values[3] * m[0] + this.values[4] * m[3] + this.values[5] * m[6]
     M3.scratch[4] = this.values[3] * m[1] + this.values[4] * m[4] + this.values[5] * m[7]
     M3.scratch[5] = this.values[3] * m[3] + this.values[4] * m[5] + this.values[5] * m[8]
     M3.scratch[6] = this.values[6] * m[0] + this.values[7] * m[3] + this.values[8] * m[6]
     M3.scratch[7] = this.values[6] * m[1] + this.values[7] * m[4] + this.values[8] * m[7]
     M3.scratch[8] = this.values[6] * m[3] + this.values[7] * m[5] + this.values[8] * m[8]
    this.copyFrom(M3.scratch) 
  }


}
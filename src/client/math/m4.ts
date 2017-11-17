import {V3} from "./v3"

export class M4{

  private values = new Float32Array(16)

  private static scratch = new Float32Array(16)
  
  private static temp = new Float32Array(16)

  private static readonly identity:Float32Array = new Float32Array([
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
  ]);

  public constructor(copy?:M4){
    this.copyFrom(copy ? copy.values : M4.identity)
  }
/**
 * resets matrix to identity
 */
  public reset(){
    this.copyFrom(M4.identity)
  }
/**
 * sets matrix to rotation 
 * @param rad radians
 */
  public setRotate(axis:V3, rad:number){
    this.genRotate(rad, this.values)
  }
/**
 * resets matrix to translation 
 * @param dX translation in X
 * @param dY translation in Y
 */
  public setTranslate(dX:number, dY:number, dZ:number = 0){
    this.genTranslate(dX,dY,dZ, this.values)
  }

/**
 * resets matrix to scale
 * @param sX X scale
 * @param sY Y scale
 */
  public setScale(sX:number, sY:number, sZ:number = 1){
   this.genScale(sX,sY,sZ, this.values)
  }
/**
 * scales existing matrix
 * @param sX X scale
 * @param sY Y scale
 */
  public scale(sX:number,sY:number, sZ:number = 1){
    this.multiply(this.genScale(sX,sY, sZ, M4.temp));
  }
/**
 * rotates matrix
 * @param rad radians
 */
  public rotate(rad:number) {
    this.multiply(this.genRotate(rad, M4.temp))
  }
/**
 * translates matrix
 * @param dX x 
 * @param dY y
 */
  public translate(dX:number, dY:number, dZ:number = 0){
    this.multiply(this.genTranslate(dX,dY,dZ, M4.temp))
  }

  private genScale(sX:number,sY:number, sZ:number, arr:Float32Array):Float32Array{
    arr[0] = sX
    arr[1] = 0
    arr[2] = 0 
    arr[3] = 0

    arr[4] = 0
    arr[5] = sY
    arr[6] = 0
    arr[7] = 0

    arr[8] = 0
    arr[9] = 0
    arr[10] = sZ
    arr[11] = 0

    arr[12] = 0
    arr[13] = 0
    arr[14] = 0
    arr[15] = 1
    return arr
  }

  private genTranslate(dX:number, dY:number, dZ:number, arr:Float32Array):Float32Array{
    arr[0] = 1
    arr[1] = 0
    arr[2] = 0 
    arr[3] = 0 

    arr[4] = 0
    arr[5] = 1
    arr[6] = 0
    arr[7] = 0
    
    arr[8] = 0
    arr[9] = 0
    arr[10] = 1
    arr[11] = 0
    
    arr[12] = dX
    arr[13] = dY
    arr[14] = dZ
    arr[15] = 1
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
    for (let i =0; i< 16; i++)
      this.values[i] = t[i]
  }

  public multiplyM4(m:M4){
    this.multiply(m.values)
  }

  public multiply(m:Float32Array){
    let n = this.values
    M4.scratch[0] = n[0] * m[0] + n[1] * m[4] + n[2] * m[8] + n[3] * m[12]
    M4.scratch[1] = n[0] * m[1] + n[1] * m[5] + n[2] * m[9] + n[3] * m[13]
    M4.scratch[2] = n[0] * m[2] + n[1] * m[6] + n[2] * m[10] + n[3] * m[14]
    M4.scratch[3] = n[0] * m[3] + n[1] * m[7] + n[2] * m[11] + n[3] * m[15]

    M4.scratch[4] = n[4] * m[0] + n[5] * m[4] + n[6] * m[8] + n[7] * m[12]
    M4.scratch[5] = n[4] * m[1] + n[5] * m[5] + n[6] * m[9] + n[7] * m[13]
    M4.scratch[6] = n[4] * m[2] + n[5] * m[6] + n[6] * m[10] + n[7] * m[14]
    M4.scratch[7] = n[4] * m[3] + n[5] * m[7] + n[6] * m[11] + n[7] * m[15]

    M4.scratch[8] = n[8] * m[0] + n[9] * m[4] + n[10] * m[8] + n[11] * m[12]
    M4.scratch[9] = n[8] * m[1] + n[9] * m[5] + n[10] * m[9] + n[11] * m[13]
    M4.scratch[10] = n[8] * m[2] + n[9] * m[6] + n[10] * m[10] + n[11] * m[14]
    M4.scratch[11] = n[8] * m[3] + n[9] * m[7] + n[10] * m[11] + n[11] * m[15]

    M4.scratch[12] = n[12] * m[0] + n[13] * m[4] + n[14] * m[8] + n[15] * m[12]
    M4.scratch[13] = n[12] * m[1] + n[13] * m[5] + n[14] * m[9] + n[15] * m[13]
    M4.scratch[14] = n[12] * m[2] + n[13] * m[6] + n[14] * m[10] + n[15] * m[14]
    M4.scratch[15] = n[12] * m[3] + n[13] * m[7] + n[14] * m[11] + n[15] * m[15]

    this.copyFrom(M4.scratch) 
  }

}
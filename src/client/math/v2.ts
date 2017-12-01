export class V2{
  private static temp = new V2(0,0)

  public constructor(public x:number, public y:number){}
  public add(other:V2):V2{
    this.x += other.x
    this.y += other.y
    return this
  }

  public addScale(other:V2, scale:number):V2{
    this.x += other.x
    this.y += other.y
    return this
  }

  public sub(other:V2):V2{
    this.x -= other.x
    this.y -= other.y
    return this
  }
  public scale(v:number):V2{
    this.x *= v
    this.y *= v
    return this
  }
  public len2():number{
    return (this.x * this.x) + (this.y * this.y)
  }  
  public len():number{
    return Math.sqrt(this.len2())
  }
  public dot(other:V2):number{
    return this.x * other.x + this.y * other.y
  }
  public cross(other:V2):number{
    return this.x * other.y - other.x * this.y
  }
  public norm():V2{
    let len = this.len()
    //no divide by zeros here!
    len= len < 0.00001 ? 0.00001 : len
    return this.scale(1/len)
  }
  public rotateCW():V2{
    let temp = this.x
    this.x = this.y
    this.y = -temp
    return this
  }
  public rotateCCW(){
    let temp = this.x
    this.x = -this.y
    this.y = temp
    return this
  }
  public set(x:number, y:number):V2{
    this.x = x
    this.y = y
    return this
  }

  public setAngle(rads:number, mag:number){
    this.x = mag * Math.sin(rads) 
    this.y = mag * Math.cos(rads)
    return this
  }

  public getAngle():number{
    return Math.atan2(this.y, this.x);
  }
/**
 * calculates reflection of vector relative to the normalized vector
 * @param norm normalized vector to reflect off
 */
  public reflect(norm:V2){
    //http://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
    V2.temp.set(norm.x, norm.y)
    let dp = this.dot(V2.temp)
    V2.temp.scale(2 * dp)
    this.sub(V2.temp)
    return this
  }
}
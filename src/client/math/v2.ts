export class V2{
  
  public constructor(public x:number, public y:number){}
  public add(other:V2):V2{
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
}
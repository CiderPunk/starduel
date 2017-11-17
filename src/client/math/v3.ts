export class V3{
  
  public constructor(public x:number=0, public y:number=0, public z:number = 0){}
  public add(other:V3):V3{
    this.x += other.x
    this.y += other.y
    this.z += other.z
    return this
  }
  public sub(other:V3):V3{
    this.x -= other.x
    this.y -= other.y
    this.z -= other.z
    return this
  }
  public scale(v:number):V3{
    this.x *= v
    this.y *= v
    this.z *= v
    return this
  }
  public len2():number{
    return (this.x * this.x) + (this.y * this.y)+ (this.z * this.z)
  }  
  public len():number{
    return Math.sqrt(this.len2())
  }
  public dot(other:V3):number{
    return this.x * other.x + this.y * other.y + this.z * other.z
  }


  public norm():V3{
    let len = this.len()
    //no divide by zeros here!
    len= len < 0.00001 ? 0.00001 : len
    return this.scale(1/len)
  }
}
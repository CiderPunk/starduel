import { V2 } from "./v2";
export class Bounds{
  private _min = new V2(0,0)
  private _max = new V2(0,0)
  private _center = new V2(0,0)
  private _size = new V2(0,0)
  private _hasPoint = false

  get max():V2{
    return this._hasPoint ? this._max : V2.zero
  }

  get min():V2{
    return this._hasPoint ? this._min : V2.zero
  }

  public getSize():V2{
    return this._size.setV2(this._max).sub(this._min)
  }
  public getCenter():V2{
    return this._center.setV2(this._min).addScale(this.getSize(), 0.5)
  }

  public pad(size:number){
      this._min.x-=size
      this._min.y-=size
      this._max.x+=size
      this._max.y+=size
      this._hasPoint = true
  }


  public extend(point:V2){
    if (!this._hasPoint){
      this._min.setV2(point)
      this._max.setV2(point)
      this._hasPoint = true
    }
    else{
      this._max.max(point)
      this._min.min(point)
    }
  }

  public contains(point:V2):boolean{
    return (this._hasPoint && this.min.x < point.x && this.min.y < point.y && this.max.x > point.x && this.max.y > point.y)
  } 


  public reset(){ 
    this._hasPoint = false
    this._min.reset()
    this._max.reset()
  }
}


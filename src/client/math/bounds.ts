import { V2 } from "./v2";
export class Bounds{
  private _min = new V2(0,0)
  private _max = new V2(0,0)
  private _hasPoint = false

  get max():V2{
    return this._hasPoint ? this._max : V2.zero
  }

  get min():V2{
    return this._hasPoint ? this._min : V2.zero
  }

  public Pad(size:number){
      this._min.x-=size
      this._min.y-=size
      this._max.x+=size
      this._max.y+=size
      this._hasPoint = true
  }

  /* should be called after extending the bounds to the max, adjusts the width /height to fit the specified aspect ratio, centering the bounds within */
  /* ratio - width / height */
/*
  public FixAspect(ratio:number){
    if (this.Rect == null){
      return;
    }
    let currentRatio = this.Rect.Size.X / this.Rect.Size.Y ;
    //e.g. ratio  = 4/3 current ratio = 5 / 1 long thin horizontal, too wide add height
    if (currentRatio > ratio){
      let requiredHeight = this.Rect.Size.X / ratio;
      this.Pad(<IVect2>{X:0, Y: (requiredHeight - this.Rect.Size.Y) / 2});
    }
    else{
      let requiredWidth = this.Rect.Size.Y * ratio;
      this.Pad(<IVect2>{X: (requiredWidth - this.Rect.Size.X) / 2,  Y:0} );
    }

  }
*/

  public extend(point:V2){
    if (!this._hasPoint){
      this.min.setV2(point)
      this.max.setV2(point)
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
    this._hasPoint = false;
    this._min.reset()
    this._max.reset()
  }
}


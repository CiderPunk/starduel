import { ObservablePoint, Point } from "pixi.js"
import { V2 } from "./math/v2";

declare module "pixi.js"{
  interface ObservablePoint{
    setV2(val:V2):void
  }
  interface Point{
    setV2(val:V2):void
  }
}

Point.prototype.setV2 = ObservablePoint.prototype.setV2 = function(val:V2){
  this.x = val.x
  this.y = val.y
}


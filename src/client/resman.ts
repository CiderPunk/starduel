import { IResMan, LoadCallback } from "./interfaces";


export class ResMan implements IResMan{

  public readonly loader:PIXI.loaders.Loader
  loadList:LoadCallback[];

  get isLoading():boolean{
    return this.loader.loading
  }

  public AddResources(files:string[], callback:LoadCallback) : void{
    this.loader.add(files);
    if (callback != null)
      this.loadList.push(callback);
  }

  public Load(cb:LoadCallback = null):void{
    this.loader.load((res:PIXI.loaders.Resource)=>{
      while(this.loadList.length > 0){
        this.loadList.pop()(res)
      }
      if (cb!= null) cb(res)
    })
  }

}
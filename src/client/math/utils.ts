export namespace Utils{

  export function unitize(val:number): number{
    if (val > 1) return 1
    if (val < -1) return -1
    return val
  }

}
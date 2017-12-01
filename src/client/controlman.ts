export interface ICommandSubscriber{
  commandStart(command:Command)
  commandStop(command:Command)
}

export class Command{
  public constructor(private name:string, private action:string, private defaultKeyCode:number){  }

  private active:boolean = false

  private subscribers:ICommandSubscriber[] = [];
  //default key code of command
  get DefaultKeyCode():number{
    return this.defaultKeyCode
  }
  //unique name of command
  get Name():string{
    return this.name
  }
  //short non-unique name
  get Action():string{
    return this.action
  }
  //is active
  get IsActive():boolean{
    return this.active
  }

  public Subscribe(ent:ICommandSubscriber){
    if (this.subscribers.indexOf(ent) == -1){
      this.subscribers.push(ent)
    }
  }

  public Unsubscribe(ent:ICommandSubscriber){
    let index = this.subscribers.indexOf(ent)
    if (index > -1){
      this.subscribers.splice(index, 1)
    }
  }

  public Start(){
    if (!this.active){
      this.subscribers.map((sub)=>sub.commandStart(this))
      this.active = true
    }
  }

  public Stop(){
    this.active = false
    this.subscribers.map((sub)=>sub.commandStop(this))
  }
}


export namespace ControlMan{

  interface CommandMap {
    [name: string]: Command;
  }
  interface KeyMap {
    [keyCode: number]: Command;
  }

  let keyMap : KeyMap = {};
  let commandMap:CommandMap = {};

  export function Init(){
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  }

  function keyDownHandler(e:KeyboardEvent){
    //console.log("key down:" + e.keyCode);
    let command = keyMap[e.keyCode];
    if (command!== undefined){
      command.Start()
    }
  }

  function keyUpHandler(e:KeyboardEvent){
    //console.log("key up:" + e.keyCode);
    let command = keyMap[e.keyCode];
    if (command!== undefined){
      command.Stop()
    }
  }

  export function Bind(keyCode:number, commandName:string){
    let command = commandMap[commandName];
    if (command !== undefined){
      keyMap[keyCode] = command
    }
  }


  export function RegisterCommands(commands: Command[]){
    for (let command of commands){
      RegisterCommand(command)
    }
  }

  export function RegisterCommand(command: Command){
    if (commandMap[command.Name] === undefined){
      commandMap[command.Name] = command
      //attempt to fecth binding from config..
      
      //fail - use defauilt
      Bind(command.DefaultKeyCode, command.Name);

    }
    else{
      throw new Error("Duplicate command registered: " + command.Name);
    }
  }
  export function UnregisterCommand(command: Command){
    delete commandMap[command.Name];
  }


}


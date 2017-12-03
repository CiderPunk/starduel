
export type CommandAction  = (active:boolean,name:string)=>void;

export class Command{
  public constructor(private name:string, private action:string, private defaultKeyCode:number){  }

  private actions = new Array<CommandAction>();
  private active:boolean = false
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

  public Subscribe(act:CommandAction){
    if (this.actions.indexOf(act) == -1){
      this.actions.push(act)
    }
  }

  public Unsubscribe(act:CommandAction){
    let index = this.actions.indexOf(act)
    if (index > -1){
      this.actions.splice(index, 1)
    }
  }

  public Start(){
    if (!this.active){
      this.actions.map((act)=>act(true, this.action))
      this.active = true
    }
  }

  public Stop(){
    this.active = false
    this.actions.map((act)=>act(false, this.action))
  }
}


export namespace ControlMan{

  interface CommandMap {
    [name: string]: Command;
  }
  interface KeyMap {
    [keyCode: number]: Command;
  }

  let keyMap:KeyMap = {};
  let commandMap:CommandMap = {};

  export function init(){
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

  export function bind(keyCode:number, commandName:string){
    let command = commandMap[commandName];
    if (command !== undefined){
      keyMap[keyCode] = command
    }
  }


  export function registerCommands(commands: Command[]){
    for (let command of commands){
      registerCommand(command)
    }
  }

  export function registerCommand(command: Command){
    if (commandMap[command.Name] === undefined){
      commandMap[command.Name] = command
      //attempt to fecth binding from config..
      
      //fail - use defauilt
      bind(command.DefaultKeyCode, command.Name);
    }
    else{
      throw new Error("Duplicate command registered: " + command.Name);
    }
  }
  export function unregisterCommand(command: Command){
    delete commandMap[command.Name];
  }


}


import * as Http from "http"
import * as Express  from "express"
import * as Io from "socket.io"

export class Server{

  private readonly router:Express.Router
  private readonly app:Express.Express
  private readonly server:Http.Server
  public readonly io:SocketIO.Server

  constructor(port:number = Number(process.env.PORT) || 80){
    this.app  = Express()
    this.app.use('/node_modules', Express.static('node_modules'))
    this.app.use(Express.static('public'))
    this.server = this.app.listen(port,function(){
      console.log('listening on *:' + port)
    } )

  }
}
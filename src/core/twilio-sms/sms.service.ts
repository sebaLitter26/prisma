import { Injectable, Scope } from '@nestjs/common';
//import { TwilioService } from 'nestjs-twilio';
const qrcode = require("qrcode-terminal");
import { Client, LocalAuth } from "whatsapp-web.js";
const fs = require('fs');



@Injectable({ scope: Scope.TRANSIENT })
export class SmsService {

  client = null;
  

  public constructor(
    //private readonly twilioService: TwilioService
  ) {
   
    this.client = new Client({
      authStrategy: new LocalAuth({
           clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
      })
    })

    this.client.initialize();

    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });
    
    this.client.on("authenticated", (session) => {
    
      console.log("AUTHENTICATED", session);
    });
    
    this.client.on("ready", () => {
      console.log("Client is ready!");
    });

    this.client.on("message", (message) => {
      if (message.body === "Hola") {
        console.log(message);
        
        message.reply(`Hola ${message.notifyName}`);
      }
    });
    
    
    
    
  }

  async intitialize() {
    
  }

  sendMessage(number: number, text: string){
    this.client.sendMessage( `549${number}@c.us`,text);
    console.log(`Message sent to 549${number}`);
    
  }
  



    

  /* async sendSMS(from: string, to: string, body: string) {
    return await this.twilioService.client.messages.create(
      {
        body,
        from,
        to,
      },
      function (err, data) {
        if (err) {
          console.log('err', err);
          console.log('data', data);
        }
      },
    );
  } */
}

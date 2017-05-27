import { Component } from '@angular/core';
import {NavController, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})


export class AddItemPage {
	title;
	minPlayers;
	maxPlayers;
  gameName;
  public games = [];
  httpRequest: XMLHttpRequest;


  constructor(public navCtrl: NavController, public view: ViewController) {
    this.httpRequest = new XMLHttpRequest();

  }

  
  close(){
  	this.view.dismiss();
  }

  

  nameSearch(){
    this.games = [];
    var gName = this.gameName;
    var searchurl = 'http://192.168.2.50/JS/bggcall.php?gname=' + gName;
    this.bgRequest(searchurl);
  }

  bgRequest(url) {
  if (!this.httpRequest) {
    console.log("httpRequest instance could not be created");
  }


  this.httpRequest.open('GET', url, true);
  this.httpRequest.onreadystatechange = () => {
    if (this.httpRequest.readyState ==XMLHttpRequest.DONE) {
      var bgInfo = JSON.parse(this.httpRequest.response);

      for (let i in bgInfo) {
        this.saveGame({name: bgInfo[i][0], year: bgInfo[i][1], minPlayers: bgInfo[i][2], maxPlayers: bgInfo[i][3], thumbnail: bgInfo[i][4]});
      }


    }
  }
  this.httpRequest.send()

  }

  saveGame(game){
    this.games.push(game);
  }

  addGame(i){
    let newItem = {
      name: this.games[i].name,
      minPlayers: this.games[i].minPlayers,
      maxPlayers: this.games[i].maxPlayers
    };
    this.view.dismiss(newItem);
  }

}

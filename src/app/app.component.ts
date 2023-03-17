import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  
  sourceList: Satellite[];
  displayList: Satellite[];

	constructor() {
		this.sourceList = [];
		this.displayList = [];
		let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

		window.fetch(satellitesUrl).then(function (response) {
			response.json().then(function (data) {

				let fetchedSatellites = data.satellites;
				// loop over satellites
				for(let i=0; i < fetchedSatellites.length; i++) {
					// create a Satellite object 
					let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
					// add the new Satellite object to sourceList 
					this.sourceList.push(satellite);
				 }

				 // make a copy of the sourceList to be shown to the user
				 this.displayList = this.sourceList.slice(0);
	  
			}.bind(this));
		}.bind(this));

	}

	search(searchTerm: string, byName: boolean, byType: boolean, byOperational: boolean, byOrbitType: boolean, byLaunchDate: boolean ): void {
		let matchingSatellites: Satellite[] = [];
		searchTerm = searchTerm.toLowerCase();
		//console.log(searchKind);
		if (byName) {
			for(let i=0; i < this.sourceList.length; i++) {
				let name = this.sourceList[i].name.toLowerCase();
				if (name.indexOf(searchTerm) >= 0) {
					matchingSatellites.push(this.sourceList[i]);
				}
			}
		}

		if (byOperational) {
			for(let i=0; i < this.sourceList.length; i++) {
				let operational = String(this.sourceList[i].operational);
				if (operational.indexOf(searchTerm) >= 0) {
					matchingSatellites.push(this.sourceList[i]);
				}
			}
		}

		if (byType) {
			for(let i=0; i < this.sourceList.length; i++) {
				let type = this.sourceList[i].type.toLowerCase();
				if (type.indexOf(searchTerm) >= 0) {
					matchingSatellites.push(this.sourceList[i]);
				}
			}
		}

		if (byOrbitType) {
			for(let i=0; i < this.sourceList.length; i++) {
				let orbitType = this.sourceList[i].orbitType.toLowerCase();
				if (orbitType.indexOf(searchTerm) >= 0) {
					matchingSatellites.push(this.sourceList[i]);
				}
			}
		}

		if (byLaunchDate) {
			for(let i=0; i < this.sourceList.length; i++) {
				let launchDate = this.sourceList[i].launchDate.toLowerCase();
				if (launchDate.indexOf(searchTerm) >= 0) {
					matchingSatellites.push(this.sourceList[i]);
				}
			}
		}

		// assign this.displayList to be the array of matching satellites
		// this will cause Angular to re-make the table, but now only containing matches
		this.displayList = matchingSatellites;
	}


}



import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;
  url:string;
  imageUrl:string;
  name:string;
  id:string;
  category:string;

  constructor() { }

  ngOnInit() {
    this.imageUrl = this.resource.imageURL;
    this.name = this.resource.name;
    this.id = this.resource.id;
    this.category = this.resource.category;
    if(this.category == 'artist')
    {
    this.url = `artist/${this.resource.id}`;
    }
    else
    {
    this.url = `album/${this.resource.id}`;
    }
  }

}

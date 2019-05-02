import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../shared/animal.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  constructor(private service : AnimalService) { }

  ngOnInit() {
  }

}

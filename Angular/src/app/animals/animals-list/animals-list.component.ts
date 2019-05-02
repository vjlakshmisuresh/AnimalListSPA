import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/shared/animal.service';
import { Animal } from 'src/app/shared/animal.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent implements OnInit {

  constructor(private service : AnimalService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.service.getAllAnimalsData();
  }

  populateForm(animal: Animal){
    this.service.formData = Object.assign({}, animal);
  }

  delete(AnimalId : number){
    if(confirm('Are you sure to delete the record?')){
    this.service.deleteAnimalData(AnimalId).subscribe(res => 
      {
        this.service.getAllAnimalsData();
        this.toastrService.warning("Animal deleted successfully", "Animals List Service");
      }, err => {this.toastrService.error("Error while deleting Animal", "Animals List Service");} );
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimalService } from 'src/app/shared/animal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  constructor(private service: AnimalService, private toastrService : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm( form? : NgForm){
    if(form != null)
      form.resetForm();
    
      this.service.formData = {
      AnimalId: null,
      Name: ''
    }
  }

  onSubmit(form: NgForm){
    if(form.value.AnimalId == null){
      form.value.AnimalId = undefined;
      this.insertRecord(form);
    }
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm){
    this.service.postAnimalData(form.value).subscribe(res => 
      {
        this.resetForm(form);
        this.service.getAllAnimalsData();
        this.toastrService.success("Record inserted successfully", "Animals List Service");
      }, err => {this.toastrService.error("Error while adding Animal", "Animals List Service");} );
  }

  updateRecord(form: NgForm){
    this.service.putAnimalData(form.value).subscribe(res => 
      {
        this.resetForm(form);
        this.service.getAllAnimalsData();
        this.toastrService.success("Record updated successfully", "Animals List Service");
      }, err => {this.toastrService.error("Error while updating Animal", "Animals List Service");} );
  }

}

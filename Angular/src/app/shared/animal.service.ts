import { Injectable } from '@angular/core';
import { Animal } from './animal.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  formData : Animal;
  animalsList : Animal[];
  readonly rootUrl = "http://localhost:4174/api";

  constructor(private http: HttpClient) { }

  postAnimalData(formData: Animal){
    return this.http.post(this.rootUrl + '/Animals', formData);
  }

  putAnimalData(formData: Animal){
    return this.http.put(this.rootUrl + '/Animals/'+formData.AnimalId, formData);
  }

  deleteAnimalData(animalId: number){
    return this.http.delete(this.rootUrl + '/Animals/'+animalId);
  }

  getAllAnimalsData(){
    return this.http.get(this.rootUrl + '/Animals').toPromise().then(res => this.animalsList = res as Animal[]);
  }

}

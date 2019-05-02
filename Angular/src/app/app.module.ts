import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from  '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AnimalsComponent } from './animals/animals.component';
import { AnimalComponent } from './animals/animal/animal.component';
import { AnimalsListComponent } from './animals/animals-list/animals-list.component';
import { AnimalService } from './shared/animal.service';

@NgModule({
  declarations: [
    AppComponent,
    AnimalsComponent,
    AnimalComponent,
    AnimalsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AnimalService],
  bootstrap: [AppComponent]
})
export class AppModule { }


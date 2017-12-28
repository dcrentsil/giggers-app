import { Component, OnInit } from '@angular/core';
import { Gigger } from '../giggers';
import { GiggersService } from '../giggers.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-creategigger',
  templateUrl: './creategigger.component.html',
  styleUrls: ['./creategigger.component.css']
})
export class CreategiggerComponent implements OnInit {
  // public gigger: Gigger;
  gigger: Gigger;
  submitted = false;

  constructor( private giggersService: GiggersService,
       private location: Location) {
        }

   ngOnInit() {
    this.gigger = {
      type: '',
      name: '',
      username:'',
      speciality: '',
      description:''
    };
  }

  onsubmit() {
    this.submitted = true;
    this.save;
    console.log(this.gigger);    
  }

  private save(model: Gigger, isValid: boolean): void {
    this.giggersService.creategigger(this.gigger).subscribe(
      data=> console.log(this.gigger = data),
      err => console.log(err),
      () => console.log('Request Completed')
    );
    this.submitted = true;
  }


  goBack(): void {
    this.location.back();
  }

}

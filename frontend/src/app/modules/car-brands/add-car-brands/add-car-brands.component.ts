import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarBrandService } from 'src/app/core/services/car-brand.service';

/**
 * Component is using for register selector ,templateUrl and styleUrls
 */
@Component({
  selector: 'app-add-car-brands',
  templateUrl: './add-car-brands.component.html',
  styleUrls: ['./add-car-brands.component.scss']
})

export class AddCarBrandsComponent implements OnInit {

  /**
   * Car brand form of add car brands component is using for register all field will need a validator
   */
  carBrandForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  /**
   * Image logo url of add car brands component is using for define image logo and set default
   */
  imageLogoUrl: string | ArrayBuffer = "./assets/img/add-brand-logo.png";

  /**
   * File  of add car brands component is using for initial define log file before submit upload
   */
  fileLogo!: File;

  /**
   * Input carBrandDetails of add car brands component is using for initial define all field which is will be sent to API
   */
  @Input() carBrandDetails = { name: '', logo: '', description: '', status: true };

  /**
   * Creates an instance of add car brands component.
   * @param carBrandService is using for register carBrandService file which is API logic where located
   */
  constructor(
    private carBrandService: CarBrandService
  ) { }

  ngOnInit(): void {}

  /**
   * Onselected car brand status is using for status dropdown on click event 
   * @param selectedValue fill with (true/false) value if true = active , false = inactive
   */
  onselectedCarBrandStatus(selectedValue : boolean){
    this.carBrandDetails.status = selectedValue;
  }

  /**
   * Opens upload logo dialog is using for trigger open upload dialog where #inputUploadLogo is input file element id
   */
  openUploadLogoDialog(){
    const el = document.querySelector("#inputUploadLogo") as HTMLElement;
    el.click();
  }

  /**
   * Determines whether change upload logo on input file element id #inputUploadLogo and implement in preview images 
   * @param event event of input file element id #inputUploadLogo
   */
  onChangeUploadLogo(event : any){
    // Define reader as FileReader
    const reader = new FileReader();
    
    // Check if event has target files and target files length
    if(event.target.files && event.target.files.length) {
      // Define file as event target files
      const [file] = event.target.files;
      // Define global variable file logo will be filled with event.target.files[0] , array 0 containts file contents
      this.fileLogo = event.target.files[0];
      // Define file as data url 
      reader.readAsDataURL(file);
      // Define for set imageLogoUrl filled with reader result after onload event
      reader.onload = () => {
        this.imageLogoUrl = reader.result as string;
      };
    }
  }

  /**
   * Creates car brand using for submit new car brand and call create API 
   */
  createCarBrand(){
    // Check car brand form is valid 
    if(this.carBrandForm.valid){
      if (window.confirm('Are you sure, you want to save?')) {
        // Define car brand details variable filled with car brand form field 
        this.carBrandDetails.name = this.carBrandForm.get('name')?.value;
        this.carBrandDetails.description = this.carBrandForm.get('description')?.value;
        // Call createCarBrand function from carBrandService with carBrandDetails parameters 
        this.carBrandService.createCarBrand(this.carBrandDetails).subscribe(response=>{
          // If logo is exist 
          if(this.fileLogo){
            // Call uploadlogo function from carbrandservice with create api response id and uploaded logo 
            this.carBrandService.uploadLogo(response.id,this.fileLogo).subscribe((data: {}) => {
              // Reload page after finished all process
              window.location.reload()
            });
          }else{
            // Reload page without upload logo process 
            window.location.reload()
          }
        });
      }
    }
  }

}

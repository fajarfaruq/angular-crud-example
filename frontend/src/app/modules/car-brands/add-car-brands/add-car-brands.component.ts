import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarBrandService } from 'src/app/core/services/car-brand.service';

@Component({
  selector: 'app-add-car-brands',
  templateUrl: './add-car-brands.component.html',
  styleUrls: ['./add-car-brands.component.scss']
})
export class AddCarBrandsComponent implements OnInit {
  carBrandForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  imageLogoUrl: string | ArrayBuffer = "./assets/img/add-brand-logo.png";
  fileName: string = "No file selected";
  file!: File;

  @Input() carBrandDetails = { name: '', logo: '', description: '', status: true };

  constructor(
    private carBrandService: CarBrandService
  ) { 
  }

  ngOnInit(): void {}

  onselectedCarBrandStatus(selectedValue : boolean){
    this.carBrandDetails.status = selectedValue;
  }

  openUploadLogoDialog(){
    const el = document.querySelector("#inputUploadLogo") as HTMLElement;
    el.click();
  }

  onChangeUploadLogo(event : any){
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = event.target.files[0];
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageLogoUrl = reader.result as string;
     
        this.carBrandForm.patchValue({
          logo: reader.result
        });
   
      };
   
    }
  }

  createCarBrand(){
    if(this.carBrandForm.valid){
      if (window.confirm('Are you sure, you want to save?')) {
        this.carBrandDetails.name = this.carBrandForm.get('name')?.value;
        this.carBrandDetails.description = this.carBrandForm.get('description')?.value;
        this.carBrandService.createCarBrand(this.carBrandDetails).subscribe(response=>{
          if(this.file){
            this.carBrandService.uploadLogo(response.id,this.file).subscribe((data: {}) => {
              window.location.reload()
            });
          }else{
            window.location.reload()
          }
        });
      }
    }
  }

}

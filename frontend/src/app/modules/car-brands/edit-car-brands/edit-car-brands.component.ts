import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarBrandService } from 'src/app/core/services/car-brand.service';

@Component({
  selector: 'app-edit-car-brands',
  templateUrl: './edit-car-brands.component.html',
  styleUrls: ['./edit-car-brands.component.scss']
})
export class EditCarBrandsComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  carBrandData: any = {};
  carBrandForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  imageLogoUrl: string | ArrayBuffer = "./assets/img/add-brand-logo.png";
  fileName: string = "No file selected";
  file!: File;

  @Input() carBrandDetails = { name: '', logo: '', description: '', status: true };

  constructor(
    private location : Location,
    private carBrandService: CarBrandService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carBrandService.getCarBrand(this.id).subscribe((data: {}) => {
      this.carBrandData = data;
      this.carBrandForm.get('name')?.setValue(this.carBrandData.name);
      this.carBrandForm.get('description')?.setValue(this.carBrandData.description);
      this.imageLogoUrl = "data:image/png;base64," + this.carBrandData.logo;
      this.carBrandDetails.status = this.carBrandData.status;
    });
  }

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

  updateCarBrand(){
    if(this.carBrandForm.valid){
      if (window.confirm('Are you sure, you want to update?')) {
        this.carBrandDetails.name = this.carBrandForm.get('name')?.value;
        this.carBrandDetails.description = this.carBrandForm.get('description')?.value;
        this.carBrandService.updateCarBrand(this.id, this.carBrandDetails).subscribe(response=>{
          if(this.file){
            this.carBrandService.uploadLogo(this.id,this.file).subscribe((data: {}) => {
              window.location.reload()
            });
          }else{
            window.location.reload()
          }
        });
      }
    }
  }

  backClicked() {
    this.location.back()
  }

}

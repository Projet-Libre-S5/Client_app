import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css'
})
export class ImageUploaderComponent {

  @Output() image64 = new EventEmitter<any>();
  @Input() defaultImageSrc?: any;

  imageSrc: string | ArrayBuffer| null ="";

  constructor() {
    this.imageSrc = this.defaultImageSrc;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('defaultImageSrc' in changes) {
      this.imageSrc = changes['defaultImageSrc'].currentValue;
    }
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result;
        console.log('Updated image base 64:', this.imageSrc);
        this.image64.emit(this.imageSrc)
      };
    }
    

  }


  triggerFileUpload(): void {
    const fileInput = document.getElementById('fileUploader') as HTMLInputElement;
    fileInput.click();
  }
  
}

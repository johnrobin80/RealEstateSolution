import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadDragdropComponent } from './file-upload-dragdrop/file-upload-dragdrop.component';
import { MaterialModule } from '../material/material.module';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [FileUploadComponent, FileUploadDragdropComponent],
  imports: [CommonModule, MaterialModule, NgxFileDropModule],
  exports: [FileUploadComponent],
  providers: [],
})
export class FileUploadModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadDragdropComponent } from './file-upload-dragdrop/file-upload-dragdrop.component';
import { MaterialModule } from '../material/material.module';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [FileUploadDragdropComponent],
  imports: [CommonModule, MaterialModule, NgxFileDropModule],
  exports: [FileUploadDragdropComponent],
  providers: [],
})
export class FileUploadModule {}

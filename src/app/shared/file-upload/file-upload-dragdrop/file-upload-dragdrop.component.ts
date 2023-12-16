import {
  Component,
  Output,
  OnInit,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { FileUploadSource } from '../models/file-upload-source';
import { ProjectUtilitySharingService } from 'src/app/services/project-utility-sharing.service';

@Component({
  selector: 'app-file-upload-dragdrop',
  templateUrl: './file-upload-dragdrop.component.html',
  styleUrls: ['./file-upload-dragdrop.component.scss'],
})
export class FileUploadDragdropComponent implements OnInit, AfterViewInit {
  public files: NgxFileDropEntry[] = [];
  uploadSourceList: FileUploadSource[] = [];
  imageUrlPREVIEW: any;
  @Output() hasUploadPhotos = new EventEmitter<string>();

  constructor(private prjUtlService: ProjectUtilitySharingService) {}

  public dropped(files: NgxFileDropEntry[]) {
    this.uploadSourceList = [];
    this.files = files;
    let imageKey = 1000;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
          // Here you can access the real file
          if (file.type === 'image/jpeg') {
            console.log('FILE');
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.imageUrlPREVIEW = reader.result;
              imageKey += 1;
              this.uploadSourceList.push({
                key: imageKey,
                lastModified: file.lastModified,
                lastModifiedDate: '',
                name: file.name,
                size: file.size,
                type: file.type,
                webkitRelativePath: file.webkitRelativePath,
                file: reader.result?.toString(),
              });
              console.log('reader.result');
              console.log(reader.result);
            };

            console.log(
              '<==================== RelativePath ====================>'
            );
            console.log(droppedFile.relativePath);
            console.log('<==================== FILE ====================>');
            console.log('File ==> ' + file);
            //console.log(droppedFile.relativePath, file);

            const uploadFile = this.prepareFormData(file);
            console.log(
              '<==================== FUNCTION - PREPARE FORM DATA ====================>'
            );
            console.log(uploadFile.getAll('uploadFile'));
            uploadFile.getAll('uploadFile').map((data: any) => {
              console.log(
                '<==================== FUNCTION - PREPARE FORM DATA - MAPPED DATA ====================>'
              );
              console.log(data.name);
            });
          }

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log('It was a directory');
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    console.log('<<<<<<<<<<<<<<<<<uploadSourceList>>>>>>>>>>>>>>>>>');
    console.log(this.uploadSourceList);
    this.setPhotoSelectionStatus();
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  prepareFormData(file: File): FormData {
    // eslint-disable-next-line prefer-const
    let formData = new FormData();
    formData.append('uploadFile', file, file.name);
    //console.log('prepareFormData ==> ' + formData.getAll('uploadFile'));
    return formData;
  }

  deletePhoto(key: number) {
    if (confirm('The photo has been deleted!')) {
      const index = this.uploadSourceList.findIndex((i) => i.key === key);
      if (index > -1) {
        this.uploadSourceList.splice(index, 1);
      }
      console.log('Deleted!! ==> ' + key);
      console.log(this.uploadSourceList);
    } else {
      console.log('Not-Deleted!');
    }
    this.setPhotoSelectionStatus();
  }

  ngOnInit(): void {
    this.setPhotoSelectionStatus();
  }

  ngAfterViewInit(): void {
    this.setPhotoSelectionStatus();
  }

  setPhotoSelectionStatus() {
    setTimeout(() => {
      if (this.uploadSourceList.length > 0) {
        this.prjUtlService.setphotoUploadedValue(true);
      } else {
        this.prjUtlService.setphotoUploadedValue(false);
      }
    }, 100);
  }
}

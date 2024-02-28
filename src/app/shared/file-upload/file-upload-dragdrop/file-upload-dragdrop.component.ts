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
import {
  FileUploadEntity,
  FileUploadSource,
} from '../models/file-upload-source';
import { ProjectUtilitySharingService } from 'src/app/services/project-utility-sharing.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-upload-dragdrop',
  templateUrl: './file-upload-dragdrop.component.html',
  styleUrls: ['./file-upload-dragdrop.component.scss'],
  providers: [ToastrService],
})
export class FileUploadDragdropComponent implements OnInit, AfterViewInit {
  imageKey = 1000;
  public files: NgxFileDropEntry[] = [];
  uploadSourceList: FileUploadSource[] = [];
  finaldDataSource: FileUploadSource[] = [];
  uploadDataEntity: FileUploadEntity[] = [];
  imageUrlPREVIEW: any;
  @Output() hasUploadPhotos = new EventEmitter<string>();

  constructor(
    private prjUtlService: ProjectUtilitySharingService,
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService
  ) {}

  public dropped(files: NgxFileDropEntry[]) {
    this.uploadSourceList = [];
    this.files = files;
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
              this.imageKey += 1;
              this.uploadSourceList.push({
                key: this.imageKey,
                lastModified: file.lastModified,
                lastModifiedDate: '',
                name: file.name,
                size: file.size,
                type: file.type,
                webkitRelativePath: file.webkitRelativePath,
                file: reader.result?.toString(),
              });
              //this.uploadDataFinalList.push(...this.uploadSourceList);
              console.log('reader.result');
              console.log(reader.result);
            };
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

    setTimeout(() => {
      if (this.uploadSourceList.length > 0) {
        for (
          let sourceIndex = 0;
          sourceIndex <= this.uploadSourceList.length - 1;
          sourceIndex++
        ) {
          this.uploadDataEntity.push({
            key: this.uploadSourceList[sourceIndex].key,
            name: this.uploadSourceList[sourceIndex].name,
            size: this.uploadSourceList[sourceIndex].size,
            filetype: this.uploadSourceList[sourceIndex].type,
            photobinary: this.uploadSourceList[sourceIndex].file,
          });
        }
        console.log(
          'Complete upload file list from ARRAY ===> uploadDataEntity'
        );
        console.log(this.uploadDataEntity);
      }
    }, 80);
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
    const fileDetails = this.uploadDataEntity.find((i) => i.key === key);
    Swal.fire({
      title: 'Delete?',
      text:
        'Do you want to delete the file ' +
        '"' +
        fileDetails?.name +
        '"' +
        ' ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        /***************************************************************************** */

        // if (confirm('Do you want to deleted the image?')) {
        const index = this.uploadDataEntity.findIndex((i) => i.key === key);
        if (index > -1) {
          this.uploadDataEntity.splice(index, 1);
        }
        console.log('Deleted!! ==> ' + key);
        console.log(this.uploadDataEntity);
        // } else {
        //   console.log('Not-Deleted!');
        // }
        Swal.fire({
          title: 'The file ' + '"' + fileDetails?.name + '"' + ' has deleted!',
          text: 'deleted.',
          icon: 'success',
          allowOutsideClick: false,
        });
        this.toastrService.success(
          'The file ' + fileDetails?.name + ' has deleted!',
          '',
          {
            progressBar: true,
          }
        );
        this.setPhotoSelectionStatus();
      } else {
        console.log('Not-Deleted - ');
      }
    });
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
      if (this.uploadDataEntity.length > 0) {
        this.prjUtlService.setphotoUploadedValue(true);
      } else {
        this.prjUtlService.setphotoUploadedValue(false);
      }
    }, 100);
  }
}

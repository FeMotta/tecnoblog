import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(image: any, path: string) {
    return this.storage.upload(path, image);
  }

  updateImage(image: any, path: string) {
    return this.storage.ref(path).put(image);
  }

  getImage(path: string) {
    return this.storage.ref(path).getDownloadURL();
  }

  deleteImage(path: string) {
    return this.storage.ref(path).delete();
  }

}

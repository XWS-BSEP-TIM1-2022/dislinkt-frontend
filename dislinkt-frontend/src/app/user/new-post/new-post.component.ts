import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/service/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  textForm = new FormControl('', [Validators.required]);
  imageName: string = '';
  post = new Post();
  newLink: string = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem("userId");
    if (userId != null) {
      this.post.userId = userId;
    }
  }

  getTextErrorMessage() {
    return this.textForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  createPost() {
    if (this.post.userId == null || this.post.userId == "") {
      return;
    }

    this.postService.createPost(this.post).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Successfully created post',
            timer: 3000,
            showConfirmButton: false,
          })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    );
  }

  addLink() {
    if(this.newLink == '')  return;

    this.post.links.push(this.newLink);
    this.newLink = '';
  }

  readUploadedFileAsBytes(inputFile: any) {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject();
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  async uploadImage(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file.size >= 1048576) {
      Swal.fire({
        icon: 'error',
        title: "Image is too big, you can upload maximum 1MB",
        timer: 3000,
        showConfirmButton: false,
      })
      return;
    }
    this.imageName = file.name;

    try {
      const fileContents = await this.readUploadedFileAsBytes(file)
      if (typeof fileContents === 'string') {
        this.post.image = fileContents;
      }
    } catch (e) {
    }
  }
}

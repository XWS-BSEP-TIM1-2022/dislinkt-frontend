import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Reaction } from 'src/app/model/reaction.model';
import { User } from 'src/app/registration/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-likes-dialog',
  templateUrl: './likes-dialog.component.html',
  styleUrls: ['./likes-dialog.component.css']
})
export class LikesDialogComponent implements OnInit {

  users = [] as User[];

  constructor(public dialogRef: MatDialogRef<LikesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reaction[], public userService: UserService) { }

  ngOnInit(): void {
    this.data.forEach(x => this.userService.getUserData(x.userId).subscribe((data:any) =>
    {
      this.users.push(data.user);
    }))
  }

  cancel(): void {
    this.dialogRef.close();
  }
  
  get likes(){
    return this.data[0].type
  }

}

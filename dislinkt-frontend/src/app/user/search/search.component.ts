import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users: any
  searchParam = ""

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchParam = params.searchParam
    })

    this.search()
  }
  search() {
    this.userService.searchUser(this.searchParam).subscribe(
      (data: any) => {
        this.users = data.users
      },
      (error) => {
        this.users = []
      })
  }

}

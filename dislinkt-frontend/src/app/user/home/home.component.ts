import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchParam = ""

  constructor(private router: Router, public authService:AuthService) { }

  ngOnInit(): void {
  }

  search(){
    localStorage.setItem('searchParam', this.searchParam)
    this.router.navigateByUrl('/search')
  }

}

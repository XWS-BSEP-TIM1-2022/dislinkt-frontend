import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchParam = ""

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(){
    localStorage.setItem('searchParam', this.searchParam)
    this.router.navigateByUrl('/search')
  }

}

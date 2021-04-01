import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.less']
})
export class MainBoardComponent implements OnInit {

  constructor(private dataService: DataService) { }

  public postList;
  public filteredList;
  public userData;
  public activeUserDataRow: number;
  public inputQuery = '';
  public isMobile = window.matchMedia('(max-width: 576px)').matches;
  public isTablet = window.matchMedia('(min-width: 577px) and (max-width: 1100px)').matches;

  ngOnInit(): void {
    this.dataService.getPosts().pipe(
      map(posts => this.filterByResolution(posts))
    ).subscribe((posts) => {
      this.postList = posts;
      this.filteredList = posts;
    });
  }

  filterByResolution(posts) {
    if (this.isMobile) {
      return posts.slice(0, 1);
    } else if (this.isTablet) {
      return posts.slice(0, 2);
    } else {
      return posts.slice(0, 4);
    }
  }

  filterData() {
    let query = this.inputQuery.length >= 2 ? this.inputQuery : '';
    this.filteredList = this.postList.filter(post => post.title.indexOf(query) > -1);
  }

  getUserInfo(userId: number, rowIndex: number) {
    if (this.activeUserDataRow !== rowIndex) {
      this.userData = null;
      this.activeUserDataRow = rowIndex;
      this.dataService.getUser(userId).pipe(
        tap((userData) => {
          console.log(userData);
        })
      ).subscribe((userData) => {
        this.userData = userData;
      });
    }
  }
}

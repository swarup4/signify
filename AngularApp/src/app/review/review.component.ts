import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ReviewService } from './review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  dataSource: any = [];

  columnsToDisplay = ['author', 'review_source', 'title', 'review', 'rating', 'product_name', 'reviewed_date'];
  // date = new FormControl(new Date());

  ratings: any = [];
  reviewSource: any = [];
  totalCount: any = [];
  averageData: any = [];

  // date = '';

  filter: any = {
    rating: '',
    review_source: ''
  }

  constructor(private service: ReviewService) { }

  ngOnInit(): void {
    let filter = {}
    this.service.getReview(filter).subscribe((response) => {
      this.dataSource = response;
    });

    this.filterList();
    this.getTotalCount();
    this.getAverageList();
  }

  filterList() {
    this.service.getRatingList().subscribe((response: any) => {
      response.forEach((elem: any) => {
        let obj = {
          name: elem,
          val: elem
        }
        this.ratings.push(obj);
      });
    });

    this.service.getReviewSource().subscribe((response: any) => {
      response.forEach((elem: any) => {
        let obj = {
          name: elem,
          val: elem
        }
        this.reviewSource.push(obj);
      });
    });

    // this.service.getReview(filter).subscribe((response) => {
    //   this.dataSource = response;
    // });
  }

  selectFilter() {
    console.log(this.filter);

    Object.keys(this.filter).forEach((k) => this.filter[k] == "" && delete this.filter[k]);

    this.service.getReview(this.filter).subscribe((response) => {
      this.dataSource = response;
    });
  }

  selectDate(date: any) {
    this.filter.reviewed_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;;

    this.selectFilter();
  }

  getTotalCount(){
    this.service.getTotalCountList().subscribe(res => {
      this.totalCount = res;
    })
  }

  getAverageList(){
    this.service.getAverageList().subscribe(res => {
      this.averageData = res;
    })
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http : HttpClient) { }

  getReview(data: any){
    return this.http.post('http://localhost:3000/api/getData', data);
  }

  getRatingList(){
    return this.http.get('http://localhost:3000/api/getFilterList/rating');
  }

  getReviewSource(){
    return this.http.get('http://localhost:3000/api/getFilterList/review_source');
  }

  getTotalCountList(){
    return this.http.get('http://localhost:3000/api/getCount');
  }

  getAverageList(){
    return this.http.get('http://localhost:3000/api/getAverage');
  }
}

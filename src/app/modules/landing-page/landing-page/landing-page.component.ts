import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LandingPageService } from '../../../services/landing-page.service';
import { DatePipe } from '@angular/common';


interface article {
  title:string,
  description :string,
  urlToImage:string,
  url:string,
  publishedAt:string
}
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgFor,DatePipe,NgIf],
  templateUrl: './landing-page.component.html',
  styleUrls: []
})
export class LandingPageComponent implements OnInit{
  articles:article[]= []
  isLoading:boolean=true;


  constructor(private service:LandingPageService){

  }
  ngOnInit(): void {
   this.getNews();
  }






  getNews(): void {
    this.service.getAll().subscribe(
      (data: any) => {
        this.articles = data.articles
          .filter((article: any) => article.title !== "[Removed]")
          .slice(0, 6);
        this.isLoading=false;
        console.log(this.articles); 
      },
      (err) => {
        console.log(err); 
        this.isLoading=false;
      }
    );
  }


}

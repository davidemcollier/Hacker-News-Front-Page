import { Component } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {


  stories: object[] = [];
  storyLimit: number = 15;
  expandableAmount: number = 15;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getFeed("newstories");
  }

  getFeed(newsRequest: string) {
    this.stories = []; //Wipe stories array for every change.
    this.getStoriesIDs(newsRequest).subscribe((itemIDs) => {
      console.log(newsRequest + "has been entered to setFeed");

      for (let i = 0; i < itemIDs.length; i++) {
        this.getEachStoryItem(itemIDs[i]).subscribe((data) => {
          
          console.log(data.url);
          data.isExternalStory = this.storySourceWriter(data.title);
          console.log(data.isExternalStory + " " + data.title);
          
          if (data.hasOwnProperty("url")) {
            if (data.url.startsWith("https://www.youtube.com/")) {
              data.isVideoLink = true;

              //modify url for embedding
              data.url = this.modifyURLforEmbed(data.url);
             

              //sanitize url
              data.safeUrl = this.sanitizeUrl(data.url);
            } else {
              data.isVideoLink = false;
            }
          }
          console.log(JSON.stringify(data));
          this.stories.push(data);
        });
      }
    });
  }

  modifyURLforEmbed(url: string): string{
   return url.replace("watch?v=", "embed/");
  }

  storySourceWriter(title: string): boolean {
    if (title.startsWith("Ask HN")) {
      return false;
    } else {
      return true;
    }
  }

  expandItems() {
    if (
      this.stories.length - 1 > this.storyLimit &&
      this.storyLimit + 15 <= this.stories.length - 1
    ) {
    // adds 15 more stories to the feed each time
      this.storyLimit += 15;
    } else {
    //for the final iteration it adds whatever amount left
      this.storyLimit += this.stories.length - 1 - this.storyLimit;
    }
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getStoriesIDs(newsRequest: string): Observable<any> {
    return this.http.get(
      "https://hacker-news.firebaseio.com/v0/" +
        newsRequest +
        ".json?print=pretty"
    );
  }

  getEachStoryItem(itemID: number): Observable<any> {
    return this.http.get(
      "https://hacker-news.firebaseio.com/v0/item/" +
        itemID +
        ".json?print=pretty"
    );
  }
}

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    
    imports: [HttpClientTestingModule],
    
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

 
 
  
   it(`should modify the url if given YT link`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.modifyURLforEmbed("https://www.youtube.com/watch?v=LKp2gikIkD8&feature=emb_title")).toEqual("https://www.youtube.com/embed/LKp2gikIkD8&feature=emb_title");
  });
  
   it(`should return false if an 'Ask HN' story`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.storySourceWriter("Ask HN: Why does text jump around during images load? Is it a bug or a feature?")).toEqual(false);
  });
  
  
  
 
  
  
  
  
  
  
});

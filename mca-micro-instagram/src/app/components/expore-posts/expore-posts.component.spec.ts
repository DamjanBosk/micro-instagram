import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporePostsComponent } from './expore-posts.component';

describe('ExporePostsComponent', () => {
  let component: ExporePostsComponent;
  let fixture: ComponentFixture<ExporePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExporePostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExporePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

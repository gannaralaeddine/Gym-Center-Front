import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlanningComponent } from './details-planning.component';

describe('DetailsPlanningComponent', () => {
  let component: DetailsPlanningComponent;
  let fixture: ComponentFixture<DetailsPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPlanningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

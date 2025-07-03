import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDeleteComponent } from './pokemon-delete.component';

describe('PokemonDeleteComponent', () => {
  let component: PokemonDeleteComponent;
  let fixture: ComponentFixture<PokemonDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

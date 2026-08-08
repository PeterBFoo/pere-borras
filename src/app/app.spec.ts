import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('creates the portfolio', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('introduces Pere and highlights his experience', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('software that moves businesses forward');
    expect(element.querySelector('#experience')).toBeTruthy();
    expect(element.querySelector('a[href="mailto:borrasexposito@gmail.com"]')).toBeTruthy();
    expect(element.querySelector('a[href*="linkedin.com/in/"]')).toBeTruthy();
  });
});

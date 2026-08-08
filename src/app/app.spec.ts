import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    });

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

    expect(element.querySelector('h1')?.textContent).toContain(
      'software that moves businesses forward',
    );
    expect(element.querySelector('#experience')).toBeTruthy();
    expect(element.querySelector('a[href="mailto:borrasexposito@gmail.com"]')).toBeTruthy();
    expect(element.querySelector('a[href*="linkedin.com/in/"]')).toBeTruthy();
  });

  it('loads Spanish when it is the browser language', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'es-ES',
    });

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('software que impulsa el negocio');
    expect(document.documentElement.lang).toBe('es');
  });

  it('switches language and remembers the manual choice', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const languageToggle = element.querySelector<HTMLButtonElement>('.language-toggle');

    languageToggle?.click();
    fixture.detectChanges();

    expect(element.querySelector('h1')?.textContent).toContain('software que impulsa el negocio');
    expect(languageToggle?.getAttribute('aria-label')).toBe('Cambiar el idioma a inglés');
    expect(localStorage.getItem('pere-borras-language')).toBe('es');
  });
});

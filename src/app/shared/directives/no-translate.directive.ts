import { Directive, HostBinding } from '@angular/core';

@Directive({
  // Cible les icônes Google et FontAwesome
  selector: 'fa-icon, .material-icons, .material-symbols-outlined',
  standalone: true 
})
export class NoTranslateDirective {
  @HostBinding('attr.translate') translate = 'no';
  @HostBinding('class.notranslate') noTranslateClass = true;
}
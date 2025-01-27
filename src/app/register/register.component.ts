import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewSpenderData } from './spender.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() add = new EventEmitter<NewSpenderData>();
  submitted = false;
  currentPage: number = 1;

  // Spenden-Datenstruktur
  spenden = {
    type: '',// 'pickup' oder 'office'
    vorName: '',
    nachName: '',
    kleidungstype: '',
    krisengebiet: '',
    strasse: '',
    plz: '',
    ort: '',
    email: '',
    date: '',
    time: '',
    bestaetigen: false
  }
  currentDate: string = '';
  currentTime: string = '';
  // Auswahlmöglichkeiten
  krisengebiets = ['Region A', 'Region B', 'Region C'];
  kleidungstypes = ['T-Shirts', 'Hosen', 'Jacken', 'Schuhe'];

  constructor(private router: Router) { }
  /**
     * Formular absenden
     */
  submitForm() {
    const errors: string[] = [];

    // Validierung basierend auf dem Spendentyp
    if (this.spenden.type === 'office') {
      this.validateCommonFields(errors);
    } else if (this.spenden.type === 'pickup') {
      this.validateCommonFields(errors);

      // Validierung der Postleitzahl
      if (!this.spenden.plz || !this.isAddressValid(this.spenden.plz)) {
        errors.push(
          'Die Postleitzahl muss angegeben werden und in der Nähe der Geschäftsstelle liegen.'
        );
      }
    } else {
      errors.push('Bitte wählen Sie die Art der Übergabe aus (Abholung oder Übergabe an der Geschäftsstelle).');
    }

    // Fehler ausgeben, falls vorhanden
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    // Erfolgreiche Registrierung
    this.logSuccess();
  }

  /**
   * Validierung der allgemeinen Felder (Datum, Uhrzeit, Kleidungsart, Krisengebiet) 
   * und Spender muss Eingabe bestätigen
   */
  private validateCommonFields(errors: string[]): void {
    const now = new Date();

    if (!this.spenden.date) {
      errors.push('Bitte geben Sie ein Datum an.');
    } else {
      const selectedDate = new Date(this.spenden.date + 'T' + (this.spenden.time || '00:00'));
      if (selectedDate <= now) {
        errors.push('Das Datum und die Uhrzeit müssen in der Zukunft liegen.');
      }
    }

    if (!this.spenden.time) {
      errors.push('Bitte geben Sie eine Uhrzeit an.');
    }
    if (!this.spenden.kleidungstype) {
      errors.push('Bitte geben Sie die Art der Kleidung an.');
    }
    if (!this.spenden.krisengebiet) {
      errors.push('Bitte wählen Sie ein Krisengebiet aus.');
    }
    if (!this.spenden.bestaetigen) {
      errors.push('Bitte bestätigen Sie, dass Ihre Angaben korrekt sind.');
    }
  }

  /**
   * Validierung der Postleitzahl
   */
  private isAddressValid(plz: string): boolean {
    const officePostalCode = '1234'; // Postleitzahl der Geschäftsstelle
    if (!plz) {
      return false;
    }
    const donorPostalCode = plz.split(' ')[0]; // PLZ ohne Leerzeichen
    return donorPostalCode.startsWith(officePostalCode.substring(0, 2));
  }

  /**
   * Erfolgsmeldung ausgeben und Spende loggen
   */
  private logSuccess(): void {
    console.log('Erfolgreich registriert:', this.spenden);
    alert(`Ihre Kleiderspende wurde erfolgreich registriert:\n${JSON.stringify(this.spenden, null, 2)}`);
    this.router.navigate(['/bestaetigung'], { state: { donation: this.spenden } });
    this.add.emit({
      vorname: this.spenden.vorName,
      nachname: this.spenden.nachName,
      kleidungsType: this.spenden.kleidungstype,
      krisenGebiet: this.spenden.krisengebiet,
      Date: this.spenden.date,
      Time: this.spenden.time,
      Plz: this.spenden.plz,
      Ort: this.spenden.ort,
      Email: this.spenden.email,
    });
  }

  /**
   * Registrierung abbrechen und zur Startseite navigieren
   */
  onCancel(): void {
    this.router.navigate(['/']);
  }


  onPrevious(): void {
    if (this.currentPage > 1) this.currentPage--;
  }
  onNext(): void {
    if (this.currentPage === 1) this.currentPage++;
  }

}

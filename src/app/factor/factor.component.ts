import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-factor',
  templateUrl: './factor.component.html',
  styleUrls: ['./factor.component.scss']
})
export class FactorComponent implements OnInit {

  public factorForm!: FormGroup;
  public factors: { [key: string]: any } | null = null;
  public factorKeys: number[] = [];

  public get formVal() {
    return this.factorForm?.get('value')?.value ?? null;
  }

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initialiseForm();
    this.subscribeToValueChanges();
  }

  /**
   * Adds a valueChanges subscription to the form control
   */
  private subscribeToValueChanges(): void {
    if (this.factorForm == null) return;

    this.factorForm.get('value')?.valueChanges.subscribe(
      (val: number | null) => {
        if (val !== null) {
          this.factors = null;
          this.factorKeys = [];
        }
      }
    );
  }

  /**
   * Initialise the form group
   */
  private initialiseForm(): void {
    this.factorForm = this.formBuilder.group({
      value: [null, Validators.required]
    })
  }

  /**
   * If the form is valid, grab the value and call calculateFactors
   */
  public onSubmit(): void {
    const { value } = this.factorForm?.value;
    
    if (value == null || isNaN(value)) return;
    
    this.calculateFactors(value);
  }

  /**
   * Calculate the factors of a given value
   */
  private calculateFactors(val: number): void {
    const factors: { [key: string]: any } = {};

    for (let factor: number = 1; factor <= val; factor++) {
      if (val%factor === 0 && !factors.hasOwnProperty(val / factor)) {
        factors[factor] = val / factor;
      }
    }

    this.factors = {...factors};
    this.factorKeys = Object.keys(factors).map(val => Number(val)).sort((a, b) => <number>(a-b))
  }
}

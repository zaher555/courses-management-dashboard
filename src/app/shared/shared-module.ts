import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextModule,
    SelectModule,
    ConfirmDialogModule,
    ToastModule,
    InputNumberModule,
    TextareaModule,
    SkeletonModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextModule,
    SelectModule,
    ConfirmDialogModule,
    ToastModule,
    InputNumberModule,
    TextareaModule,
    SkeletonModule
  ]
})
export class SharedModule { }

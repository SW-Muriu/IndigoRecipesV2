import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormField, MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatFormField,
        MatInputModule,
        MatIconButton,
        // BrowserModule
        // BrowserAnimationsModule,
        // MatFormFieldControl

    ],
    exports: [
        // FormsModule,
        // BrowserModule, 
        // BrowserAnimationsModule,
        HttpClientModule,
        MatFormField,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatIconButton,
        // MatTableExporterModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatCheckboxModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatListModule,
        MatCheckboxModule,
        MatStepperModule,
        MatDatepickerModule,
        // MatFormFieldControlModule
        // MatFormFieldControl


    ]

})
export class SharedModule { }
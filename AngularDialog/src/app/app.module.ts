import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AppComponent }   from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

// иконки
import { MatIconModule } from '@angular/material/icon';
// фильтр
import { MatInputModule } from '@angular/material/input';
import{MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
//пагинация
import { MatPaginatorModule } from '@angular/material/paginator';
//сортировка
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// дилоги
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    imports:      [ 
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        MatDialogModule,

        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FlexLayoutModule
    ],

    exports:[ MatTableModule, MatSortModule, MatPaginatorModule, MatDialogModule, MatFormFieldModule],
    declarations: [ AppComponent,DialogComponent ],
    providers: [],
    entryComponents: [DialogComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
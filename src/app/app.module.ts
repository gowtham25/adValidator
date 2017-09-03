import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HarFileServiceService } from './har-file-service.service';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { HarFileUploadComponent } from './har-file-upload/har-file-upload.component';
import { DatatableReprComponent } from './datatable-repr/datatable-repr.component';
import { ScriptTagLoadComponent } from './script-tag-load/script-tag-load.component';
import { MychartComponent } from './mychart/mychart.component';


@NgModule({
  declarations: [
    AppComponent,
    HarFileUploadComponent,
    DatatableReprComponent,
    ScriptTagLoadComponent,
    MychartComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    ChartsModule
  ],
  providers: [HarFileServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

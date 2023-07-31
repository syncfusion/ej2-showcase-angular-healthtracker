import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxAllModule, RadioButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { MultiSelectAllModule, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogAllModule, TooltipAllModule } from '@syncfusion/ej2-angular-popups';
import { DateRangePickerModule, DateRangePickerAllModule, DatePickerAllModule, TimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { routing } from './app.router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { CommonService } from './common/common.service';
import { DashBoardService } from './dashboard/dashboard.service';

@NgModule({
    imports: [
        routing,
        GridModule,
        PagerModule,
        BrowserModule,
        ChartAllModule,
        DialogAllModule,
        CheckBoxAllModule,
        DatePickerAllModule,
        TimePickerAllModule,
        MultiSelectAllModule,
        RadioButtonAllModule,
        DateRangePickerModule,
        DropDownListAllModule,
        NumericTextBoxAllModule,
        DateRangePickerAllModule,
        AccumulationChartAllModule
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        DashBoardComponent,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        CommonService,
        DashBoardService,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ]
})
export class AppModule { }

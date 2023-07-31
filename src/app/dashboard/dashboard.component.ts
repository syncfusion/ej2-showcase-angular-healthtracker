import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';

import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { ILoadedEventArgs, IPointEventArgs, IMouseEventArgs, Index, indexFinder, getElement, ChartComponent, Chart, Double } from '@syncfusion/ej2-angular-charts';
import { monday, tuesday, wednesday, thursday, friday, saturday, sunday } from './datasource';
import { EmitType } from '@syncfusion/ej2-base';
import {
    AccumulationChartComponent, IAccResizeEventArgs, AccumulationChart, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-angular-charts';

import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
// import { PieChartComponent } from './pie-chart/pie-chart.component';

import { DashBoardService } from './dashboard.service';
import { CommonService } from '../common/common.service';

@Component({
    templateUrl: 'dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [DashBoardService, CommonService]
})
export class DashBoardComponent implements OnInit {
    // tslint:disable:max-line-length
    // tslint:disable:no-string-literal
    // @ViewChild('pieChart') pieChart: PieChartComponent;
    @ViewChild('lineChart')
    lineChart!: ChartComponent;
    @ViewChild('splineChart')
    splineChart!: ChartComponent;
    @ViewChild('bubbleChart')
    bubbleChart!: ChartComponent;
    @ViewChild('columnChart')
    columnChart!: ChartComponent;
    @ViewChild('pie')
    pie!: AccumulationChartComponent | AccumulationChart;
    @ViewChild('multiplepie')
    multiplepie!: AccumulationChartComponent | AccumulationChart;
    @ViewChild('polarChart')
    polarChart!: ChartComponent;
    @ViewChild('sleepChart')
    sleepChart!: AccumulationChartComponent | AccumulationChart;

    public selectedpoint: Boolean = false;
    public tooltipMappingName: string = 'time';
    public animation!: Object;
    public pointindex: number = 5;
    public marker!: Object;
    public splinemarker!: Object;
    public columnmarker!: Object;
    public bubblemarker!: Object;
    public polarmarker!: Object;
    public tooltip!: Object;
    public polarTooltip!: Object;
    public sleepTooltip!: Object;
    public splineTooltip!: Object;
    public bubbleTooltip!: Object;
    public columnTooltip!: Object;
    public selectedDataIndexes!: Object[];
    public columnborder!: Object;
    public cborder!: Object;
    public bborder!: Object;
    public wborder!: Object;
    public chartArea!: Object;
    public caloriesdata!: Object[];
    public splinedata!: Object[];
    public polardata: any= [{ text: '00:00 - 3:00', x: '00:00', y: 0 },
    { text: '03:00 - 6:00', x: '3:00', y: 0 },
    { text: '06:00 - 9:00', x: '6:00', y: 0 },
    { text: '09:00 - 12:00', x: '9:00', y: 1 },
    { text: '12:00 - 15:00', x: '12:00', y: 1.5 },
    { text: '15:00 - 18:00', x: '15:00', y: 2},
    { text: '18:00 - 21:00', x: '18:00', y: 1.5 },
    { text: '21:00 - 24:00', x: '21:00', y: 0.75 }];
    public polarchartdata!: Object[];
    public calpiedata!: Object[];
    public sleepdata!: Object[];
    public bubbledata!: Object[];
    public columndata!: Object[];
    public primaryXAxis!: Object;
    public polarPrimaryXAxis!: Object;
    public columnPrimaryXAxis!: Object;
    public splinePrimaryXAxis!: Object;
    public bubblePrimaryXAxis!: Object;
    public primaryYAxis!: Object;
    public columnPrimaryYAxis!: Object;
    public polarPrimaryYAxis!: Object;
    public splinePrimaryYAxis!: Object;
    public bubblePrimaryYAxis!: Object;
    public legendSettings!: Object;
    public enableAnimation!: Boolean;
    public polarEnableAnimation!: Boolean;
    public background!: string;
    public startAngle!: number;
    public stepstartAngle!: number;
    public sleepStartAngle!: number;
    public sleepEndAngle!: number;
    public endAngle!: number;
    public stependAngle!: number;
    public explode: Boolean = false;
    public palettes!: string[];
    public steppalettes!: string[];
    public sleeppalettes!: string[];
    public cornerRadius!: Object;
    public annotationpie1!: AccumulationChart;
    public annotationpie2!: AccumulationChart;
    public annotationpie1data : Object[] = (<{ Exercise: Object[] }>sunday[0]).Exercise;
    public annotationpie2data : Object[] = (<{ Hours: Object[] }>sunday[0]).Hours;
    public annotation: boolean = true;
    public steppiedata!: Object[];
    public yValue: number = 0;
    public yValue1 : number = 0;
    public yValue2 : number = 0;
    public yValue3 : number = 0;
    public yValue4 : number = 0;
    public yValue5 : number = 0;
    public yValue6 : number = 0;
    public yValue7 : number = 0;
    public yValue8 : number = 0;

    constructor(
        public app: AppComponent,
        public dashService: DashBoardService,
        public common: CommonService,
        public menu: MenuComponent
    ) {
        this.common.removeRootClass();
        this.common.addRootClass('dashboard-page');
    }

    public ngOnInit(): void {

        /** Configurations for the components in the DashBoard page */
        this.primaryXAxis = {
            valueType: 'Category',
            labelFormat: 'y',
            labelPlacement: 'OnTicks',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        };
        this.polarPrimaryXAxis = {
            valueType: 'Category',
            labelPlacement: 'OnTicks', interval: 1,
        };
        this.bubblePrimaryXAxis = {
            valueType: 'Category',
            labelFormat: 'y',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        };
        this.bubblePrimaryYAxis = {
            labelFormat: '{value} hrs',
            rangePadding: 'None',
            minimum: 2,
            maximum: 10,
            interval: 1,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
        };
        this.splinePrimaryXAxis = {
            valueType: 'Category',
            labelFormat: 'y',
            edgeLabelPlacement: 'Shift',
            labelPlacement: 'OnTicks',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        };
        this.splinePrimaryYAxis = {
            labelFormat: '{value} ltr',
            rangePadding: 'None',
            minimum: 2,
            maximum: 10,
            interval: 1,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            stripLines: [{ start: 7, sizeType: 'Pixel', size: 1, color: '#3B61E9', dashArray: '5,5', text: 'Target', textStyle: { color: '#3B61E9' }, horizontalAlignment: 'End', verticalAlignment: 'End' }]
        };
        this.columnPrimaryXAxis = {
            valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 },
        };
        this.primaryYAxis = {
            labelFormat: '{value} cal',
            rangePadding: 'None',
            minimum: 0,
            maximum: 3500,
            interval: 500,
            stripLines: [{
                start: 2800, sizeType: 'Pixel', dashArray: '3,3', size: 1, color: '#D93237', text: 'Daily Average 2800 cal',
                textStyle: { color: '#D93237', size: '12px', fontFamily: 'Roboto', fontWeight: '500' }, horizontalAlignment: 'End', verticalAlignment: 'End'
            },
            {
                start: 2000, sizeType: 'Pixel', dashArray: '3,3', size: 1, color: '#760104', text: 'Today 2000 cal',
                textStyle: { color: '#760104', size: '12px', fontFamily: 'Roboto', fontWeight: '500' }, horizontalAlignment: 'End', verticalAlignment: 'End'
            }],
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        };
        this.columnPrimaryYAxis = {
            majorTickLines: { width: 0 }, lineStyle: { width: 0 },
            stripLines: [{ start: 9000, sizeType: 'Pixel', size: 1, dashArray: '5,5', color: '#BB830D', text: 'Goal 9000 Steps', textStyle: { color: '#BB830D', size: '12px', fontFamily: 'Roboto', fontWeight: '500' }, horizontalAlignment: 'End', verticalAlignment: 'End' }]
        };
        this.polarPrimaryYAxis = {
            labelFormat: '{value}L',
        };
        this.tooltip = {
            enable: true, header: '${point.x}', format: '${point.y}<br>Click to View More Details'
        };
        this.splinemarker = {
             visible: true, shape: 'Circle', width: 8, height: 8, border: {width: 2, color: '#484848' }
        };
        this.bubblemarker = {
            visible: false, border: { color: '#F38181' }, width: 10, height: 10
        };
        this.columnmarker = { visible: false };
        this.sleepTooltip = {
            enable: true, header: '${point.x}', format: '${point.tooltip}',
        };
        this.bubbleTooltip = {
            enable: true, format: '${point.y}', enableMarker: false
        };
        this.polarTooltip = {
            enable: true,
            enableMarker: false,
            format: 'Click to Add Water',
        };
        this.selectedDataIndexes = [
            { series: 0, point: 5},
        ];
        this.animation = { enable: true};
        this.background = 'transparent';
        this.chartArea = {
            border: { width: 0 }
        };
        this.cborder = { color: '#F23D3A', width: 2 };
        this.bborder = { width: 2 };
        this.marker = {
            visible: true,
            fill: '#FCE38A',
            border: { color: '#F38181' },
            width: 10,
            height: 10
        };
        this.polarmarker = {
            dataLabel: { name: 'text' }
        };
        this.caloriesdata = [
            { x: 'sunday', y: 1200 }, { x: 'Monday', y: 1800 }, { x: 'Tuesday', y: 2850 }, { x: 'Wednesday', y: 1900 }, { x: 'Thursday', y: 2500 }, { x: 'Friday', y: 1650 }, { x: 'Saturday', y: 1300 }
        ];
        this.splinedata = [
            { x: 'Sunday', y: 5 }, { x: 'Monday', y: 6 }, { x: 'Tuesday', y: 4.5 }, { x: 'Wednesday', y: 5.5 }, { x: 'Thursday', y: 7.2 }, { x: 'Friday', y: 4.5 }, { x: 'Saturday', y: 6 }
        ];
        this.bubbledata = [
            { x: 'Sunday', y: 9, size: 4.837 }, { x: 'Monday', y: 6, size: 2.347 }, { x: 'Tuesday', y: 6, size: 2.347 }, { x: 'Wednesday', y: 7, size: 3.527 },
            { x: 'Thursday', y: 8, size: 4.047 }, { x: 'Friday', y: 5, size: 1.582 }, { x: 'Saturday', y: 9, size: 4.837 }
        ];
        this.columndata = [{ x: 'Sunday', y: 8900 }, { x: 'Monday', y: 7200 }, { x: 'Tuesday', y: 9100 }, { x: 'Wednesday', y: 6200 }, { x: 'Thursday', y: 7000 },
                           { x: 'Friday', y: 8000 }, { x: 'Saturday', y: 5500 }
        ];
        this.cornerRadius = {
            topLeft: 10, topRight: 10
        };
        this.polarchartdata = [{ text: '00:00 - 3:00', x: '00:00', y: 0 },
        { text: '03:00 - 6:00', x: '3:00', y: 0 },
        { text: '06:00 - 9:00', x: '6:00', y: 0 },
        { text: '09:00 - 12:00', x: '9:00', y: 1 },
        { text: '12:00 - 15:00', x: '12:00', y: 1.5 },
        { text: '15:00 - 18:00', x: '15:00', y: 2},
        { text: '18:00 - 21:00', x: '18:00', y: 1.5 },
        { text: '21:00 - 24:00', x: '21:00', y: 0.75 }];
        this.startAngle = 220;
        this.stepstartAngle = 180;
        this.stependAngle = 180;
        this.sleepStartAngle = 270;
        this.sleepEndAngle = 90;
        this.endAngle = 150;
        this.palettes = ['#FFE547', '#FFAE2B', '#FF7536', '#FF6111', '#CD171C', '#760104'];
        this.sleeppalettes = ['#6137E3', '#392178', '#9572FF', '#4F2BAF', '#392178', '#9572FF', '#6137E3', '#4F2BAF', '#392178'];
        this.steppalettes = ['#078411', 'LightGrey'];
        this.legendSettings = {
            visible: false
        };
        this.enableAnimation = true;
        this.polarEnableAnimation = false;
        this.sleepdata = [
            { x: 'Light sleep', y: 10, time: '10:30 pm - 11:24 pm' }, { x: 'Deep sleep', y: 20, time: '11:24 am - 1:12 am' },
            { x: 'Awake', y: 2.5, time: '1:12 am - 1:25 am' }, { x: 'REM', y: 5, time: '1:25 am - 1:52 am' },
            { x: 'Deep sleep', y: 22, time: '1:52 am - 3:45 am' }, { x: 'Awake', y: 2.5, time: '3:45 am - 3.58 am' },
            { x: 'Light sleep', y: 15, time: '3:58 am - 5.20 am' }, { x: 'REM', y: 5, time: '5:20 am - 5:47 am' },
            { x: 'Deep sleep', y: 18, time: '5:47 am - 7:30 am' }
        ];
        this.steppiedata = [
            { x: 'Steps', y: 18, text: '18%' }, { x: 'Legal', y: 8, text: '8%' }
        ];
        this.calpiedata = [{ 'x': 'Protein', 'y': 30, 'r': '100', text: '25%' }, { 'x': 'Fat', 'y': 12.5, 'r': '110', text: '12.5%' }, { 'x': 'Fiber', 'y': 12.5, 'r': '115', text: '12.5%' },
        { 'x': 'Calcium', 'y': 10, 'r': '125', text: '50%' }, { 'x': 'Carbs', 'y': 20, 'r': '125', text: '50%' }, { 'x': 'Vitamins', 'y': 30, 'r': '125', text: '50%' }];
    }

    public polarpointMove: EmitType<IPointEventArgs> = (args: IPointEventArgs) => {
        let point: any = getElement('water-polar_Series_' + args.seriesIndex + '_Point_' + args.pointIndex );
        if (point) {
            point.setAttribute('cursor', 'pointer');
        }
    }
    public bubblepointMove: EmitType<IPointEventArgs> = (args: IPointEventArgs) => {
        let point: any = getElement( 'bubble-balance_Series_' + args.seriesIndex + '_Point_' + args.pointIndex );
        if (point) {
            point.setAttribute('cursor', 'pointer');
        }
    }
    public polarmouseclick: EmitType<IPointEventArgs> = (args: IPointEventArgs) => {
        this.selectedpoint = true;
        this.pointindex = args.pointIndex;
        this.yValue = 0;
        if (getElement('water-polar_Series_' + args.seriesIndex + '_Point_' + args.pointIndex)) {
            (document.getElementById('water50ml-column') as HTMLElement).style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            (document.getElementById('water100ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water200ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water300ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water50ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-columnactive';
            (document.getElementById('water100ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
            (document.getElementById('water200ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
            (document.getElementById('water300ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
            (document.getElementById('iconml-img') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('iconml1-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml2-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml3-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext1') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('imgtext2') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext3') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext4') as HTMLElement).style.color = '#5B5B5B';
            this.pie.series[0].animation!.enable = false;
        }
    }
    public bubblemouseclick: EmitType<IMouseEventArgs> = (args: IMouseEventArgs) => {
        let index: Index = indexFinder(args.target);
        if (getElement('bubble-balance_Series_' + index.series + '_Point_' + index.point)) {
            switch (index.point) {
                case 0:
                        this.sleepChart.series[0].dataSource = (<{ sleep: Object[] }>sunday[0]).sleep;
                        this.sleepChart.loaded = (args: IAccLoadedEventArgs) => {
                        (document.getElementById('leftcontent') as HTMLElement).innerHTML = '10:30 pm';
                        (document.getElementById('rightcontent') as HTMLElement).innerHTML = '7:30 am';
                        (document.getElementById('time') as HTMLElement).innerHTML = '9';
                        (document.getElementById('deephour') as HTMLElement).innerHTML = '5h 24 mins';
                        (document.getElementById('lighthour') as HTMLElement).innerHTML = '2h 15 mins ';
                        (document.getElementById('awakehour') as HTMLElement).innerHTML = '27 mins';
                        (document.getElementById('remhour') as HTMLElement).innerHTML = '54 mins ';
                    };
                    break;
                case 1:
                        this.sleepChart.series[0].dataSource = (<{ sleep: Object[] }>monday[0]).sleep;
                        this.sleepChart.loaded = (args: IAccLoadedEventArgs) => {
                        (document.getElementById('leftcontent') as HTMLElement).innerHTML = '11:40 pm';
                        (document.getElementById('rightcontent') as HTMLElement).innerHTML = '5:40 am';
                        (document.getElementById('time') as HTMLElement).innerHTML = '6';
                        (document.getElementById('deephour') as HTMLElement).innerHTML = '3h 54 mins ';
                        (document.getElementById('lighthour') as HTMLElement).innerHTML = '1h 22 mins ';
                        (document.getElementById('awakehour') as HTMLElement).innerHTML = '18 mins';
                        (document.getElementById('remhour') as HTMLElement).innerHTML = '36 mins ';
                    };
                    break;
                case 2:
                        this.sleepChart.series[0].dataSource = (<{ sleep: Object[] }>tuesday[0]).sleep;
                        this.sleepChart.loaded = (args: IAccLoadedEventArgs) => {
                        (document.getElementById('leftcontent') as HTMLElement).innerHTML = '9:30 pm';
                        (document.getElementById('rightcontent') as HTMLElement).innerHTML = '4:30 am';
                        (document.getElementById('time') as HTMLElement).innerHTML = '6';
                        (document.getElementById('deephour') as HTMLElement).innerHTML = '3h 54 mins';
                        (document.getElementById('lighthour') as HTMLElement).innerHTML = '1h 30 mins';
                        (document.getElementById('awakehour') as HTMLElement).innerHTML = '18 mins';
                        (document.getElementById('remhour') as HTMLElement).innerHTML = '18 mins';
                    };
                    break;
                case 3:
                        this.sleepChart.series[0].dataSource = (<{ sleep: Object[] }>wednesday[0]).sleep;
                        this.sleepChart.loaded = (args: IAccLoadedEventArgs) => {
                        (document.getElementById('leftcontent') as HTMLElement).innerHTML = '10:30 pm';
                        (document.getElementById('rightcontent') as HTMLElement).innerHTML = '6:30 am';
                        (document.getElementById('time') as HTMLElement).innerHTML = '7';
                        (document.getElementById('deephour') as HTMLElement).innerHTML = '3h 51 mins';
                        (document.getElementById('lighthour') as HTMLElement).innerHTML = '2h 06 mins';
                        (document.getElementById('awakehour') as HTMLElement).innerHTML = '21 mins';
                        (document.getElementById('remhour') as HTMLElement).innerHTML = '42 mins';
                    };
                    break;
                case 4:
                        this.sleepChart.series[0].dataSource = (<{ sleep: Object[] }>thursday[0]).sleep;
                        this.sleepChart.loaded = (args: IAccLoadedEventArgs) => {
                        (document.getElementById('leftcontent') as HTMLElement).innerHTML = '11:00 pm';
                        (document.getElementById('rightcontent') as HTMLElement).innerHTML = '7:00 am';
                        (document.getElementById('time') as HTMLElement).innerHTML = '8';
                        (document.getElementById('deephour') as HTMLElement).innerHTML = '4h 48 mins ';
                        (document.getElementById('lighthour') as HTMLElement).innerHTML = '2h 24 mins ';
                        (document.getElementById('awakehour') as HTMLElement).innerHTML = '24 mins';
                        (document.getElementById('remhour') as HTMLElement).innerHTML = '24 mins ';
                    };
                    break;
                case 5:
                    this.sleepChart.series[0].dataSource = (<{ sleep: Object[] }>friday[0]).sleep;
                    this.sleepChart.loaded = (args: IAccLoadedEventArgs) => {
                        (document.getElementById('leftcontent') as HTMLElement).innerHTML = '11:40 pm';
                        (document.getElementById('rightcontent') as HTMLElement).innerHTML = '4:40 am';
                        (document.getElementById('time') as HTMLElement).innerHTML = '5';
                        (document.getElementById('deephour') as HTMLElement).innerHTML = '3h 45 mins ';
                        (document.getElementById('lighthour') as HTMLElement).innerHTML = '45 mins ';
                        (document.getElementById('awakehour') as HTMLElement).innerHTML = '15 mins';
                        (document.getElementById('remhour') as HTMLElement).innerHTML = '15 mins ';
                    };
                    break;
                case 6:
                    this.sleepChart.series[0].dataSource = (<{ sleep: Object[] }>saturday[0]).sleep;
                    this.sleepChart.loaded = (args: IAccLoadedEventArgs) => {
                        (document.getElementById('leftcontent') as HTMLElement).innerHTML = '9:40 pm';
                        (document.getElementById('rightcontent') as HTMLElement).innerHTML = '6:40 am';
                        (document.getElementById('time') as HTMLElement).innerHTML = '9';
                        (document.getElementById('deephour') as HTMLElement).innerHTML = '6h 18 mins';
                        (document.getElementById('lighthour') as HTMLElement).innerHTML = '1h 48 mins ';
                        (document.getElementById('awakehour') as HTMLElement).innerHTML = '27 mins';
                        (document.getElementById('remhour') as HTMLElement).innerHTML = '27 mins ';
                    };
                    break;
            }
            this.sleepChart.refresh();
        }
    }
    public columnpointMove: EmitType<IPointEventArgs> = (args: IPointEventArgs) => {
        let point: any = getElement('column-balance_Series_' + args.seriesIndex + '_Point_' + args.pointIndex );
        if (point) {
            point.setAttribute('cursor', 'pointer');
        }
    }
    public columnmouseclick: EmitType<IMouseEventArgs> = (args: IMouseEventArgs) => {
        let index: Index = indexFinder(args.target);
        if (getElement('column-balance_Series_' + index.series + '_Point_' + index.point)) {
            switch (index.point) {
                case 0:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>sunday[0]).Steps;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Sunday Activity';
                    (document.getElementById('stepstext') as HTMLElement).innerHTML = '8200';
                    (document.getElementById('exercise') as HTMLElement).innerHTML = '15';
                    (document.getElementById('active') as HTMLElement).innerHTML = '7';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500 ;font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">2200</p><p id="step-value" style="font-family: Roboto;font-weight:500;font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>sunday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>sunday[0]).Hours;
                    break;
                case 1:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>monday[0]).Steps;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Monday Activity';
                    (document.getElementById('stepstext') as HTMLElement).innerHTML = '7300';
                    (document.getElementById('exercise') as HTMLElement).innerHTML = '16';
                    (document.getElementById('active') as HTMLElement).innerHTML = '6';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto;font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">1500</p><p id="step-value" style="font-family: Roboto; font-weight:500; font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>monday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>monday[0]).Hours;
                    break;
                case 2:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>tuesday[0]).Steps;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Tuesday Activity';
                    (document.getElementById('stepstext') as HTMLElement).innerHTML = '7800';
                    (document.getElementById('exercise') as HTMLElement).innerHTML = '20';
                    (document.getElementById('active') as HTMLElement).innerHTML = '5';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">3300</p><p id="step-value" style="font-family: Roboto; font-weight:500; font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>tuesday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>tuesday[0]).Hours;
                    break;
                case 3:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>wednesday[0]).Steps;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Wednesday Activity';
                    (document.getElementById('stepstext') as HTMLElement).innerHTML = '6800';
                    (document.getElementById('exercise') as HTMLElement).innerHTML = '16';
                    (document.getElementById('active') as HTMLElement).innerHTML = '3';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">1200</p><p id="step-value" style="font-family: Roboto; font-weight:500; font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>wednesday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>wednesday[0]).Hours;
                    break;
                case 4:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>thursday[0]).Steps;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Thursday Activity';
                    (document.getElementById('stepstext') as HTMLElement).innerHTML = '7000';
                    (document.getElementById('exercise') as HTMLElement).innerHTML = '10';
                    (document.getElementById('active') as HTMLElement).innerHTML = '7';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">1300</p><p id="step-value" style="font-family: Roboto; font-weight:500; font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>thursday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>thursday[0]).Hours;
                    break;
                case 5:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>friday[0]).Steps;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Friday Activity';
                    (document.getElementById('stepstext') as HTMLElement).innerHTML = '6900';
                    (document.getElementById('exercise') as HTMLElement).innerHTML = '22';
                    (document.getElementById('active') as HTMLElement).innerHTML = '4';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">1800</p><p id="step-value" style="font-family: Roboto; font-weight:500;font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>friday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>friday[0]).Hours;
                    break;
                case 6:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>saturday[0]).Steps;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Saturday Activity';
                    (document.getElementById('stepstext') as HTMLElement).innerHTML = '7200';
                    (document.getElementById('exercise') as HTMLElement).innerHTML = '17';
                    (document.getElementById('active') as HTMLElement).innerHTML = '4';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">1300</p><p id="step-value" style="font-family: Roboto;font-weight:500; font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>saturday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>saturday[0]).Hours;
                    break;
            }
            this.multiplepie.refresh();
        }
    }
    public splinepointMove: EmitType<IPointEventArgs> = (args: IPointEventArgs) => {
        let point: any = getElement('balance_Series_' + args.seriesIndex + '_Point_' + args.pointIndex );
        if (point) {
            point.setAttribute('cursor', 'pointer');
        }
    }
    public splinemouseclick: EmitType<IPointEventArgs> = (args: IPointEventArgs) => {
        this.selectedpoint = false;
        if (getElement('balance_Series_' + args.seriesIndex + '_Point_' + args.pointIndex + '_Symbol')) {
            switch (args.pointIndex) {
                case 0:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>sunday[0]).water;
                    this.polardata = (<{ water: Object[] }>sunday[0]).water;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Sunday Activity';
                    break;
                case 1:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>monday[0]).water;
                    this.polardata = (<{ water: Object[] }>monday[0]).water;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Monday Activity';
                    break;
                case 2:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>tuesday[0]).water;
                    this.polardata = (<{ water: Object[] }>tuesday[0]).water;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Tuesday Activity';
                    break;
                case 3:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>wednesday[0]).water;
                    this.polardata = (<{ water: Object[] }>wednesday[0]).water;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Wednesday Activity';
                    break;
                case 4:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>thursday[0]).water;
                    this.polardata = (<{ water: Object[] }>thursday[0]).water;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Thursday Activity';
                    break;
                case 5:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>friday[0]).water;
                    this.polardata = (<{ water: Object[] }>friday[0]).water;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Friday Activity';
                    break;
                case 6:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>saturday[0]).water;
                    this.polardata = (<{ water: Object[] }>saturday[0]).water;
                    (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Saturday Activity';
                    break;
            }
            this.polarChart.series[0].animation!.enable = true;
            this.pointindex = 5;
            this.polarChart.refresh();
        }
    }
    public pointMove: EmitType<IPointEventArgs> = (args: IPointEventArgs) => {
        let point: any = getElement('balance_Series_' + args.seriesIndex + '_Point_' + args.pointIndex + '_Symbol');
        if (point) {
            point.setAttribute('cursor', 'pointer');
        }
    }
    public mouseclick: EmitType<IMouseEventArgs> = (args: IMouseEventArgs) => {
        let index: Index = indexFinder(args.target);
        if (getElement('balance_Series_' + index.series + '_Point_' + index.point + '_Symbol')) {
            switch (index.point) {
                case 0:
                    this.pie.series[0].dataSource = (<{ Calories: Object[] }>sunday[0]).Calories;
                    this.pie.annotations[0].content = '<div id="calories-innercontent"><p id="value" >1200</p><p id="sub-value" style="line-height: 10px">Cal consumed<hr style="margin-top: 20px; margin-bottom: 0px"><p> <p id="end-value"> 1600 cal left</p>';
                    break;
                case 1:
                    this.pie.series[0].dataSource = (<{ Calories: Object[] }>monday[0]).Calories;
                    this.pie.annotations[0].content = '<div id="calories-innercontent"><p id="value">1800</p><p id="sub-value" style="line-height: 10px">Cal consumed<hr style="margin-top: 20px; margin-bottom: 0px"><p> <p id="end-value"> 1000 cal left</p>';
                    break;
                case 2:
                    this.pie.series[0].dataSource = (<{ Calories: Object[] }>tuesday[0]).Calories;
                    this.pie.annotations[0].content = '<div id="calories-innercontent"><p id="value">2850</p><p id="sub-value" style="line-height: 10px">Cal consumed<hr style="margin-top: 20px; margin-bottom: 0px"><p> <p id="end-value"> 100 cal left</p>';
                    break;
                case 3:
                    this.pie.series[0].dataSource = (<{ Calories: Object[] }>wednesday[0]).Calories;
                    this.pie.annotations[0].content = '<div id="calories-innercontent"><p id="value">1900</p><p id="sub-value" style="line-height: 10px">Cal consumed<hr style="margin-top: 20px; margin-bottom: 0px"><p> <p id="end-value"> 900 cal left</p>';
                    break;
                case 4:
                    this.pie.series[0].dataSource = (<{ Calories: Object[] }>thursday[0]).Calories;
                    this.pie.annotations[0].content = '<div id="calories-innercontent"><p id="value">2500</p><p id="sub-value" style="line-height: 10px">Cal consumed<hr style="margin-top: 20px; margin-bottom: 0px"><p> <p id="end-value"> 300 cal left</p>';
                    break;
                case 5:
                    this.pie.series[0].dataSource = (<{ Calories: Object[] }>friday[0]).Calories;
                    this.pie.annotations[0].content = '<div id="calories-innercontent"><p id="value">1650</p><p id="sub-value" style="line-height: 10px">Cal consumed<hr style="margin-top: 20px; margin-bottom: 0px"><p> <p id="end-value"> 1150 cal left</p>';
                    break;
                case 6:
                    this.pie.series[0].dataSource = (<{ Calories: Object[] }>saturday[0]).Calories;
                    this.pie.annotations[0].content = '<div id="calories-innercontent"><p id="value">1300</p><p id="sub-value" style="line-height: 10px">Cal consumed<hr style="margin-top: 20px; margin-bottom: 0px"><p> <p id="end-value"> 1500 cal left</p>';
                    break;
            }
        }
    }

    public polarloaded(args: ILoadedEventArgs): void {
        (document.getElementById('water50ml-column') as HTMLElement).onclick = () => {
            (document.getElementById('water50ml-column') as HTMLElement).style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            (document.getElementById('water100ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water200ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water300ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water50ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-columnactive';
            (document.getElementById('water100ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
            (document.getElementById('water200ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
            (document.getElementById('water300ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
            (document.getElementById('iconml-img') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('iconml1-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml2-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml3-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext1') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('imgtext2') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext3') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext4') as HTMLElement).style.color = '#5B5B5B';
            (this.polardata[this.pointindex])['y'] = ((this.polardata[this.pointindex])['y']) + 0.05;
            this.polarChart.series[0].dataSource = <Object[]>this.polardata;
            this.polarChart.series[0].animation!.enable = false;
            this.polarChart.animateSeries = false;
            this.polarChart.enableAnimation = false;
        };
        (document.getElementById('water100ml-column') as HTMLElement).onclick = () => {
            (document.getElementById('water100ml-column') as HTMLElement).style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            (document.getElementById('water50ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water200ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water300ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water50ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-column';
            (document.getElementById('water100ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-columnactive';
            (document.getElementById('water200ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
            (document.getElementById('water300ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
            (document.getElementById('iconml-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml1-img') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('iconml2-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml3-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext2') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('imgtext1') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext3') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext4') as HTMLElement).style.color = '#5B5B5B';
            (this.polardata[this.pointindex])['y'] = ((this.polardata[this.pointindex])['y']) + 0.1;
            this.polarChart.series[0].dataSource = <Object[]>this.polardata;
            this.polarChart.series[0].animation!.enable = false;
            this.polarChart.animateSeries = false;
            this.polarChart.enableAnimation = false;
        };
        (document.getElementById('water200ml-column') as HTMLElement).onclick = () => {
            (document.getElementById('water200ml-column') as HTMLElement).style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            (document.getElementById('water100ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water50ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water300ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water50ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-column';
            (document.getElementById('water100ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
            (document.getElementById('water200ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-columnactive';
            (document.getElementById('water300ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
            (document.getElementById('iconml-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml1-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml2-img') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('iconml3-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext3') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('imgtext2') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext1') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext4') as HTMLElement).style.color = '#5B5B5B';
            (this.polardata[this.pointindex])['y'] = ((this.polardata[this.pointindex])['y']) + 0.2;
            this.polarChart.series[0].dataSource = <Object[]>this.polardata;
            this.polarChart.series[0].animation!.enable = false;
            this.polarChart.animateSeries = false;
            this.polarChart.enableAnimation = false;
        };
        (document.getElementById('water300ml-column') as HTMLElement).onclick = () => {
            (document.getElementById('water300ml-column') as HTMLElement).style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            (document.getElementById('water100ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water200ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water50ml-column') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('water50ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-column';
            (document.getElementById('water100ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
            (document.getElementById('water200ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
            (document.getElementById('water300ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-columnactive';
            (document.getElementById('iconml-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml1-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml2-img') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('iconml3-img') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('imgtext4') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('imgtext2') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext3') as HTMLElement).style.color = '#5B5B5B';
            (document.getElementById('imgtext1') as HTMLElement).style.color = '#5B5B5B';
            (this.polardata[this.pointindex])['y'] = ((this.polardata[this.pointindex])['y']) + 0.3;
            this.polarChart.series[0].dataSource = <Object[]>this.polardata;
            this.polarChart.series[0].animation!.enable = false;
            this.polarChart.animateSeries = false;
            this.polarChart.enableAnimation = false;
        };
    }

    public loaded(args: ILoadedEventArgs): void {
        (document.getElementById('Break-icon') as HTMLElement).onclick = () => {
            (document.getElementById('Breakfast') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('Lunch') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Dinner') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Snack') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Breakfast') as HTMLElement).className = 'icon-Breakfast breakimgactive';
            (document.getElementById('Lunch') as HTMLElement).className = 'icon-Lunch lunchimg';
            (document.getElementById('Dinner') as HTMLElement).className = 'icon-Dinner dinnerimg';
            (document.getElementById('Snack') as HTMLElement).className = 'icon-Snack snackimg';
            (document.getElementById('Break-icon') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #EF9027 0%, #F23B3B 100%)';
            (document.getElementById('Lunch-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Dinner-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Snack-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Break-text') as HTMLElement).className = 'breaktextactive';
            (document.getElementById('Lunch-text') as HTMLElement).className = 'lunchtext';
            (document.getElementById('Dinner-text') as HTMLElement).className = 'dinnertext';
            (document.getElementById('Snack-text') as HTMLElement).className = 'snacktext';
            (document.getElementById('Break-text') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('Lunch-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Dinner-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Snack-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('fat_value') as HTMLElement).innerHTML = '30g';
            (document.getElementById('fibre_value') as HTMLElement).innerHTML = '30g';
            (document.getElementById('carbs_value') as HTMLElement).innerHTML = '130g';
            (document.getElementById('calcium_value') as HTMLElement).innerHTML = '260g';
            (document.getElementById('protein_value') as HTMLElement).innerHTML = '40g';
            (document.getElementById('vitamins_value') as HTMLElement).innerHTML = '60g';
            this.pie.series[0].dataSource = (<{ Breakfast: Object[] }>sunday[0]).Breakfast;
        };
        (document.getElementById('Lunch-icon') as HTMLElement).onclick = () => {
            (document.getElementById('Breakfast') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Lunch') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('Dinner') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Snack') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Breakfast') as HTMLElement).className = 'icon-Breakfast breakimg';
            (document.getElementById('Lunch') as HTMLElement).className = 'icon-Lunch lunchimgactive';
            (document.getElementById('Dinner') as HTMLElement).className = 'icon-Dinner dinnerimg';
            (document.getElementById('Snack') as HTMLElement).className = 'icon-Snack snackimg';
            (document.getElementById('Break-text') as HTMLElement).className = 'breaktext';
            (document.getElementById('Lunch-text') as HTMLElement).className = 'lunchtextactive';
            (document.getElementById('Dinner-text') as HTMLElement).className = 'dinnertext';
            (document.getElementById('Snack-text') as HTMLElement).className = 'snacktext';
            (document.getElementById('Break-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Lunch-text') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('Dinner-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Snack-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Break-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Dinner-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Snack-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Lunch-icon') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #EF9027 0%, #F23B3B 100%)';
            (document.getElementById('fat_value') as HTMLElement).innerHTML = '20g';
            (document.getElementById('fibre_value') as HTMLElement).innerHTML = '10g';
            (document.getElementById('carbs_value') as HTMLElement).innerHTML = '90g';
            (document.getElementById('calcium_value') as HTMLElement).innerHTML = '120g';
            (document.getElementById('protein_value') as HTMLElement).innerHTML = '30g';
            (document.getElementById('vitamins_value') as HTMLElement).innerHTML = '40g';
            this.pie.series[0].dataSource = (<{ Lunch: Object[] }>sunday[0]).Lunch;
        };
        (document.getElementById('Dinner-icon') as HTMLElement).onclick = () => {
            (document.getElementById('Breakfast') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Lunch') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Dinner') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('Snack') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Breakfast') as HTMLElement).className = 'icon-Breakfast breakimg';
            (document.getElementById('Lunch') as HTMLElement).className = 'icon-Lunch lunchimg';
            (document.getElementById('Dinner') as HTMLElement).className = 'icon-Dinner dinnerimgactive';
            (document.getElementById('Snack') as HTMLElement).className = 'icon-Snack snackimg';
            (document.getElementById('Break-text') as HTMLElement).className = 'breaktext';
            (document.getElementById('Lunch-text') as HTMLElement).className = 'lunchtext';
            (document.getElementById('Dinner-text') as HTMLElement).className = 'dinnertextactive';
            (document.getElementById('Snack-text') as HTMLElement).className = 'snacktext';
            (document.getElementById('Break-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Lunch-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Dinner-text') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('Snack-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Break-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Lunch-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Snack-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Dinner-icon') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #EF9027 0%, #F23B3B 100%)';
            (document.getElementById('fat_value') as HTMLElement).innerHTML = '50g';
            (document.getElementById('fibre_value') as HTMLElement).innerHTML = '40g';
            (document.getElementById('carbs_value') as HTMLElement).innerHTML = '80g';
            (document.getElementById('calcium_value') as HTMLElement).innerHTML = '110g';
            (document.getElementById('protein_value') as HTMLElement).innerHTML = '30g';
            (document.getElementById('vitamins_value') as HTMLElement).innerHTML = '20g';
            this.pie.series[0].dataSource = (<{ Dinner: Object[] }>sunday[0]).Dinner;
        };
        (document.getElementById('Snack-icon') as HTMLElement).onclick = () => {
            (document.getElementById('Breakfast') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Lunch') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Dinner') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Snack') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('Break-text') as HTMLElement).className = 'breaktext';
            (document.getElementById('Lunch-text') as HTMLElement).className = 'lunchtext';
            (document.getElementById('Dinner-text') as HTMLElement).className = 'dinnertext';
            (document.getElementById('Snack-text') as HTMLElement).className = 'snacktextactive';
            (document.getElementById('Breakfast') as HTMLElement).className = 'icon-Breakfast breakimg';
            (document.getElementById('Lunch') as HTMLElement).className = 'icon-Lunch lunchimg';
            (document.getElementById('Dinner') as HTMLElement).className = 'icon-Dinner dinnerimg';
            (document.getElementById('Snack') as HTMLElement).className = 'icon-Snack snackimgactive';
            (document.getElementById('Break-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Lunch-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Dinner-text') as HTMLElement).style.color = '#7D7D7D';
            (document.getElementById('Snack-text') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('Break-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Dinner-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Lunch-icon') as HTMLElement).style.backgroundImage = "";
            (document.getElementById('Snack-icon') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #EF9027 0%, #F23B3B 100%)';
            (document.getElementById('fat_value') as HTMLElement).innerHTML = '30g';
            (document.getElementById('fibre_value') as HTMLElement).innerHTML = '40g';
            (document.getElementById('carbs_value') as HTMLElement).innerHTML = '150g';
            (document.getElementById('calcium_value') as HTMLElement).innerHTML = '220g';
            (document.getElementById('protein_value') as HTMLElement).innerHTML = '50g';
            (document.getElementById('vitamins_value') as HTMLElement).innerHTML = '60g';
            this.pie.series[0].dataSource = (<{ Snack: Object[] }>sunday[0]).Snack;
        };
        (document.getElementById('water') as HTMLElement).onclick = () => {
            (document.getElementById('title') as HTMLElement).innerHTML = 'Water Consumption';
            (document.getElementById('pie-title') as HTMLElement).innerHTML = 'sunday Report';
            (document.getElementById('calories-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('calories-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('water-text') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('water-subtitle') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('steps-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('steps-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('sleep-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('sleep-subtitle') as HTMLElement).style.color = '#828282';
            this.waterclick();
        };
        (document.getElementById('step') as HTMLElement).onclick = () => {
            (document.getElementById('title') as HTMLElement).innerHTML = 'Steps Count';
            (document.getElementById('pie-title') as HTMLElement).innerHTML = 'sunday Activity';
            (document.getElementById('calories-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('calories-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('water-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('water-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('sleep-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('sleep-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('steps-text') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('steps-subtitle') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('steps-img') as HTMLElement).style.color = '#FFFFFF';
            this.stepclick();
        };
        (document.getElementById('sleep') as HTMLElement).onclick = () => {
            (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Sleep Quality';
            (document.getElementById('calories-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('calories-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('water-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('water-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('steps-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('steps-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('sleep-text') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('sleep-subtitle') as HTMLElement).style.color = '#FFFFFF';
            this.sleepclick();
        };
        (document.getElementById('calories') as HTMLElement).onclick = () => {
            (document.getElementById('title') as HTMLElement).innerHTML = 'Calories Consumed';
            (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Macro Nutrients';
            (document.getElementById('calories-subtitle') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('calories-text') as HTMLElement).style.color = '#FFFFFF';
            (document.getElementById('water-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('water-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('steps-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('steps-subtitle') as HTMLElement).style.color = '#828282';
            (document.getElementById('sleep-text') as HTMLElement).style.color = '#828282';
            (document.getElementById('sleep-subtitle') as HTMLElement).style.color = '#828282';
            this.caloriesclick();
        };
    };
    public steploaded(args: ILoadedEventArgs): void {
        this.annotationpie1 = new AccumulationChart({
            // Initialize the chart series
            series: [
                {
                    dataSource: this.annotationpie1data,
                    palettes: ['#4F7305', 'LightGrey'],
                    radius: '75%', xName: 'x',
                    yName: 'y', startAngle: 180,
                    endAngle: 180, innerRadius: '80%', name: 'Project',
                    explode: false, explodeOffset: '10%',
                }
            ],
            enableSmartLabels: true,
            legendSettings: {
                visible: false, position: 'Top'
            },
            // Initialize the tooltip
            tooltip: { enable: false },
            loaded: (args: IAccLoadedEventArgs) => {
                if (document.getElementById('pie-container_border')) {
                    (document.getElementById('pie-container_border') as HTMLElement).style.fill = 'transparent';
                }
            }
        });
        this.annotationpie1.appendTo('#pie-container');
        this.annotationpie2 = new AccumulationChart({
            // Initialize the chart series
            series: [
                {
                    dataSource: this.annotationpie2data,
                    palettes: ['#A1A621', 'LightGrey'],
                    radius: '65%', xName: 'x',
                    yName: 'y', startAngle: 180,
                    endAngle: 180, innerRadius: '75%',
                    explode: false,
                }
            ],
            enableSmartLabels: true,
            resized: (args: IAccResizeEventArgs) => {
                if (this.annotation) {
                    location.reload();
                }
            },
            legendSettings: {
                visible: false, position: 'Top'
            },
            // Initialize the tooltip
            tooltip: { enable: false },
            loaded: (args: IAccLoadedEventArgs) => {
                if (document.getElementById('inside-container_border')) {
                    (document.getElementById('inside-container_border') as HTMLElement).style.fill = 'transparent';
                }
            }
        });
        this.annotationpie2.appendTo('#inside-container');
        this.pie.refresh();
    }
    public onStepClick(e: MouseEvent): void {
        this.stepclick();
    }
    public onWaterClick(e: MouseEvent): void {
        this.waterclick();
    }
    public onSleepClick(e: MouseEvent): void {
        this.sleepclick();
    }
    public onCalClick(e: MouseEvent): void {
        this.caloriesclick();
    }
    public waterclick(): void {
        this.annotation = false;
        (document.getElementById('water-bg') as HTMLElement).style.borderRadius = '4px';
        (document.getElementById('watercard') as HTMLElement).style.boxShadow = '0 3px 6px 3px rgba(49,131,185,0.25)';
        (document.getElementById('stepcard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('sleepcard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('caloriescard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('water50ml-column') as HTMLElement).style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
        (document.getElementById('water100ml-column') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water200ml-column') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water300ml-column') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water50ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-columnactive';
        (document.getElementById('water100ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
        (document.getElementById('water200ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
        (document.getElementById('water300ml-column') as HTMLElement).className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
        (document.getElementById('imgtext1') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('imgtext2') as HTMLElement).style.color = '#5B5B5B';
        (document.getElementById('imgtext3') as HTMLElement).style.color = '#5B5B5B';
        (document.getElementById('imgtext4') as HTMLElement).style.color = '#5B5B5B';
        (document.getElementById('iconml-img') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('iconml1-img') as HTMLElement).style.color = '#5B5B5B';
        (document.getElementById('iconml2-img') as HTMLElement).style.color = '#5B5B5B';
        (document.getElementById('iconml3-img') as HTMLElement).style.color = '#5B5B5B';
        (document.getElementById('sleep-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 sleep-value';
        (document.getElementById('step-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 steps-value';
        (document.getElementById('calories-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 calories-value';
        (document.getElementById('water-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 water-valueactive';
        (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Sunday Report';
        (document.getElementById('multiple-donut') as HTMLElement).style.display = 'none';
        (document.getElementById('donut') as HTMLElement).style.display = 'none';
        (document.getElementById('semi-pie') as HTMLElement).style.display = 'none';
        (document.getElementById('polar') as HTMLElement).style.display = 'block';
        (document.getElementById('line') as HTMLElement).style.display = 'none';
        (document.getElementById('spline') as HTMLElement).style.display = 'block';
        (document.getElementById('column') as HTMLElement).style.display = 'none';
        (document.getElementById('bubble') as HTMLElement).style.display = 'none';
        (document.getElementById('calories-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('calories') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('step-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('step') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('calories-value') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('sleep-value') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('sleep-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('sleep') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('steps-value') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water-bg') as HTMLElement).style.backgroundImage = 'linear-gradient(44deg, #2140DC 0%, #00BFD5 100%)';
        (document.getElementById('water') as HTMLElement).style.backgroundImage = 'linear-gradient(44deg, #2140DC 0%, #00BFD5 100%)';
        (document.getElementById('steps-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('sleep-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('water-img') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('food-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('title') as HTMLElement).innerHTML = 'Water Consumption <span id="watertitle-annotation1">Daily Average</span><span id="watertitle-annotation2">Target</span>';
        (document.getElementById('subtitle') as HTMLElement).innerHTML = '<span id="watersubtitle-annotation1">4.32 litres</span><span id="watersubtitle-annotation2">7 litres</span>';
        (document.getElementById('watersubtitle-annotation1') as HTMLElement).style.color = '#3B61E9';
        (document.getElementById('watersubtitle-annotation2') as HTMLElement).style.color = '#3B61E9';
        (document.getElementById('pie-title') as HTMLElement).innerHTML = 'sunday Report';
        (document.getElementById('calories-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('calories-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('water-text') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('water-subtitle') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('steps-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('steps-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('sleep-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('sleep-subtitle') as HTMLElement).style.color = '#828282';
        this.polarChart.series[0].dataSource = < Object[]>this.polarchartdata;
        this.polarChart.series[0].animation!.enable = true;
        this.polarChart.refresh();
        this.splineChart.refresh();
    }
    public stepclick(): void {
        this.annotation = true;
        (document.getElementById('step-bg') as HTMLElement).style.borderRadius = '4px';
        (document.getElementById('steps-value') as HTMLElement).style.borderRadius = '4px';
        (document.getElementById('watercard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('stepcard') as HTMLElement).style.boxShadow = '0 3px 6px 3px rgba(66,254,19,0.20)';
        (document.getElementById('sleepcard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('caloriescard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('sleep-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 sleep-value';
        (document.getElementById('step-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 steps-valueactive';
        (document.getElementById('calories-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 calories-value';
        (document.getElementById('water-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 water-value';
        (document.getElementById('multiple-donut') as HTMLElement).style.display = 'block';
        (document.getElementById('donut') as HTMLElement).style.display = 'none';
        (document.getElementById('semi-pie') as HTMLElement).style.display = 'none';
        (document.getElementById('polar') as HTMLElement).style.display = 'none';
        (document.getElementById('line') as HTMLElement).style.display = 'none';
        (document.getElementById('spline') as HTMLElement).style.display = 'none';
        (document.getElementById('column') as HTMLElement).style.display = 'block';
        (document.getElementById('bubble') as HTMLElement).style.display = 'none';
        (document.getElementById('sleep-value') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('calories-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('calories-value') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('calories') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('sleep-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('sleep') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('step-bg') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #04AB11 0%, #7DD61D 100%)';
        (document.getElementById('step') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #04AB11 0%, #7DD61D 100%)';
        (document.getElementById('steps-value') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #04AB11 0%, #7DD61D 100%)';
        (document.getElementById('steps-img') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('sleep-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('water-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('food-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('title') as HTMLElement).innerHTML = 'Steps Taken <span id="steptitle-annotation1">Distance Travelled</span>';
        (document.getElementById('subtitle') as HTMLElement).innerHTML = '<span id="stepsubtitle-annotation1" style="color: #05AD13;">3.2 miles</span>';
        (document.getElementById('pie-title') as HTMLElement).innerHTML = 'sunday Activity';
        (document.getElementById('calories-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('calories-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('water-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('water-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('sleep-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('sleep-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('steps-text') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('steps-subtitle') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('steps-img') as HTMLElement).style.color = '#FFFFFF';
        this.columnChart.refresh();
        this.multiplepie.refresh();
    }

    public sleepclick(): void {
        this.annotation = false;
        (document.getElementById('sleep-bg') as HTMLElement).style.borderRadius = '4px';
        (document.getElementById('sleep-value') as HTMLElement).style.borderRadius = '4px';
        (document.getElementById('watercard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('stepcard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('sleepcard') as HTMLElement).style.boxShadow = '0 3px 6px 3px rgba(71,63,204,0.20)';
        (document.getElementById('caloriescard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('sleep-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 sleep-valueactive';
        (document.getElementById('step-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 steps-value';
        (document.getElementById('calories-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 calories-value';
        (document.getElementById('water-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 water-value';
        (document.getElementById('multiple-donut') as HTMLElement).style.display = 'none';
        (document.getElementById('donut') as HTMLElement).style.display = 'none';
        (document.getElementById('semi-pie') as HTMLElement).style.display = 'block';
        (document.getElementById('polar') as HTMLElement).style.display = 'none';
        (document.getElementById('line') as HTMLElement).style.display = 'none';
        (document.getElementById('spline') as HTMLElement).style.display = 'none';
        (document.getElementById('column') as HTMLElement).style.display = 'none';
        (document.getElementById('bubble') as HTMLElement).style.display = 'block';
        (document.getElementById('calories-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('calories') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('calories-value') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('step-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('step') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('steps-value') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('sleep-bg') as HTMLElement).style.backgroundImage = 'linear-gradient(-135deg, #2925A6 0%, #B250D1 100%)';
        (document.getElementById('sleep-value') as HTMLElement).style.backgroundImage = 'linear-gradient(-135deg, #2925A6 0%, #B250D1 100%)';
        (document.getElementById('sleep') as HTMLElement).style.backgroundImage = 'linear-gradient(-135deg, #2925A6 0%, #B250D1 100%)';
        (document.getElementById('steps-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('sleep-img') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('water-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('food-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('title') as HTMLElement).innerHTML = 'Sleep Tracker <span id="sleeptitle-annotation1">Daily Average</span><span id="sleeptitle-annotation2">Goal</span>';
        (document.getElementById('subtitle') as HTMLElement).innerHTML = '<span id="sleepsubtitle-annotation1">6.32 hrs</span><span id="sleepsubtitle-annotation2">7.5 hrs</span>';
        (document.getElementById('sleepsubtitle-annotation1') as HTMLElement).style.color = '#4526A6';
        (document.getElementById('sleepsubtitle-annotation2') as HTMLElement).style.color = '#4526A6';
        (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Sleep Quality';
        (document.getElementById('calories-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('calories-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('water-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('water-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('steps-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('steps-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('sleep-text') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('sleep-subtitle') as HTMLElement).style.color = '#FFFFFF';
        this.sleepChart.refresh();
        this.bubbleChart.refresh();
    }

    public caloriesclick(): void {
        this.annotation = false;
        (document.getElementById('calories-bg') as HTMLElement).style.borderRadius = '4px';
        (document.getElementById('calories-value') as HTMLElement).style.borderRadius = '4px';
        (document.getElementById('watercard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('stepcard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('sleepcard') as HTMLElement).style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        (document.getElementById('caloriescard') as HTMLElement).style.boxShadow = '0 3px 6px 2px rgba(178,30,195,0.30)';
        (document.getElementById('sleep-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 sleep-value';
        (document.getElementById('step-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 steps-value';
        (document.getElementById('calories-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 calories-valueactive';
        (document.getElementById('water-column') as HTMLElement).className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 water-value';
        (document.getElementById('multiple-donut') as HTMLElement).style.display = 'none';
        (document.getElementById('donut') as HTMLElement).style.display = 'block';
        (document.getElementById('semi-pie') as HTMLElement).style.display = 'none';
        (document.getElementById('polar') as HTMLElement).style.display = 'none';
        (document.getElementById('line') as HTMLElement).style.display = 'block';
        (document.getElementById('spline') as HTMLElement).style.display = 'none';
        (document.getElementById('column') as HTMLElement).style.display = 'none';
        (document.getElementById('bubble') as HTMLElement).style.display = 'none';
        (document.getElementById('steps-value') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('sleep-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('sleep') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('water') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('step-bg') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('step') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('sleep-value') as HTMLElement).style.backgroundImage = "";
        (document.getElementById('calories-bg') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #F23B3B 0%, #EF9027 100%)';
        (document.getElementById('calories-value') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #F23B3B 0%, #EF9027 100%)';
        (document.getElementById('calories') as HTMLElement).style.backgroundImage = 'linear-gradient(45deg, #F23B3B 0%, #EF9027 100%)';
        (document.getElementById('steps-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('sleep-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('water-img') as HTMLElement).style.color = '#999393';
        (document.getElementById('food-img') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('title') as HTMLElement).innerHTML = 'Calories Consumed <span id="caloriestitle-annotation1">Daily Average</span><span id="caloriestitle-annotation2">Today</span>';
        (document.getElementById('subtitle') as HTMLElement).innerHTML = '<span id="caloriessubtitle-annotation1" >902 kcal</span><span id="caloriessubtitle-annotation2">1437 kcal</span>';
        (document.getElementById('caloriessubtitle-annotation1') as HTMLElement).style.color = '#DB4247';
        (document.getElementById('caloriessubtitle-annotation2') as HTMLElement).style.color = '#780508';
        (document.getElementById('pie-title') as HTMLElement).innerHTML = 'Macro Nutrients';
        (document.getElementById('calories-subtitle') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('calories-text') as HTMLElement).style.color = '#FFFFFF';
        (document.getElementById('water-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('water-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('steps-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('steps-subtitle') as HTMLElement).style.color = '#828282';
        (document.getElementById('sleep-text') as HTMLElement).style.color = '#828282';
        (document.getElementById('sleep-subtitle') as HTMLElement).style.color = '#828282';
        this.lineChart.refresh();
        this.pie.refresh();
    }
}
import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';

import { ILoadedEventArgs, IPointEventArgs, IMouseEventArgs, Index, indexFinder, getElement, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { monday, tuesday, wednesday, thursday, friday, saturday, sunday } from './datasource';
import { EmitType, addClass, removeClass } from '@syncfusion/ej2-base';
import {
    AccumulationChartComponent, IAccResizeEventArgs, AccumulationChart, IAccLoadedEventArgs
} from '@syncfusion/ej2-angular-charts';

import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';

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
    @ViewChild('lineChart') lineChart: ChartComponent;
    @ViewChild('splineChart') splineChart: ChartComponent;
    @ViewChild('bubbleChart') bubbleChart: ChartComponent;
    @ViewChild('columnChart') columnChart: ChartComponent;
    @ViewChild('pie') pie: AccumulationChartComponent | AccumulationChart;
    @ViewChild('multiplepie') multiplepie: AccumulationChartComponent | AccumulationChart;
    @ViewChild('polarChart') polarChart: ChartComponent;
    @ViewChild('sleepChart') sleepChart: AccumulationChartComponent | AccumulationChart;

    public selectedpoint: Boolean = false;
    public tooltipMappingName: string = 'time';
    public animation: Object;
    public pointindex: number = 5;
    public marker: Object;
    public splinemarker: Object;
    public columnmarker: Object;
    public bubblemarker: Object;
    public polarmarker: Object;
    public tooltip: Object;
    public polarTooltip: Object;
    public sleepTooltip: Object;
    public splineTooltip: Object;
    public bubbleTooltip: Object;
    public columnTooltip: Object;
    public selectedDataIndexes: Object[];
    public columnborder: Object;
    public cborder: Object;
    public bborder: Object;
    public wborder: Object;
    public chartArea: Object;
    public caloriesdata: Object[];
    public splinedata: Object[];
    public polardata: any= [];
    public polarchartdata: Object[];
    public calpiedata: Object[];
    public sleepdata: Object[];
    public bubbledata: Object[];
    public columndata: Object[];
    public primaryXAxis: Object;
    public polarPrimaryXAxis: Object;
    public columnPrimaryXAxis: Object;
    public splinePrimaryXAxis: Object;
    public bubblePrimaryXAxis: Object;
    public primaryYAxis: Object;
    public columnPrimaryYAxis: Object;
    public polarPrimaryYAxis: Object;
    public splinePrimaryYAxis: Object;
    public bubblePrimaryYAxis: Object;
    public legendSettings: Object;
    public enableAnimation: Boolean;
    public polarEnableAnimation: Boolean;
    public background: string;
    public startAngle: number;
    public stepstartAngle: number;
    public sleepStartAngle: number;
    public sleepEndAngle: number;
    public endAngle: number;
    public stependAngle: number;
    public explode: Boolean = false;
    public palettes: string[];
    public steppalettes: string[];
    public sleeppalettes: string[];
    public cornerRadius: Object;
    public annotationpie1: AccumulationChart;
    public annotationpie2: AccumulationChart;
    public annotationpie1data : Object[];
    public annotationpie2data : Object[];
    public annotation: boolean = true;
    public steppiedata: Object[];
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
            stripLines: [{ sizeType: 'Pixel', size: 1, color: '#3B61E9', dashArray: '5,5', textStyle: { color: '#3B61E9' }, horizontalAlignment: 'End', verticalAlignment: 'End' }]
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
                sizeType: 'Pixel', dashArray: '3,3', size: 1, color: '#D93237',
                textStyle: { color: '#D93237', size: '12px', fontFamily: 'Roboto', fontWeight: '500' }, horizontalAlignment: 'End', verticalAlignment: 'End'
            },
            {
                sizeType: 'Pixel', dashArray: '3,3', size: 1, color: '#760104',
                textStyle: { color: '#760104', size: '12px', fontFamily: 'Roboto', fontWeight: '500' }, horizontalAlignment: 'End', verticalAlignment: 'End'
            }],
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        };
        this.columnPrimaryYAxis = {
            majorTickLines: { width: 0 }, lineStyle: { width: 0 },
            stripLines: [{ sizeType: 'Pixel', size: 1, dashArray: '5,5', color: '#BB830D', textStyle: { color: '#BB830D', size: '12px', fontFamily: 'Roboto', fontWeight: '500' }, horizontalAlignment: 'End', verticalAlignment: 'End' }]
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
        this.cornerRadius = {
            topLeft: 10, topRight: 10
        };
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
        this.initializeSkeleton();
        this.LoadCardData();
        this.LoadChartData('calorie');
    }
    public initializeSkeleton(): void {
        let cardSkeletons: HTMLCollectionOf<Element> = document.getElementById('card-row').getElementsByTagName('ejs-skeleton');
        const cards: NodeList = document.querySelectorAll('#card-row .row .e-card');
        addClass([cards[0] as HTMLElement, cards[1] as HTMLElement, cards[2] as HTMLElement, cards[3] as HTMLElement], "hidden-element-size");
        (cardSkeletons[0] as HTMLElement).style.height = (cards[0] as HTMLElement).offsetHeight + 'px';
        (cardSkeletons[1] as HTMLElement).style.height = (cards[1] as HTMLElement).offsetHeight + 'px';
        (cardSkeletons[2] as HTMLElement).style.height = (cards[2] as HTMLElement).offsetHeight + 'px';
        (cardSkeletons[3] as HTMLElement).style.height = (cards[3] as HTMLElement).offsetHeight + 'px';
        removeClass([cards[0] as HTMLElement, cards[1] as HTMLElement, cards[2] as HTMLElement, cards[3] as HTMLElement], "hidden-element-size");
    }
    public GetCardData(): any {
        return new Promise(resolve => setTimeout(() => {
            let data: { [key: string]: Object } = {};
            data['calories-eaten'] = '13,100';
            data['steps-taken'] = '52,100';
            data['water-consumed'] = '38.7 ltr';
            data['sleep-duration'] = '50 hr';
            resolve(data);
        }, 2000));
    }
    public LoadCardData(): void {
        this.GetCardData().then((data: any) => {
            document.getElementById('calories-text').textContent = data['calories-eaten'];
            document.getElementById('steps-text').textContent = data['steps-taken'];
            document.getElementById('water-text').textContent = data['water-consumed'];
            document.getElementById('sleep-text').textContent = data['sleep-duration'];
            let cardSkeletons: HTMLCollectionOf<Element> = document.getElementById('card-row').getElementsByTagName('ejs-skeleton');
            const cards: NodeList = document.querySelectorAll('#card-row .row .e-card');
            (cardSkeletons[0] as HTMLElement).style.display = 'none';
            (cardSkeletons[1] as HTMLElement).style.display = 'none';
            (cardSkeletons[2] as HTMLElement).style.display = 'none';
            (cardSkeletons[3] as HTMLElement).style.display = 'none';
            (cards[0] as HTMLElement).style.display = 'flex';
            (cards[1] as HTMLElement).style.display = 'flex';
            (cards[2] as HTMLElement).style.display = 'flex';
            (cards[3] as HTMLElement).style.display = 'flex';
            this.ToggleVisibility('none', 'block');
        });
    }
    public GetCalorieData(): any {
        return new Promise(resolve => setTimeout(() => {
            let data: { [key: string]: Object } = {};
            data['dailyaveragecal'] = 2800;
            data['todaycal'] = 2000;
            data['caloriesdata'] = [
                { x: 'Sunday', y: 1200 }, { x: 'Monday', y: 1800 }, { x: 'Tuesday', y: 2850 }, { x: 'Wednesday', y: 1900 }, { x: 'Thursday', y: 2500 }, { x: 'Friday', y: 1650 }, { x: 'Saturday', y: 1300 }
            ];
            data['calpiedata'] = [{ 'x': 'Protein', 'y': 30, 'r': '100', text: '25%' }, { 'x': 'Fat', 'y': 12.5, 'r': '110', text: '12.5%' }, { 'x': 'Fiber', 'y': 12.5, 'r': '115', text: '12.5%' },
            { 'x': 'Calcium', 'y': 10, 'r': '125', text: '50%' }, { 'x': 'Carbs', 'y': 20, 'r': '125', text: '50%' }, { 'x': 'Vitamins', 'y': 30, 'r': '125', text: '50%' }];
            resolve(data);
        }, 2000));
    }
    public GetStepsData(): any {
        return new Promise(resolve => setTimeout(() => {
            let data: { [key: string]: Object } = {};
            data['stepsgoal'] = 9000;
            data['columndata'] = [{ x: 'Sunday', y: 8900 }, { x: 'Monday', y: 7200 }, { x: 'Tuesday', y: 9100 }, { x: 'Wednesday', y: 6200 }, { x: 'Thursday', y: 7000 }, { x: 'Friday', y: 8000 }, { x: 'Saturday', y: 5500 }];
            data['steppiedata'] = [{ x: 'Steps', y: 18, text: '18%' }, { x: 'Legal', y: 8, text: '8%' }];
            data['annotationpie1data'] = (<{ Exercise: Object[] }>sunday[0]).Exercise;
            data['annotationpie2data'] = (<{ Hours: Object[] }>sunday[0]).Hours;
            resolve(data);
        }, 2000));
    }
    public GetWaterData(): any {
        return new Promise(resolve => setTimeout(() => {
            let data: { [key: string]: Object } = {};
            data['watergoal'] = 7;
            data['splinedata'] = [
                { x: 'Sunday', y: 5 }, { x: 'Monday', y: 6 }, { x: 'Tuesday', y: 4.5 }, { x: 'Wednesday', y: 5.5 }, { x: 'Thursday', y: 7.2 }, { x: 'Friday', y: 4.5 }, { x: 'Saturday', y: 6 }
            ];
            data['polarchartdata'] = [
                { text: '00:00 - 3:00', x: '00:00', y: 0 },
                { text: '03:00 - 6:00', x: '3:00', y: 0 },
                { text: '06:00 - 9:00', x: '6:00', y: 0 },
                { text: '09:00 - 12:00', x: '9:00', y: 1 },
                { text: '12:00 - 15:00', x: '12:00', y: 1.5 },
                { text: '15:00 - 18:00', x: '15:00', y: 2},
                { text: '18:00 - 21:00', x: '18:00', y: 1.5 },
                { text: '21:00 - 24:00', x: '21:00', y: 0.75 }
            ];
            data['polardata'] = [
                { text: '00:00 - 3:00', x: '00:00', y: 0 },
                { text: '03:00 - 6:00', x: '3:00', y: 0 },
                { text: '06:00 - 9:00', x: '6:00', y: 0 },
                { text: '09:00 - 12:00', x: '9:00', y: 1 },
                { text: '12:00 - 15:00', x: '12:00', y: 1.5 },
                { text: '15:00 - 18:00', x: '15:00', y: 2},
                { text: '18:00 - 21:00', x: '18:00', y: 1.5 },
                { text: '21:00 - 24:00', x: '21:00', y: 0.75 }
            ];
            resolve(data);
        }, 2000));
    }
    public GetSleepData(): any {
        return new Promise(resolve => setTimeout(() => {
            let data: { [key: string]: Object } = {};
            data['sleepdata'] = [
                { x: 'Light sleep', y: 10, time: '10:30 pm - 11:24 pm' }, { x: 'Deep sleep', y: 20, time: '11:24 am - 1:12 am' },
                { x: 'Awake', y: 2.5, time: '1:12 am - 1:25 am' }, { x: 'REM', y: 5, time: '1:25 am - 1:52 am' },
                { x: 'Deep sleep', y: 22, time: '1:52 am - 3:45 am' }, { x: 'Awake', y: 2.5, time: '3:45 am - 3.58 am' },
                { x: 'Light sleep', y: 15, time: '3:58 am - 5.20 am' }, { x: 'REM', y: 5, time: '5:20 am - 5:47 am' },
                { x: 'Deep sleep', y: 18, time: '5:47 am - 7:30 am' }
            ];
            data['bubbledata'] = [
                { x: 'Sunday', y: 9, size: 4.837 }, { x: 'Monday', y: 6, size: 2.347 }, { x: 'Tuesday', y: 6, size: 2.347 }, { x: 'Wednesday', y: 7, size: 3.527 },
                { x: 'Thursday', y: 8, size: 4.047 }, { x: 'Friday', y: 5, size: 1.582 }, { x: 'Saturday', y: 9, size: 4.837 }
            ];
            resolve(data);
        }, 2000));
    }
    public LoadChartData(activity: string): void {
        switch(activity.toLowerCase()) {
            case "calorie": {
                this.GetCalorieData().then((data: any) => {
                    this.ToggleVisibility('none', 'block');
                    this.caloriesdata = data['caloriesdata'];
                    this.calpiedata = data['calpiedata'];
                    this.lineChart.primaryYAxis.stripLines[0].start = data['dailyaveragecal'];
                    this.lineChart.primaryYAxis.stripLines[0].text = 'Daily Average ' + data['dailyaveragecal'] + ' cal';
                    this.lineChart.primaryYAxis.stripLines[1].start = data['todaycal'];
                    this.lineChart.primaryYAxis.stripLines[1].text = 'Today ' + data['todaycal'] + ' cal';
                    this.lineChart.refresh();
                    this.pie.refresh();
                });
                break;
            }
            case "steps": {
                this.GetStepsData().then((data: any) => {
                    this.ToggleVisibility('none', 'block');
                    this.columndata = data['columndata'];
                    this.steppiedata = data['steppiedata'];
                    this.columnChart.primaryYAxis.stripLines[0].start = data['stepsgoal'];
                    this.columnChart.primaryYAxis.stripLines[0].text = 'Goal ' + data['stepsgoal'] + ' steps';
                    this.annotationpie1data = data['annotationpie1data'];
                    this.annotationpie2data = data['annotationpie2data'];
                    this.columnChart.refresh();
                    this.multiplepie.refresh();
                })
                break;
            }
            case "water": {
                this.GetWaterData().then((data:any) => {
                    this.ToggleVisibility('none', 'block');
                    this.splinedata = data['splinedata'];
                    this.splineChart.primaryYAxis.stripLines[0].start = data['watergoal'];
                    this.splineChart.primaryYAxis.stripLines[0].text = 'Target';
                    this.polarchartdata = data['polarchartdata'];
                    this.polardata = data['polardata'];
                    this.splineChart.refresh();
                    this.polarChart.refresh();
                })
                break;
            }
            case "sleep": {
                this.GetSleepData().then((data: any) => {
                    this.ToggleVisibility('none', 'block');
                    this.bubbledata = data['bubbledata'];
                    this.sleepdata = data['sleepdata'];
                    this.sleepChart.refresh();
                    this.bubbleChart.refresh();
                })
                break;
            }
        }
    }
    public ToggleVisibility(displaySkeleton:string, displayChart:string): void {
        let lineChartSkeleton: HTMLCollectionOf<Element> = document.querySelector('.line-chart-area').getElementsByTagName('ejs-skeleton');
        (lineChartSkeleton[0] as HTMLElement).style.display = displaySkeleton;
        let pieChartSkeleton: HTMLCollectionOf<Element> = document.querySelector('.column-chart-area').getElementsByTagName('ejs-skeleton');
        (pieChartSkeleton[0] as HTMLElement).style.display = displaySkeleton;
        (document.getElementById('line-wrapper') as HTMLElement).style.display = displayChart;
        (document.getElementById('pie-wrapper') as HTMLElement).style.display = displayChart;
    }
    public GetBubbleClickData(index_point: number): any {
        let data: { [key: string]: Object } = {};
        return new Promise(resolve => setTimeout(() => {
        switch(index_point) {
            case 0: {
                data['sleepinfo'] = (<{ sleep: Object[] }>sunday[0]).sleep;
                data['totalsleephours'] = "9";
                data['sleepstarttime'] = "10.30 pm";
                data['sleependtime'] = "7:30 am pm"; 
                data['deepsleep'] = "5h 24 mins"; 
                data['lightsleep'] = "1h 15 mins"; 
                data['awaketime'] = "27 mins"; 
                data['remaintime'] = "54 mins";
                break;
            }
            case 1: {
                data['sleepinfo'] = (<{ sleep: Object[] }>monday[0]).sleep;
                data['totalsleephours'] = "6";
                data['sleepstarttime'] = "11:40 pm";
                data['sleependtime'] = "5:40 am"; 
                data['deepsleep'] = "2h 54 mins"; 
                data['lightsleep'] = "2h 22 mins"; 
                data['awaketime'] = "18 mins"; 
                data['remaintime'] = "36 mins";
                break;
            }
            case 2: {
                data['sleepinfo'] = (<{ sleep: Object[] }>tuesday[0]).sleep;
                data['sleepstarttime'] = '9:30 pm';
                data['sleependtime']  = '4:30 am';
                data['totalsleephours'] = '6';
                data['deepsleep'] = '3h 54 mins';
                data['lightsleep'] = '1h 30 mins';
                data['awaketime'] = '18 mins';
                data['remaintime'] = '18 mins';
                break;
            }
            case 3: {
                data['sleepinfo'] = (<{ sleep: Object[] }>wednesday[0]).sleep;
                data['sleepstarttime'] = '10:30 pm';
                data['sleependtime'] = '6:30 am';
                data['totalsleephours']  = '7';
                data['deepsleep'] = '5h 51 mins';
                data['lightsleep']  = '2h 06 mins';
                data['awaketime']  = '21 mins';
                data['remaintime'] = '42 mins';
                break;
            }
            case 4: {
                data['sleepinfo'] = (<{ sleep: Object[] }>thursday[0]).sleep;
                data['sleepstarttime'] = '11:00 pm';
                data['sleependtime'] = '7:00 am';
                data['totalsleephours'] = '8';
                data['deepsleep']  = '4h 48 mins ';
                data['lightsleep']  = '3h 24 mins ';
                data['awaketime']  = '24 mins';
                data['remaintime']  = '24 mins ';
                break;
            }
            case 5: {
                data['sleepinfo']  = (<{ sleep: Object[] }>friday[0]).sleep;
                data['sleepstarttime'] = '11:40 pm';
                data['sleependtime'] ='4:40 am';
                data['totalsleephours'] = '5';
                data['deepsleep']  = '3h 45 mins ';
                data['lightsleep']  = '45 mins ';
                data['awaketime']= '15 mins';
                data['remaintime'] = '15 mins ';
                break;
            }
            case 6: {
                data['sleepinfo'] = (<{ sleep: Object[] }>saturday[0]).sleep;
                data['sleepstarttime'] = '9:40 pm';
                data['sleependtime']  = '6:40 am';
                data['totalsleephours']  = '9';
                data['deepsleep']= '6h 18 mins';
                data['lightsleep'] = '1h 48 mins ';
                data['awaketime']= '27 mins';
                data['remaintime']= '27 mins ';
                break;
            }
        }
        resolve(data);
    }, 1000));
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
            document.getElementById('water50ml-column').style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            document.getElementById('water100ml-column').style.backgroundImage = null;
            document.getElementById('water200ml-column').style.backgroundImage = null;
            document.getElementById('water300ml-column').style.backgroundImage = null;
            document.getElementById('water50ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-columnactive';
            document.getElementById('water100ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
            document.getElementById('water200ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
            document.getElementById('water300ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
            document.getElementById('iconml-img').style.color = '#FFFFFF';
            document.getElementById('iconml1-img').style.color = '#5B5B5B';
            document.getElementById('iconml2-img').style.color = '#5B5B5B';
            document.getElementById('iconml3-img').style.color = '#5B5B5B';
            document.getElementById('imgtext1').style.color = '#FFFFFF';
            document.getElementById('imgtext2').style.color = '#5B5B5B';
            document.getElementById('imgtext3').style.color = '#5B5B5B';
            document.getElementById('imgtext4').style.color = '#5B5B5B';
            this.pie.series[0].animation.enable = false;
        }
    }
    public bubblemouseclick: EmitType<IMouseEventArgs> = (args: IMouseEventArgs) => {
        let index: Index = indexFinder(args.target);
        if (getElement('bubble-balance_Series_' + index.series + '_Point_' + index.point)) {
            this.GetBubbleClickData(index.point).then((data: any) => {
                this.sleepChart.series[0].dataSource = data['sleepinfo'];
                this.sleepChart.annotations[0].content = `<div id="leftcontent" style="width:100%; height:100%;"> ${data['sleepstarttime']} </div>`
                this.sleepChart.annotations[1].content = `<div id="rightcontent" style="width:100%; height:100%;"> ${data['sleependtime']} </div>`
                this.sleepChart.annotations[2].content = `<div id="middlecontent" style="font-family: Roboto; font-weight:500; font-size: 14px; color: #4A4A4A; letter-spacing: -0.08px; text-align: center;">Total hours of sleep <br><p id="time"> ${data['totalsleephours']} </p><br></div>`
                document.getElementById('deephour').innerHTML = data['deepsleep'];
                document.getElementById('lighthour').innerHTML = data['lightsleep'];
                document.getElementById('awakehour').innerHTML = data['awaketime'];
                document.getElementById('remhour').innerHTML = data['remaintime'];
            })
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
                    document.getElementById('pie-title').innerHTML = 'Sunday Activity';
                    document.getElementById('stepstext').innerHTML = '8200';
                    document.getElementById('exercise').innerHTML = '15';
                    document.getElementById('active').innerHTML = '7';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500 ;font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">2200</p><p id="step-value" style="font-family: Roboto;font-weight:500;font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>sunday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>sunday[0]).Hours;
                    break;
                case 1:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>monday[0]).Steps;
                    document.getElementById('pie-title').innerHTML = 'Monday Activity';
                    document.getElementById('stepstext').innerHTML = '7300';
                    document.getElementById('exercise').innerHTML = '16';
                    document.getElementById('active').innerHTML = '6';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto;font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">1500</p><p id="step-value" style="font-family: Roboto; font-weight:500; font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>monday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>monday[0]).Hours;
                    break;
                case 2:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>tuesday[0]).Steps;
                    document.getElementById('pie-title').innerHTML = 'Tuesday Activity';
                    document.getElementById('stepstext').innerHTML = '7800';
                    document.getElementById('exercise').innerHTML = '20';
                    document.getElementById('active').innerHTML = '5';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">3300</p><p id="step-value" style="font-family: Roboto; font-weight:500; font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>tuesday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>tuesday[0]).Hours;
                    break;
                case 3:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>wednesday[0]).Steps;
                    document.getElementById('pie-title').innerHTML = 'Wednesday Activity';
                    document.getElementById('stepstext').innerHTML = '6800';
                    document.getElementById('exercise').innerHTML = '16';
                    document.getElementById('active').innerHTML = '3';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">1200</p><p id="step-value" style="font-family: Roboto; font-weight:500; font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>wednesday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>wednesday[0]).Hours;
                    break;
                case 4:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>thursday[0]).Steps;
                    document.getElementById('pie-title').innerHTML = 'Thursday Activity';
                    document.getElementById('stepstext').innerHTML = '7000';
                    document.getElementById('exercise').innerHTML = '10';
                    document.getElementById('active').innerHTML = '7';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">1300</p><p id="step-value" style="font-family: Roboto; font-weight:500; font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>thursday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>thursday[0]).Hours;
                    break;
                case 5:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>friday[0]).Steps;
                    document.getElementById('pie-title').innerHTML = 'Friday Activity';
                    document.getElementById('stepstext').innerHTML = '6900';
                    document.getElementById('exercise').innerHTML = '22';
                    document.getElementById('active').innerHTML = '4';
                    this.multiplepie.annotations[0].content = '<div id="steps-innercontent"><p id="main-value" style="font-family: Roboto; font-weight:500; font-size: 28px;color: #313331;letter-spacing: 0;text-align: center; margin:0px">1800</p><p id="step-value" style="font-family: Roboto; font-weight:500;font-size: 14px; color: #535353; letter-spacing: 0;text-align: center;">Calories burnt<p></div>';
                    this.annotationpie1data = (<{ Exercise: Object[] }>friday[0]).Exercise;
                    this.annotationpie2data = (<{ Hours: Object[] }>friday[0]).Hours;
                    break;
                case 6:
                    this.multiplepie.series[0].dataSource = (<{ Steps: Object[] }>saturday[0]).Steps;
                    document.getElementById('pie-title').innerHTML = 'Saturday Activity';
                    document.getElementById('stepstext').innerHTML = '7200';
                    document.getElementById('exercise').innerHTML = '17';
                    document.getElementById('active').innerHTML = '4';
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
                    document.getElementById('pie-title').innerHTML = 'Sunday Activity';
                    break;
                case 1:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>monday[0]).water;
                    this.polardata = (<{ water: Object[] }>monday[0]).water;
                    document.getElementById('pie-title').innerHTML = 'Monday Activity';
                    break;
                case 2:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>tuesday[0]).water;
                    this.polardata = (<{ water: Object[] }>tuesday[0]).water;
                    document.getElementById('pie-title').innerHTML = 'Tuesday Activity';
                    break;
                case 3:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>wednesday[0]).water;
                    this.polardata = (<{ water: Object[] }>wednesday[0]).water;
                    document.getElementById('pie-title').innerHTML = 'Wednesday Activity';
                    break;
                case 4:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>thursday[0]).water;
                    this.polardata = (<{ water: Object[] }>thursday[0]).water;
                    document.getElementById('pie-title').innerHTML = 'Thursday Activity';
                    break;
                case 5:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>friday[0]).water;
                    this.polardata = (<{ water: Object[] }>friday[0]).water;
                    document.getElementById('pie-title').innerHTML = 'Friday Activity';
                    break;
                case 6:
                    this.polarChart.series[0].dataSource = (<{ water: Object[] }>saturday[0]).water;
                    this.polardata = (<{ water: Object[] }>saturday[0]).water;
                    document.getElementById('pie-title').innerHTML = 'Saturday Activity';
                    break;
            }
            this.polarChart.series[0].animation.enable = true;
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
        document.getElementById('water50ml-column').onclick = () => {
            document.getElementById('water50ml-column').style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            document.getElementById('water100ml-column').style.backgroundImage = null;
            document.getElementById('water200ml-column').style.backgroundImage = null;
            document.getElementById('water300ml-column').style.backgroundImage = null;
            document.getElementById('water50ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-columnactive';
            document.getElementById('water100ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
            document.getElementById('water200ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
            document.getElementById('water300ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
            document.getElementById('iconml-img').style.color = '#FFFFFF';
            document.getElementById('iconml1-img').style.color = '#5B5B5B';
            document.getElementById('iconml2-img').style.color = '#5B5B5B';
            document.getElementById('iconml3-img').style.color = '#5B5B5B';
            document.getElementById('imgtext1').style.color = '#FFFFFF';
            document.getElementById('imgtext2').style.color = '#5B5B5B';
            document.getElementById('imgtext3').style.color = '#5B5B5B';
            document.getElementById('imgtext4').style.color = '#5B5B5B';
            (this.polardata[this.pointindex])['y'] = ((this.polardata[this.pointindex])['y']) + 0.05;
            this.polarChart.series[0].dataSource = <Object[]>this.polardata;
            this.polarChart.series[0].animation.enable = false;
            this.polarChart.animateSeries = false;
            this.polarChart.enableAnimation = false;
            this.polarChart.refresh();
        };
        document.getElementById('water100ml-column').onclick = () => {
            document.getElementById('water100ml-column').style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            document.getElementById('water50ml-column').style.backgroundImage = null;
            document.getElementById('water200ml-column').style.backgroundImage = null;
            document.getElementById('water300ml-column').style.backgroundImage = null;
            document.getElementById('water50ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-column';
            document.getElementById('water100ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-columnactive';
            document.getElementById('water200ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
            document.getElementById('water300ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
            document.getElementById('iconml-img').style.color = '#5B5B5B';
            document.getElementById('iconml1-img').style.color = '#FFFFFF';
            document.getElementById('iconml2-img').style.color = '#5B5B5B';
            document.getElementById('iconml3-img').style.color = '#5B5B5B';
            document.getElementById('imgtext2').style.color = '#FFFFFF';
            document.getElementById('imgtext1').style.color = '#5B5B5B';
            document.getElementById('imgtext3').style.color = '#5B5B5B';
            document.getElementById('imgtext4').style.color = '#5B5B5B';
            (this.polardata[this.pointindex])['y'] = ((this.polardata[this.pointindex])['y']) + 0.1;
            this.polarChart.series[0].dataSource = <Object[]>this.polardata;
            this.polarChart.series[0].animation.enable = false;
            this.polarChart.animateSeries = false;
            this.polarChart.enableAnimation = false;
            this.polarChart.refresh();
        };
        document.getElementById('water200ml-column').onclick = () => {
            document.getElementById('water200ml-column').style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            document.getElementById('water100ml-column').style.backgroundImage = null;
            document.getElementById('water50ml-column').style.backgroundImage = null;
            document.getElementById('water300ml-column').style.backgroundImage = null;
            document.getElementById('water50ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-column';
            document.getElementById('water100ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
            document.getElementById('water200ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-columnactive';
            document.getElementById('water300ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
            document.getElementById('iconml-img').style.color = '#5B5B5B';
            document.getElementById('iconml1-img').style.color = '#5B5B5B';
            document.getElementById('iconml2-img').style.color = '#FFFFFF';
            document.getElementById('iconml3-img').style.color = '#5B5B5B';
            document.getElementById('imgtext3').style.color = '#FFFFFF';
            document.getElementById('imgtext2').style.color = '#5B5B5B';
            document.getElementById('imgtext1').style.color = '#5B5B5B';
            document.getElementById('imgtext4').style.color = '#5B5B5B';
            (this.polardata[this.pointindex])['y'] = ((this.polardata[this.pointindex])['y']) + 0.2;
            this.polarChart.series[0].dataSource = <Object[]>this.polardata;
            this.polarChart.series[0].animation.enable = false;
            this.polarChart.animateSeries = false;
            this.polarChart.enableAnimation = false;
            this.polarChart.refresh();
        };
        document.getElementById('water300ml-column').onclick = () => {
            document.getElementById('water300ml-column').style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
            document.getElementById('water100ml-column').style.backgroundImage = null;
            document.getElementById('water200ml-column').style.backgroundImage = null;
            document.getElementById('water50ml-column').style.backgroundImage = null;
            document.getElementById('water50ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-column';
            document.getElementById('water100ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
            document.getElementById('water200ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
            document.getElementById('water300ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-columnactive';
            document.getElementById('iconml-img').style.color = '#5B5B5B';
            document.getElementById('iconml1-img').style.color = '#5B5B5B';
            document.getElementById('iconml2-img').style.color = '#5B5B5B';
            document.getElementById('iconml3-img').style.color = '#FFFFFF';
            document.getElementById('imgtext4').style.color = '#FFFFFF';
            document.getElementById('imgtext2').style.color = '#5B5B5B';
            document.getElementById('imgtext3').style.color = '#5B5B5B';
            document.getElementById('imgtext1').style.color = '#5B5B5B';
            (this.polardata[this.pointindex])['y'] = ((this.polardata[this.pointindex])['y']) + 0.3;
            this.polarChart.series[0].dataSource = <Object[]>this.polardata;
            this.polarChart.series[0].animation.enable = false;
            this.polarChart.animateSeries = false;
            this.polarChart.enableAnimation = false;
            this.polarChart.refresh();
        };
    }

    public loaded(args: ILoadedEventArgs): void {
        document.getElementById('Break-icon').onclick = () => {
            document.getElementById('Breakfast').style.color = '#FFFFFF';
            document.getElementById('Lunch').style.color = '#7D7D7D';
            document.getElementById('Dinner').style.color = '#7D7D7D';
            document.getElementById('Snack').style.color = '#7D7D7D';
            document.getElementById('Breakfast').className = 'icon-Breakfast breakimgactive';
            document.getElementById('Lunch').className = 'icon-Lunch lunchimg';
            document.getElementById('Dinner').className = 'icon-Dinner dinnerimg';
            document.getElementById('Snack').className = 'icon-Snack snackimg';
            document.getElementById('Break-icon').style.backgroundImage = 'linear-gradient(45deg, #EF9027 0%, #F23B3B 100%)';
            document.getElementById('Lunch-icon').style.backgroundImage = null;
            document.getElementById('Dinner-icon').style.backgroundImage = null;
            document.getElementById('Snack-icon').style.backgroundImage = null;
            document.getElementById('Break-text').className = 'breaktextactive';
            document.getElementById('Lunch-text').className = 'lunchtext';
            document.getElementById('Dinner-text').className = 'dinnertext';
            document.getElementById('Snack-text').className = 'snacktext';
            document.getElementById('Break-text').style.color = '#FFFFFF';
            document.getElementById('Lunch-text').style.color = '#7D7D7D';
            document.getElementById('Dinner-text').style.color = '#7D7D7D';
            document.getElementById('Snack-text').style.color = '#7D7D7D';
            document.getElementById('fat_value').innerHTML = '30g';
            document.getElementById('fibre_value').innerHTML = '30g';
            document.getElementById('carbs_value').innerHTML = '130g';
            document.getElementById('calcium_value').innerHTML = '260g';
            document.getElementById('protein_value').innerHTML = '40g';
            document.getElementById('vitamins_value').innerHTML = '60g';
            this.pie.series[0].dataSource = (<{ Breakfast: Object[] }>sunday[0]).Breakfast;
        };
        document.getElementById('Lunch-icon').onclick = () => {
            document.getElementById('Breakfast').style.color = '#7D7D7D';
            document.getElementById('Lunch').style.color = '#FFFFFF';
            document.getElementById('Dinner').style.color = '#7D7D7D';
            document.getElementById('Snack').style.color = '#7D7D7D';
            document.getElementById('Breakfast').className = 'icon-Breakfast breakimg';
            document.getElementById('Lunch').className = 'icon-Lunch lunchimgactive';
            document.getElementById('Dinner').className = 'icon-Dinner dinnerimg';
            document.getElementById('Snack').className = 'icon-Snack snackimg';
            document.getElementById('Break-text').className = 'breaktext';
            document.getElementById('Lunch-text').className = 'lunchtextactive';
            document.getElementById('Dinner-text').className = 'dinnertext';
            document.getElementById('Snack-text').className = 'snacktext';
            document.getElementById('Break-text').style.color = '#7D7D7D';
            document.getElementById('Lunch-text').style.color = '#FFFFFF';
            document.getElementById('Dinner-text').style.color = '#7D7D7D';
            document.getElementById('Snack-text').style.color = '#7D7D7D';
            document.getElementById('Break-icon').style.backgroundImage = null;
            document.getElementById('Dinner-icon').style.backgroundImage = null;
            document.getElementById('Snack-icon').style.backgroundImage = null;
            document.getElementById('Lunch-icon').style.backgroundImage = 'linear-gradient(45deg, #EF9027 0%, #F23B3B 100%)';
            document.getElementById('fat_value').innerHTML = '20g';
            document.getElementById('fibre_value').innerHTML = '10g';
            document.getElementById('carbs_value').innerHTML = '90g';
            document.getElementById('calcium_value').innerHTML = '120g';
            document.getElementById('protein_value').innerHTML = '30g';
            document.getElementById('vitamins_value').innerHTML = '40g';
            this.pie.series[0].dataSource = (<{ Lunch: Object[] }>sunday[0]).Lunch;
        };
        document.getElementById('Dinner-icon').onclick = () => {
            document.getElementById('Breakfast').style.color = '#7D7D7D';
            document.getElementById('Lunch').style.color = '#7D7D7D';
            document.getElementById('Dinner').style.color = '#FFFFFF';
            document.getElementById('Snack').style.color = '#7D7D7D';
            document.getElementById('Breakfast').className = 'icon-Breakfast breakimg';
            document.getElementById('Lunch').className = 'icon-Lunch lunchimg';
            document.getElementById('Dinner').className = 'icon-Dinner dinnerimgactive';
            document.getElementById('Snack').className = 'icon-Snack snackimg';
            document.getElementById('Break-text').className = 'breaktext';
            document.getElementById('Lunch-text').className = 'lunchtext';
            document.getElementById('Dinner-text').className = 'dinnertextactive';
            document.getElementById('Snack-text').className = 'snacktext';
            document.getElementById('Break-text').style.color = '#7D7D7D';
            document.getElementById('Lunch-text').style.color = '#7D7D7D';
            document.getElementById('Dinner-text').style.color = '#FFFFFF';
            document.getElementById('Snack-text').style.color = '#7D7D7D';
            document.getElementById('Break-icon').style.backgroundImage = null;
            document.getElementById('Lunch-icon').style.backgroundImage = null;
            document.getElementById('Snack-icon').style.backgroundImage = null;
            document.getElementById('Dinner-icon').style.backgroundImage = 'linear-gradient(45deg, #EF9027 0%, #F23B3B 100%)';
            document.getElementById('fat_value').innerHTML = '50g';
            document.getElementById('fibre_value').innerHTML = '40g';
            document.getElementById('carbs_value').innerHTML = '80g';
            document.getElementById('calcium_value').innerHTML = '110g';
            document.getElementById('protein_value').innerHTML = '30g';
            document.getElementById('vitamins_value').innerHTML = '20g';
            this.pie.series[0].dataSource = (<{ Dinner: Object[] }>sunday[0]).Dinner;
        };
        document.getElementById('Snack-icon').onclick = () => {
            document.getElementById('Breakfast').style.color = '#7D7D7D';
            document.getElementById('Lunch').style.color = '#7D7D7D';
            document.getElementById('Dinner').style.color = '#7D7D7D';
            document.getElementById('Snack').style.color = '#FFFFFF';
            document.getElementById('Break-text').className = 'breaktext';
            document.getElementById('Lunch-text').className = 'lunchtext';
            document.getElementById('Dinner-text').className = 'dinnertext';
            document.getElementById('Snack-text').className = 'snacktextactive';
            document.getElementById('Breakfast').className = 'icon-Breakfast breakimg';
            document.getElementById('Lunch').className = 'icon-Lunch lunchimg';
            document.getElementById('Dinner').className = 'icon-Dinner dinnerimg';
            document.getElementById('Snack').className = 'icon-Snack snackimgactive';
            document.getElementById('Break-text').style.color = '#7D7D7D';
            document.getElementById('Lunch-text').style.color = '#7D7D7D';
            document.getElementById('Dinner-text').style.color = '#7D7D7D';
            document.getElementById('Snack-text').style.color = '#FFFFFF';
            document.getElementById('Break-icon').style.backgroundImage = null;
            document.getElementById('Dinner-icon').style.backgroundImage = null;
            document.getElementById('Lunch-icon').style.backgroundImage = null;
            document.getElementById('Snack-icon').style.backgroundImage = 'linear-gradient(45deg, #EF9027 0%, #F23B3B 100%)';
            document.getElementById('fat_value').innerHTML = '30g';
            document.getElementById('fibre_value').innerHTML = '40g';
            document.getElementById('carbs_value').innerHTML = '150g';
            document.getElementById('calcium_value').innerHTML = '220g';
            document.getElementById('protein_value').innerHTML = '50g';
            document.getElementById('vitamins_value').innerHTML = '60g';
            this.pie.series[0].dataSource = (<{ Snack: Object[] }>sunday[0]).Snack;
        };
        document.getElementById('water').onclick = () => {
            document.getElementById('chart-title').innerHTML = 'Water Consumption';
            document.getElementById('pie-title').innerHTML = 'Sunday Report';
            document.getElementById('calories-subtitle').style.color = '#828282';
            document.getElementById('calories-text').style.color = '#828282';
            document.getElementById('water-text').style.color = '#FFFFFF';
            document.getElementById('water-subtitle').style.color = '#FFFFFF';
            document.getElementById('steps-text').style.color = '#828282';
            document.getElementById('steps-subtitle').style.color = '#828282';
            document.getElementById('sleep-text').style.color = '#828282';
            document.getElementById('sleep-subtitle').style.color = '#828282';
            this.waterclick();
        };
        document.getElementById('step').onclick = () => {
            document.getElementById('chart-title').innerHTML = 'Steps Count';
            document.getElementById('pie-title').innerHTML = 'Sunday Activity';
            document.getElementById('calories-subtitle').style.color = '#828282';
            document.getElementById('calories-text').style.color = '#828282';
            document.getElementById('water-text').style.color = '#828282';
            document.getElementById('water-subtitle').style.color = '#828282';
            document.getElementById('sleep-text').style.color = '#828282';
            document.getElementById('sleep-subtitle').style.color = '#828282';
            document.getElementById('steps-text').style.color = '#FFFFFF';
            document.getElementById('steps-subtitle').style.color = '#FFFFFF';
            document.getElementById('steps-img').style.color = '#FFFFFF';
            this.stepclick();
        };
        document.getElementById('sleep').onclick = () => {
            document.getElementById('chart-title').innerHTML = 'Sleep Tracker';
            document.getElementById('pie-title').innerHTML = 'Sleep Quality';
            document.getElementById('calories-subtitle').style.color = '#828282';
            document.getElementById('calories-text').style.color = '#828282';
            document.getElementById('water-text').style.color = '#828282';
            document.getElementById('water-subtitle').style.color = '#828282';
            document.getElementById('steps-text').style.color = '#828282';
            document.getElementById('steps-subtitle').style.color = '#828282';
            document.getElementById('sleep-text').style.color = '#FFFFFF';
            document.getElementById('sleep-subtitle').style.color = '#FFFFFF';
            this.sleepclick();
        };
        document.getElementById('calories').onclick = () => {
            document.getElementById('chart-title').innerHTML = 'Calories Consumed';
            document.getElementById('pie-title').innerHTML = 'Macro Nutrients';
            document.getElementById('calories-subtitle').style.color = '#FFFFFF';
            document.getElementById('calories-text').style.color = '#FFFFFF';
            document.getElementById('water-text').style.color = '#828282';
            document.getElementById('water-subtitle').style.color = '#828282';
            document.getElementById('steps-text').style.color = '#828282';
            document.getElementById('steps-subtitle').style.color = '#828282';
            document.getElementById('sleep-text').style.color = '#828282';
            document.getElementById('sleep-subtitle').style.color = '#828282';
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
            enableBorderOnMouseMove: false,
            enableSmartLabels: true,
            legendSettings: {
                visible: false, position: 'Top'
            },
            // Initialize the tooltip
            tooltip: { enable: false },
            loaded: (args: IAccLoadedEventArgs) => {
                if (document.getElementById('pie-container_border')) {
                    document.getElementById('pie-container_border').style.fill = 'transparent';
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
            enableBorderOnMouseMove: false,
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
                    document.getElementById('inside-container_border').style.fill = 'transparent';
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
        this.ToggleVisibility('block', 'none');
        document.getElementById('water-bg').style.borderRadius = '4px';
        document.getElementById('watercard').style.boxShadow = '0 3px 6px 3px rgba(49,131,185,0.25)';
        document.getElementById('stepcard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('sleepcard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('caloriescard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('water50ml-column').style.backgroundImage = 'linear-gradient(to right, #2140DC, #00BFD5)';
        document.getElementById('water100ml-column').style.backgroundImage = null;
        document.getElementById('water200ml-column').style.backgroundImage = null;
        document.getElementById('water300ml-column').style.backgroundImage = null;
        document.getElementById('water50ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water50ml-columnactive';
        document.getElementById('water100ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water100ml-column';
        document.getElementById('water200ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water200ml-column';
        document.getElementById('water300ml-column').className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3 water300ml-column';
        document.getElementById('imgtext1').style.color = '#FFFFFF';
        document.getElementById('imgtext2').style.color = '#5B5B5B';
        document.getElementById('imgtext3').style.color = '#5B5B5B';
        document.getElementById('imgtext4').style.color = '#5B5B5B';
        document.getElementById('iconml-img').style.color = '#FFFFFF';
        document.getElementById('iconml1-img').style.color = '#5B5B5B';
        document.getElementById('iconml2-img').style.color = '#5B5B5B';
        document.getElementById('iconml3-img').style.color = '#5B5B5B';
        document.getElementById('sleep-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 sleep-value';
        document.getElementById('step-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 steps-value';
        document.getElementById('calories-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 calories-value';
        document.getElementById('water-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 water-valueactive';
        document.getElementById('pie-title').innerHTML = 'Sunday Report';
        document.getElementById('multiple-donut').style.display = 'none';
        document.getElementById('donut').style.display = 'none';
        document.getElementById('semi-pie').style.display = 'none';
        document.getElementById('polar').style.display = 'block';
        document.getElementById('line').style.display = 'none';
        document.getElementById('spline').style.display = 'block';
        document.getElementById('column').style.display = 'none';
        document.getElementById('bubble').style.display = 'none';
        document.getElementById('calories-bg').style.backgroundImage = null;
        document.getElementById('calories').style.backgroundImage = null;
        document.getElementById('step-bg').style.backgroundImage = null;
        document.getElementById('step').style.backgroundImage = null;
        document.getElementById('calories-value').style.backgroundImage = null;
        document.getElementById('sleep-value').style.backgroundImage = null;
        document.getElementById('sleep-bg').style.backgroundImage = null;
        document.getElementById('sleep').style.backgroundImage = null;
        document.getElementById('steps-value').style.backgroundImage = null;
        document.getElementById('water-bg').style.backgroundImage = 'linear-gradient(44deg, #2140DC 0%, #00BFD5 100%)';
        document.getElementById('water').style.backgroundImage = 'linear-gradient(44deg, #2140DC 0%, #00BFD5 100%)';
        document.getElementById('steps-img').style.color = '#999393';
        document.getElementById('sleep-img').style.color = '#999393';
        document.getElementById('water-img').style.color = '#FFFFFF';
        document.getElementById('food-img').style.color = '#999393';
        document.getElementById('chart-header-title').innerHTML = '<span id="chart-title"> Water Consumption </span>';
        document.getElementById('total-value').innerHTML = '<span id="title-annotation"> Target </span><span id="value-annotation" style="color: #3B61E9;"> 7 litres </span>';
        document.getElementById("average-value").innerHTML = '<span id="title-annotation"> Daily Average </span><span id="value-annotation" style="color: #3B61E9;"> 4.32 litres </span>';
        document.getElementById('calories-subtitle').style.color = '#828282';
        document.getElementById('calories-text').style.color = '#828282';
        document.getElementById('water-text').style.color = '#FFFFFF';
        document.getElementById('water-subtitle').style.color = '#FFFFFF';
        document.getElementById('steps-text').style.color = '#828282';
        document.getElementById('steps-subtitle').style.color = '#828282';
        document.getElementById('sleep-text').style.color = '#828282';
        document.getElementById('sleep-subtitle').style.color = '#828282';
        this.LoadChartData("water");
        // this.polarChart.series[0].dataSource = < Object[]>this.polarchartdata;
        this.polarChart.series[0].animation.enable = true;
    }
    public stepclick(): void {
        this.annotation = true;
        this.ToggleVisibility('block', 'none');
        document.getElementById('step-bg').style.borderRadius = '4px';
        document.getElementById('steps-value').style.borderRadius = '4px';
        document.getElementById('watercard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('stepcard').style.boxShadow = '0 3px 6px 3px rgba(66,254,19,0.20)';
        document.getElementById('sleepcard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('caloriescard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('sleep-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 sleep-value';
        document.getElementById('step-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 steps-valueactive';
        document.getElementById('calories-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 calories-value';
        document.getElementById('water-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 water-value';
        document.getElementById('multiple-donut').style.display = 'block';
        document.getElementById('donut').style.display = 'none';
        document.getElementById('semi-pie').style.display = 'none';
        document.getElementById('polar').style.display = 'none';
        document.getElementById('line').style.display = 'none';
        document.getElementById('spline').style.display = 'none';
        document.getElementById('column').style.display = 'block';
        document.getElementById('bubble').style.display = 'none';
        document.getElementById('sleep-value').style.backgroundImage = null;
        document.getElementById('calories-bg').style.backgroundImage = null;
        document.getElementById('calories-value').style.backgroundImage = null;
        document.getElementById('calories').style.backgroundImage = null;
        document.getElementById('sleep-bg').style.backgroundImage = null;
        document.getElementById('sleep').style.backgroundImage = null;
        document.getElementById('water-bg').style.backgroundImage = null;
        document.getElementById('water').style.backgroundImage = null;
        document.getElementById('water').style.backgroundImage = null;
        document.getElementById('step-bg').style.backgroundImage = 'linear-gradient(45deg, #04AB11 0%, #7DD61D 100%)';
        document.getElementById('step').style.backgroundImage = 'linear-gradient(45deg, #04AB11 0%, #7DD61D 100%)';
        document.getElementById('steps-value').style.backgroundImage = 'linear-gradient(45deg, #04AB11 0%, #7DD61D 100%)';
        document.getElementById('steps-img').style.color = '#FFFFFF';
        document.getElementById('sleep-img').style.color = '#999393';
        document.getElementById('water-img').style.color = '#999393';
        document.getElementById('food-img').style.color = '#999393';
        document.getElementById('chart-header-title').innerHTML = '<span id="chart-title"> Steps Taken </span>'
        document.getElementById('total-value').innerHTML = '<span id="title-annotation"> Distance Travelled </span><span id="value-annotation" style="color:#05AD13"> 3.2 miles </span>'
        document.getElementById("average-value").innerHTML = ''
        document.getElementById('pie-title').innerHTML = 'sunday Activity';
        document.getElementById('calories-subtitle').style.color = '#828282';
        document.getElementById('calories-text').style.color = '#828282';
        document.getElementById('water-text').style.color = '#828282';
        document.getElementById('water-subtitle').style.color = '#828282';
        document.getElementById('sleep-text').style.color = '#828282';
        document.getElementById('sleep-subtitle').style.color = '#828282';
        document.getElementById('steps-text').style.color = '#FFFFFF';
        document.getElementById('steps-subtitle').style.color = '#FFFFFF';
        document.getElementById('steps-img').style.color = '#FFFFFF';
        this.LoadChartData("steps");
    }

    public sleepclick(): void {
        this.annotation = false;
        this.ToggleVisibility('block', 'none');
        document.getElementById('sleep-bg').style.borderRadius = '4px';
        document.getElementById('sleep-value').style.borderRadius = '4px';
        document.getElementById('watercard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('stepcard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('sleepcard').style.boxShadow = '0 3px 6px 3px rgba(71,63,204,0.20)';
        document.getElementById('caloriescard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('sleep-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 sleep-valueactive';
        document.getElementById('step-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 steps-value';
        document.getElementById('calories-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 calories-value';
        document.getElementById('water-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 water-value';
        document.getElementById('multiple-donut').style.display = 'none';
        document.getElementById('donut').style.display = 'none';
        document.getElementById('semi-pie').style.display = 'block';
        document.getElementById('polar').style.display = 'none';
        document.getElementById('line').style.display = 'none';
        document.getElementById('spline').style.display = 'none';
        document.getElementById('column').style.display = 'none';
        document.getElementById('bubble').style.display = 'block';
        document.getElementById('calories-bg').style.backgroundImage = null;
        document.getElementById('calories').style.backgroundImage = null;
        document.getElementById('calories-value').style.backgroundImage = null;
        document.getElementById('water-bg').style.backgroundImage = null;
        document.getElementById('water').style.backgroundImage = null;
        document.getElementById('step-bg').style.backgroundImage = null;
        document.getElementById('step').style.backgroundImage = null;
        document.getElementById('steps-value').style.backgroundImage = null;
        document.getElementById('sleep-bg').style.backgroundImage = 'linear-gradient(-135deg, #2925A6 0%, #B250D1 100%)';
        document.getElementById('sleep-value').style.backgroundImage = 'linear-gradient(-135deg, #2925A6 0%, #B250D1 100%)';
        document.getElementById('sleep').style.backgroundImage = 'linear-gradient(-135deg, #2925A6 0%, #B250D1 100%)';
        document.getElementById('steps-img').style.color = '#999393';
        document.getElementById('sleep-img').style.color = '#FFFFFF';
        document.getElementById('water-img').style.color = '#999393';
        document.getElementById('food-img').style.color = '#999393';
        document.getElementById('chart-header-title').innerHTML = '<span id="chart-title"> Sleep Tracker </span>'
        document.getElementById('total-value').innerHTML = '<span id="title-annotation"> Goal </span><span id="value-annotation" style="color:#4526A6"> 7.2 hrs </span>'
        document.getElementById("average-value").innerHTML = '<span id="title-annotation"> Daily Average </span><span id="value-annotation" style="color:#4526A6"> 6.32 hrs </span>'
        document.getElementById('pie-title').innerHTML = 'Sleep Quality';
        document.getElementById('calories-subtitle').style.color = '#828282';
        document.getElementById('calories-text').style.color = '#828282';
        document.getElementById('water-text').style.color = '#828282';
        document.getElementById('water-subtitle').style.color = '#828282';
        document.getElementById('steps-text').style.color = '#828282';
        document.getElementById('steps-subtitle').style.color = '#828282';
        document.getElementById('sleep-text').style.color = '#FFFFFF';
        document.getElementById('sleep-subtitle').style.color = '#FFFFFF';
        this.LoadChartData("sleep");
    }

    public caloriesclick(): void {
        this.annotation = false;
        this.ToggleVisibility('block', 'none');
        document.getElementById('calories-bg').style.borderRadius = '4px';
        document.getElementById('calories-value').style.borderRadius = '4px';
        document.getElementById('watercard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('stepcard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('sleepcard').style.boxShadow = '0 1px 4px 1px rgba(0,0,0,0.10)';
        document.getElementById('caloriescard').style.boxShadow = '0 3px 6px 2px rgba(178,30,195,0.30)';
        document.getElementById('sleep-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 sleep-value';
        document.getElementById('step-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 steps-value';
        document.getElementById('calories-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 calories-valueactive';
        document.getElementById('water-column').className = 'col-xs-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 water-value';
        document.getElementById('multiple-donut').style.display = 'none';
        document.getElementById('donut').style.display = 'block';
        document.getElementById('semi-pie').style.display = 'none';
        document.getElementById('polar').style.display = 'none';
        document.getElementById('line').style.display = 'block';
        document.getElementById('spline').style.display = 'none';
        document.getElementById('column').style.display = 'none';
        document.getElementById('bubble').style.display = 'none';
        document.getElementById('steps-value').style.backgroundImage = null;
        document.getElementById('sleep-bg').style.backgroundImage = null;
        document.getElementById('sleep').style.backgroundImage = null;
        document.getElementById('water-bg').style.backgroundImage = null;
        document.getElementById('water').style.backgroundImage = null;
        document.getElementById('step-bg').style.backgroundImage = null;
        document.getElementById('step').style.backgroundImage = null;
        document.getElementById('sleep-value').style.backgroundImage = null;
        document.getElementById('calories-bg').style.backgroundImage = 'linear-gradient(45deg, #F23B3B 0%, #EF9027 100%)';
        document.getElementById('calories-value').style.backgroundImage = 'linear-gradient(45deg, #F23B3B 0%, #EF9027 100%)';
        document.getElementById('calories').style.backgroundImage = 'linear-gradient(45deg, #F23B3B 0%, #EF9027 100%)';
        document.getElementById('steps-img').style.color = '#999393';
        document.getElementById('sleep-img').style.color = '#999393';
        document.getElementById('water-img').style.color = '#999393';
        document.getElementById('food-img').style.color = '#FFFFFF';
        document.getElementById('chart-header-title').innerHTML = '<span id="chart-title"> Calories Consumed </span>'
        document.getElementById('total-value').innerHTML = '<span id="title-annotation"> Total </span><span id="value-annotation" style="color:#780508">1437 Kcal</span>'
        document.getElementById("average-value").innerHTML = '<span id="title-annotation"> Daily Average </span><span id="value-annotation" style="color:#DB4247"> 902 Kcal </span>'
        document.getElementById('pie-title').innerHTML = 'Macro Nutrients';
        document.getElementById('calories-subtitle').style.color = '#FFFFFF';
        document.getElementById('calories-text').style.color = '#FFFFFF';
        document.getElementById('water-text').style.color = '#828282';
        document.getElementById('water-subtitle').style.color = '#828282';
        document.getElementById('steps-text').style.color = '#828282';
        document.getElementById('steps-subtitle').style.color = '#828282';
        document.getElementById('sleep-text').style.color = '#828282';
        document.getElementById('sleep-subtitle').style.color = '#828282';
        this.LoadChartData("calorie");
    }
}
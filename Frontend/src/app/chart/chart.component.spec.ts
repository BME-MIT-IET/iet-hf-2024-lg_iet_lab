import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent,CommonModule],
      providers: [{ provide: ElementRef, useValue: { nativeElement: {} } }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set data', () => {
    const data = [{ date: '2022-05-20', value: 50 }, { date: '2022-05-21', value: 60 }];
    component.setData(data);
    expect(component.getConfig().data.datasets[0].data).toEqual(data);
  });

  it('clear data', () => {
    const initialData = [{ date: '2022-05-20', value: 50 }, { date: '2022-05-21', value: 60 }];
    component.setData(initialData);
    component.clearData();
    expect(component.getConfig().data.datasets[0].data).toEqual([]);
  });

  it('set line color', () => {
    const color = 'red';
    component.setLineColor(color);
    expect(component.getConfig().options.elements.line.borderColor).toBe(color);
  });

  it('set point color', () => {
    const color = 'blue';
    component.setPointColor(color);
    expect(component.getConfig().options.elements.point.borderColor).toBe(color);
  });

  it('set min and max Y', () => {
    const minValue = 0;
    const maxValue = 100;
    component.setMinY(minValue);
    component.setMaxY(maxValue);
    expect(component.getConfig().options.scales.y.min).toBe(minValue);
    expect(component.getConfig().options.scales.y.max).toBe(maxValue);
  });

  it('getconfig test', () => {
    const conf = component.getConfig();
    expect(conf).toEqual(component.getConfig());
  });
});

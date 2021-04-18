import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgxIzitoastService } from 'ngx-izitoast';
import { Constant } from 'src/app/constants/constants';
import { BaseModel } from 'src/app/models/base/base.model';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
  styleUrls: ['./form-car.component.css']
})
export class FormCarComponent implements OnInit {

  public car: Car = new Car();
  public edit: boolean = false;
  public brands: any = Constant.MARCAS;
  public modalOptions: NgbModalOptions = {};

  @ViewChild('modal') modal: any;
  @Output() addCar = new EventEmitter<BaseModel>();

  constructor(
    private modalService: NgbModal,
    private carService: CarService,
    public iziToastService: NgxIzitoastService
  ) { }

  ngOnInit(): void {
  }

  public async openModal() {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.modalService.open(this.modal, this.modalOptions);
  }

  public async save() {
    if (this.edit) {
      this.update();
    } else {
      this.carService.create(this.car).subscribe((data: Car) => {
        this.iziToastService.success({
          title: 'Sucesso! ',
          message: 'Veículo adicionado com sucesso',
          position:  'topRight'
        });

        this.car = new Car();
        this.modalService.dismissAll();
        this.addCar.emit(data);
      },
      (err) => {
        let { error } = err;
        this.iziToastService.error({
          title: 'Erro',
          message: error.message,
          position:  'topRight'
        })
      });
    }
  }

  public async update() {
    this.carService.update(this.car.uuid, this.car).subscribe((data: Car) => {
      this.iziToastService.success({
        title: 'Sucesso! ',
        message: 'Veículo atualizado com sucesso',
        position:  'topRight'
      });

      this.edit = false;
      this.car = new Car();
      this.modalService.dismissAll();
    })
  }

  public closeModal() {
    this.modalService.dismissAll();
  }
}

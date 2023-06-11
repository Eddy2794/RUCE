import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable()
export class ToasterService {

    options: IndividualConfig;

    constructor(
        private toastr: ToastrService
    ) {
        this.options = this.toastr.toastrConfig;
        this.options.positionClass = 'toast-top-right';
        this.options.timeOut = 2500;
    }

    showToast(title: any, message: any, type: any) {
        this.toastr.show(message, title, this.options, 'toast-' + type);
    }

    showError(title: any, message: any) {
        this.toastr.error(message, title, this.options);
    }

    showSuccess(title: any, message: any) {
        this.toastr.success(message, title, this.options);
    }
    showHTMLMessage(message: any, title: any) {
        this.toastr.success(message, title, { enableHtml :  true , timeOut : 1500 });
    }
}
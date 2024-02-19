import { Services } from './../../shared/models/constants/constant.type';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HomeService } from 'src/app/shared/services/home.service';
import { OneView, ServiceDisplayName } from './model/home';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  orderId: string;
  oneViewDetails: OneView;
  userName: string;
  hasOneViewDetails: boolean;
  service: string;
  readonly serviceDisplayName = ServiceDisplayName;
  readonly Services = Services;
  interval: any;
  roles: string[];
  constructor(
    private router: Router,
    private toastMsgService: ToastService,
    private homeService: HomeService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    if (Object.keys(activeRoute.snapshot.queryParams).length) {
      const queryParams = activeRoute.snapshot.queryParams;
      if (queryParams['service']) {
        this.homeService.service$.next(queryParams['service'].toLowerCase());
        localStorage.setItem('service', queryParams['service'].toLowerCase());
      }
      if (queryParams['orderId']) {
        this.orderId = queryParams['orderId'];
        this.getOrderDetails();
      }
    }
    this.homeService.service$.subscribe((data) => (this.service = data));
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.roles = JSON.parse(localStorage.getItem('role'));
  }

  /**
   * Method that updates service based on selection
   * @param service
   */
  serviceSelectionChange(service: string) {
    this.homeService.service$.next(service);
    localStorage.setItem('service', service);
    this.orderId = null;
    this.hasOneViewDetails = false;
    this.searchByOrderId();
  }

  /**
   * Method that prevent user to press 'e','+','-' keys
   * on input type of number of orderId
   * @param event
   */
  handleKeyPressOnOrderId(event) {
    if (['e', '+', '-'].includes(event.key)) event.preventDefault();
  }

  /**
   * Method that changes the orderId in queryParams
   */
  searchByOrderId() {
    this.router.navigate([], {
      queryParams: { service: this.service, orderId: this.orderId },
    });
    this.getOrderDetails();

  }

  /**
 * Method that get details of an order using the orderId.
 * Sets the 'oneViewDetails' property to the fetched data if successful, and sets 'hasOneViewDetails' to true.
 * If unsuccessful, sets both properties to null and false, respectively.
 */
  getOrderDetails() {
    clearInterval(this.interval);
    this.oneViewDetails = null;
    this.hasOneViewDetails = false;
    this.orderDetailsApi();
    this.interval = setInterval(() => {
      this.orderDetailsApi();
    }, 30000);
  }

  /**
   * Method that calss order details api
   */
  orderDetailsApi() {
    if(this.orderId) {
    this.homeService.getOneViewOfOrder(this.orderId).subscribe(
      (res) => {
        this.oneViewDetails = OneView.fromJson(res['result']);
        this.hasOneViewDetails = true;
      }
    );
  }
}
  /**
   * Method that opens dialog box and shows details sent to it
   */
  openDialog(openedFor: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        service: this.service,
        openedFor: openedFor,
        details:
          openedFor === 'coupon details'
            ? this.oneViewDetails.couponDetails
            : this.oneViewDetails.refundDetails,
      },
    });
  }

  /**
 * Opens the customer orders page for the current OneView customer in a new browser window.
 */
  getCustomerOrdersDetails() {
    const customerPhoneNumber = this.oneViewDetails.customerDetails.contactNumber;
    const customerName = this.oneViewDetails.customerDetails.name;
    window.open(`${environment.adminDashboardBaseUrl}/${this.service}/customer-orders?customerPhoneNumber=${customerPhoneNumber.replace(/^\+91/, '')}&customerName=${customerName}`, '_blank');
  }
  /**
   *  This method opens a new tab in the browser and displays a Google Map with directions between the customer's location and the restaurant's location.
   */
  showOutletAndCustomerGoogleMap() {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.oneViewDetails.customerDetails.latitude},${this.oneViewDetails.customerDetails.longitude}
    &destination=${this.oneViewDetails.restaurantDetails.latitude},${this.oneViewDetails.restaurantDetails.longitude}&travelmode=driving`;
    window.open(url, '_blank');
    console.log("outlet and",this.oneViewDetails.customerDetails.latitude )
  }
  /**
   *  This method opens a new tab in the browser and displays a Google Map with directions between the restaurant's location and the rider's location.
   */
  showOutletAndRiderGoogleMap() {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.oneViewDetails.restaurantDetails.latitude},${this.oneViewDetails.restaurantDetails.longitude}
    &destination=${this.oneViewDetails.riderDetails.riderLatitude},${this.oneViewDetails.riderDetails.riderLongitude}&travelmode=driving`;
    window.open(url, '_blank');
    console.log('outlet to rider', this.oneViewDetails.restaurantDetails.latitude )
  }
  /**
   * This method opens a new tab in the browser and displays a Google Map with directions between the rider's location and the customer's location.
   */
  showRiderAndCustomerGoogleMap() {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.oneViewDetails.riderDetails.riderLatitude},${this.oneViewDetails.riderDetails.riderLongitude}
  &destination=${this.oneViewDetails.customerDetails.latitude},${this.oneViewDetails.customerDetails.longitude}&travelmode=driving`;
    window.open(url, '_blank');
  }
    /**
   * This method opens a new tab in the browser and displays a Google Map with directions between the pickup location and the drop location.
   */
    showPickupAndDropLocationGoogleMap() {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${this.oneViewDetails.pickupDetails.latitude},${this.oneViewDetails.pickupDetails.longitude}
    &destination=${this.oneViewDetails.dropDetails.latitude},${this.oneViewDetails.dropDetails.longitude}&travelmode=driving`;
      window.open(url, '_blank');
    }

    showRiderToDropGoogleMap(){
      const url = `https://www.google.com/maps/dir/?api=1&origin=${this.oneViewDetails.riderDetails.riderLatitude},${this.oneViewDetails.riderDetails.riderLongitude}
      &destination=${this.oneViewDetails.dropDetails.latitude},${this.oneViewDetails.dropDetails.longitude}&travelmode=driving`;
        window.open(url, '_blank');
    }

    /**
     * Method that open a new tab in the browser and displays a Google Map with directions between the Rider location and the drop location.
     * @param visitSequence 
     */
    showRiderAndDropGoogleMap(visitSequence: number) {
      this.oneViewDetails.orderLocations.forEach(ol => {
      if(visitSequence === ol.visitSequence) {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${this.oneViewDetails.riderDetails.riderLatitude},${this.oneViewDetails.riderDetails.riderLongitude}
        &destination=${ol.latitude},${ol.longitude}&travelmode=driving`;
        window.open(url, '_blank');
      }
      })
    }
  /**
   * Method that gets invovked when clicked on logout button
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
    this.toastMsgService.showSuccess('Logged Out Successfully');
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}

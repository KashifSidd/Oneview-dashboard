import { StepState } from "@angular/cdk/stepper";
import * as moment from "moment";
import { delayWhen } from "rxjs/operators";
import { formatNum } from "src/app/shared/functions/modular.functions";
import { Services } from "src/app/shared/models";

export class OneView {
    restaurantDetails = {} as IRestaurantDetails;
    riderDetails = {} as IDeliveryExecutiveDetails;
    customerDetails = {} as ICustomerDetails;
    logs = {} as ILogs;
    orderDetails = {} as IOrderDetails;
    paymentDetails = {} as IPaymentDetails;
    couponDetails = {} as ICouponDetails;
    cancellationDetails = {} as ICancellationDetails;
    refundDetails = {} as IRefundDetails;
    pickupDetails = {} as IPickupDetails;
    dropDetails = {} as IDropDetails;
    adminInvoiceSections = {} as IAdminInvoiceSections;
    orderLocations: any[] = [];
    orderItems: any[] = [];
    static fromJson(data: any): OneView {
        const o: OneView = new OneView();
        if (data['restaurant_deatils']) {
            o['restaurantDetails']['id'] = data['restaurant_deatils']['id'];
            o['restaurantDetails']['name'] = data['restaurant_deatils']['name'];
            o['restaurantDetails']['address'] = data['restaurant_deatils']['address'];
            o['restaurantDetails']['contact'] = data['restaurant_deatils']['contact'];
            o['restaurantDetails']['imageUrl'] = data['restaurant_deatils']['image']['url'];
            o['restaurantDetails']['posId'] = data['restaurant_deatils']['pos_id'];
            o['restaurantDetails']['posPartner'] = data['restaurant_deatils']['pos_partner'];
            o['restaurantDetails']['branchName'] = data['restaurant_deatils']['branch_name'];
            o['restaurantDetails']['latitude'] = data['restaurant_deatils']['latitude'];
            o['restaurantDetails']['longitude'] = data['restaurant_deatils']['longitude'];
            o['restaurantDetails']['outletType'] = data['restaurant_deatils']['type'];
            o['restaurantDetails']['pocList'] = [];
            data['restaurant_deatils']['poc_list']?.forEach((pl) => {
                const pocDetails = {}
                pocDetails['designation'] = pl['designation'];
                pocDetails['isPrimary'] = pl['is_primary'];
                pocDetails['name'] = pl['name']
                pocDetails['number'] = pl['number'];
                o['restaurantDetails']['pocList'].push(pocDetails);
            })
            // if (data['restaurant_details']['images']){
            //     o['restaurantDetails']['outletImageRows'] = [];
            //     for (const i of data['restaurant_details']['images']){
            //         const images = <IOutletImage>{};
            //         images['outletImage'] = i['name'];
            //         images['outletImageUrl'] = i['url'];
            //         o['restaurantDetails']['outletImageRows'].push(images);
            //     }
            // }
        }
        if (data['store_deatils']) {
            o['restaurantDetails']['id'] = data['store_deatils']['id'];
            o['restaurantDetails']['name'] = data['store_deatils']['name'];
            o['restaurantDetails']['address'] = data['store_deatils']['address'];
            o['restaurantDetails']['contact'] = data['store_deatils']['contact'];
            o['restaurantDetails']['imageUrl'] = data['store_deatils']['image']['url'];
            o['restaurantDetails']['latitude'] = data['store_deatils']['latitude'];
            o['restaurantDetails']['longitude'] = data['store_deatils']['longitude'];
            o['restaurantDetails']['pocList'] = [];
            data['store_deatils']['poc_list']?.forEach((pl) => {
                const pocDetails = {}
                pocDetails['designation'] = pl['designation'];
                pocDetails['isPrimary'] = pl['is_primary'];
                pocDetails['name'] = pl['name']
                pocDetails['number'] = pl['number'];
                o['restaurantDetails']['pocList'].push(pocDetails);
            })

        }
        if (data['outlet_deatils']) {
            o['restaurantDetails']['id'] = data['outlet_deatils']['id'];
            o['restaurantDetails']['name'] = data['outlet_deatils']['name'];
            o['restaurantDetails']['address'] = data['outlet_deatils']['address'];
            o['restaurantDetails']['contact'] = data['outlet_deatils']['contact'];
            o['restaurantDetails']['imageUrl'] = data['outlet_deatils']['image']['url'];
            o['restaurantDetails']['posId'] = data['outlet_deatils']['pos_id'];
            o['restaurantDetails']['posPartner'] = data['outlet_deatils']['pos_partner'];
            o['restaurantDetails']['branchName'] = data['outlet_deatils']['branch_name'];
            o['restaurantDetails']['latitude'] = data['outlet_deatils']['latitude'];
            o['restaurantDetails']['longitude'] = data['outlet_deatils']['longitude'];
            o['restaurantDetails']['outletType'] = data['outlet_deatils']['type'];
            o['restaurantDetails']['pocList'] = [];
            data['outlet_deatils']['poc_list']?.forEach((pl) => {
                const pocDetails = {}
                pocDetails['designation'] = pl['designation'];
                pocDetails['isPrimary'] = pl['is_primary'];
                pocDetails['name'] = pl['name']
                pocDetails['number'] = pl['number'];
                o['restaurantDetails']['pocList'].push(pocDetails);
            })
            // if (data['restaurant_details']['images']){
            //     o['restaurantDetails']['outletImageRows'] = [];
            //     for (const i of data['restaurant_details']['images']){
            //         const images = <IOutletImage>{};
            //         images['outletImage'] = i['name'];
            //         images['outletImageUrl'] = i['url'];
            //         o['restaurantDetails']['outletImageRows'].push(images);
            //     }
            // }
        }
        if (data['order_delivery_details']) {
            o['riderDetails']['id'] = data['order_delivery_details']['rider_id'];
            o['riderDetails']['name'] = data['order_delivery_details']['rider_name'];
            o['riderDetails']['contactNumber'] = data['order_delivery_details']['rider_contact'];
            o['riderDetails']['riderImageUrl'] = data['order_delivery_details']['rider_image_url'];
            o['riderDetails']['clientOrderId'] = data['order_delivery_details']['client_order_id'];
            o['riderDetails']['deliveryOrderId'] = data['order_delivery_details']['delivery_order_id'];
            o['riderDetails']['deliveryService'] = data['order_delivery_details']['delivery_service'];
            o['riderDetails']['deliveryStatus'] = data['order_delivery_details']['delivery_status'];
            o['riderDetails']['dropEta'] = `${data['order_delivery_details']['drop_eta']} ${'mins'}`;
            o['riderDetails']['pickUpEta'] = `${data['order_delivery_details']['pickup_eta']}  ${'mins'}`;
            o['riderDetails']['riderLatitude'] = data['order_delivery_details']['rider_latitude'];
            o['riderDetails']['riderLongitude'] = data['order_delivery_details']['rider_longitude'];

            if (data['order_delivery_details']['eta_when_order_placed']) {
                o['riderDetails']['orderDefaultPreparationTime'] = data['order_delivery_details']['eta_when_order_placed']['default_preparation_time'];
                o['riderDetails']['orderPlacedEtaEpoch'] = moment.unix(data['order_delivery_details']['eta_when_order_placed']['epoch'] / 1000).format('DD/MM/YYYY hh:mm:ss A');
                o['riderDetails']['riderToVendorEta'] = data['order_delivery_details']['eta_when_order_placed']['rider_to_vendor_eta'];
                o['riderDetails']['riderFromVendorToCustomerEta'] = data['order_delivery_details']['eta_when_order_placed']['rider_from_vendor_to_customer_eta'];
            }

            if (data['order_delivery_details']['eta_when_vendor_accepted']) {
                o['riderDetails']['vendorPreparationTime'] = data['order_delivery_details']['eta_when_vendor_accepted']['preparation_time'];
                o['riderDetails']['vendorEpoch'] = moment.unix(data['order_delivery_details']['eta_when_vendor_accepted']['epoch'] / 1000).format('DD/MM/YYYY hh:mm:ss A');
                o['riderDetails']['vendorAcceptedRiderToVendorEta'] = data['order_delivery_details']['eta_when_vendor_accepted']['rider_to_vendor_eta'];
                o['riderDetails']['vendorAcceptedRiderFromVendorToCustomerEta'] = data['order_delivery_details']['eta_when_vendor_accepted']['rider_from_vendor_to_customer_eta'];
            }
        }
        if (data['order_details']) {
            o['orderDetails']['orderId'] = data['order_details']['order_id'];
            o['cancellationDetails']['cancellationRefundEndTime'] = moment.unix(data['order_details']['cancellation_refund_end_time']).format('DD/MM/YYYY hh:mm:ss A');
            o['cancellationDetails']['cancellationUserId'] = data['order_details']['cancellation_user_id'];
            o['cancellationDetails']['cancellationUserName'] = data['order_details']['cancellation_user_name'];
            o['cancellationDetails']['cancelledBy'] = data['order_details']['cancelled_by'];
            o['cancellationDetails']['deliveryStatus'] = data['order_details']['delivery_status'];
            o['cancellationDetails']['orderAcceptanceStatus'] = data['order_details']['order_acceptance_status'];
            o['cancellationDetails']['orderStatus'] = data['order_details']['order_status'];
            o['cancellationDetails']['orderStatusLabel'] = data['order_details']['order_status_label'];
            o['cancellationDetails']['reason'] = data['order_details']['cancellation_details']?.['cancellation_reason'];
            o['orderDetails']['customerPickUpEta'] = data['order_details']['customer_pickup_eta'];
            o['orderDetails']['customerDropEta'] = data['order_details']['customer_drop_eta'];
            o['orderDetails']['totalEta'] = `${o['orderDetails']['customerPickUpEta'] + o['orderDetails']['customerDropEta']}`;
            o['orderDetails']['clientServiceType'] = clientServiceTypeList[data['order_details']['client_service_type']];
            o['orderDetails']['isSponsoredRider'] = data['order_details']['is_sponsored_rider'];
        }
        if (data['customer_details']) {
            o['customerDetails']['id'] = data['customer_details']['customer_id'];
            o['customerDetails']['name'] = data['customer_details']['customer_name'];
            o['customerDetails']['contactNumber'] = data['customer_details']['phone'];
            o['customerDetails']['alternateContactNumber'] = data['customer_details']['alternate_phone'];
            o['customerDetails']['email'] = data['customer_details']['email']; // for PND service
            if (data['customer_details']['customer_address']) {
                o['customerDetails']['email'] = data['customer_details']['customer_address']['email'];
                o['customerDetails']['addressLine1'] = data['customer_details']['customer_address']['house_flat_block_no'];
                o['customerDetails']['addressLine2'] = data['customer_details']['customer_address']['apartment_road_area'];
                o['customerDetails']['city'] = data['customer_details']['customer_address']['city'];
                o['customerDetails']['state'] = data['customer_details']['customer_address']['state'];
                o['customerDetails']['country'] = data['customer_details']['customer_address']['country'];
                o['customerDetails']['pinCode'] = data['customer_details']['customer_address']['pincode'];
                o['customerDetails']['latitude'] = data['customer_details']['customer_address']['latitude'];
                o['customerDetails']['longitude'] = data['customer_details']['customer_address']['longitude'];
            }
        }
        if (data['order_events']) {
            o['logs']['orderCreatedTime'] = data['order_events']['order_created_at'];
            o['logs']['orderCancellationTime'] = data['order_events']['order_cancelation_time'];
            o['logs']['orderDeliveredTime'] = data['order_events']['order_delivered_time'];
            o['logs']['orderMarkedReadyTime'] = data['order_events']['order_mark_ready_vendor'];
            o['logs']['orderPickedupTime'] = data['order_events']['order_pickedup_time'];
            o['logs']['orderAcceptanceTime'] = data['order_events']['order_vendor_accepted_at'];
        }

        if(data['display_invoice_breakout']){
            if(data['display_invoice_breakout']['admin_invoice']){
                if(data['display_invoice_breakout']['admin_invoice']['customer_section']){
                   o['adminInvoiceSections']['customerSectionPayableAmountLineItems'] = [];
                   if(data['display_invoice_breakout']['admin_invoice']['customer_section']['payable_amount_line_items']){
                   for (const i of data['display_invoice_breakout']['admin_invoice']['customer_section']['payable_amount_line_items']){
                     o['adminInvoiceSections']['customerSectionPayableAmountLineItems'].push(InvoiceLineItems.fromJson(i));

                   }
                }
                if(data['display_invoice_breakout']['admin_invoice']['customer_section']['total_payable_amount']){
                   const totalPayableAmount = data['display_invoice_breakout']['admin_invoice']['customer_section']['total_payable_amount'];
                   o['adminInvoiceSections']['customerSectionTotalPayableAmount'] = InvoiceLineItems.fromJson(totalPayableAmount);
                }
            }
            if(data['display_invoice_breakout']['admin_invoice']['customer_order_section']){
                o['adminInvoiceSections']['customerSectionPayableAmountLineItems'] = [];
                if(data['display_invoice_breakout']['admin_invoice']['customer_order_section']['payable_amount_line_items']){
                for (const i of data['display_invoice_breakout']['admin_invoice']['customer_order_section']['payable_amount_line_items']){
                  o['adminInvoiceSections']['customerSectionPayableAmountLineItems'].push(InvoiceLineItems.fromJson(i));

                }
             }
             if(data['display_invoice_breakout']['admin_invoice']['customer_order_section']['total_payable_amount']){
                const totalPayableAmount = data['display_invoice_breakout']['admin_invoice']['customer_order_section']['total_payable_amount'];
                o['adminInvoiceSections']['customerSectionTotalPayableAmount'] = InvoiceLineItems.fromJson(totalPayableAmount);
             }
         }

                if(data['display_invoice_breakout']['admin_invoice']['vendor_section']){
                    o['adminInvoiceSections']['vendorSectionPayoutAmountLineItems'] = [];
                    if(data['display_invoice_breakout']['admin_invoice']['vendor_section']['payout_amount_line_items']){
                    for (const i of data['display_invoice_breakout']['admin_invoice']['vendor_section']['payout_amount_line_items']){
                      o['adminInvoiceSections']['vendorSectionPayoutAmountLineItems'].push(InvoiceLineItems.fromJson(i));
                    }
                }
                if(data['display_invoice_breakout']['admin_invoice']['vendor_section']['total_payout_amount']){
                    o['adminInvoiceSections']['vendorSectionTotalPayoutAmount'] = new InvoiceLineItems ();
                    const totalPayoutAmount = data['display_invoice_breakout']['admin_invoice']['vendor_section']['total_payout_amount'];
                    o['adminInvoiceSections']['vendorSectionTotalPayoutAmount'] = InvoiceLineItems.fromJson(totalPayoutAmount);          
                 }
                }
                if(data['display_invoice_breakout']['admin_invoice']['customer_payout_section']){
                    o['adminInvoiceSections']['vendorSectionPayoutAmountLineItems'] = [];
                    if(data['display_invoice_breakout']['admin_invoice']['customer_payout_section']['payout_amount_line_items']){
                    for (const i of data['display_invoice_breakout']['admin_invoice']['customer_payout_section']['payout_amount_line_items']){
                      o['adminInvoiceSections']['vendorSectionPayoutAmountLineItems'].push(InvoiceLineItems.fromJson(i));
                    }
                }
                if(data['display_invoice_breakout']['admin_invoice']['customer_payout_section']['total_payout_amount']){
                    o['adminInvoiceSections']['vendorSectionTotalPayoutAmount'] = new InvoiceLineItems ();
                    const totalPayoutAmount = data['display_invoice_breakout']['admin_invoice']['customer_payout_section']['total_payout_amount'];
                    o['adminInvoiceSections']['vendorSectionTotalPayoutAmount'] = InvoiceLineItems.fromJson(totalPayoutAmount);          
                 }
                }
                 if((!data['display_invoice_breakout']['admin_invoice']['customer_section'] && !data['display_invoice_breakout']['admin_invoice']['vendor_section']) && (!data['display_invoice_breakout']['admin_invoice']['customer_order_section'] && !data['display_invoice_breakout']['admin_invoice']['customer_payout_section'])){
                 o['adminInvoiceSections']['customerSectionPayableAmountLineItems'] = [];
                 for (const i of data['display_invoice_breakout']['admin_invoice']['payable_amount_line_items']){
                   o['adminInvoiceSections']['customerSectionPayableAmountLineItems'].push(InvoiceLineItems.fromJson(i));
                }
                const totalPayableAmount = data['display_invoice_breakout']['admin_invoice']['total_payable_amount'];
                o['adminInvoiceSections']['customerSectionTotalPayableAmount'] = InvoiceLineItems.fromJson(totalPayableAmount);
                }
            }
        }
        if (data['order_invoice']) {
            o['orderDetails']['totalItemCost'] = formatNum(data['order_invoice']['total_food_cost'] || data['order_invoice']['total_cost']);
            o['orderDetails']['totalCustomerPayable'] = formatNum(data['order_invoice']['total_customer_payable']);
            o['orderDetails']['totalDeliveryCharges'] = formatNum(data['order_invoice']['delivery_charges']);
            o['orderDetails']['totalPackingCharges'] = formatNum(data['order_invoice']['total_packing_charges']);
            o['orderDetails']['totalTax'] = formatNum(data['order_invoice']['total_tax']);
            o['orderDetails']['txnCharges'] = formatNum(data['order_invoice']['transaction_charges']);
            o['orderDetails']['speedyyCharges'] = formatNum(data['order_invoice']['speedyy_charges']);
            o['orderDetails']['vendorPayoutAmount'] = formatNum(data['order_invoice']['vendor_payout_amount']);
            o['orderDetails']['deliveryChargesPaidBy'] = data['order_invoice']['delivery_charge_paid_by'];
            o['orderDetails']['invoiceVersion'] = data['order_invoice']['description']?.['version'];
            o['orderDetails']['orderItems'] = [];
            data['order_invoice']['menu_items']?.forEach((oi) => {
                const orderItem = {}
                orderItem['orderItemName'] = oi['item_name'];
                orderItem['orderItemQuantity'] = oi['item_quantity'];
                orderItem['orderItemFinalPrice'] = formatNum(oi['total_individual_food_item_cost'] || oi['total_individual_item_cost']);
                orderItem['orderVariants'] = [];
                orderItem['orderAddons'] = [];
                if (oi['variants']) {
                    oi['variants'].forEach(vg => {
                        const orderVariant = {};
                        orderVariant['orderVariantGroupId'] = vg['variant_group_id'];
                        orderVariant['orderVariantGroupName'] = vg['variant_group_name'];
                        orderVariant['orderVaraintId'] = vg['variant_id'];
                        orderVariant['orderVaraintName'] = vg['variant_name'];
                        orderVariant['orderVariantPrice'] = formatNum(vg['variant_price']);
                        orderItem['orderVariants'].push(orderVariant);
                    })
                }
                if (oi['addon_groups']) {
                    oi['addon_groups'].forEach(ag => {
                        ag['addons'].forEach(addon => {
                            const orderAddon = {};
                            orderAddon['orderAddonGroupId'] = ag['addon_group_id'];
                            orderAddon['orderAddonGroupName'] = ag['addon_group_name'];
                            orderAddon['orderAddonId'] = addon['addon_id'];
                            orderAddon['orderAddonName'] = addon['addon_name'];
                            orderAddon['orderAddonPrice'] = formatNum(addon['addon_price']);
                            orderItem['orderAddons'].push(orderAddon);
                        })
                    })
                }
                o['orderDetails']['orderItems'].push(orderItem);
            })
        }
        if (data['payment_details']) {
            o['paymentDetails']['txnTime'] = data['payment_details'][0]['transaction_time'];
            o['paymentDetails']['txnAmount'] = formatNum(data['payment_details'][0]['amount_paid_by_customer']);
            o['paymentDetails']['isPOD'] = data['payment_details'][0]['is_pod'];
            if (o['paymentDetails']['isPOD']) {
                o['paymentDetails']['paymentMethod'] = 'Pay On Delivery';
            }
            else {
                o['paymentDetails']['paymentMethod'] = data['payment_details'][0]['payment_method'];
            }
            o['paymentDetails']['paymentGateway'] = data['payment_details'][0]['payment_gateway'];
            o['paymentDetails']['paymentId'] = data['payment_details'][0]['payment_id'];
            o['paymentDetails']['paymentStatus'] = data['payment_details'][0]['payment_status'];
            o['paymentDetails']['txnId'] = data['payment_details'][0]['transaction_id'];
            o['paymentDetails']['txnToken'] = data['payment_details'][0]['transaction_token'];
            o['paymentDetails']['paymentOrderId'] = data['payment_details'][0]['payment_order_id']

        }
        if (data['order_invoice']['coupon_details']) {
            o['couponDetails']['couponId'] = data['order_invoice']['coupon_details']['coupon_id'];
            o['couponDetails']['couponCode'] = data['order_invoice']['coupon_details']['code'];
            o['couponDetails']['discountAmount'] = formatNum(data['order_invoice']['coupon_details']['discount_amount_applied']);
            o['couponDetails']['discountPercentage'] = data['order_invoice']['coupon_details']['discount_percentage'];
            o['couponDetails']['speedyyDiscountShareAmount'] = formatNum(data['order_invoice']['coupon_details']['discount_share_amount_speedyy']);
            o['couponDetails']['speedyyDiscountSharePercentage'] = data['order_invoice']['coupon_details']['discount_share_percentage_speedyy'];
            o['couponDetails']['vendorDiscountShareAmount'] = formatNum(data['order_invoice']['coupon_details']['discount_share_amount_vendor']);
            o['couponDetails']['vendorDiscountSharePercentage'] = data['order_invoice']['coupon_details']['discount_share_percentage_vendor'];
            o['couponDetails']['discountLevel'] = data['order_invoice']['coupon_details']['level'];
            o['couponDetails']['discountType'] = data['order_invoice']['coupon_details']['type'];
            o['couponDetails']['maxDiscountAmount'] = formatNum(data['order_invoice']['coupon_details']['max_discount_rupees']);
            o['couponDetails']['minOrderValue'] = formatNum(data['order_invoice']['coupon_details']['min_order_value_rupees']);
        }
        if (data['refund_details']) {
            o['refundDetails']['refundId'] = data['refund_details']['refund_id'];
            o['refundDetails']['refundInitiatedTime'] = data['refund_details']['created_at'];
            o['refundDetails']['refundProcessedTime'] = data['refund_details']['processed_at'];
            o['refundDetails']['refundPaymentId'] = data['refund_details']['payment_id'];
            o['refundDetails']['refundCharges'] = formatNum(data['refund_details']['refund_charges']);
            o['refundDetails']['refundGateway'] = data['refund_details']['refund_gateway'];
            o['refundDetails']['refundStatus'] = data['refund_details']['refund_status'];
            o['refundDetails']['statusDesc'] = data['refund_details']['status_description'];

            if (data['order_invoice']['refund_settlement_details']) {
                o['refundDetails']['vendorPayoutAmount'] = formatNum(data['order_invoice']['refund_settlement_details']['refund_settled_vendor_payout_amount']);
                o['refundDetails']['deliveryPartnerAmount'] = formatNum(data['order_invoice']['refund_settlement_details']['refund_settled_delivery_charges']);
                o['refundDetails']['customerRefundableAmount'] = formatNum(data['order_invoice']['refund_settlement_details']['refund_settled_customer_amount']);
                o['refundDetails']['remarksForVendor'] = data['order_invoice']['refund_settlement_details']['refund_settlement_note_to_vendor'];
                o['refundDetails']['remarksForDeliveryPartner'] = data['order_invoice']['refund_settlement_details']['refund_settlement_note_to_delivery_partner'];
                o['refundDetails']['remarksForCustomer'] = data['order_invoice']['refund_settlement_details']['refund_settlement_note_to_customer'];
            }
        }

        // For pickup-drop service
        if (data['pickup_details']) {
            o['pickupDetails']['name'] = data['pickup_details']['name'];
            o['pickupDetails']['contact'] = data['pickup_details']['contact'];
            o['pickupDetails']['address'] = data['pickup_details']['address'];
            o['pickupDetails']['city'] = data['pickup_details']['city'];
            const coordinates = data.pickup_details.coordinates;
            [o['pickupDetails']['latitude'], o['pickupDetails']['longitude']] = coordinates.replace('[', '').replace(']', '').split(',');
        }
        if (data['drop_details']) {
            o['dropDetails']['name'] = data['drop_details']['name'];
            o['dropDetails']['contact'] = data['drop_details']['contact'];
            o['dropDetails']['address'] = data['drop_details']['address'];
            o['dropDetails']['city'] = data['drop_details']['city'];
            const coordinates = data.drop_details.coordinates;
            [o['dropDetails']['latitude'], o['dropDetails']['longitude']] = coordinates.replace('[', '').replace(']', '').split(',');

        }
        if(data['order_locations']) {
            data['order_locations']?.forEach((ol) => {
                const orderLocations = {}
                orderLocations['address'] = ol['address'];
                orderLocations['arrivalEta'] = ol['arrival_eta'];
                orderLocations['contactName'] = ol['contact_name'];
                orderLocations['contactPhone'] = ol['contact_phone'];
                orderLocations['cancellationReason'] = ol['cancellation_reason'];
                orderLocations['merchantPodAmount'] = ol['merchant_pod_amount'];
                orderLocations['deliveryCompletedAt'] = ol['delivery_completed_at'];
                orderLocations['orderLocationId'] = ol['id'];
                orderLocations['deliveryOrderLocationId'] = ol['delivery_order_location_id'];
                orderLocations['deliveryStatus'] = ol['delivery_status'];
                orderLocations['podStatus'] = ol['pod_status'];
                orderLocations['type'] = ol['type'];
                orderLocations['visitSequence'] = ol['visit_sequence'];
                orderLocations['cityName'] = ol['city_name'];
                orderLocations['latitude'] = ol['coordinates']['latitude'];
                orderLocations['longitude'] = ol['coordinates']['longitude'];
                o['orderLocations'].push(orderLocations);
            }) 
        }
        if(data['order_items']) {
            data['order_items']?.forEach((oi) => {
                const orderItems = {}
                orderItems['dropLocationId'] = oi['drop_location_id'];
                orderItems['externalId'] = oi['external_id'];
                orderItems['orderItemId'] = oi['id'];
                orderItems['name'] = oi['name'];
                orderItems['pickupLocationId'] = oi['pickup_location_id'];
                orderItems['price'] = oi['price'];
                orderItems['quantity'] = oi['quantity'];
                o['orderItems'].push(orderItems);
            }) 
        }
        return o;
    }
}
export interface IRestaurantDetails {
    id: string;
    name: string;
    address: string;
    contact: string;
    imageUrl: string;
    outletImageRows: IOutletImage[];
    posId: string;
    posPartner: string;
    branchName: string;
    latitude: number;
    longitude: number;
    outletType: string;
    pocList: any[];
}

export interface IOutletImage {
    outletImage: string;
    outletImageUrl: string;
}

export interface IDeliveryExecutiveDetails {
    id: number;
    name: string;
    contactNumber: string;
    clientOrderId: string;
    deliveryOrderId: string;
    deliveryService: string;
    deliveryStatus: string;
    deliveryTime: string;
    dropEta: string;
    pickUpEta: string;
    riderImageUrl: string;
    riderLatitude: number;
    riderLongitude: number;
    orderDefaultPreparationTime: number;
    orderPlacedEtaEpoch: string;
    riderToVendorEta: number;
    riderFromVendorToCustomerEta: number;
    vendorPreparationTime: number;
    vendorEpoch: string;
    vendorAcceptedRiderToVendorEta: number;
    vendorAcceptedRiderFromVendorToCustomerEta: number;
}

export interface ICustomerDetails {
    id: string;
    name: string;
    contactNumber: string;
    alternateContactNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    latitude: number;
    longitude: number;
}
export interface ILogs {
    orderCreatedTime: string;
    orderCancellationTime: string;
    orderDeliveredTime: string;
    orderMarkedReadyTime: string;
    orderPickedupTime: string;
    orderAcceptanceTime: string;
}
export interface IOrderDetails {
    orderId: number;
    totalItemCost: string;
    totalCustomerPayable: string;
    totalDeliveryCharges: string;
    totalPackingCharges: string;
    vendorPayoutAmount: string;
    totalTax: string;
    txnCharges: string;
    orderItems: any[];
    deliveryChargesPaidBy: string;
    invoiceVersion: string;
    customerPickUpEta: number;
    customerDropEta: number;
    speedyyCharges: string;
    clientServiceType: string;
    isSponsoredRider: boolean;
}
export interface ICancellationDetails {
    cancellationRefundEndTime: string;
    cancellationUserId: string;
    cancellationUserName: string;
    cancelledBy: string;
    deliveryStatus: string;
    orderAcceptanceStatus: string;
    orderStatus: string;
    orderStatusCode: number;
    orderStatusLabel: string;
    reason: string;
}
export interface IPaymentDetails {
    txnTime: string;
    txnAmount: string;
    paymentMethod: string;
    paymentGateway: string;
    paymentId: string;
    paymentStatus: string;
    txnId: string;
    isPOD: boolean;
    paymentOrderId: string;
}
export interface ICouponDetails {
    couponId: number;
    couponCode: string;
    discountAmount: string;
    discountPercentage: number;
    speedyyDiscountShareAmount: string;
    speedyyDiscountSharePercentage: number;
    vendorDiscountShareAmount: string;
    vendorDiscountSharePercentage: number;
    discountLevel: string;
    discountType: string;
    maxDiscountAmount: string;
    minOrderValue: string;
}
export interface IRefundDetails {
    refundId: string;
    vendorPayoutAmount: string;
    deliveryPartnerAmount: string;
    customerRefundableAmount: string;
    remarksForVendor: string;
    remarksForDeliveryPartner: string;
    remarksForCustomer: string;
    refundInitiatedTime: string;
    refundProcessedTime: string;
    refundPaymentId: string;
    refundCharges: string;
    refundGateway: string;
    refundStatus: string;
    statusDesc: string;
}
export interface IPickupDetails {
    name: string;
    contact: string;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
}
export interface IDropDetails {
    name: string;
    contact: string;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
}
export interface IAdminInvoiceSections {
    customerSectionPayableAmountLineItems: InvoiceLineItems[];
    customerSectionTotalPayableAmount: InvoiceLineItems;
    vendorSectionPayoutAmountLineItems: InvoiceLineItems[];
    vendorSectionTotalPayoutAmount: InvoiceLineItems;
}
export interface IOrderLocations {
    address: string;
    arrivalEta: string;
    contactName: string;
    contactPhone: string;
    cancellationReason: string;
    merchantPodAmount: string;
    deliveryCompletedAt: string;
    orderLocationId: string;
    deliveryOrderLocationId: string;
    deliveryStatus: string;
    podStatus: string;
    type: string;
    visitSequence: string;
    cityName: string;
    latitude: number;
    longitude: number;
}

export class InvoiceLineItems{

    displayLabel: string;
    amount: string;
    displayAmount: string;
    amountColor: string;
    breakoutLabel: [];
    displayLabelColor: string;
    isStrikeThrough: boolean;

    static fromJson(data:any) : InvoiceLineItems{
        const i: InvoiceLineItems = new InvoiceLineItems();
        i['displayLabel']= data['display_label'];
        i['amount'] = data['amount'];
        i['amountColor'] = data['amount_color'];
        i['breakoutLabel'] = data['breakout_label'];
        i['displayAmount'] = data['display_amount'];
        i['displayLabelColor'] = data['display_label'];
        i['isStrikeThrough'] = data['is_strikethrough'];
        return i;
    }
}

export const ServiceDisplayName: { [key in Services]?: string } = {
    [Services.Food]: 'Food',
    [Services.PND]: 'Pickup & Drop',
    [Services.Grocery]: 'Grocery',
    [Services.Paan]: 'Paan',
    [Services.Flower]: 'Flower',
    [Services.Pharmacy]: 'Pharmacy',
    [Services.Pet]: 'Pet',
}

export type ClientServiceType = 'food' | 'tea_and_coffee' | 'bakery';

export const clientServiceTypeList :{ [key in ClientServiceType]?: string} ={
    food : 'Food',
    tea_and_coffee: 'Tea & Coffee',
    bakery: 'Bakery'
}
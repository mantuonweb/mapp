import { Component, OnInit } from '@angular/core';
declare var StripeCheckout;
// https://www.npmjs.com/package/ngx-stripe
// https://stripe.com/docs/js
// https://medium.com/better-programming/payments-simplified-stripe-angular-express-4a88bf69f82e
//https://stripe.com/docs/stripe-js/elements/payment-request-button
// npm i stripe-angular
// https://github.com/AckerApple/stripe-angular#readme
//https://stripe.com/docs/payments/checkout/migration
//https://stackoverflow.com/questions/57216887/how-to-integrate-latest-version-of-stripe-payment-gateway-server-checkout-in-a
@Component({
  selector: 'mapp-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  handler
  constructor() { }

  ngOnInit(): void {
    this.loadStripe();
  }
  pay(amount) {

    var handler = StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });

    handler.open({
      name: 'Mantu Side',
      description: 'Transfer amount widgets',
      amount: amount * 100
    });

  }
  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }
}

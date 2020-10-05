import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import {loadStripe} from '@stripe/stripe-js';
declare var Stripe;
@Component({
  selector: 'mapp-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  //
  stripeKey = "pk_test_51HYw38JstFBsrnbnVOkoWkvgntT8Bid13GNj1qIP4cvGZAvnfWgKHjeCYc0Y9HpZFL8d9Mi4AlzjBQ7HcsVnDWhi00Z4K7Q7Qr";
  stripe;
  card;
  errorMessage = "";
  @ViewChild("cardElement") cardElement: ElementRef
  constructor() {
    this.stripe = Stripe(this.stripeKey);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.load()
    }, 0)
  }
  load() {
    // Create an instance of Elements.
    var elements = this.stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    this.card = elements.create('card', { style: style });

    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount(this.cardElement.nativeElement);

    // Handle real-time validation errors from the card Element.
    this.card.on('change', (event) => {
      // var displayError = document.getElementById('card-errors');
      if (event.error) {
        this.errorMessage = event.error.message;
      } else {
        this.errorMessage = '';
      }
    });
  }
  onSubmit(event) {
    event.preventDefault();
    console.log(event);
    this.stripe.createToken(this.card).then((result) => {
      if (result.error) {
        this.errorMessage = result.error.message;
      } else {
        // Send the token to your server.
        this.stripeTokenHandler(result.token);
      }
    });
  }
  stripeTokenHandler(token) {
    console.log(token);
  }
}

import { HttpClient } from '@angular/common/http';
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
  clientSecret ="";
  paymentData:any;
  @ViewChild("cardElement") cardElement: ElementRef
  constructor(private http: HttpClient) {
    //http://localhost:4242/create-payment-intent
    //https://stripe.com/docs/india-exports
    
  }

  ngOnInit(): void {
    this.http.post('https://payexp.herokuapp.com/create-payment-intent',{"items":[{"id":"photo-subscription"}],currency:'usd'}).subscribe((resp:any)=>{
      this.stripeKey = resp.publishableKey;
      this.clientSecret = resp.clientSecret;
      setTimeout(() => {
        this.load()
      }, 0);
    })

  }
  load() {
    this.stripe = Stripe(this.stripeKey);
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
    // console.log(event);
    // this.stripe.createToken(this.card).then((result) => {
    //   if (result.error) {
    //     this.errorMessage = result.error.message;
    //   } else {
    //     // Send the token to your server.
    //     this.stripeTokenHandler(result.token);
    //   }
    // });
    this.pay(this.stripe,this.card,this.clientSecret)
  }
  pay(stripe, card, clientSecret){
    stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: 'Jenny Rosen',
        }
      }
    })
    .then((result) =>{
      if (result.error) {
        // Show error to your customer
        // showError(result.error.message);
        this.errorMessage = result.error.message;
      } else {
        // The payment has been processed!
        this.orderComplete(clientSecret);
      }
    });
  }
  stripeTokenHandler(token) {
    console.log(token);
    this.pay(this.stripe,this.card,this.clientSecret);
  }
  orderComplete(clientSecret){
    this.stripe.retrievePaymentIntent(clientSecret).then((result) =>{
      this.paymentData = result;
      console.log(result);
      // alert("Completed");
      // var paymentIntent = result.paymentIntent;
      // var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
  
      // document.querySelector(".sr-payment-form").classList.add("hidden");
      // document.querySelector("pre").textContent = paymentIntentJson;
  
      // document.querySelector(".sr-result").classList.remove("hidden");
      // setTimeout(function() {
      //   document.querySelector(".sr-result").classList.add("expand");
      // }, 200);
  
      // changeLoadingState(false);
    });
  }
}

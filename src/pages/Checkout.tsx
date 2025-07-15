
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CreditCard, Wallet, Plus, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const Checkout = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Mock cart data
  const cartItems = [
    { id: 1, name: "Classic Beef Burger", price: 299, quantity: 2 },
    { id: 2, name: "Crispy Fries", price: 149, quantity: 1 }
  ];

  const addresses = [
    {
      id: 0,
      type: "Home",
      address: "123 Main Street, Downtown",
      city: "Mumbai, Maharashtra",
      pincode: "400001"
    },
    {
      id: 1,
      type: "Work",
      address: "456 Business Park, Sector 5",
      city: "Mumbai, Maharashtra",
      pincode: "400070"
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 49;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + deliveryFee + taxes;

  const handlePlaceOrder = () => {
    // In real app, process payment and create order
    navigate('/order-tracking/123');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-800">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <span>Delivery Address</span>
                  </span>
                  <Dialog open={showAddAddress} onOpenChange={setShowAddAddress}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Address Type (Home, Work, etc.)" />
                        <Textarea placeholder="Full Address" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="City" />
                          <Input placeholder="Pincode" />
                        </div>
                        <div className="flex space-x-3">
                          <Button variant="outline" onClick={() => setShowAddAddress(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500">
                            Save Address
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary">{address.type}</Badge>
                          {selectedAddress === address.id && (
                            <Badge className="bg-orange-100 text-orange-800">Selected</Badge>
                          )}
                        </div>
                        <p className="text-gray-800 font-medium">{address.address}</p>
                        <p className="text-gray-600 text-sm">{address.city} - {address.pincode}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  onClick={() => setSelectedPayment('card')}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPayment === 'card'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Pay securely with your card</p>
                    </div>
                  </div>
                </div>
                
                <div
                  onClick={() => setSelectedPayment('wallet')}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPayment === 'wallet'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Digital Wallet</p>
                      <p className="text-sm text-gray-600">Pay with UPI, PayTM, etc.</p>
                    </div>
                  </div>
                </div>
                
                <div
                  onClick={() => setSelectedPayment('cod')}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPayment === 'cod'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs">₹</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-gray-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Charges</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  Place Order
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Estimated delivery time: 25-30 minutes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

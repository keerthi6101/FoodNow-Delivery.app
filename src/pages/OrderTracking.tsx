
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, CheckCircle, Truck, Package, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(1);

  const orderStatuses = [
    { id: 0, title: "Order Placed", description: "Your order has been confirmed", icon: CheckCircle, completed: true },
    { id: 1, title: "Preparing", description: "Restaurant is preparing your order", icon: ChefHat, completed: true },
    { id: 2, title: "Out for Delivery", description: "Your order is on the way", icon: Truck, completed: false },
    { id: 3, title: "Delivered", description: "Order delivered successfully", icon: Package, completed: false }
  ];

  const orderDetails = {
    id: orderId,
    restaurant: "Burger Palace",
    items: [
      { name: "Classic Beef Burger", quantity: 2, price: 299 },
      { name: "Crispy Fries", quantity: 1, price: 149 }
    ],
    total: 747,
    deliveryAddress: "123 Main Street, Downtown, Mumbai - 400001",
    estimatedTime: "25 minutes",
    deliveryPartner: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      rating: 4.8
    }
  };

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setCurrentStatus(prev => {
        if (prev < 3) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-800">Track Order #{orderId}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Live Map Area */}
        <Card>
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-t-lg flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-800 font-medium">Live Tracking</p>
                <p className="text-blue-600 text-sm">Your order is being tracked in real-time</p>
              </div>
              
              {/* Mock delivery partner location */}
              <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Delivery Partner</span>
                </div>
                <p className="text-xs text-gray-600">2 minutes away</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Status */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span>Order Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderStatuses.map((status, index) => (
                    <div key={status.id} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        index <= currentStatus ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <status.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          index <= currentStatus ? 'text-gray-800' : 'text-gray-400'
                        }`}>
                          {status.title}
                        </h3>
                        <p className={`text-sm ${
                          index <= currentStatus ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {status.description}
                        </p>
                        {index === currentStatus && (
                          <Badge className="mt-2 bg-orange-100 text-orange-800">
                            Current Status
                          </Badge>
                        )}
                      </div>
                      <div className={`text-sm ${
                        index <= currentStatus ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {index <= currentStatus && <CheckCircle className="w-5 h-5" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Partner Info */}
            {currentStatus >= 2 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-orange-600" />
                    <span>Delivery Partner</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-orange-600">
                          {orderDetails.deliveryPartner.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {orderDetails.deliveryPartner.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-gray-600">Rating:</span>
                          <span className="text-sm font-medium">
                            {orderDetails.deliveryPartner.rating} ⭐
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">{orderDetails.restaurant}</h3>
                  <div className="space-y-1">
                    {orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{orderDetails.total}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Delivery Address</h4>
                  <p className="text-sm text-gray-600">{orderDetails.deliveryAddress}</p>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-800">
                    Estimated arrival: {orderDetails.estimatedTime}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;

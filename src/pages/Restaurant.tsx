
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);

  // Mock restaurant data
  const restaurant = {
    id: 1,
    name: "Burger Palace",
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 1250,
    deliveryTime: "25-30 min",
    cuisines: ["American", "Fast Food"],
    priceRange: "₹₹",
    distance: "1.2 km",
    offer: "50% OFF up to ₹100",
    description: "Delicious burgers made with premium ingredients and served fresh.",
    menu: [
      {
        id: 1,
        category: "Burgers",
        items: [
          {
            id: 1,
            name: "Classic Beef Burger",
            description: "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
            price: 299,
            image: "/placeholder.svg",
            isVeg: false
          },
          {
            id: 2,
            name: "Chicken Deluxe",
            description: "Grilled chicken breast with cheese, bacon, and fresh vegetables",
            price: 349,
            image: "/placeholder.svg",
            isVeg: false
          },
          {
            id: 3,
            name: "Veggie Supreme",
            description: "Plant-based patty with avocado, sprouts, and herb mayo",
            price: 279,
            image: "/placeholder.svg",
            isVeg: true
          }
        ]
      },
      {
        id: 2,
        category: "Sides",
        items: [
          {
            id: 4,
            name: "Crispy Fries",
            description: "Golden french fries with sea salt",
            price: 149,
            image: "/placeholder.svg",
            isVeg: true
          },
          {
            id: 5,
            name: "Onion Rings",
            description: "Beer-battered onion rings with dipping sauce",
            price: 179,
            image: "/placeholder.svg",
            isVeg: true
          }
        ]
      }
    ]
  };

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getItemQuantity = (itemId: number) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

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
            <h1 className="text-lg font-semibold text-gray-800">{restaurant.name}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Restaurant Info */}
        <div className="bg-white shadow-sm">
          <div className="h-64 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <span className="text-8xl opacity-50">🍔</span>
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
                <p className="text-gray-600 mb-2">{restaurant.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{restaurant.rating} ({restaurant.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
              </div>
              {restaurant.offer && (
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {restaurant.offer}
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {restaurant.cuisines.map(cuisine => (
                <Badge key={cuisine} variant="secondary">
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-6 space-y-6">
          {restaurant.menu.map(section => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">{section.category}</h2>
              </div>
              
              <div className="p-6 space-y-6">
                {section.items.map(item => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <div className={`w-3 h-3 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                          </div>
                        </div>
                        <span className="font-bold text-gray-800">₹{item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      
                      {getItemQuantity(item.id) === 0 ? (
                        <Button
                          onClick={() => addToCart(item)}
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <Button
                            onClick={() => removeFromCart(item.id)}
                            variant="outline"
                            size="sm"
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium text-gray-800">
                            {getItemQuantity(item.id)}
                          </span>
                          <Button
                            onClick={() => addToCart(item)}
                            variant="outline"
                            size="sm"
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl opacity-50">🍔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {cart.reduce((total, item) => total + item.quantity, 0)} items
              </p>
              <p className="font-bold text-gray-800">₹{getTotalPrice()}</p>
            </div>
            <Button
              onClick={() => navigate('/checkout')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;


import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Star, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RestaurantCard from '@/components/RestaurantCard';
import LocationModal from '@/components/LocationModal';
import FilterModal from '@/components/FilterModal';

const Index = () => {
  const [location, setLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: [],
    rating: '',
    deliveryTime: '',
    priceRange: ''
  });

  // Mock restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Burger Palace",
      image: "/placeholder.svg",
      rating: 4.5,
      deliveryTime: "25-30 min",
      cuisines: ["American", "Fast Food"],
      priceRange: "₹₹",
      distance: "1.2 km",
      offer: "50% OFF up to ₹100"
    },
    {
      id: 2,
      name: "Spice Route",
      image: "/placeholder.svg",
      rating: 4.3,
      deliveryTime: "30-35 min",
      cuisines: ["Indian", "North Indian"],
      priceRange: "₹₹₹",
      distance: "2.1 km",
      offer: "Free Delivery"
    },
    {
      id: 3,
      name: "Pizza Corner",
      image: "/placeholder.svg",
      rating: 4.6,
      deliveryTime: "20-25 min",
      cuisines: ["Italian", "Pizza"],
      priceRange: "₹₹",
      distance: "0.8 km",
      offer: "Buy 1 Get 1 Free"
    },
    {
      id: 4,
      name: "Sushi Zen",
      image: "/placeholder.svg",
      rating: 4.7,
      deliveryTime: "35-40 min",
      cuisines: ["Japanese", "Sushi"],
      priceRange: "₹₹₹₹",
      distance: "3.2 km",
      offer: "20% OFF"
    },
    {
      id: 5,
      name: "Taco Fiesta",
      image: "/placeholder.svg",
      rating: 4.2,
      deliveryTime: "25-30 min",
      cuisines: ["Mexican", "Fast Food"],
      priceRange: "₹₹",
      distance: "1.8 km",
      offer: "₹50 OFF"
    },
    {
      id: 6,
      name: "Dragon Wok",
      image: "/placeholder.svg",
      rating: 4.4,
      deliveryTime: "30-35 min",
      cuisines: ["Chinese", "Asian"],
      priceRange: "₹₹₹",
      distance: "2.5 km",
      offer: "Free Dessert"
    }
  ];

  useEffect(() => {
    // Check for saved location
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setLocation(savedLocation);
    } else {
      setShowLocationModal(true);
    }
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCuisine = selectedFilters.cuisine.length === 0 ||
                          selectedFilters.cuisine.some(filter => restaurant.cuisines.includes(filter));
    
    const matchesRating = !selectedFilters.rating || restaurant.rating >= parseFloat(selectedFilters.rating);
    
    return matchesSearch && matchesCuisine && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  FoodNow
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="flex items-center space-x-2 border-orange-200 hover:bg-orange-50"
                onClick={() => setShowLocationModal(true)}
              >
                <MapPin className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-gray-700">
                  {location || 'Select Location'}
                </span>
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Hungry? We've got you covered!
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            Order from your favorite restaurants and get it delivered fast
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-full shadow-lg p-2 flex items-center">
            <div className="flex-1 flex items-center space-x-3 px-4">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus:ring-0 text-gray-700 placeholder-gray-400"
              />
            </div>
            <Button
              onClick={() => setShowFilterModal(true)}
              variant="outline"
              size="sm"
              className="mr-2 border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Filter className="w-4 h-4" />
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full px-8">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">
            Restaurants near you
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{filteredRestaurants.length} restaurants available</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Popular Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Pizza', 'Burger', 'Indian', 'Chinese', 'Sushi', 'Mexican'].map((category) => (
              <div key={category} className="text-center group cursor-pointer">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                  <span className="text-2xl">🍕</span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-orange-600">
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <LocationModal 
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationSelect={setLocation}
      />
      
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={selectedFilters}
        onFiltersChange={setSelectedFilters}
      />
    </div>
  );
};

export default Index;

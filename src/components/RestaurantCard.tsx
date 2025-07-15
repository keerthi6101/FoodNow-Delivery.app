
import React from 'react';
import { Star, Clock, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisines: string[];
  priceRange: string;
  distance: string;
  offer?: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
          <span className="text-6xl opacity-50">🍽️</span>
        </div>
        {restaurant.offer && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            <Tag className="w-3 h-3 inline mr-1" />
            {restaurant.offer}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-xs font-medium text-gray-700">{restaurant.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-lg group-hover:text-orange-600 transition-colors">
            {restaurant.name}
          </h3>
          <span className="text-sm text-gray-500 font-medium">{restaurant.priceRange}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">
          {restaurant.cuisines.join(', ')}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{restaurant.distance}</span>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300"
        >
          View Menu
        </Button>
      </div>
    </div>
  );
};

export default RestaurantCard;

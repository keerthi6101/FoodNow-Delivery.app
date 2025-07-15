
import React from 'react';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    cuisine: string[];
    rating: string;
    deliveryTime: string;
    priceRange: string;
  };
  onFiltersChange: (filters: any) => void;
}

const FilterModal = ({ isOpen, onClose, filters, onFiltersChange }: FilterModalProps) => {
  const cuisines = ['Indian', 'Chinese', 'Italian', 'American', 'Mexican', 'Japanese', 'Thai', 'Fast Food'];
  const ratings = ['4.0+', '4.2+', '4.5+'];
  const deliveryTimes = ['Under 30 min', '30-45 min', '45+ min'];
  const priceRanges = ['₹', '₹₹', '₹₹₹', '₹₹₹₹'];

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    const updatedCuisines = checked
      ? [...filters.cuisine, cuisine]
      : filters.cuisine.filter(c => c !== cuisine);
    
    onFiltersChange({ ...filters, cuisine: updatedCuisines });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      cuisine: [],
      rating: '',
      deliveryTime: '',
      priceRange: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Filter Restaurants</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-orange-600 hover:text-orange-700"
            >
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Cuisine Filter */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Cuisine</h3>
            <div className="grid grid-cols-2 gap-2">
              {cuisines.map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={cuisine}
                    checked={filters.cuisine.includes(cuisine)}
                    onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                  />
                  <label htmlFor={cuisine} className="text-sm text-gray-700 cursor-pointer">
                    {cuisine}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Rating</h3>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={rating}
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => onFiltersChange({ ...filters, rating })}
                    className="text-orange-600"
                  />
                  <label htmlFor={rating} className="text-sm text-gray-700 cursor-pointer flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{rating}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Time Filter */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Delivery Time</h3>
            <div className="space-y-2">
              {deliveryTimes.map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={time}
                    name="deliveryTime"
                    checked={filters.deliveryTime === time}
                    onChange={() => onFiltersChange({ ...filters, deliveryTime: time })}
                    className="text-orange-600"
                  />
                  <label htmlFor={time} className="text-sm text-gray-700 cursor-pointer">
                    {time}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Price Range</h3>
            <div className="flex space-x-2">
              {priceRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => onFiltersChange({ ...filters, priceRange: range })}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filters.priceRange === range
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 text-gray-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-3 pt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;

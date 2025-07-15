
import React, { useState } from 'react';
import { MapPin, Search, Target, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
}

const LocationModal = ({ isOpen, onClose, onLocationSelect }: LocationModalProps) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(false);

  const popularLocations = [
    'Mumbai, Maharashtra',
    'Delhi, India',
    'Bangalore, Karnataka',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Pune, Maharashtra'
  ];

  const handleDetectLocation = () => {
    setDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          const mockAddress = 'Current Location, Your City';
          onLocationSelect(mockAddress);
          localStorage.setItem('userLocation', mockAddress);
          setDetectingLocation(false);
          onClose();
        },
        (error) => {
          console.error('Error getting location:', error);
          setDetectingLocation(false);
        }
      );
    } else {
      setDetectingLocation(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleLocationSelect = (location: string) => {
    onLocationSelect(location);
    localStorage.setItem('userLocation', location);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-orange-600" />
            <span>Select Your Location</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Button
            onClick={handleDetectLocation}
            disabled={detectingLocation}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Target className="w-4 h-4 mr-2" />
            {detectingLocation ? 'Detecting Location...' : 'Use Current Location'}
          </Button>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for area, street name..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Popular Locations</h4>
            {popularLocations.map((location) => (
              <button
                key={location}
                onClick={() => handleLocationSelect(location)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{location}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;

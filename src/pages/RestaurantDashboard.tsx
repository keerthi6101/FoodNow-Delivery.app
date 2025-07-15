
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Star, TrendingUp, Package, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const RestaurantDashboard = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const restaurantStats = {
    totalOrders: 1250,
    revenue: 89500,
    rating: 4.5,
    activeItems: 24
  };

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Classic Beef Burger",
      description: "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
      price: 299,
      category: "Burgers",
      isVeg: false,
      isAvailable: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Chicken Deluxe",
      description: "Grilled chicken breast with cheese, bacon, and fresh vegetables",
      price: 349,
      category: "Burgers",
      isVeg: false,
      isAvailable: true,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Veggie Supreme",
      description: "Plant-based patty with avocado, sprouts, and herb mayo",
      price: 279,
      category: "Burgers",
      isVeg: true,
      isAvailable: false,
      image: "/placeholder.svg"
    }
  ]);

  const recentOrders = [
    { id: "ORD001", customer: "John Doe", items: "Beef Burger x2, Fries x1", total: 747, status: "Preparing", time: "5 min ago" },
    { id: "ORD002", customer: "Jane Smith", items: "Chicken Deluxe x1", total: 349, status: "Ready", time: "12 min ago" },
    { id: "ORD003", customer: "Mike Johnson", items: "Veggie Supreme x1, Fries x2", total: 577, status: "Delivered", time: "25 min ago" }
  ];

  const toggleItemAvailability = (itemId: number) => {
    setMenuItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const deleteItem = (itemId: number) => {
    setMenuItems(items => items.filter(item => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Burger Palace</h1>
                  <p className="text-sm text-gray-600">Restaurant Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Storefront
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{restaurantStats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">₹{restaurantStats.revenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-gray-800">{restaurantStats.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Items</p>
                  <p className="text-2xl font-bold text-gray-800">{restaurantStats.activeItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Menu Items</CardTitle>
                  <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Menu Item</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Item Name" />
                        <Textarea placeholder="Description" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="Price (₹)" type="number" />
                          <Input placeholder="Category" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="veg" />
                          <label htmlFor="veg" className="text-sm">Vegetarian</label>
                        </div>
                        <div className="flex space-x-3">
                          <Button variant="outline" onClick={() => setShowAddItem(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500">
                            Add Item
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🍔</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <div className={`w-3 h-3 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                          </div>
                          {!item.isAvailable && (
                            <Badge variant="secondary">Out of Stock</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className="font-bold text-gray-800">₹{item.price}</span>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={item.isAvailable}
                          onCheckedChange={() => toggleItemAvailability(item.id)}
                        />
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">#{order.id}</span>
                        <Badge className={
                          order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Ready' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{order.customer}</p>
                      <p className="text-sm text-gray-500 mb-2">{order.items}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800">₹{order.total}</span>
                        <span className="text-xs text-gray-500">{order.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;

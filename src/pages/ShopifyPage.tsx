import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTitle from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, ImportIcon, Search, RefreshCw, Settings, Calendar } from "lucide-react";

const ShopifyPage = () => {
  return (
    <DashboardLayout>
      <div className="fade-in">
        <PageTitle 
          title="Shopify Products" 
          subtitle="Import and manage your Shopify products"
        >
          <Button>
            <ImportIcon className="mr-2 h-4 w-4" />
            Import Products
          </Button>
        </PageTitle>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="sync">Sync History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Catalog</CardTitle>
                    <CardDescription>
                      Manage your imported Shopify products
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search products..."
                        className="pl-8 w-[200px]"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Inventory</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded bg-gray-100 mr-3 flex-shrink-0">
                              {product.image && (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-full w-full object-cover rounded"
                                />
                              )}
                            </div>
                            <div className="font-medium">{product.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.inventory}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              product.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : product.status === "draft"
                                ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-between border-t pt-4">
                <div className="text-sm text-gray-500">
                  Showing 5 of 256 products
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="integration">
            <Card>
              <CardHeader>
                <CardTitle>Shopify API Integration</CardTitle>
                <CardDescription>
                  Connect to your Shopify store via API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input 
                        id="storeName" 
                        placeholder="your-store" 
                      />
                      <p className="text-xs text-gray-500">
                        Your Shopify store name (your-store.myshopify.com)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accessToken">Access Token</Label>
                      <Input 
                        id="accessToken" 
                        type="password"
                        placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxx" 
                      />
                      <p className="text-xs text-gray-500">
                        Get this from your Shopify Admin Dashboard
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiVersion">API Version</Label>
                    <Input 
                      id="apiVersion" 
                      defaultValue="2023-07"
                    />
                    <p className="text-xs text-gray-500">
                      Shopify API version to use
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label className="text-base">Sync Settings</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="syncInventory" />
                        <label
                          htmlFor="syncInventory"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Sync inventory changes automatically
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="syncProducts" />
                        <label
                          htmlFor="syncProducts"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Import new products automatically
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between flex-row-reverse">
                <Button>Save Configuration</Button>
                <Button variant="outline">Test Connection</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="sync">
            <Card>
              <CardHeader>
                <CardTitle>Sync History</CardTitle>
                <CardDescription>
                  Recent product synchronization events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {syncHistory.map((sync, index) => (
                    <div 
                      key={index} 
                      className="flex items-start pb-3 border-b last:border-0 last:pb-0"
                    >
                      <div className={`p-2 rounded-full ${
                        sync.status === "success" ? "bg-green-100" : 
                        sync.status === "partial" ? "bg-yellow-100" : 
                        "bg-red-100"
                      }`}>
                        <Calendar className={`h-4 w-4 ${
                          sync.status === "success" ? "text-green-600" : 
                          sync.status === "partial" ? "text-yellow-600" : 
                          "text-red-600"
                        }`} />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{sync.description}</p>
                          <Badge
                            className={
                              sync.status === "success"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : sync.status === "partial"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {sync.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          {sync.time} • {sync.items} items
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  View All History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Sample data
const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    inventory: 45,
    status: "active",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    category: "Apparel",
    price: 29.99,
    inventory: 180,
    status: "active",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=150&h=150&auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    name: "Smart Watch Series X",
    category: "Electronics",
    price: 299.99,
    inventory: 12,
    status: "low_stock",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=150&h=150&auto=format&fit=crop&q=80"
  },
  {
    id: "4",
    name: "Ceramic Coffee Mug",
    category: "Home & Kitchen",
    price: 19.99,
    inventory: 67,
    status: "active",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=150&h=150&auto=format&fit=crop&q=80"
  },
  {
    id: "5",
    name: "Premium Yoga Mat",
    category: "Sports & Outdoors",
    price: 49.99,
    inventory: 30,
    status: "draft",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=150&h=150&auto=format&fit=crop&q=80"
  }
];

const syncHistory = [
  {
    description: "Full product catalog sync",
    status: "success",
    time: "Today, 10:32 AM",
    items: 256
  },
  {
    description: "Inventory update",
    status: "success",
    time: "Yesterday, 4:15 PM",
    items: 37
  },
  {
    description: "New products import",
    status: "partial",
    time: "Apr 4, 2023",
    items: 15
  },
  {
    description: "Price update sync",
    status: "failed",
    time: "Apr 2, 2023",
    items: 52
  }
];

export default ShopifyPage;

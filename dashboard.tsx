"use client"

import { useState, useEffect, useRef } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"
import {
  ArrowUpRight,
  BarChart2,
  Calendar,
  Filter,
  LineChartIcon,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  Users,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Sample data for charts
  const salesData = [
    { name: "Jan", store: 4000, online: 2400 },
    { name: "Feb", store: 3000, online: 2210 },
    { name: "Mar", store: 2000, online: 2290 },
    { name: "Apr", store: 2780, online: 3200 },
    { name: "May", store: 1890, online: 3300 },
    { name: "Jun", store: 2390, online: 3500 },
    { name: "Jul", store: 3490, online: 4100 },
  ]

  const conversionData = [
    { name: "Jan", rate: 2.4 },
    { name: "Feb", rate: 2.2 },
    { name: "Mar", rate: 2.9 },
    { name: "Apr", rate: 3.2 },
    { name: "May", rate: 3.1 },
    { name: "Jun", rate: 3.5 },
    { name: "Jul", rate: 4.1 },
  ]

  const topProducts = [
    { id: 1, name: "Wireless Earbuds", sales: 12500, image: "/placeholder.svg?height=50&width=50" },
    { id: 2, name: "Smart Watch", sales: 10200, image: "/placeholder.svg?height=50&width=50" },
    { id: 3, name: "Bluetooth Speaker", sales: 9800, image: "/placeholder.svg?height=50&width=50" },
    { id: 4, name: "Laptop", sales: 8500, image: "/placeholder.svg?height=50&width=50" },
    { id: 5, name: "Smartphone", sales: 7900, image: "/placeholder.svg?height=50&width=50" },
  ]

  const demographicsData = [
    { name: "18-24", value: 15 },
    { name: "25-34", value: 30 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 18 },
    { name: "55+", value: 12 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const funnelData = [
    { name: "Website Visits", value: 100000 },
    { name: "Product Views", value: 70000 },
    { name: "Add to Cart", value: 35000 },
    { name: "Checkout", value: 20000 },
    { name: "Purchase", value: 15000 },
  ]

  const heatmapData = [
    // Monday
    { hour: "9AM", day: "Mon", value: 30 },
    { hour: "10AM", day: "Mon", value: 45 },
    { hour: "11AM", day: "Mon", value: 60 },
    { hour: "12PM", day: "Mon", value: 75 },
    { hour: "1PM", day: "Mon", value: 90 },
    { hour: "2PM", day: "Mon", value: 70 },
    { hour: "3PM", day: "Mon", value: 55 },
    { hour: "4PM", day: "Mon", value: 40 },
    { hour: "5PM", day: "Mon", value: 65 },
    { hour: "6PM", day: "Mon", value: 80 },
    { hour: "7PM", day: "Mon", value: 95 },
    { hour: "8PM", day: "Mon", value: 50 },
    // Tuesday
    { hour: "9AM", day: "Tue", value: 25 },
    { hour: "10AM", day: "Tue", value: 40 },
    { hour: "11AM", day: "Tue", value: 55 },
    { hour: "12PM", day: "Tue", value: 70 },
    { hour: "1PM", day: "Tue", value: 85 },
    { hour: "2PM", day: "Tue", value: 65 },
    { hour: "3PM", day: "Tue", value: 50 },
    { hour: "4PM", day: "Tue", value: 35 },
    { hour: "5PM", day: "Tue", value: 60 },
    { hour: "6PM", day: "Tue", value: 75 },
    { hour: "7PM", day: "Tue", value: 90 },
    { hour: "8PM", day: "Tue", value: 45 },
    // Wednesday
    { hour: "9AM", day: "Wed", value: 35 },
    { hour: "10AM", day: "Wed", value: 50 },
    { hour: "11AM", day: "Wed", value: 65 },
    { hour: "12PM", day: "Wed", value: 80 },
    { hour: "1PM", day: "Wed", value: 95 },
    { hour: "2PM", day: "Wed", value: 75 },
    { hour: "3PM", day: "Wed", value: 60 },
    { hour: "4PM", day: "Wed", value: 45 },
    { hour: "5PM", day: "Wed", value: 70 },
    { hour: "6PM", day: "Wed", value: 85 },
    { hour: "7PM", day: "Wed", value: 100 },
    { hour: "8PM", day: "Wed", value: 55 },
    // Thursday
    { hour: "9AM", day: "Thu", value: 40 },
    { hour: "10AM", day: "Thu", value: 55 },
    { hour: "11AM", day: "Thu", value: 70 },
    { hour: "12PM", day: "Thu", value: 85 },
    { hour: "1PM", day: "Thu", value: 100 },
    { hour: "2PM", day: "Thu", value: 80 },
    { hour: "3PM", day: "Thu", value: 65 },
    { hour: "4PM", day: "Thu", value: 50 },
    { hour: "5PM", day: "Thu", value: 75 },
    { hour: "6PM", day: "Thu", value: 90 },
    { hour: "7PM", day: "Thu", value: 95 },
    { hour: "8PM", day: "Thu", value: 60 },
    // Friday
    { hour: "9AM", day: "Fri", value: 45 },
    { hour: "10AM", day: "Fri", value: 60 },
    { hour: "11AM", day: "Fri", value: 75 },
    { hour: "12PM", day: "Fri", value: 90 },
    { hour: "1PM", day: "Fri", value: 95 },
    { hour: "2PM", day: "Fri", value: 85 },
    { hour: "3PM", day: "Fri", value: 70 },
    { hour: "4PM", day: "Fri", value: 55 },
    { hour: "5PM", day: "Fri", value: 80 },
    { hour: "6PM", day: "Fri", value: 95 },
    { hour: "7PM", day: "Fri", value: 100 },
    { hour: "8PM", day: "Fri", value: 65 },
    // Saturday
    { hour: "9AM", day: "Sat", value: 60 },
    { hour: "10AM", day: "Sat", value: 75 },
    { hour: "11AM", day: "Sat", value: 90 },
    { hour: "12PM", day: "Sat", value: 100 },
    { hour: "1PM", day: "Sat", value: 95 },
    { hour: "2PM", day: "Sat", value: 90 },
    { hour: "3PM", day: "Sat", value: 85 },
    { hour: "4PM", day: "Sat", value: 80 },
    { hour: "5PM", day: "Sat", value: 85 },
    { hour: "6PM", day: "Sat", value: 90 },
    { hour: "7PM", day: "Sat", value: 95 },
    { hour: "8PM", day: "Sat", value: 70 },
    // Sunday
    { hour: "9AM", day: "Sun", value: 30 },
    { hour: "10AM", day: "Sun", value: 45 },
    { hour: "11AM", day: "Sun", value: 60 },
    { hour: "12PM", day: "Sun", value: 75 },
    { hour: "1PM", day: "Sun", value: 90 },
    { hour: "2PM", day: "Sun", value: 85 },
    { hour: "3PM", day: "Sun", value: 80 },
    { hour: "4PM", day: "Sun", value: 75 },
    { hour: "5PM", day: "Sun", value: 70 },
    { hour: "6PM", day: "Sun", value: 65 },
    { hour: "7PM", day: "Sun", value: 60 },
    { hour: "8PM", day: "Sun", value: 40 },
  ]

  const inventoryData = [
    { name: "Electronics", value: 75 },
    { name: "Clothing", value: 45 },
    { name: "Groceries", value: 90 },
    { name: "Home Goods", value: 60 },
    { name: "Toys", value: 30 },
  ]

  const supplyChainData = [
    { name: "Jan", time: 4.2 },
    { name: "Feb", time: 4.0 },
    { name: "Mar", time: 3.8 },
    { name: "Apr", time: 3.5 },
    { name: "May", time: 3.2 },
    { name: "Jun", time: 3.0 },
    { name: "Jul", time: 2.8 },
  ]

  const forecastData = [
    { name: "Aug", actual: null, forecast: 5200 },
    { name: "Sep", actual: null, forecast: 5500 },
    { name: "Oct", actual: null, forecast: 6100 },
    { name: "Nov", actual: null, forecast: 7200 },
    { name: "Dec", actual: null, forecast: 8500 },
  ]

  const historicalData = [
    { name: "Mar", actual: 4200, forecast: null },
    { name: "Apr", actual: 4500, forecast: null },
    { name: "May", actual: 4800, forecast: null },
    { name: "Jun", actual: 5000, forecast: null },
    { name: "Jul", actual: 5100, forecast: null },
  ]

  const combinedForecastData = [...historicalData, ...forecastData]

  const sentimentData = [
    { text: "Great", value: 80, sentiment: "positive" },
    { text: "Good", value: 65, sentiment: "positive" },
    { text: "Excellent", value: 60, sentiment: "positive" },
    { text: "Average", value: 45, sentiment: "neutral" },
    { text: "Poor", value: 30, sentiment: "negative" },
    { text: "Bad", value: 25, sentiment: "negative" },
    { text: "Terrible", value: 20, sentiment: "negative" },
    { text: "Amazing", value: 55, sentiment: "positive" },
    { text: "Okay", value: 40, sentiment: "neutral" },
    { text: "Satisfied", value: 50, sentiment: "positive" },
  ]

  const associationData = [
    { x: 10, y: 30, z: 200, name: "Milk & Cereal" },
    { x: 30, y: 40, z: 300, name: "Chips & Soda" },
    { x: 50, y: 10, z: 400, name: "Bread & Butter" },
    { x: 70, y: 30, z: 500, name: "Phone & Case" },
    { x: 90, y: 20, z: 600, name: "Laptop & Mouse" },
    { x: 20, y: 50, z: 250, name: "TV & Soundbar" },
    { x: 40, y: 70, z: 350, name: "Shoes & Socks" },
    { x: 60, y: 90, z: 450, name: "Shirt & Pants" },
  ]

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <ShoppingCart className="h-6 w-6" />
            <span>Walmart Analytics</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                  <DropdownMenuItem>Last year</DropdownMenuItem>
                  <DropdownMenuItem>All time</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="southeast">Southeast</SelectItem>
                  <SelectItem value="midwest">Midwest</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="home">Home Goods</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      <main className="grid gap-4 p-4 md:gap-8 md:p-6">
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">Sales & Revenue</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            <TabsTrigger value="inventory">Inventory & Logistics</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce Analytics</TabsTrigger>
          </TabsList>

          {/* Sales & Revenue Tab */}
          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,234,567</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="store" name="In-Store" fill="#8884d8" />
                        <Bar dataKey="online" name="Online" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={conversionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="rate"
                          name="Conversion Rate %"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Selling Products</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{product.name}</p>
                          <p className="text-sm text-muted-foreground">${(product.sales / 100).toFixed(2)}k sales</p>
                        </div>
                        <div className={`text-sm font-medium ${product.id <= 3 ? "text-green-500" : ""}`}>
                          #{product.id}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customer Insights Tab */}
          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Product Association Graph</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="Frequency" />
                        <YAxis type="number" dataKey="y" name="Correlation" />
                        <Tooltip
                          cursor={{ strokeDasharray: "3 3" }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="font-medium">{payload[0].payload.name}</div>
                                  <div className="text-xs text-muted-foreground">Strength: {payload[0].payload.z}</div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Scatter name="Products" data={associationData} fill="#8884d8">
                          {associationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    Treemap showing product associations by purchase frequency
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Demographics</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={demographicsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {demographicsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Shopping Hours Heatmap</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <HeatMapChart data={heatmapData} />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cart Abandonment Funnel</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {funnelData.map((item, index) => {
                    const percentage = (item.value / funnelData[0].value) * 100
                    const dropOff =
                      index > 0 ? ((funnelData[index - 1].value - item.value) / funnelData[index - 1].value) * 100 : 0

                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.value.toLocaleString()}</div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        {index > 0 && (
                          <div className="text-xs text-red-500">{dropOff.toFixed(1)}% drop-off from previous step</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory & Logistics Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stock Levels</CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventoryData.map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div
                            className={`text-sm ${item.value < 50 ? "text-red-500" : item.value > 80 ? "text-green-500" : "text-yellow-500"}`}
                          >
                            {item.value}%
                          </div>
                        </div>
                        <Progress
                          value={item.value}
                          className={`h-2 ${
                            item.value < 50
                              ? "bg-red-100 [&>div]:bg-red-500"
                              : item.value > 80
                                ? "bg-green-100 [&>div]:bg-green-500"
                                : "bg-yellow-100 [&>div]:bg-yellow-500"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Supply Chain Efficiency</CardTitle>
                  <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.8 days</div>
                  <p className="text-xs text-green-500">-0.2 days from last month</p>
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={supplyChainData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="time"
                          name="Delivery Time (days)"
                          stroke="#82ca9d"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Demand Forecast</CardTitle>
                  <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+15.2%</div>
                  <p className="text-xs text-muted-foreground">Projected growth next quarter</p>
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={combinedForecastData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="actual"
                          name="Actual Demand"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="forecast"
                          name="Forecasted Demand"
                          stroke="#82ca9d"
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Store Inventory Distribution</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <StoreMap />
                </div>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Geographical heatmap showing inventory levels across stores
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* E-commerce Analytics Tab */}
          <TabsContent value="ecommerce" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Online vs Offline Sales</CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="store" name="In-Store" stackId="a" fill="#8884d8" />
                        <Bar dataKey="online" name="Online" stackId="a" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Website Click-through Rate</CardTitle>
                  <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <WebsiteHeatmap />
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    Heatmap showing user interaction with website elements
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sentiment Analysis</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mb-4">
                  <WordCloud data={sentimentData} />
                </div>
                <div className="space-y-4">
                  {sentimentData.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-20 text-sm font-medium">{item.text}</div>
                      <div className="flex-1">
                        <div
                          className={`h-4 rounded-sm ${
                            item.sentiment === "positive"
                              ? "bg-green-500"
                              : item.sentiment === "negative"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <div className="w-8 text-xs text-right">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Add a HeatMap component after the dashboard component
// This will be used for the shopping hours heatmap
const HeatMapChart = ({ data }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"]

  return (
    <div className="w-full h-full">
      <div className="flex mb-1">
        <div className="w-12"></div>
        {hours.map((hour) => (
          <div key={hour} className="flex-1 text-xs text-center">
            {hour}
          </div>
        ))}
      </div>
      {days.map((day) => (
        <div key={day} className="flex mb-1">
          <div className="w-12 text-xs flex items-center">{day}</div>
          {hours.map((hour) => {
            const item = data.find((d) => d.day === day && d.hour === hour)
            const value = item ? item.value : 0
            return (
              <div
                key={`${day}-${hour}`}
                className="flex-1 h-6 rounded-sm mx-0.5"
                style={{
                  backgroundColor: `rgba(136, 132, 216, ${value / 100})`,
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
                title={`${day} ${hour}: ${value}%`}
              />
            )
          })}
        </div>
      ))}
      <div className="flex justify-between mt-2">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm mr-1" style={{ backgroundColor: "rgba(136, 132, 216, 0.1)" }}></div>
          <span className="text-xs">Low</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm mr-1" style={{ backgroundColor: "rgba(136, 132, 216, 0.5)" }}></div>
          <span className="text-xs">Medium</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm mr-1" style={{ backgroundColor: "rgba(136, 132, 216, 1)" }}></div>
          <span className="text-xs">High</span>
        </div>
      </div>
    </div>
  )
}

// Add a WordCloud component for sentiment analysis
const WordCloud = ({ data }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Sort data by value (descending)
    const sortedData = [...data].sort((a, b) => b.value - a.value)

    // Position words
    const centerX = width / 2
    const centerY = height / 2

    sortedData.forEach((item, index) => {
      const fontSize = Math.max(12, Math.min(40, 12 + item.value / 10))

      // Set color based on sentiment
      if (item.sentiment === "positive") {
        ctx.fillStyle = "#22c55e" // green
      } else if (item.sentiment === "negative") {
        ctx.fillStyle = "#ef4444" // red
      } else {
        ctx.fillStyle = "#eab308" // yellow
      }

      ctx.font = `${fontSize}px Arial`

      // Calculate position (simple spiral layout)
      const angle = index * 0.5
      const radius = 5 + index * 10
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      ctx.fillText(item.text, x, y)
    })
  }, [data])

  return <canvas ref={canvasRef} width={400} height={200} className="w-full h-full" />
}

// Add a WebsiteHeatmap component
const WebsiteHeatmap = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Draw website mockup
    ctx.fillStyle = "#f9fafb"
    ctx.fillRect(0, 0, width, height)

    // Header
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, width, 60)

    // Navigation
    ctx.fillStyle = "#e5e7eb"
    ctx.fillRect(20, 20, 300, 20)

    // Hero section
    ctx.fillStyle = "#e5e7eb"
    ctx.fillRect(20, 80, width - 40, 100)

    // Product grid
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        ctx.fillStyle = "#e5e7eb"
        ctx.fillRect(20 + j * 90, 200 + i * 90, 80, 80)
      }
    }

    // Draw heatmap overlay
    const heatmapData = [
      { x: 150, y: 30, value: 80 }, // Navigation
      { x: 200, y: 130, value: 90 }, // Hero CTA
      { x: 65, y: 240, value: 70 }, // Product 1
      { x: 155, y: 240, value: 60 }, // Product 2
      { x: 245, y: 240, value: 85 }, // Product 3
      { x: 335, y: 240, value: 40 }, // Product 4
      { x: 65, y: 330, value: 30 }, // Product 5
      { x: 155, y: 330, value: 50 }, // Product 6
      { x: 245, y: 330, value: 45 }, // Product 7
      { x: 335, y: 330, value: 20 }, // Product 8
    ]

    heatmapData.forEach((point) => {
      const gradient = ctx.createRadialGradient(point.x, point.y, 5, point.x, point.y, 40)

      gradient.addColorStop(0, `rgba(239, 68, 68, ${point.value / 100})`)
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(point.x, point.y, 40, 0, Math.PI * 2)
      ctx.fill()
    })

    // Add legend
    ctx.fillStyle = "#000"
    ctx.font = "10px Arial"
    ctx.fillText("Click Intensity:", 10, height - 20)

    const gradientWidth = 100
    const gradientHeight = 10
    const gradientX = 80
    const gradientY = height - 25

    const legendGradient = ctx.createLinearGradient(gradientX, 0, gradientX + gradientWidth, 0)
    legendGradient.addColorStop(0, "rgba(239, 68, 68, 0.1)")
    legendGradient.addColorStop(1, "rgba(239, 68, 68, 0.8)")

    ctx.fillStyle = legendGradient
    ctx.fillRect(gradientX, gradientY, gradientWidth, gradientHeight)

    ctx.fillStyle = "#000"
    ctx.fillText("Low", gradientX, gradientY + gradientHeight + 10)
    ctx.fillText("High", gradientX + gradientWidth - 20, gradientY + gradientHeight + 10)
  }, [])

  return <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
}

// Add a StoreMap component for geographical heatmap
const StoreMap = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Draw simplified US map outline
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, width, height)

    // Draw state boundaries (simplified)
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1
    ctx.beginPath()

    // Very simplified US outline
    ctx.moveTo(100, 100)
    ctx.lineTo(350, 100)
    ctx.lineTo(400, 150)
    ctx.lineTo(400, 250)
    ctx.lineTo(350, 300)
    ctx.lineTo(100, 300)
    ctx.lineTo(50, 250)
    ctx.lineTo(50, 150)
    ctx.closePath()
    ctx.stroke()

    // Draw some internal state lines
    ctx.beginPath()
    ctx.moveTo(200, 100)
    ctx.lineTo(200, 300)
    ctx.moveTo(300, 100)
    ctx.lineTo(300, 300)
    ctx.moveTo(100, 200)
    ctx.lineTo(400, 200)
    ctx.stroke()

    // Draw inventory heatmap data
    const storeData = [
      { x: 150, y: 150, value: 90 }, // Northeast high inventory
      { x: 250, y: 150, value: 60 }, // Midwest medium inventory
      { x: 350, y: 150, value: 30 }, // Northwest low inventory
      { x: 150, y: 250, value: 40 }, // Southeast medium-low inventory
      { x: 250, y: 250, value: 75 }, // South central high-medium inventory
      { x: 350, y: 250, value: 85 }, // Southwest high inventory
    ]

    storeData.forEach((store) => {
      const gradient = ctx.createRadialGradient(store.x, store.y, 5, store.x, store.y, 40)

      // Color based on inventory level
      let color
      if (store.value > 80) {
        color = "34, 197, 94" // green
      } else if (store.value > 50) {
        color = "234, 179, 8" // yellow
      } else {
        color = "239, 68, 68" // red
      }

      gradient.addColorStop(0, `rgba(${color}, 0.8)`)
      gradient.addColorStop(1, `rgba(${color}, 0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(store.x, store.y, 40, 0, Math.PI * 2)
      ctx.fill()

      // Add store marker
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(store.x, store.y, 5, 0, Math.PI * 2)
      ctx.fill()
    })

    // Add legend
    ctx.fillStyle = "#000"
    ctx.font = "12px Arial"
    ctx.fillText("Inventory Levels:", 10, height - 40)

    ctx.fillStyle = "rgba(239, 68, 68, 0.8)"
    ctx.fillRect(10, height - 30, 20, 10)
    ctx.fillStyle = "#000"
    ctx.fillText("Low", 35, height - 22)

    ctx.fillStyle = "rgba(234, 179, 8, 0.8)"
    ctx.fillRect(70, height - 30, 20, 10)
    ctx.fillStyle = "#000"
    ctx.fillText("Medium", 95, height - 22)

    ctx.fillStyle = "rgba(34, 197, 94, 0.8)"
    ctx.fillRect(150, height - 30, 20, 10)
    ctx.fillStyle = "#000"
    ctx.fillText("High", 175, height - 22)
  }, [])

  return <canvas ref={canvasRef} width={450} height={350} className="w-full h-full" />
}


import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTitle from "@/components/ui/page-title";
import StatsCard from "@/components/ui/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Calendar, Database, Plus } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="fade-in">
        <PageTitle 
          title="Dashboard" 
          subtitle="Bienvenido a tu Hub de Integración de WhatsApp"
        >
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Ver Reportes
            </Button>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Nueva Conexión
            </Button>
          </div>
        </PageTitle>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Instancias Activas"
            value="5"
            icon={MessageSquare}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Productos Importados"
            value="256"
            icon={Database}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Agentes Activos"
            value="3"
            icon={Users}
            trend={{ value: 2, isPositive: false }}
          />
          <StatsCard
            title="Sesiones Mensuales"
            value="1,245"
            icon={Calendar}
            trend={{ value: 18, isPositive: true }}
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Actividades Recientes</CardTitle>
              <CardDescription>
                Resumen de tus actividades recientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className={`p-2 rounded-full mr-3 ${activity.iconBg}`}>
                      <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto">
                Ver Todas las Actividades
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Tareas comunes que puedes realizar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="w-full justify-start mb-2 border-dashed"
                  >
                    <action.icon className="mr-2 h-4 w-4 text-whatsapp" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Sample data
const activities = [
  {
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-whatsapp",
    title: "Instancia de WhatsApp conectada",
    description: "La instancia 'Bot de Ventas' ha sido conectada exitosamente",
    time: "hace 2h"
  },
  {
    icon: Database,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    title: "Productos importados",
    description: "127 nuevos productos importados de la tienda Shopify",
    time: "hace 5h"
  },
  {
    icon: Users,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    title: "Nuevo agente creado",
    description: "El agente 'Soporte al Cliente' ha sido creado",
    time: "hace 1d"
  }
];

const quickActions = [
  {
    icon: MessageSquare,
    label: "Conectar Instancia de WhatsApp"
  },
  {
    icon: Database,
    label: "Importar Productos de Shopify"
  },
  {
    icon: Users,
    label: "Crear Nuevo Agente OpenAI"
  },
  {
    icon: Calendar,
    label: "Programar Mensaje Masivo"
  }
];

export default Index;

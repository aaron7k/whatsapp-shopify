import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTitle from "@/components/ui/page-title";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const SettingsPage = () => {
  const { currentTheme, setTheme } = useTheme();
  
  const handleThemeChange = (theme: "green" | "blue" | "purple") => {
    setTheme(theme);
    toast.success(`Tema cambiado a ${theme === "green" ? "Verde" : theme === "blue" ? "Azul" : "Púrpura"}`);
  };

  return (
    <DashboardLayout>
      <div className="fade-in">
        <PageTitle
          title="Configuración"
          subtitle="Administra las configuraciones de tu dashboard e integraciones"
        />

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Cuenta</CardTitle>
                  <CardDescription>
                    Administra los detalles de tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input id="name" defaultValue="Juan Pérez" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" type="email" defaultValue="juan@ejemplo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Nombre de la Empresa</Label>
                      <Input id="company" defaultValue="Empresa S.A." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zona Horaria</Label>
                      <Select defaultValue="america_mexico_city">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america_mexico_city">América/Ciudad de México (UTC-6)</SelectItem>
                          <SelectItem value="america_new_york">América/New_York (UTC-5)</SelectItem>
                          <SelectItem value="america_los_angeles">América/Los_Angeles (UTC-8)</SelectItem>
                          <SelectItem value="europe_madrid">Europa/Madrid (UTC+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Guardar Cambios</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Seguridad</CardTitle>
                  <CardDescription>
                    Administra tus preferencias de seguridad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña Actual</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    
                    <div className="pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Autenticación de Dos Factores</h4>
                          <p className="text-xs text-gray-500">
                            Añade una capa extra de seguridad
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Tiempo de Sesión</h4>
                          <p className="text-xs text-gray-500">
                            Cierra sesión automáticamente después de inactividad
                          </p>
                        </div>
                        <Select defaultValue="30">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 min</SelectItem>
                            <SelectItem value="30">30 min</SelectItem>
                            <SelectItem value="60">60 min</SelectItem>
                            <SelectItem value="never">Nunca</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Actualizar Seguridad</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Keys e Integraciones</CardTitle>
                <CardDescription>
                  Administra tus claves API para servicios de terceros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2 pb-4 border-b">
                    <Label className="text-base font-medium">WhatsApp Evolution API</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="evolutionApiUrl">URL Base de API</Label>
                        <Input 
                          id="evolutionApiUrl" 
                          placeholder="https://api.ejemplo.com" 
                          defaultValue="https://evolution-api.ejemplo.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="evolutionApiKey">Clave API</Label>
                        <Input 
                          id="evolutionApiKey" 
                          type="password"
                          placeholder="Ingresa tu clave API" 
                          defaultValue="•••••••••••••••••"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pb-4 border-b">
                    <Label className="text-base font-medium">API de Shopify</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shopifyStore">Nombre de la Tienda</Label>
                        <Input 
                          id="shopifyStore" 
                          placeholder="tu-tienda" 
                          defaultValue="mi-tienda"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shopifyToken">Token de Acceso</Label>
                        <Input 
                          id="shopifyToken" 
                          type="password"
                          placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxx" 
                          defaultValue="•••••••••••••••••"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base font-medium">API de OpenAI</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="openaiKey">Clave API</Label>
                        <Input 
                          id="openaiKey" 
                          type="password"
                          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx" 
                          defaultValue="•••••••••••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="openaiOrg">ID de Organización (Opcional)</Label>
                        <Input 
                          id="openaiOrg" 
                          placeholder="org-xxxxxxxxxxxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Probar Conexiones</Button>
                <Button>Guardar Claves API</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificaciones</CardTitle>
                <CardDescription>
                  Administra cómo y cuándo recibes notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Notificaciones por Email</h3>
                    <div className="space-y-2">
                      {emailNotifications.map((notification, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.description}</p>
                          </div>
                          <Switch defaultChecked={notification.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Notificaciones del Dashboard</h3>
                    <div className="space-y-2">
                      {dashboardNotifications.map((notification, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.description}</p>
                          </div>
                          <Switch defaultChecked={notification.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Programación de Notificaciones</h3>
                    <div className="space-y-2">
                      <Label htmlFor="dailyDigest">Hora del Resumen Diario</Label>
                      <Select defaultValue="9">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6:00 AM</SelectItem>
                          <SelectItem value="9">9:00 AM</SelectItem>
                          <SelectItem value="12">12:00 PM</SelectItem>
                          <SelectItem value="18">6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Guardar Preferencias</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Apariencia</CardTitle>
                <CardDescription>
                  Personaliza el aspecto de tu dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Tema de Color</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div 
                        className={`border rounded-md p-2 cursor-pointer bg-gradient-to-r from-whatsapp to-whatsapp-dark text-white flex flex-col items-center justify-center h-20 ${currentTheme === "green" ? "ring-2 ring-whatsapp" : ""}`}
                        onClick={() => handleThemeChange("green")}
                      >
                        <div className={`h-4 w-4 rounded-full ${currentTheme === "green" ? "bg-white" : "border-2 border-white"} mb-2`}></div>
                        <span className="text-xs">Verde</span>
                      </div>
                      <div 
                        className={`border rounded-md p-2 cursor-pointer bg-gradient-to-r from-blue-light to-blue-dark text-white flex flex-col items-center justify-center h-20 ${currentTheme === "blue" ? "ring-2 ring-blue-light" : ""}`}
                        onClick={() => handleThemeChange("blue")}
                      >
                        <div className={`h-4 w-4 rounded-full ${currentTheme === "blue" ? "bg-white" : "border-2 border-white"} mb-2`}></div>
                        <span className="text-xs">Azul</span>
                      </div>
                      <div 
                        className={`border rounded-md p-2 cursor-pointer bg-gradient-to-r from-purple-light to-purple-dark text-white flex flex-col items-center justify-center h-20 ${currentTheme === "purple" ? "ring-2 ring-purple-light" : ""}`}
                        onClick={() => handleThemeChange("purple")}
                      >
                        <div className={`h-4 w-4 rounded-full ${currentTheme === "purple" ? "bg-white" : "border-2 border-white"} mb-2`}></div>
                        <span className="text-xs">Púrpura</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Densidad del Layout</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compacto</SelectItem>
                        <SelectItem value="comfortable">Cómodo</SelectItem>
                        <SelectItem value="spacious">Espacioso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Opciones de Interfaz</h3>
                    <div className="space-y-2">
                      {interfaceOptions.map((option, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">{option.title}</p>
                            <p className="text-xs text-gray-500">{option.description}</p>
                          </div>
                          <Switch defaultChecked={option.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Aplicar Cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Sample data
const emailNotifications = [
  {
    title: "Nueva conexión de WhatsApp",
    description: "Cuando se conecta una nueva instancia de WhatsApp",
    enabled: true
  },
  {
    title: "Importación de productos completada",
    description: "Cuando la importación de productos de Shopify finaliza",
    enabled: true
  },
  {
    title: "Cambios de estado en agentes de IA",
    description: "Cuando un agente se activa o desactiva",
    enabled: false
  },
  {
    title: "Informes de resumen diario",
    description: "Recibir un resumen diario de todas las actividades",
    enabled: true
  }
];

const dashboardNotifications = [
  {
    title: "Eventos de WhatsApp en tiempo real",
    description: "Mostrar notificaciones para mensajes entrantes",
    enabled: true
  },
  {
    title: "Alertas del sistema",
    description: "Notificaciones importantes del sistema y advertencias",
    enabled: true
  },
  {
    title: "Estadísticas de uso",
    description: "Actualizaciones regulares sobre el uso de recursos",
    enabled: false
  }
];

const interfaceOptions = [
  {
    title: "Barra lateral colapsada por defecto",
    description: "Iniciar con la barra lateral colapsada en escritorio",
    enabled: false
  },
  {
    title: "Habilitar animaciones",
    description: "Mostrar animaciones y transiciones en la interfaz",
    enabled: true
  },
  {
    title: "Mostrar estadísticas detalladas",
    description: "Mostrar estadísticas avanzadas en el dashboard",
    enabled: true
  }
];

export default SettingsPage;

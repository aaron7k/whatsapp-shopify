import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTitle from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash, RefreshCw, Settings, QrCode } from "lucide-react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createWhatsAppInstance, refreshQRCode } from "@/services/evolutionAPI";
import QRCodeDisplay from "@/components/whatsapp/QRCodeDisplay";

type Instance = {
  id: string;
  instance_name: string;
  instance_phone: string;
  status: "connected" | "disconnected" | "pending";
  last_connected_at: string;
  user_id: string;
};

type LogEntry = {
  type: "info" | "warning" | "error";
  instance: string;
  message: string;
  time: string;
};

const WhatsAppPage = () => {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewInstanceDialogOpen, setIsNewInstanceDialogOpen] = useState(false);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [newInstance, setNewInstance] = useState({ name: "", phone: "" });
  const [currentQRCode, setCurrentQRCode] = useState("");
  const [currentInstance, setCurrentInstance] = useState<{name: string, userId: string}>({name: "", userId: ""});
  const [userId, setUserId] = useState<string>("");
  const [isLoadingQR, setIsLoadingQR] = useState(false);
  const [isCreatingInstance, setIsCreatingInstance] = useState(false);

  useEffect(() => {
    fetchUserAndInstances();
  }, []);

  const fetchUserAndInstances = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchInstances();
      } else {
        toast({
          title: "Error",
          description: "Necesita iniciar sesión para ver las instancias",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchInstances = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('whatsapp_instances')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      const transformedData = data.map(instance => ({
        id: instance.id,
        instance_name: instance.instance_name,
        instance_phone: instance.instance_phone,
        status: mapStatusToEnum(instance.status || "disconnected"),
        last_connected_at: formatDate(instance.last_connected_at),
        user_id: instance.user_id
      }));
      
      setInstances(transformedData);
    } catch (error) {
      console.error('Error fetching instances:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las instancias de WhatsApp",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const mapStatusToEnum = (status: string): "connected" | "disconnected" | "pending" => {
    if (status === "connected") return "connected";
    if (status === "pending") return "pending";
    return "disconnected";
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Nunca";
    
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) return `hace ${diffMins} min`;
    if (diffHours < 24) return `hace ${diffHours} h`;
    return `hace ${diffDays} días`;
  };

  const handleCreateInstance = async () => {
    try {
      if (!newInstance.name || !newInstance.phone) {
        toast({
          title: "Error",
          description: "El nombre y el teléfono son obligatorios",
          variant: "destructive"
        });
        return;
      }

      // Activar animación de carga
      setIsCreatingInstance(true);

      // Llamamos directamente a la API externa para crear la instancia y obtener el QR
      const response = await createWhatsAppInstance(
        newInstance.name, 
        newInstance.phone
      );

      if (response && response.qrcode) {
        setCurrentQRCode(response.qrcode);
        setCurrentInstance({name: newInstance.name, userId});
        setIsNewInstanceDialogOpen(false);
        setIsQRDialogOpen(true);
        
        toast({
          title: "Éxito",
          description: "Instancia creada. Escanee el código QR para continuar."
        });
      } else {
        throw new Error("No se pudo obtener el código QR");
      }

      setNewInstance({ name: "", phone: "" });
      fetchInstances();
    } catch (error) {
      console.error('Error creating instance:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la instancia",
        variant: "destructive"
      });
    } finally {
      // Desactivar animación de carga
      setIsCreatingInstance(false);
    }
  };

  const handleDeleteInstance = async (id: string) => {
    try {
      const { error } = await supabase
        .from('whatsapp_instances')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Instancia eliminada correctamente"
      });
      
      fetchInstances();
    } catch (error) {
      console.error('Error deleting instance:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la instancia",
        variant: "destructive"
      });
    }
  };

  const handleShowQR = async (instance: Instance) => {
    try {
      setIsLoadingQR(true);
      setIsQRDialogOpen(true);
      
      const response = await refreshQRCode(instance.instance_name, instance.user_id);
      if (response && response.qrcode) {
        setCurrentQRCode(response.qrcode);
        setCurrentInstance({name: instance.instance_name, userId: instance.user_id});
      } else {
        throw new Error("No se pudo obtener el código QR");
      }
    } catch (error) {
      console.error('Error getting QR code:', error);
      toast({
        title: "Error",
        description: "No se pudo obtener el código QR",
        variant: "destructive"
      });
    } finally {
      setIsLoadingQR(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="fade-in">
        <PageTitle 
          title="Integración de WhatsApp" 
          subtitle="Gestiona tus instancias de WhatsApp con Evolution API"
        >
          <Button onClick={() => setIsNewInstanceDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Instancia
          </Button>
        </PageTitle>

        <Tabs defaultValue="instances" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="instances">Instancias</TabsTrigger>
            <TabsTrigger value="logs">Registros</TabsTrigger>
          </TabsList>
          
          <TabsContent value="instances">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mr-2" />
                  <span>Cargando instancias...</span>
                </div>
              ) : instances.length > 0 ? (
                instances.map((instance) => (
                  <InstanceCard 
                    key={instance.id} 
                    instance={instance} 
                    onDelete={handleDeleteInstance}
                    onShowQR={() => handleShowQR(instance)} 
                  />
                ))
              ) : (
                <p>No hay instancias disponibles</p>
              )}
              
              <Card className="border-2 border-dashed flex flex-col items-center justify-center h-64">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="p-3 rounded-full bg-green-100 mb-3">
                    <Plus className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Nueva Instancia</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Conecta una nueva instancia de WhatsApp usando Evolution API
                  </p>
                  <Button className="w-full" onClick={() => setIsNewInstanceDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Instancia
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Registros de Actividad</CardTitle>
                <CardDescription>
                  Actividad reciente y registros de conexión
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {logs.map((log, index) => (
                    <div 
                      key={index} 
                      className="flex items-start pb-3 border-b last:border-0 last:pb-0"
                    >
                      <Badge 
                        className={
                          log.type === "error" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                          log.type === "warning" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                          "bg-green-100 text-green-800 hover:bg-green-100"
                        }
                      >
                        {log.type === "error" ? "error" : 
                         log.type === "warning" ? "advertencia" : "info"}
                      </Badge>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium">{log.message}</p>
                        <p className="text-xs text-gray-500">
                          {log.instance} • {log.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Actualizar Registros
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog para crear nueva instancia */}
      <Dialog open={isNewInstanceDialogOpen} onOpenChange={setIsNewInstanceDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Instancia</DialogTitle>
            <DialogDescription>
              Ingresa los detalles de tu nueva instancia de WhatsApp
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                placeholder="Bot de Ventas"
                className="col-span-3"
                value={newInstance.name}
                onChange={(e) => setNewInstance({...newInstance, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Teléfono
              </Label>
              <Input
                id="phone"
                placeholder="+521234567890"
                className="col-span-3"
                value={newInstance.phone}
                onChange={(e) => setNewInstance({...newInstance, phone: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleCreateInstance}
              disabled={isCreatingInstance}
            >
              {isCreatingInstance ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Instancia"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para mostrar código QR */}
      <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Conectar WhatsApp</DialogTitle>
            <DialogDescription>
              Escanea este código QR con WhatsApp en tu dispositivo móvil
            </DialogDescription>
          </DialogHeader>
          
          {isLoadingQR ? (
            <div className="flex justify-center items-center p-10">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : currentQRCode ? (
            <QRCodeDisplay 
              initialQRCode={currentQRCode} 
              instanceName={currentInstance.name}
              userId={currentInstance.userId}
            />
          ) : (
            <div className="text-center p-6">
              <p className="text-red-500">No se pudo cargar el código QR</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => handleShowQR({
                  ...instances.find(i => i.instance_name === currentInstance.name) || {
                    id: "",
                    instance_name: currentInstance.name,
                    instance_phone: "",
                    status: "disconnected",
                    last_connected_at: "",
                    user_id: currentInstance.userId
                  }
                })}
              >
                Reintentar
              </Button>
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsQRDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

const InstanceCard = ({ 
  instance, 
  onDelete,
  onShowQR 
}: { 
  instance: Instance, 
  onDelete: (id: string) => void,
  onShowQR: () => void 
}) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case "connected": return "conectado";
      case "pending": return "pendiente";
      case "disconnected": return "desconectado";
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{instance.instance_name}</CardTitle>
            <CardDescription>{instance.instance_phone}</CardDescription>
          </div>
          <Badge
            className={
              instance.status === "connected"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : instance.status === "pending"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }
          >
            {getStatusText(instance.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Última conexión:</span>
            <span>{instance.last_connected_at}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onShowQR}
        >
          <QrCode className="h-4 w-4 mr-1" />
          QR
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
        >
          <Settings className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDelete(instance.id)}
        >
          <Trash className="h-4 w-4 mr-1" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
};

const logs: LogEntry[] = [
  {
    type: "info",
    instance: "Bot de Ventas",
    message: "Instancia conectada exitosamente",
    time: "hace 2 min"
  },
  {
    type: "warning",
    instance: "Marketing",
    message: "Sesión expirada, requiere re-autenticación",
    time: "hace 3 horas"
  },
  {
    type: "error",
    instance: "Bot de Soporte",
    message: "Error al enviar mensaje: Límite de velocidad excedido",
    time: "hace 5 horas"
  },
  {
    type: "info",
    instance: "Notificaciones",
    message: "Código QR escaneado, esperando verificación",
    time: "hace 1 día"
  }
];

export default WhatsAppPage;

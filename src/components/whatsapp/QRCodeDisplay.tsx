import React, { useEffect, useState } from "react";
import { refreshQRCode } from "@/services/evolutionAPI";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

interface QRCodeDisplayProps {
  initialQRCode: string;
  instanceName: string;
  userId: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ initialQRCode, instanceName, userId }) => {
  const [qrCode, setQRCode] = useState<string>(initialQRCode);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(30);
  const [isImageError, setIsImageError] = useState<boolean>(false);

  // Handle automatic refresh every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        // When reaching 0, refresh QR code
        if (prev <= 1) {
          handleRefreshQR();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleRefreshQR = async () => {
    setIsRefreshing(true);
    
    try {
      const response = await refreshQRCode(instanceName, userId);
      if (response && response.qrcode) {
        setQRCode(response.qrcode);
        setIsImageError(false);
        toast({
          title: "QR Actualizado",
          description: "El código QR ha sido actualizado."
        });
      }
    } catch (error) {
      console.error("Error refreshing QR code:", error);
      setIsImageError(true);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Función para renderizar el código QR
  const renderQRCode = () => {
    // Verificar si el código QR es válido
    if (!qrCode || isImageError) {
      return (
        <div className="w-64 h-64 flex items-center justify-center border rounded-lg">
          {isRefreshing ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          ) : (
            <div className="text-center">
              <p className="text-red-500 mb-2">Error al cargar el código QR</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshQR}
              >
                Reintentar
              </Button>
            </div>
          )}
        </div>
      );
    }

    // Verificar si el código QR ya incluye el prefijo data:image
    const qrSrc = qrCode.startsWith('data:') 
      ? qrCode 
      : `data:image/png;base64,${qrCode}`;

    // Renderizar el código QR como una imagen
    return (
      <div className="p-2 border rounded-lg">
        <img 
          src={qrSrc} 
          alt="WhatsApp QR Code" 
          className="w-64 h-64"
          onError={(e) => {
            console.error("Error loading QR image:", e);
            setIsImageError(true);
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white rounded-lg border">
      <div className="text-center mb-2">
        <h3 className="text-lg font-medium">Escanea este código QR</h3>
        <p className="text-sm text-gray-500">
          Abre WhatsApp en tu teléfono y escanea el código para iniciar sesión
        </p>
      </div>
      
      {/* Renderizar el código QR */}
      {renderQRCode()}
      
      <div className="text-center">
        <p className="text-sm text-gray-500">
          El código QR se actualizará en {countdown} segundos
        </p>
      </div>
      
      <Button
        onClick={handleRefreshQR}
        disabled={isRefreshing}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        {isRefreshing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        Actualizar QR
      </Button>
    </div>
  );
};

export default QRCodeDisplay;

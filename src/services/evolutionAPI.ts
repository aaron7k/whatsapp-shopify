import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const API_URL = "https://api.neoglow.net/webhook/whatsapp";
const API_TOKEN = "a45bc8f2-c726-457e-ad83-df08d569761c";

interface CreateInstanceRequest {
  instance_name: string;
  phone_number: string;
  user_id: string;
  user_email: string;
  metadata: Record<string, any>;
}

interface QRResponse {
  status: string;
  qrcode: string; // base64
}

export const createWhatsAppInstance = async (
  instanceName: string,
  phoneNumber: string
): Promise<QRResponse | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Necesita iniciar sesión para crear una instancia",
        variant: "destructive"
      });
      return null;
    }

    const requestBody: CreateInstanceRequest = {
      instance_name: instanceName,
      phone_number: phoneNumber,
      user_id: user.id,
      user_email: user.email || "",
      metadata: user.app_metadata || {}
    };

    const response = await fetch(`${API_URL}/create-instance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Verificar y limpiar el código QR si es necesario
    if (data && data.qrcode) {
      // Eliminar prefijos data:image si ya existen
      data.qrcode = data.qrcode.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, '');
    }
    
    return data as QRResponse;
  } catch (error) {
    console.error("Error creando instancia de WhatsApp:", error);
    toast({
      title: "Error",
      description: "No se pudo crear la instancia de WhatsApp",
      variant: "destructive"
    });
    return null;
  }
};

export const refreshQRCode = async (instanceName: string, userId: string): Promise<QRResponse | null> => {
  try {
    // Construir la URL con parámetros de consulta en lugar de usar headers
    const url = new URL(`${API_URL}/get-qr`);
    url.searchParams.append("instance_name", instanceName);
    url.searchParams.append("user_id", userId);
    
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Verificar si la respuesta contiene el código QR
    if (!data.qrcode) {
      throw new Error("La respuesta no contiene un código QR válido");
    }
    
    // Eliminar prefijos data:image si ya existen
    if (data.qrcode) {
      data.qrcode = data.qrcode.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, '');
    }
    
    return data as QRResponse;
  } catch (error) {
    console.error("Error al refrescar el código QR:", error);
    toast({
      title: "Error",
      description: "No se pudo actualizar el código QR",
      variant: "destructive"
    });
    return null;
  }
};

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirigir a la página de autenticación si el usuario no está autenticado
      navigate("/auth", { state: { from: location.pathname } });
    }
  }, [user, isLoading, navigate, location]);

  // Mostrar nada mientras se verifica la autenticación
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  // Renderizar los hijos solo si el usuario está autenticado
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;

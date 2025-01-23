import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@hooks/UserContext/UserContext';

type ProtectedRouteProps = {
    allowedRoles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { user } = useUser();

    // Pas connectée => LOGIN
    if (!user) {
        if (allowedRoles.includes('None')) {
            return <Outlet />;
        }
        // Si l'utilisateur n'est pas connecté et tente d'accéder à une page protégée, redirection vers /login
        return <Navigate to="/login" replace />;
    }

    // Si tu veux aller sur le login alors que tu es connecté => NON
    if (allowedRoles.includes('None') && user.role != null) {
        // Rediriger en fonction du rôle de l'utilisateur
        if (user.role === 'Administrateur') {
            return <Navigate to="/admin-dashboard" replace />;
        }
        if (user.role === 'Restaurateur') {
            return <Navigate to="/owner-dashboard" replace />;
        }
        if (user.role === 'Super-Administrateur') {
            return <Navigate to="/super-admin" replace />;
        }
    }

    // Si tu peux pas y aller
    if (!allowedRoles.includes(user.role)) {
        return <div>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</div>;
    }

    return <Outlet />;
};


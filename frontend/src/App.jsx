import { Route, Routes } from 'react-router';
import Home from './components/Home';
import UserAccountForm from './components/UserAccountForm';
import ProductMaintancePage from './components/ProductMaintancePage';
import SupplierPage from './components/SupplierPage';
import CartPage from './components/CartPage'; // Importa a página do Carrinho
import ProtectedRoute from './components/ProtectedRoute'; // Importa o ProtectedRoute

function App() {
  return (
    <Routes>
      {/* Rota protegida para a Home */}
      <Route 
        index 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route element={<UserAccountForm isLogin={true} />} path="login" />
      <Route element={<UserAccountForm isLogin={false} />} path="register" />
      <Route
        path="product-maintance"
        element={
          <ProtectedRoute>
            <ProductMaintancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="suppliers"
        element={
          <ProtectedRoute>
            <SupplierPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

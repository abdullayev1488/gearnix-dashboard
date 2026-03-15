import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AppLayout } from "@/layout/AppLayout";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Auth
const SignIn = lazy(() => import("@/pages/AuthPages/SignIn"));

// Dashboard
const Home = lazy(() => import("@/pages/Dashboard/Home"));

// Categories
const CategoryList = lazy(() => import("@/pages/Category/CategoryList"));
const AddCategory = lazy(() => import("@/pages/Category/AddCategory"));
const EditCategory = lazy(() => import("@/pages/Category/EditCategory"));

// Brands
const BrandList = lazy(() => import("@/pages/Brand/BrandList"));
const AddBrand = lazy(() => import("@/pages/Brand/AddBrand"));
const EditBrand = lazy(() => import("@/pages/Brand/EditBrand"));

// Products
const ProductList = lazy(() => import("@/pages/Product/ProductList"));
const AddProduct = lazy(() => import("@/pages/Product/AddProduct"));
const EditProduct = lazy(() => import("@/pages/Product/EditProduct"));

// Users
const UserList = lazy(() => import("@/pages/User/UserList"));

// Orders
const OrderList = lazy(() => import("@/pages/Order/OrderList"));

// Messages
const MessageList = lazy(() => import("@/pages/Message/MessageList"));

// Other
const NotFound = lazy(() => import("./pages/OtherPage/NotFound"));

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
            </div>
          }
        >
          <Routes>
            {/* Auth */}
            <Route path="/login" element={<SignIn />} />

            {/* Dashboard Layout - Protected */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index path="/" element={<Home />} />

              {/* Users */}
              <Route path="/users" element={<UserList />} />

              {/* Categories */}
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/new-category" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />

              {/* Brands */}
              <Route path="/brands" element={<BrandList />} />
              <Route path="/new-brand" element={<AddBrand />} />
              <Route path="/edit-brand/:id" element={<EditBrand />} />

              {/* Products */}
              <Route path="/products" element={<ProductList />} />
              <Route path="/new-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />

              {/* Orders */}
              <Route path="/orders" element={<OrderList />} />

              {/* Messages */}
              <Route path="/messages" element={<MessageList />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

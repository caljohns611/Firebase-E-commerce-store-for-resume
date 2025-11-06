import AuthForm from './components/AuthForm';
import ProductList from './layouts/ProductList';
import { useAuth } from './context/AuthContext';
import CartPage from './layouts/Cart';

export default function App(){
  const { user } = useAuth();

  return (
    <div className='min-h-screen bg-slate-50 p-6'>
      <header className='flex justify-between items-center max-w-6xl mx-auto mb-6'>
        <h1 className='text-3xl font-bold'>My E-commerce Store</h1>
        <AuthForm />
      </header>
      <main className='max-w-6xl mx-auto'>
        <ProductList />
        <CartPage />
      </main>
      {user && (
        <p className='text-center mt-6 text-gray-600'>You're signed in as <strong>{user.email}</strong></p>
      )}
    </div>
  );
}
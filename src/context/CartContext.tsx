import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product } from '../constants';
import { createCheckout, isShopifyConfigured } from '../lib/shopify';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    totalItems: number;
    totalPrice: number;
    isCheckingOut: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const addToCart = useCallback((product: Product) => {
        setItems(prev => {
            const existing = prev.find(i => i.product.id === product.id);
            if (existing) {
                return prev.map(i =>
                    i.product.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
        setIsOpen(true);
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setItems(prev => prev.filter(i => i.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems(prev => prev.filter(i => i.product.id !== productId));
            return;
        }
        setItems(prev =>
            prev.map(i =>
                i.product.id === productId ? { ...i, quantity } : i
            )
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);
    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);
    const toggleCart = useCallback(() => setIsOpen(p => !p), []);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    const checkout = useCallback(async () => {
        if (!isShopifyConfigured()) {
            alert('Shopify nu este configurat încă. Adaugă produsele în panoul Shopify pentru a activa plata.');
            return;
        }

        // Ensure all items have a variantId
        const missingVariant = items.find(i => !i.product.variantId);
        if (missingVariant) {
            alert('Unele produse nu au un variant Shopify asociat. Asigură-te că produsele sunt sincronizate cu Shopify.');
            return;
        }

        setIsCheckingOut(true);
        try {
            const lineItems = items.map(item => ({
                variantId: item.product.variantId!,
                quantity: item.quantity,
            }));

            const checkoutUrl = await createCheckout(lineItems);

            // Redirect to Shopify's hosted checkout page
            window.location.href = checkoutUrl;
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('A apărut o eroare la crearea comenzii. Încearcă din nou.');
        } finally {
            setIsCheckingOut(false);
        }
    }, [items]);

    return (
        <CartContext.Provider value={{
            items, isOpen, totalItems, totalPrice, isCheckingOut,
            addToCart, removeFromCart, updateQuantity, clearCart,
            openCart, closeCart, toggleCart, checkout,
        }}>
            {children}
        </CartContext.Provider>
    );
}

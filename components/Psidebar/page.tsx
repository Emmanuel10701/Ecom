"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/page'; // Adjust the path if necessary
import { useRouter } from 'next/navigation';

type Category = 'Accessories' | 'Groceries' | 'Fashions' | 'Home Appliants' | 'Kids';

interface FilterState {
  price: string;
  categorys: Record<Category, boolean>;
}

interface SidebarProps {
  onFilterChange: (filter: FilterState) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, isOpen, setIsOpen }) => {
  const [filterState, setFilterState] = useState<FilterState>({
    price: '',
    categorys: {
      'Accessories': false,
      'Groceries': false,
      'Fashions': false,
      'Home Appliants': false,
      'Kids': false
    }
  });

  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState<boolean>(false);
  const { state: cartState } = useCart();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);

  const totalItems = cartState?.items.reduce<number>((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice = cartState?.items.reduce<number>((sum, item) => sum + item.price * item.quantity, 0) || 0;

  useEffect(() => {
    if (isOpen && window.innerWidth < 855) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify(cartState));
  }, [cartState]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartState');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Assuming setCartState is available to set the cart state
      // setCartState(parsedCart);
    }
  }, []);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterState(prevState => {
      const newFilterState = { ...prevState, price: value };
      onFilterChange(newFilterState);
      if (window.innerWidth < 855) {
        setIsOpen(false); // Close sidebar for price filter
      }
      return newFilterState;
    });
  };

  const handleCategoryChange = (category: Category) => {
    setFilterState(prevState => {
      const newCategorys = { ...prevState.categorys, [category]: !prevState.categorys[category] };
      const newFilterState = { ...prevState, categorys: newCategorys };
      onFilterChange(newFilterState);
      // Do not close the sidebar for category filter changes
      return newFilterState;
    });
  };

  const cartNavigation = () => {
    setIsCartDropdownOpen(false);
    router.push("/Cartpage");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-white z-10 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-[20vw] p-4 border-r-2 border-gray-300 rounded-sm md:w-[20vw]`}
      style={{ minWidth: '300px' }}
    >
      <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-600">
        <FaTimes size={24} />
      </button>

      {/* Centered Cart Icon */}
      <div className="flex flex-col items-center mb-4">
        <button onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)} className="relative p-1.5 bg-slate-300 cursor-pointer rounded-full">
          <FaShoppingCart size={24} className="text-gray-600" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full">{totalItems}</span>
          )}
        </button>
        {isCartDropdownOpen && (
          <div ref={cartDropdownRef} className="absolute z-10 mt-5 w-52 bg-white border border-gray-200 shadow-lg">
            <div className="p-4 rounded-lg">
              <span className="text-lg font-bold">{totalItems} Items</span>
              <span className="block text-sm text-gray-600">Subtotal: KSH {totalPrice.toFixed(2)}</span>
              <button className="mt-2 w-full py-1 px-2 bg-blue-500 text-white rounded" onClick={cartNavigation}>View cart</button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="space-y-2 flex-col mt-8">
          <h2 className="text-lg text-purple-800 font-semibold mb-2">Price Range</h2>
          <div className='flex flex-col mt-3'>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="price"
                value="under-500"
                checked={filterState.price === 'under-500'}
                onChange={handlePriceChange}
                className="form-radio"
              />
              <span className="ml-2 mt-3 font-semibold text-slate-400 text-md">Under KSH 500</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="price"
                value="500-1000"
                checked={filterState.price === '500-1000'}
                onChange={handlePriceChange}
                className="form-radio"
              />
              <span className="ml-2 font-semibold text-slate-400 text-md">KSH 500 - KSH 1000</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="price"
                value="1000-5000"
                checked={filterState.price === '1000-5000'}
                onChange={handlePriceChange}
                className="form-radio"
              />
              <span className="ml-2 font-semibold text-slate-400 text-md">KSH 1000 - KSH 5000</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="price"
                value="5000-10000"
                checked={filterState.price === '5000-10000'}
                onChange={handlePriceChange}
                className="form-radio"
              />
              <span className="ml-2 font-semibold text-slate-400 text-md">KSH 5000 - KSH 10000</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="price"
                value="10000-and-above"
                checked={filterState.price === '10000-and-above'}
                onChange={handlePriceChange}
                className="form-radio"
              />
              <span className="ml-2 font-semibold text-slate-400 text-md">KSH 10000 and above</span>
            </label>
          </div>
        </div>

        <div className="space-y-2 flex-col mt-4">
          <h2 className="text-lg mb-2 text-purple-800 font-bold">Categories</h2>
          {Object.keys(filterState.categorys).map(category => (
            <div className='flex flex-col' key={category}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={category}
                  checked={filterState.categorys[category as Category]}
                  onChange={() => handleCategoryChange(category as Category)}
                  className="form-checkbox"
                />
                <span className="ml-2 text-slate-400 font-semibold">{category}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

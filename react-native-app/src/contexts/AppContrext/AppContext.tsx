import { NavItem } from '@components/molecules/BookingInfo';
import { ItemProps } from '@components/organisms';
import { Booking } from '@services/BookingInfoServices';
import { Room } from '@services/RoomServices';
import React, { createContext, useContext, useState } from 'react';

// CONTEXTE POUR LE USER

export type UserContextType = {
  userName: string | null;
  setUserName: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// CONTEXTE POUR LA COMMANDE

export type CommandContextType = {
  commandId: number | null;
  listItems: ItemProps[];
  totalAmount: number;
  setCommandId: (id: number) => void;
  updateListItems: (items: ItemProps[]) => void;
  setTotalAmount: (amount: number) => void;
};

export const CommandContext = createContext<CommandContextType | undefined>(
  undefined
);

export const CommandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [commandId, setCommandId] = useState<number | null>(null);
  const [listItems, updateListItems] = useState<ItemProps[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  return (
    <CommandContext.Provider
      value={{
        commandId,
        listItems,
        totalAmount,
        setCommandId,
        updateListItems,
        setTotalAmount,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};

export const useCommand = () => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
};

export type NextBookingContextType = {
  nextBooking: NavItem[];
  updateNextBooking: (booking: NavItem[]) => void;
};

export const NextBookingContext = createContext<NextBookingContextType | undefined>(
  undefined
);

export const NextBookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nextBooking, updateNextBooking] = useState<NavItem[]>([]);

  return (
    <NextBookingContext.Provider
      value={{
        nextBooking,
        updateNextBooking,
      }}
    >
      {children}
    </NextBookingContext.Provider>
  );
};

export const useNextBooking = () => {
  const context = useContext(NextBookingContext);
  if (!context) {
    throw new Error('useNextBooking must be used within a NextBookingProvider');
  }
  return context;
};

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
  commandId: string | null;
  listItems: string[];
  totalAmount: number;
  setCommandId: (id: string) => void;
  setListItems: (items: string[]) => void;
  setTotalAmount: (amount: number) => void;
};

export const CommandContext = createContext<CommandContextType | undefined>(
  undefined
);

export const CommandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [commandId, setCommandId] = useState<string | null>(null);
  const [listItems, setListItems] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  return (
    <CommandContext.Provider
      value={{
        commandId,
        listItems,
        totalAmount,
        setCommandId,
        setListItems,
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

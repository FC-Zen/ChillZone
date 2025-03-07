import { NavItem } from '@components/molecules/BookingInfo';
import { ItemProps } from '@components/organisms';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  nextBooking: NavItem[] | null;
  setNextBooking: (booking: NavItem[] | null) => void;
};

export const NextBookingContext = createContext<
  NextBookingContextType | undefined
>(undefined);

export const NextBookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nextBooking, setNextBooking] = useState<NavItem[] | null>(null);

  return (
    <NextBookingContext.Provider
      value={{
        nextBooking,
        setNextBooking,
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

export type ReservationContextType = {
  checkReservationTime: () => void;
};

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { nextBooking } = useNextBooking();
  const navigation = useNavigation();
  const isAlertDisplayed = useRef(false);

  const checkReservationTime = () => {
    //console.log('isAlertDisplayed : ', isAlertDisplayed);
    //console.log('checkReservationTime');
    if (nextBooking?.length === 0) {
      //console.log('no booking');
      return;
    }
    if (isAlertDisplayed.current) {
      return;
    }
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();

    const bookingTimeString = nextBooking
      ?.find((item) => item.typeLabel === 'timeSlot')
      ?.label?.split('-')[0]
      ?.split('h');

    if (bookingTimeString) {
      const [bookingHours, bookingMinutes] =
        bookingTimeString?.map(Number) || [];
      if (
        (nowHours === bookingHours &&
          nowMinutes >= bookingMinutes &&
          nowMinutes <= bookingMinutes + 20) ||
        (nowHours === bookingHours + 1 &&
          nowMinutes <= (bookingMinutes + 20) % 60)
      ) {
        //console.log('Navigating to Alert Screen');
        isAlertDisplayed.current = true;
        navigation.navigate(ROUTE.ALERT);
      }
    } else {
      //console.log('Aucune réservation valide trouvée ou label indisponible');
    }
  };

  useEffect(() => {
    isAlertDisplayed.current = false;
  }, [nextBooking]);

  useEffect(() => {
    const interval = setInterval(checkReservationTime, 60000); // Vérifie chaque minute
    return () => clearInterval(interval);
  }, [nextBooking]);

  return (
    <ReservationContext.Provider value={{ checkReservationTime }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};

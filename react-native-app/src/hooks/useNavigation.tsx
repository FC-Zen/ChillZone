import { useNavigation as useNavigationRN } from '@react-navigation/native';

type UseNavigation = () => ReturnType<typeof useNavigationRN>;

export const useNavigation: UseNavigation = () => useNavigationRN();
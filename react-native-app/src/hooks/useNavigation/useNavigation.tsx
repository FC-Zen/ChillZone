import { useNavigation as useNavigationRN } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTE } from '@enums';
import { RouteParamList } from '@types';

type UseNavigation = () => StackNavigationProp<RouteParamList, ROUTE.ACCOUNT>;

export const useNavigation: UseNavigation = () => {
  return useNavigationRN();
};

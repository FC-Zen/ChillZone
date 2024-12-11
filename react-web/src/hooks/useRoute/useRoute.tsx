import { useParams } from 'react-router-dom';

export const useRoute = () => {
  const params = useParams();
  return params;
};

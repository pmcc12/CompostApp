// @ts-nocheck
console.log('testing');
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import { Buy } from '../screens/Buy';

export const HandleSellerClick = (
  event: React.MouseEvent<HTMLButtonElement>,
  sellerId: number
) => {
  const history = useHistory();
  history.push(`/details/${sellerId}`);
};

export const HandleCategoryClick = (
  event: React.MouseEvent<HTMLButtonElement>,
  catIdNum: number
) => {
  const myState = useSelector((state: myReducersTypeof) => state.login);

  const buyerId = myState.data.userId;
  Buy.sortProducts(buyerId, catIdNum);
};

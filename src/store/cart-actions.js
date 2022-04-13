import { uiActions } from "./ui-slice";
import { itemsActions } from "./items-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reactmeals-5adac-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart data.");
      }
      const data = response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        itemsActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to fetch cart data",
        })
      );
    }
  };
};

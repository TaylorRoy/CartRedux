import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import { fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const displayCart = useSelector((state) => state.ui.isVisible);
  const cart = useSelector((state) => state.items);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  //allow state to update before sending fetch req,  waits for cart to change to reexecute fetch and replace old cart with new with PUT
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data.",
        })
      );
      const response = await fetch(
        "https://reactmeals-5adac-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Successfully sent cart data",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      sendCartData().catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Failed to send cart data",
          })
        );
      });
    }
  }, [cart, dispatch]);

  console.log(notification);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {displayCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { fetchUserData, clearData } from "../../store/actions/user";

import TabNavigator from "../../navigation/TabNavigator";

const MainScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearData());
    dispatch(fetchUserData());
  }, [dispatch]);

  return <TabNavigator />;
};

export default MainScreen;

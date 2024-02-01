"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyMutation } from "@/redux/features/privateApiSlice";
import {
  setAuth,
  setUser,
  setLogout,
  finishInitialLoad,
} from "@/redux/features/authSlice";
import { getFromLocalStorage } from "@/src/lib/common";

export default function Auth() {
  const dispatch = useDispatch();
  const [verify] = useVerifyMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = getFromLocalStorage("token");

    // if token exist we call jwt verify
    if (token) {
      verify()
        .unwrap()
        .then((res) => {
          dispatch(setAuth());
          dispatch(setUser({ userId: res.userId, token }));
        })
        .finally(() => {
          dispatch(finishInitialLoad());
        });
    } else {
      // no token (we don't need to verify)
      dispatch(finishInitialLoad());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // listen to Authenticated status when changing
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setLogout());
      dispatch(setUser(null));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
}

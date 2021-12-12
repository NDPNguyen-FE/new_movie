import { authTypes } from "../actionType/actionType";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  profile: user || {},
  isAuthenticated:
    (user && user.maLoaiNguoiDung === "QuanTri" ? true : false) || false,
  isLoggedIn: user ? true : false,
  isLoading: false,
  status: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.USER_LOGIN_START: {
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        profile: {},
        status: "",
      };
    }

    case authTypes.USER_LOGIN_SUCCESS: {
      const profile = payload.content;
      const accessToken = payload.content.accessToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(profile));

      state = {
        profile: profile,
        isAuthenticated: payload.content.maLoaiNguoiDung,
        isLoggedIn: true,
        isLoading: false,
        status: payload.statusCode,
      };

      return { ...state };
    }

    case authTypes.USER_LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        profile: {},
        status: "login_fail",
      };
    }

    default: {
      return state;
    }
  }
};

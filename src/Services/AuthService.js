import { API_Config } from "../Config/API-Config";

export const AuthService = {
  LoginService: function (phoneParam) {
    // 1. Fixed trailing slashes to prevent double slashes in URL
    const baseUrl = API_Config.BASE_URL.replace(/\/+$/, "");
    const endpoint = API_Config.ENDPOINTS.LOGIN.replace(/^\/+/, "");

    const url = `${baseUrl}/${endpoint}?_format=json`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 2. Pass the single phone parameter
        phone: phoneParam,
      }),
      // 3. Removed credentials: "include" to prevent CORS preflight error 
      // when backend responds with Access-Control-Allow-Origin: "*"
    }).then(async (res) => {
      if (!res.ok) {
        let errorMessage = "هنالك خطأ في تسجيل الدخول";
        try {
          const serverError = await res.json();
          errorMessage = serverError.message || errorMessage;
        } catch {
          // Fallback if response body isn't JSON
        }
        throw new Error(errorMessage);
      }
      return res.json();
    });
  },

  LogOutService: function () {
    localStorage.removeItem("user_info");
  },
};
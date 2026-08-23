import React, { useState, useEffect } from "react";
import api from "../services/api";

const Summary = () => {
  const [username, setUsername] = useState(() => {
    // Check initial user from localStorage
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.username || parsed.name || (typeof parsed === "string" ? parsed : "User");
      }
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
    }
    return "User";
  });

  useEffect(() => {
    const handleAuthHandoffAndFetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const tokenFromUrl = params.get("token");
      const userFromUrl = params.get("user");

      if (code) {
        try {
          const res = await api.post("/auth/verify-handoff", { code });
          if (res.data && res.data.success && res.data.token) {
            localStorage.setItem("token", res.data.token);
            if (res.data.user) {
              localStorage.setItem("user", JSON.stringify(res.data.user));
              setUsername(res.data.user.username || res.data.user.name || "User");
              window.dispatchEvent(new Event("user-updated"));
            }
          }
        } catch (err) {
          console.error("Error verifying handoff code:", err);
        } finally {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else if (tokenFromUrl || userFromUrl) {
        if (tokenFromUrl) {
          localStorage.setItem("token", tokenFromUrl);
        }
        if (userFromUrl) {
          try {
            const decodedUser = JSON.parse(decodeURIComponent(userFromUrl));
            localStorage.setItem("user", JSON.stringify(decodedUser));
            setUsername(decodedUser.username || decodedUser.name || "User");
            window.dispatchEvent(new Event("user-updated"));
          } catch (e) {
            console.error("Error parsing user from URL:", e);
          }
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // Refresh logged in user profile if token present
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get("/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data && res.data.user && res.data.user.username) {
            setUsername(res.data.user.username);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.dispatchEvent(new Event("user-updated"));
          }
        } catch (err) {
          console.error("Error fetching logged in user info:", err);
        }
      }
    };

    handleAuthHandoffAndFetchUser();
  }, []);

  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
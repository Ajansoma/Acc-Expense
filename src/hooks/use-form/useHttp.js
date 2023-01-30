import { useState, useCallback } from "react";

const useHttp = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async function (responseConfig, applyData) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(responseConfig.url, {
        method: responseConfig.method ? responseConfig.method : "GET",
        body: responseConfig.body ? JSON.stringify(responseConfig.body) : null,
        headers: responseConfig.headers ? responseConfig.headers : {},
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      // setData(data);
      applyData(data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;

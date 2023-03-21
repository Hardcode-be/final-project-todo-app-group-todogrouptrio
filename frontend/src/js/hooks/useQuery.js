import { useMemo } from "react";
import { useLocation } from "react-router-dom";

// Hook zum Extrahieren der Query Parameter
function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
}

export default useQuery;
import { create } from "zustand";

const useAuthStore = create(set => ({
    // Speicherort fuer user objekt
    user: null,

    isAuthenticated: function() {
        return this.user !== null;

        // let resp = await axios.get('/auth/validate-token', {withCredentials: true});
    },

    getUser: function() {
      return this.user;
    },

    setUser: (user) => set({ user: user }),

    getUserProjects: function() {
      return this.user.projects;
    },
    
    // Methode zum Speichern des users und des tokens
    authenticate: (user) => {
      // Speichere token im localStorage
      localStorage.setItem('token', user.token);
  
      // Speichere user Objekt im store
      set({ user: user }); // setze neuen user
    },
  
    // Methode zum Holen des gespeicherten tokens
    getToken: () => localStorage.getItem('token'),
  
    // Methode zum Ausloggen (loeschen des users und des tokens)
    logout: () => {
      // entferne token aus localStorage
      localStorage.removeItem('token');
  
      // entferne user Objekt aus user Store
      set({user: null});
    }
}));
  
export default useAuthStore;
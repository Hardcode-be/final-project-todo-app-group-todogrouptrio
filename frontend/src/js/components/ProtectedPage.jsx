import { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../hooks/useAuthStore';


function ProtectedPage() {
    const [protectedData, setProtectedData] = useState('Hier werden nur Daten fuer eingeloggte Benutzer angezeigt.');
    const token = useAuthStore(state => state.getToken());
    const logout = useAuthStore(state => state.logout);

    async function clickHandler(evt) {
        // Hole Token aus local- oder sessionStorage
        // const token = localStorage.getItem('token');
        // const token = sessionStorage.getItem('token');

        try {
            // Fuehre axios Request auf protected Route durch
            // und definiere im options Objekt die Authorization, wo der Token reinkommt
            const resp = await axios.get('http://localhost:8080/protected', {
                // withCredentials: true
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(resp);

            setProtectedData(JSON.stringify(resp.data));

        } catch (error) {
            // Logge den Nutzer aus, denn Token ist abgelaufen
            logout();
            // setProtectedData(error.message);
        }
    }

    return (
        <>
            <button id='protected-button' onClick={clickHandler}>Fetch protected route</button>
            <pre>
                {protectedData}
            </pre>
        </>
    );
}

export default ProtectedPage;
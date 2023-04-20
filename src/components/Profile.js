import { useNavigate } from "react-router"
export default function Profile(){

  const navigate = useNavigate()

  const signOut = ()=> {

    // localStorage.removeItem('temitope')
    fetch('http://localhost:8000/auth/jwt/logout', {
      credentials: 'include',
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate('/')
      });

    navigate('/')

  }

  const profileInfo = () => {
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ${localStorage.getItem('temitope')}`);
    fetch('http://localhost:8000/users/me', {
      method: 'GET',
      credentials: 'include',
      // headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  }

  const listItems = () => {
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ${localStorage.getItem('temitope')}`);
    fetch('http://localhost:8000/items/me', {
      method: 'GET',
      credentials: 'include',
      // headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  }

    return(
        <>
          <div style ={{marginTop:20,minHeight:700}}>
          <h1>Profile page</h1>
          <p>Hello there, welcome to your profile page</p>
          <button onClick={profileInfo}>Profile Info</button>
          <button onClick={listItems}>List Items</button>
          <button onClick = {signOut}>sign out</button>
          </div>
        </>
    )
}
import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import './AddUser.css';
import maxwell from '../assets/maxwell-cat.gif'

const AddUser = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')

    const [nameError, setNameError] = useState('')
    const [mailError, setMailError] = useState('')
    const [passError, setPassError] = useState('')
    const [ageError, setAgeError] = useState('')

    const navigate = useNavigate()

    const nameChangeChandler = (e) => {
        setUserName(e.target.value)
    }
    const emailChangeChandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordChangeChandler = (e) => {
        setPassword(e.target.value)
    }
    const ageChangeChandler = (e) => {
        setAge(e.target.value)
    }

    const getImage = async () => {
        try {
          const response = await fetch('https://api.thecatapi.com/v1/images/search');
          const data = await response.json();
          return data[0].url;
        } catch (error) {
          console.error(error);
        }
    }
      
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


    async function submit(event){
        event.preventDefault();
        setNameError('')
        setMailError('')
        setPassError('')
        setAgeError('')

        if(+age < 18 || !emailRegex.test(email) || userName.length < 5 || !passwordRegex.test(password)){
            if(userName.length < 5){
                setNameError('Nazwa uzytkownia musi mieć minimum 5 znaków')
            }
            if(!emailRegex.test(email)){
                setMailError('Niepoprawny adres email')
            }
            if(!passwordRegex.test(password)){
                setPassError('Musi mieć co najmniej 8 znaków, 1 wielką i mała litere oraz liczbe')
            }
            if(+age < 18){
                setAgeError('Minimalny wiek wynosi 18 lat')
            }
            return;
        }


        const user = {
            name: userName,
            email: email,
            password: password,
            age: age,
            image: await getImage()
        }

        const res = await fetch('https://loginappszkola-default-rtdb.firebaseio.com/data.json',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application.json'
            }
        });

        const data = await res.json()
        console.log(data);
        navigate('/users')

        setUserName('')
        setEmail('')
        setPassword('')
        setAge('')
    }

    return (
        <div className='login__container'>
        <div className='left__container'>
          <Link to="/users"><img src={maxwell} className='maxwell'/></Link>
          <Link to="/users"><p>Nacisnij Maxwella</p></Link>
        </div>
        <div className='right__container'>
          <img src='https://codingcat.codes/wp-content/uploads/2017/08/l1-1.png' className='logo'/>
          <h1>Witaj w aplikacji!</h1>
          <form className='form__container' onSubmit={submit}>
            <label>Nazwa użytkownika</label>
            <input 
                placeholder='Wpisz nazwę użytkownika'
                onChange={nameChangeChandler}
            />
            <span className="error">{nameError}</span>

            <label>E-mail</label>
            <input 
                placeholder='Wpisz adres email'
                onChange={emailChangeChandler}    
            />
            <span className="error">{mailError}</span>

            <label>Hasło</label>
            <input 
                placeholder='Wpisz hasło'
                type='password'
                onChange={passwordChangeChandler}    
            />
            <span className="error">
                {passError}
            </span>

            <label>Wiek</label>
            <input 
                placeholder='Podaj Wiek' type="number"
                onChange={ageChangeChandler}
            />
            <span className="error">{ageError}</span>
  
            <button type='submit'>Stwórz Konto!</button>
          </form>
        </div>
      </div>
    )
}
export default AddUser;
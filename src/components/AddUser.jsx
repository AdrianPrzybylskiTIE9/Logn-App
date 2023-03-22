import React, { useState } from "react";
import './AddUser.css';
import maxwell from '../assets/maxwell-cat.gif'

const AddUser = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')

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

    async function submit(event){
        event.preventDefault();

        if(+age < 18 || !email.includes('@') || userName.length < 5 || password.length < 7){
            if(userName.length < 5){
                alert('5 znakow nazwa')
            }
            else if(!email.includes('@')){
                alert('zly emajl')
            }
            else if(password.length < 7){
                alert('7 znakow haslo')
            }
            else if(+age < 18){
                alert('wiek 18')
            }
            return;
        }


        const user = {
            name: userName,
            email: email,
            password: password,
            age: age
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

        setUserName('')
        setEmail('')
        setPassword('')
        setAge('')
    }

    return (
        <div className='login__container'>
        <div className='left__container'>
          <img src={maxwell} className='maxwell'/>
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

            <label>E-mail</label>
            <input 
                placeholder='Wpisz adres email'
                onChange={emailChangeChandler}    
            />

            <label>Hasło</label>
            <input 
                placeholder='Wpisz hasło'
                onChange={passwordChangeChandler}    
            />

            <label>Wiek</label>
            <input 
                placeholder='Podaj Wiek' type="number"
                onChange={ageChangeChandler}
            />
  
            <button type='submit'>Stwórz Konto!</button>
          </form>
        </div>
      </div>
    )
}
export default AddUser;
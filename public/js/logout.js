const logout = async () =>{
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });
    if(res.ok) {
        document.location.replace('/');
    }else{
        alert ('Failed to Log Out');
    }
};

document.querySelector('#logout').addEventListener('click', logout);
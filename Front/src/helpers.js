async function refreshUser(email, password, dispatch) {
    const res = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
        const data = await res.json();
        dispatch({ type: 'LOGIN', user: data });
    } else {
        const error = new Error('Error de registro, valida tu usuario');
        alert(error);
    }
}

function random_bg_color() {
    var x = Math.floor(Math.random() * 90);
    var y = Math.floor(Math.random() * 90);
    var z = Math.floor(Math.random() * 90);
    return 'rgb(' + x + ',' + y + ',' + z + ')';
}

module.exports = { refreshUser, random_bg_color };

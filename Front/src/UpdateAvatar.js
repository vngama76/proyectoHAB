export default async function UpdateAvatar(file, user) {
    const foto = user.foto && require(`../../Back/static/` + user.foto).default;

    if (file !== foto) {
        const fd = new FormData();
        fd.append('avatar', file);

        const ret = await fetch('http://localhost:4000/api/users/avatar', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user.token,
            },
            body: fd,
        });
        const data = await ret.json();
        console.log('Data:', data);
    } else {
        return;
    }
}
